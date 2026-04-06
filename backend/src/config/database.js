const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('MySQL connected via Prisma');
    } catch (error) {
        console.error('Failed to connect to MySQL:', error);
        throw error;
    }
};

module.exports = { prisma, connectDB };
