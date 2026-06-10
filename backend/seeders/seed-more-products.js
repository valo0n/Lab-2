// Shton produkte të reja (Logitech, monitorë, desk setup, etj.)
// Ekzekuto:  node seeders/seed-more-products.js
// I sigurt për t'u rinisur (kapërcen produktet që ekzistojnë sipas slug-ut).
const { PrismaClient } = require("@prisma/client");
const { imageForProduct } = require("./product-images");
const prisma = new PrismaClient();

const U = (id) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

// category/brand = slug ekzistues në DB; image = override (ndryshe merret nga emri)
const PRODUCTS = [
  // --- Logitech ---
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    slug: "logitech-mx-master-3s",
    category: "accessories",
    brand: "logitech",
    price: 99,
    compare_price: 119,
    stock: 80,
    is_featured: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    name: "Logitech MX Keys S Wireless Keyboard",
    slug: "logitech-mx-keys-s",
    category: "accessories",
    brand: "logitech",
    price: 109,
    compare_price: 129,
    stock: 65,
    rating: 4.8,
    reviews: 198,
  },
  {
    name: "Logitech G Pro X Mechanical Gaming Keyboard",
    slug: "logitech-g-pro-x-keyboard",
    category: "accessories",
    brand: "logitech",
    price: 129,
    compare_price: 149,
    stock: 45,
    rating: 4.7,
    reviews: 156,
  },
  {
    name: "Logitech G502 Hero Gaming Mouse",
    slug: "logitech-g502-hero",
    category: "accessories",
    brand: "logitech",
    price: 49,
    compare_price: 79,
    stock: 120,
    is_featured: true,
    rating: 4.8,
    reviews: 540,
  },
  {
    name: "Logitech C920 HD Pro Webcam",
    slug: "logitech-c920-webcam",
    category: "accessories",
    brand: "logitech",
    price: 69,
    compare_price: 99,
    stock: 90,
    rating: 4.6,
    reviews: 410,
    image: U("photo-1587825140708-dfaf72ae4b04"),
  },
  {
    name: "Logitech G435 Lightspeed Wireless Gaming Headphones",
    slug: "logitech-g435-headset",
    category: "headphones",
    brand: "logitech",
    price: 79,
    compare_price: 99,
    stock: 70,
    rating: 4.5,
    reviews: 134,
  },
  {
    name: "Logitech Z407 Bluetooth Computer Speakers",
    slug: "logitech-z407-speakers",
    category: "speakers",
    brand: "logitech",
    price: 89,
    stock: 50,
    rating: 4.4,
    reviews: 88,
  },

  // --- Monitorë ---
  {
    name: 'LG UltraGear 27" 165Hz Gaming Monitor',
    slug: "lg-ultragear-27-monitor",
    category: "monitors",
    brand: "lg",
    price: 299,
    compare_price: 379,
    stock: 35,
    is_featured: true,
    rating: 4.7,
    reviews: 221,
  },
  {
    name: 'LG 34" UltraWide QHD Monitor',
    slug: "lg-34-ultrawide-monitor",
    category: "monitors",
    brand: "lg",
    price: 449,
    compare_price: 549,
    stock: 25,
    rating: 4.6,
    reviews: 167,
  },
  {
    name: 'Samsung Odyssey G5 32" Curved Gaming Monitor',
    slug: "samsung-odyssey-g5-32",
    category: "monitors",
    brand: "samsung",
    price: 349,
    compare_price: 429,
    stock: 30,
    rating: 4.6,
    reviews: 189,
  },
  {
    name: 'Dell UltraSharp 27" 4K USB-C Monitor',
    slug: "dell-ultrasharp-27-4k",
    category: "monitors",
    brand: "dell",
    price: 579,
    compare_price: 649,
    stock: 20,
    rating: 4.8,
    reviews: 142,
  },
  {
    name: 'HP 24" FHD IPS Monitor',
    slug: "hp-24-fhd-monitor",
    category: "monitors",
    brand: "hp",
    price: 139,
    compare_price: 169,
    stock: 60,
    rating: 4.4,
    reviews: 95,
  },

  // --- Desk / setup ---
  {
    name: "Electric Standing Desk 140x70cm",
    slug: "electric-standing-desk",
    category: "accessories",
    brand: null,
    price: 329,
    compare_price: 399,
    stock: 18,
    rating: 4.6,
    reviews: 76,
    image: U("photo-1593062096033-9a26b09da705"),
  },
  {
    name: "Ergonomic Office Chair with Lumbar Support",
    slug: "ergonomic-office-chair",
    category: "accessories",
    brand: null,
    price: 219,
    compare_price: 279,
    stock: 28,
    rating: 4.5,
    reviews: 112,
    image: U("photo-1580480055273-228ff5388ef8"),
  },
  {
    name: "Dual Monitor Desk Mount Arm",
    slug: "dual-monitor-arm",
    category: "accessories",
    brand: null,
    price: 59,
    compare_price: 79,
    stock: 75,
    rating: 4.5,
    reviews: 64,
    image: U("photo-1547119957-637f8679db1e"),
  },
  {
    name: "RGB Large Gaming Mouse Pad XXL",
    slug: "rgb-gaming-mousepad-xxl",
    category: "accessories",
    brand: null,
    price: 29,
    stock: 150,
    rating: 4.3,
    reviews: 203,
    image: U("photo-1616588589676-62b3bd4ff6d2"),
  },

  // --- Aksesorë të tjerë ---
  {
    name: "Anker 7-in-1 USB-C Hub Adapter",
    slug: "anker-7in1-usbc-hub",
    category: "chargers-cables",
    brand: "anker",
    price: 45,
    compare_price: 59,
    stock: 110,
    rating: 4.6,
    reviews: 178,
    image: U("photo-1498049794561-7780e7231661"),
  },
  {
    name: "Bose SoundLink Flex Portable Speaker",
    slug: "bose-soundlink-flex",
    category: "speakers",
    brand: "bose",
    price: 129,
    compare_price: 149,
    stock: 40,
    rating: 4.7,
    reviews: 96,
  },
];

(async () => {
  try {
    // Merr kategoritë dhe brandet nga DB (slug -> id)
    const cats = await prisma.category.findMany({
      select: { id: true, slug: true },
    });
    const brands = await prisma.brand.findMany({
      select: { id: true, slug: true },
    });
    const categoryMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
    const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b.id]));

    let added = 0,
      skipped = 0;

    for (const p of PRODUCTS) {
      const cat_id = categoryMap[p.category];
      if (!cat_id) {
        console.warn(
          `⚠️  Kategoria '${p.category}' s'u gjet — kapërcej ${p.name}`,
        );
        continue;
      }

      const exists = await prisma.product.findUnique({
        where: { slug: p.slug },
      });
      if (exists) {
        skipped++;
        continue;
      }

      const created = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: `High-quality ${p.name}. Premium features, fast shipping, 2-year warranty.`,
          short_description: p.name,
          price: p.price,
          compare_price: p.compare_price || null,
          stock_qty: p.stock,
          sku: `SKU-${p.slug.toUpperCase().slice(0, 24)}`,
          is_featured: p.is_featured || false,
          avg_rating: p.rating || 0,
          review_count: p.reviews || 0,
          category_id: cat_id,
          brand_id: p.brand ? brandMap[p.brand] || null : null,
          created_by: 1,
        },
      });

      await prisma.productImage.create({
        data: {
          product_id: created.id,
          image_url: p.image || imageForProduct(p.name),
          sort_order: 0,
          is_primary: true,
        },
      });

      added++;
      console.log(`✅ ${p.name}`);
    }

    console.log(
      `\n🎉 U shtuan ${added} produkte (${skipped} ekzistonin tashmë).`,
    );
  } catch (err) {
    console.error("❌ Gabim:", err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
