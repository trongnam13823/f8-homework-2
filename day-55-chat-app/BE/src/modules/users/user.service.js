const prisma = require('@/lib/prisma');
const ApiError = require('@/utils/ApiError');

const searchUserByEmail = async (email) => {

    console.log(email)

    const users = await prisma.user.findMany({
        where: {
            email: {
                contains: email,
            },
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });

    return users;
};

module.exports = {
    searchUserByEmail,
};
