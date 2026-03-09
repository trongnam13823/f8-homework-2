require('module-alias/register');
require("dotenv").config();
const prisma = require("@/lib/prisma");
const { hashPassword } = require('@/utils/password');

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomMessage = () => {
    const messages = [
        "Hello 👋",
        "How are you?",
        "Let's deploy it",
        "Working on the feature",
        "Looks good 👍",
        "Please review PR",
        "Nice work!",
        "Let's fix that bug",
        "Meeting at 3PM",
        "I'll check it",
        "Done!",
        "Sounds great",
        "Agreed",
        "Interesting idea",
        "Let's test it",
        "Can you check this?",
    ];

    return randomItem(messages);
};

const randomDateLast7Days = () => {
    const now = Date.now();
    const days7 = 7 * 24 * 60 * 60 * 1000;

    return new Date(now - Math.random() * days7);
};

async function main() {
    console.log("🌱 Start seeding large dataset...");

    //----------------------------------
    // USERS
    //----------------------------------

    const users = [];

    for (let i = 1; i <= 50; i++) {
        const user = await prisma.user.create({
            data: {
                email: `user${i}@example.com`,
                name: `User ${i}`,
                password: await hashPassword("123456"),
            },
        });

        users.push(user);
    }

    console.log(`✅ ${users.length} users created`);

    //----------------------------------
    // GROUP CONVERSATIONS
    //----------------------------------

    const groupConversations = [];

    for (let i = 1; i <= 20; i++) {
        const creator = randomItem(users);

        const members = users
            .slice()
            .sort(() => 0.5 - Math.random())
            .slice(0, 5 + Math.floor(Math.random() * 5)); // 5-9 members

        const conversation = await prisma.conversation.create({
            data: {
                type: "GROUP",
                name: `Group ${i}`,
                createdBy: creator.id,
                members: {
                    create: members.map((u) => ({
                        userId: u.id,
                    })),
                },
            },
        });

        groupConversations.push(conversation);
    }

    console.log("✅ 20 group conversations created");

    //----------------------------------
    // DM CONVERSATIONS
    //----------------------------------

    const dmConversations = [];
    const usedPairs = new Set();

    while (dmConversations.length < 100) {
        const u1 = randomItem(users);
        const u2 = randomItem(users);

        if (u1.id === u2.id) continue;

        const key = [u1.id, u2.id].sort().join("-");

        if (usedPairs.has(key)) continue;

        usedPairs.add(key);

        const conversation = await prisma.conversation.create({
            data: {
                type: "DM",
                createdBy: u1.id,
                members: {
                    create: [{ userId: u1.id }, { userId: u2.id }],
                },
            },
        });

        dmConversations.push(conversation);
    }

    console.log("✅ 100 DM conversations created");

    const allConversations = [...groupConversations, ...dmConversations];

    //----------------------------------
    // CACHE MEMBERS
    //----------------------------------

    const membersMap = {};

    for (const convo of allConversations) {
        const members = await prisma.conversationUser.findMany({
            where: { conversationId: convo.id },
        });

        membersMap[convo.id] = members;
    }

    //----------------------------------
    // MESSAGES (5000)
    //----------------------------------

    const BATCH = 100;
    const TOTAL_MESSAGES = 5000;

    console.log("💬 Creating messages...");

    for (let i = 0; i < TOTAL_MESSAGES; i += BATCH) {
        const batch = [];

        for (let j = 0; j < BATCH; j++) {
            const convo = randomItem(allConversations);
            const members = membersMap[convo.id];
            const sender = randomItem(members);

            batch.push({
                conversationId: convo.id,
                senderId: sender.userId,
                content: randomMessage(),
                createdAt: randomDateLast7Days(),
            });
        }

        await prisma.message.createMany({
            data: batch,
        });

        console.log(`messages created: ${i + BATCH}`);
    }

    console.log("✅ 5000 messages created");

    //----------------------------------
    // UPDATE LAST MESSAGE
    //----------------------------------

    console.log("🔄 Updating last messages...");

    for (const convo of allConversations) {
        const lastMessage = await prisma.message.findFirst({
            where: { conversationId: convo.id },
            orderBy: { createdAt: "desc" },
        });

        if (lastMessage) {
            await prisma.conversation.update({
                where: { id: convo.id },
                data: { lastMessageId: lastMessage.id },
            });
        }
    }

    console.log("🎉 Seeding completed");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });