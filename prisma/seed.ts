// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const db = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'admin123');
  
  const adminUser = await db.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@voipcall.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@voipcall.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      verified: true,
      country: 'US',
      credits: {
        create: {
          balance: 1000,
          bonusAmount: 5,
        },
      },
      settings: {
        create: {},
      },
    },
  });

  console.log('Admin user created:', adminUser.email);

  // Create some test users
  for (let i = 1; i <= 5; i++) {
    const testPassword = await hashPassword('test123456');
    const user = await db.user.upsert({
      where: { email: `user${i}@test.com` },
      update: {},
      create: {
        email: `user${i}@test.com`,
        password: testPassword,
        firstName: `Test`,
        lastName: `User ${i}`,
        verified: true,
        country: 'US',
        credits: {
          create: {
            balance: 10,
            bonusAmount: 5,
          },
        },
        settings: {
          create: {},
        },
      },
    });
    console.log('Test user created:', user.email);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
