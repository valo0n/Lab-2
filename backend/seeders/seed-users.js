// Seeder per nga 1 user per secilin rol
// Ekzekuto: node seeders/seed-users.js

const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../src/utils/hash");
const prisma = new PrismaClient();

// Roli: id sipas seeder-it (1=Admin, 2=Customer, 3=Manager, 4=Editor, 5=Support)
const usersToCreate = [
  {
    first_name: "Manager",
    last_name: "User",
    email: "manager@clicon.com",
    role_id: 3,
  },
  {
    first_name: "Editor",
    last_name: "User",
    email: "editor@clicon.com",
    role_id: 4,
  },
  {
    first_name: "Support",
    last_name: "User",
    email: "support@clicon.com",
    role_id: 5,
  },
  {
    first_name: "Customer",
    last_name: "User",
    email: "customer@clicon.com",
    role_id: 2,
  },
];

async function seedUsers() {
  try {
    console.log("🌱 Duke krijuar userat per secilin rol...\n");

    const passwordHash = await hashPassword("Test@123");

    for (const u of usersToCreate) {
      // Krijo ose perditeso userin
      const user = await prisma.user.upsert({
        where: { email: u.email },
        update: {
          first_name: u.first_name,
          last_name: u.last_name,
          password_hash: passwordHash,
          is_active: true,
          email_verified_at: new Date(),
        },
        create: {
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          password_hash: passwordHash,
          is_active: true,
          email_verified_at: new Date(),
        },
      });

      // Lidh me rolin
      await prisma.userRole.upsert({
        where: {
          user_id_role_id: { user_id: user.id, role_id: u.role_id },
        },
        update: {},
        create: { user_id: user.id, role_id: u.role_id },
      });

      // Krijo nje adrese per userin (nese s'ka)
      const existingAddr = await prisma.address.findFirst({
        where: { user_id: user.id },
      });
      if (!existingAddr) {
        await prisma.address.create({
          data: {
            user_id: user.id,
            label: "Home",
            full_name: `${u.first_name} ${u.last_name}`,
            phone: "+383 44 000 000",
            street: "Rruga UÇK, Nr. 1",
            city: "Prishtina",
            state: "Kosova",
            zip_code: "10000",
            country: "Kosovo",
            is_default: true,
            created_by: user.id,
          },
        });
      }

      console.log(`✅ ${u.email} (rol_id: ${u.role_id}) — password: Test@123`);
    }

    console.log("\n🎉 Te gjithe userat u krijuan!");
    console.log("\n--- KREDENCIALET ---");
    console.log("admin@clicon.com    / Admin@123  (Admin)");
    console.log("manager@clicon.com  / Test@123   (Manager)");
    console.log("editor@clicon.com   / Test@123   (Editor)");
    console.log("support@clicon.com  / Test@123   (Support)");
    console.log("customer@clicon.com / Test@123   (Customer)");
  } catch (error) {
    console.error("❌ Gabim:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
