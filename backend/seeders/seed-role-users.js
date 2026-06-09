// Krijon llogari demo për secilin rol (Admin, Manager, Editor, Support, Customer).
// Ekzekuto:  node seeders/seed-role-users.js
const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../src/utils/hash");
const prisma = new PrismaClient();
// email -> { first, last, password, role }
const USERS = [
  {
    email: "admin@clicon.com",
    first: "Admin",
    last: "User",
    password: "Admin@123",
    role: "Admin",
  },
  {
    email: "manager@clicon.com",
    first: "Manager",
    last: "User",
    password: "Manager@123",
    role: "Manager",
  },
  {
    email: "editor@clicon.com",
    first: "Editor",
    last: "User",
    password: "Editor@123",
    role: "Editor",
  },
  {
    email: "support@clicon.com",
    first: "Support",
    last: "User",
    password: "Support@123",
    role: "Support",
  },
  {
    email: "customer@clicon.com",
    first: "Customer",
    last: "User",
    password: "Customer@123",
    role: "Customer",
  },
];
(async () => {
  try {
    for (const u of USERS) {
      const role = await prisma.role.findFirst({ where: { name: u.role } });
      if (!role) {
        console.warn(`⚠️  Roli '${u.role}' s'u gjet — kapërcej ${u.email}.`);
        continue;
      }
      const passwordHash = await hashPassword(u.password);
      const user = await prisma.user.upsert({
        where: { email: u.email },
        update: {
          first_name: u.first,
          last_name: u.last,
          password_hash: passwordHash,
          is_active: true,
          email_verified_at: new Date(),
        },
        create: {
          first_name: u.first,
          last_name: u.last,
          email: u.email,
          password_hash: passwordHash,
          is_active: true,
          email_verified_at: new Date(),
        },
      });
      await prisma.userRole.upsert({
        where: {
          user_id_role_id: { user_id: user.id, role_id: role.id },
        },
        update: {},
        create: { user_id: user.id, role_id: role.id },
      });
      console.log(`✅ ${u.email}  (${u.role})  fjalëkalimi: ${u.password}`);
    }
    console.log(
      "\n➡️  Tani mund të logohesh me secilën llogari për të testuar rolet.",
    );
  } catch (err) {
    console.error("❌ Gabim:", err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
