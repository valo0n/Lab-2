const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../src/utils/hash");
require("dotenv").config();

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding database...\n");

    // --- ROLES ---
    await prisma.role.createMany({
      data: [
        { name: "Admin", description: "Full system access" },
        { name: "Customer", description: "Regular customer" },
        {
          name: "Manager",
          description: "Manages products, orders, reviews, coupons",
        },
        { name: "Editor", description: "Manages product content only" },
        { name: "Support", description: "Handles customer issues" },
      ],
    });
    console.log("✅ 5 Roles");

    // --- PERMISSIONS ---
    await prisma.permission.createMany({
      data: [
        {
          name: "manage_products",
          description: "Create, edit, delete products",
        },
        {
          name: "manage_categories",
          description: "Create, edit, delete categories",
        },
        { name: "manage_brands", description: "Create, edit, delete brands" },
        { name: "manage_orders", description: "View and update all orders" },
        {
          name: "update_order_status",
          description: "Update order status and tracking",
        },
        {
          name: "manage_users",
          description: "View, activate, deactivate users",
        },
        { name: "manage_coupons", description: "Create, edit, delete coupons" },
        { name: "manage_settings", description: "Edit system settings" },
        { name: "manage_reviews", description: "Approve or reject reviews" },
        { name: "view_reports", description: "Access admin dashboard" },
        { name: "view_audit_logs", description: "View audit log history" },
        {
          name: "manage_notifications",
          description: "Send system notifications",
        },
        { name: "view_products", description: "Browse and view products" },
        { name: "manage_own_profile", description: "Edit own profile" },
        {
          name: "manage_own_orders",
          description: "Place orders, view history",
        },
        {
          name: "manage_own_wishlist",
          description: "Add/remove wishlist items",
        },
        { name: "manage_own_cart", description: "Add/remove cart items" },
        { name: "write_reviews", description: "Submit product reviews" },
      ],
    });
    console.log("✅ 18 Permissions");

    // --- ROLE PERMISSIONS ---
    const allPerms = await prisma.permission.findMany();
    const custPerms = allPerms.filter((p) => p.id >= 13);

    // Admin gets ALL
    for (const p of allPerms) {
      await prisma.rolePermission.create({
        data: { role_id: 1, permission_id: p.id },
      });
    }
    // Customer gets 13-18
    for (const p of custPerms) {
      await prisma.rolePermission.create({
        data: { role_id: 2, permission_id: p.id },
      });
    }
    // Manager
    const mgrIds = [1, 2, 3, 4, 5, 7, 9, 10, ...custPerms.map((p) => p.id)];
    for (const pid of [...new Set(mgrIds)]) {
      await prisma.rolePermission.create({
        data: { role_id: 3, permission_id: pid },
      });
    }
    // Editor
    const edIds = [1, 2, 3, ...custPerms.map((p) => p.id)];
    for (const pid of [...new Set(edIds)]) {
      await prisma.rolePermission.create({
        data: { role_id: 4, permission_id: pid },
      });
    }
    // Support
    const supIds = [4, 5, 9, 12, ...custPerms.map((p) => p.id)];
    for (const pid of [...new Set(supIds)]) {
      await prisma.rolePermission.create({
        data: { role_id: 5, permission_id: pid },
      });
    }
    console.log("✅ Role permissions assigned");

    // --- ADMIN USER ---
    const admin = await prisma.user.create({
      data: {
        first_name: "Admin",
        last_name: "User",
        email: "admin@clicon.com",
        password_hash: await hashPassword("Admin@123"),
        is_active: true,
      },
    });
    await prisma.userRole.create({ data: { user_id: admin.id, role_id: 1 } });
    console.log("✅ Admin user (admin@clicon.com / Admin@123)");

    // --- SETTINGS ---
    await prisma.setting.createMany({
      data: [
        { key_name: "site_name", value: "Clicon", description: "Website name" },
        { key_name: "currency", value: "USD", description: "Default currency" },
        {
          key_name: "currency_symbol",
          value: "$",
          description: "Currency symbol",
        },
        { key_name: "tax_rate", value: "0.08", description: "Tax rate 8%" },
        {
          key_name: "shipping_cost",
          value: "5.99",
          description: "Default shipping",
        },
        {
          key_name: "free_shipping_min",
          value: "50.00",
          description: "Min for free shipping",
        },
        {
          key_name: "items_per_page",
          value: "12",
          description: "Products per page",
        },
        {
          key_name: "max_compare_items",
          value: "4",
          description: "Max compare items",
        },
        { key_name: "stripe_mode", value: "test", description: "Stripe mode" },
        {
          key_name: "contact_email",
          value: "support@clicon.com",
          description: "Support email",
        },
      ],
    });
    console.log("✅ Settings");

    // --- CATEGORIES ---
    const electronics = await prisma.category.create({
      data: { name: "Electronics", slug: "electronics", sort_order: 1 },
    });
    const computers = await prisma.category.create({
      data: {
        name: "Computers & Laptops",
        slug: "computers-laptops",
        sort_order: 2,
      },
    });
    const phones = await prisma.category.create({
      data: { name: "Smartphones", slug: "smartphones", sort_order: 3 },
    });
    const accessories = await prisma.category.create({
      data: { name: "Accessories", slug: "accessories", sort_order: 4 },
    });
    await prisma.category.createMany({
      data: [
        { name: "Home & Kitchen", slug: "home-kitchen", sort_order: 5 },
        { name: "Sports & Outdoors", slug: "sports-outdoors", sort_order: 6 },
      ],
    });
    await prisma.category.createMany({
      data: [
        {
          name: "Headphones",
          slug: "headphones",
          parent_id: electronics.id,
          sort_order: 1,
        },
        {
          name: "Speakers",
          slug: "speakers",
          parent_id: electronics.id,
          sort_order: 2,
        },
        {
          name: "Cameras",
          slug: "cameras",
          parent_id: electronics.id,
          sort_order: 3,
        },
        {
          name: "Laptops",
          slug: "laptops",
          parent_id: computers.id,
          sort_order: 1,
        },
        {
          name: "Desktops",
          slug: "desktops",
          parent_id: computers.id,
          sort_order: 2,
        },
        {
          name: "Monitors",
          slug: "monitors",
          parent_id: computers.id,
          sort_order: 3,
        },
        { name: "iPhone", slug: "iphone", parent_id: phones.id, sort_order: 1 },
        {
          name: "Samsung",
          slug: "samsung-phones",
          parent_id: phones.id,
          sort_order: 2,
        },
        {
          name: "Cases & Covers",
          slug: "cases-covers",
          parent_id: accessories.id,
          sort_order: 1,
        },
        {
          name: "Chargers & Cables",
          slug: "chargers-cables",
          parent_id: accessories.id,
          sort_order: 2,
        },
      ],
    });
    console.log("✅ Categories (6 main + 10 sub)");

    // --- BRANDS ---
    await prisma.brand.createMany({
      data: [
        { name: "Apple", slug: "apple" },
        { name: "Samsung", slug: "samsung" },
        { name: "Sony", slug: "sony" },
        { name: "LG", slug: "lg" },
        { name: "Dell", slug: "dell" },
        { name: "HP", slug: "hp" },
        { name: "Bose", slug: "bose" },
        { name: "JBL", slug: "jbl" },
        { name: "Google", slug: "google" },
        { name: "Logitech", slug: "logitech" },
        { name: "Anker", slug: "anker" },
      ],
    });
    console.log("✅ 11 Brands");

    // --- TAGS ---
    await prisma.tag.createMany({
      data: [
        { name: "New Arrival", slug: "new-arrival" },
        { name: "Best Seller", slug: "best-seller" },
        { name: "On Sale", slug: "on-sale" },
        { name: "Featured", slug: "featured" },
        { name: "Trending", slug: "trending" },
        { name: "Free Shipping", slug: "free-shipping" },
      ],
    });
    console.log("✅ 6 Tags");

    // --- COUPONS ---
    const future = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    await prisma.coupon.createMany({
      data: [
        {
          code: "WELCOME10",
          type: "percentage",
          value: 10,
          min_order: 25,
          usage_limit: 100,
          starts_at: new Date(),
          expires_at: future,
        },
        {
          code: "SAVE20",
          type: "fixed",
          value: 20,
          min_order: 100,
          usage_limit: 50,
          starts_at: new Date(),
          expires_at: future,
        },
        {
          code: "FREESHIP",
          type: "fixed",
          value: 5.99,
          min_order: 0,
          starts_at: new Date(),
          expires_at: future,
        },
      ],
    });
    console.log("✅ 3 Coupons");

    console.log("\n🎉 All seed data inserted!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
