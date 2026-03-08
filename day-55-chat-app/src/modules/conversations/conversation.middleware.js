const prisma = require('@/lib/prisma');
const ApiError = require('@/utils/ApiError');
const catchAsync = require('@/utils/catchAsync');

const checkConversationAccess = catchAsync(async (req, res, next) => {
    // ID của conversation lấy từ param (vd: /conversations/:id/...)
    const { id: conversationId } = req.validated.params;
    // ID của user hiện tại được lấy từ token (sub)
    const userId = req.user.sub;

    // Kiểm tra xem user có phải là thành viên của conversation này không
    const membership = await prisma.conversationUser.findUnique({
        where: {
            conversationId_userId: {
                conversationId,
                userId,
            },
        },
    });

    if (!membership) {
        throw new ApiError(403, 'You are not a member of this conversation');
    }

    // Cho phép đi tiếp vào controller nếu tìm thấy bản ghi
    next();
});

module.exports = {
    checkConversationAccess,
};
