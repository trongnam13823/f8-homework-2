require('dotenv').config();
require('module-alias/register');
const { CronJob } = require('cron');
const backupDB = require('@/schedules/backupDB');
const cleanupExpiredTokens = require('@/schedules/cleanupExpiredTokens');

/**
 * Schedule configurations
 * 3h sáng mỗi ngày: 0 3 * * *
 * 1h sáng mỗi ngày: 0 1 * * *
 */
const jobs = [
    {
        name: 'Database Backup',
        pattern: '0 3 * * *', // 3h sáng mỗi ngày
        task: backupDB,
        runOnInit: false, // Set to true if you want to test immediately upon starting
    },
    {
        name: 'Cleanup Expired Tokens',
        // pattern: '0 1 * * *', // 1h sáng mỗi ngày
        pattern: '*/5 * * * * *', // test 5 giây chạy 1 lần
        task: cleanupExpiredTokens,
        runOnInit: false,
    }
];

console.log('--- Schedule Runner Started ---');
console.log(`Current Time: ${new Date().toLocaleString()}`);

jobs.forEach(job => {
    const cronJob = new CronJob(
        job.pattern,
        async () => {
            console.log(`[${new Date().toLocaleString()}] Running scheduled task: ${job.name}`);
            try {
                await job.task();
                console.log(`[${new Date().toLocaleString()}] Task ${job.name} completed successfully.`);
            } catch (err) {
                console.error(`[${new Date().toLocaleString()}] Task ${job.name} failed:`, err);
            }
        },
        null, // onComplete
        true, // start
        'Asia/Ho_Chi_Minh' // Timezone
    );

    console.log(`Scheduled [${job.name}] with pattern: ${job.pattern} (Timezone: Asia/Ho_Chi_Minh)`);

    if (job.runOnInit) {
        console.log(`Running [${job.name}] immediately on init...`);
        job.task();
    }
});

// Keep process alive
process.stdin.resume();

process.on('SIGINT', () => {
    console.log('\n--- Schedule Runner Stopping ---');
    process.exit(0);
});
