// Perditeson foton kryesore te cdo produkti ekzistues me URL reale sipas emrit.
// Ekzekuto nga dosja backend:  node seeders/update-product-images.js
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const { imageForProduct } = require("./product-images");

const prisma = new PrismaClient();

async function run() {
  const products = await prisma.product.findMany({ include: { images: true } });
  console.log(
    `U gjeten ${products.length} produkte. Duke perditesuar fotot...\n`,
  );

  let updated = 0;
  let created = 0;

  for (const p of products) {
    const url = imageForProduct(p.name);
    const primary = p.images.find((i) => i.is_primary) || p.images[0];

    if (primary) {
      await prisma.productImage.update({
        where: { id: primary.id },
        data: { image_url: url, is_primary: true },
      });
      updated++;
    } else {
      await prisma.productImage.create({
        data: {
          product_id: p.id,
          image_url: url,
          is_primary: true,
          sort_order: 0,
        },
      });
      created++;
    }

    console.log(`  ✓ ${p.name}\n      ${url}`);
  }

  console.log(
    `\n✅ Perfundoi — ${updated} te perditesuara, ${created} te krijuara.`,
  );
  await prisma.$disconnect();
}

run().catch(async (e) => {
  console.error("Gabim:", e);
  await prisma.$disconnect();
  process.exit(1);
});
