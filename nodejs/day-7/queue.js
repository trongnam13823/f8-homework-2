require('dotenv').config();
require('module-alias/register');

const JobModel = require('@/models/job.model');
const tasks = require('@/tasks');

/**
 * Worker xử lý các jobs trong Database
 */
const runWorker = async () => {
    console.log('[Queue] Worker started and waiting for jobs...');

    while (true) {
        try {
            // Lấy Job tiếp theo một cách atomic (nguyên tử)
            const job = await JobModel.getNextJob();

            if (job) {
                const { id, task_name, payload } = job;
                console.log(`[Queue] Processing job ${id}: [${task_name}]`);

                const taskFn = tasks[task_name];

                if (typeof taskFn === 'function') {
                    try {
                        // Chạy task (truyền raw payload vào để task tự xử lý)
                        await taskFn(payload);

                        // Đánh dấu thành công
                        await JobModel.complete(id);
                        console.log(`[Queue] ✅ Job ${id} completed.`);
                    } catch (taskError) {
                        console.error(`[Queue] ❌ Job ${id} execution failed:`, taskError.message);

                        // Đánh dấu thất bại và ghi log lỗi
                        await JobModel.fail(id, taskError.message);
                    }
                } else {
                    const errMsg = `Task handler for [${task_name}] not found! Check your /src/tasks folder.`;
                    console.error(`[Queue] ⚠️  ${errMsg}`);
                    await JobModel.fail(id, errMsg);
                }
            } else {
                // Không có job nào, nghỉ 3 giây trước khi kiểm tra lại
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error('[Queue] 🚨 Worker loop error:', error);
            // Panic delay để tránh loop quá nhanh nếu database lỗi
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('[Queue] Worker shutting down gracefully...');
    process.exit(0);
});

runWorker().catch(err => {
    console.error('[Queue] 💀 Worker crashed:', err);
    process.exit(1);
});
