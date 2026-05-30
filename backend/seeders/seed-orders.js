// Seeder per porosi test — backend/seeders/seed-orders.js
// Ekzekuto me: node seeders/seed-orders.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function orderNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

async function seedOrders() {
  try {
    console.log("🌱 Duke shtuar porosi test...\n");

    // Merr admin user (ose userin e pare)
    const user = await prisma.user.findFirst({
      where: { email: "admin@clicon.com" },
    });

    if (!user) {
      console.log("❌ S'u gjet useri admin. Bej seed te user-it i pari.");
      return;
    }

    console.log(`✅ User: ${user.email} (id: ${user.id})`);

    // Merr disa produkte qe ekzistojne
    const products = await prisma.product.findMany({ take: 5 });
    if (products.length === 0) {
      console.log("❌ S'ka produkte. Bej seed te produkteve i pari.");
      return;
    }

    // Krijo nje adrese per userin (nese s'ka)
    let address = await prisma.address.findFirst({
      where: { user_id: user.id },
    });
    if (!address) {
      address = await prisma.address.create({
        data: {
          user_id: user.id,
          label: "Home",
          full_name: "Admin Clicon",
          phone: "+383 44 123 456",
          street: "Rruga UÇK, Nr. 12",
          city: "Prishtina",
          state: "Kosova",
          zip_code: "10000",
          country: "Kosovo",
          is_default: true,
        },
      });
      console.log("✅ Adresa u krijua");
    }

    // Statuset per porosite
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "completed",
      "cancelled",
    ];

    // Krijo 8 porosi
    for (let i = 0; i < 8; i++) {
      const status = statuses[i % statuses.length];
      const numItems = 1 + Math.floor(Math.random() * 3); // 1-3 produkte
      const selectedProducts = products.slice(0, numItems);

      let subtotal = 0;
      const items = selectedProducts.map((p) => {
        const qty = 1 + Math.floor(Math.random() * 2);
        const price = parseFloat(p.price);
        subtotal += price * qty;
        return {
          product_id: p.id,
          product_name: p.name,
          quantity: qty,
          unit_price: price,
          total_price: price * qty,
        };
      });

      const shipping = 10;
      const total = subtotal + shipping;

      const order = await prisma.order.create({
        data: {
          user_id: user.id,
          order_number: orderNumber(),
          status,
          subtotal,
          shipping_cost: shipping,
          discount: 0,
          tax: 0,
          total,
          shipping_address_id: address.id,
          billing_address_id: address.id,
          payment_method: "card",
          payment_status: status === "completed" ? "paid" : "pending",
          tracking_number:
            status === "shipped" || status === "completed"
              ? `TRK${orderNumber()}`
              : null,
          carrier:
            status === "shipped" || status === "completed"
              ? "DHL Express"
              : null,
          created_by: user.id,
          items: { create: items },
        },
      });

      console.log(
        `✅ Porosi #${order.order_number} — ${status} — $${total.toFixed(2)} (${items.length} produkte)`,
      );
    }

    console.log("\n🎉 8 porosi u shtuan me sukses!");
    console.log("Tani provo /order-history dhe /track-order");
  } catch (error) {
    console.error("❌ Gabim:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOrders();
