// Mapon emrin e produktit -> URL reale fotoje.
// Perdoret nga seeders/index.js (seed i ri) dhe seeders/update-product-images.js (perditeso ekzistueset).
const U = (id) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

function imageForProduct(name = "") {
  const n = String(name).toLowerCase();

  // --- Gaming ---
  if (n.includes("playstation") || n.includes("ps5"))
    return U("photo-1606813907291-d86efa9b94db");
  if (n.includes("xbox")) return U("photo-1621259182978-fbf93132d53d");
  if (n.includes("nintendo") || n.includes("switch"))
    return U("photo-1592155931584-901ac15763e3");

  // --- Drone (perpara "camera") ---
  if (n.includes("drone") || n.includes("quadcopter") || n.includes("uav"))
    return "https://loremflickr.com/600/600/drone,quadcopter?lock=7";

  // --- Cameras ---
  if (
    n.includes("camera") ||
    n.includes("alpha") ||
    n.includes("mirrorless") ||
    n.includes("dslr") ||
    n.includes("eos")
  )
    return U("photo-1502920917128-1aa500764cbd");

  // --- Earbuds (perpara "headphones") ---
  if (n.includes("earbud") || n.includes("airpod") || n.includes("buds"))
    return U("photo-1606220945770-b5b6c2c55bf1");

  // --- Headphones ---
  if (
    n.includes("headphone") ||
    n.includes("quietcomfort") ||
    n.includes("wh-") ||
    n.includes("over-ear")
  )
    return U("photo-1505740420928-5e560c06d30e");

  // --- Speakers ---
  if (n.includes("speaker") || n.includes("jbl") || n.includes("soundbar"))
    return U("photo-1608043152269-423dbba4e7e1");

  // --- iPad / tablets ---
  if (n.includes("ipad") || n.includes("tablet"))
    return U("photo-1561154464-82e9adf32764");

  // --- Monitors ---
  if (n.includes("monitor") || n.includes("display"))
    return U("photo-1593305841991-05c297ba4575");

  // --- TV / streaming ---
  if (
    n.includes("tv stick") ||
    n.includes(" tv") ||
    n.includes("television") ||
    n.includes("qled") ||
    n.includes("oled")
  )
    return U("photo-1461151304267-38535e780c79");

  // --- Mouse ---
  if (n.includes("mouse")) return U("photo-1527864550417-7fd91fc51a46");

  // --- Keyboard ---
  if (n.includes("keyboard")) return U("photo-1587829741301-dc798b83add3");

  // --- MacBook / laptops ---
  if (n.includes("macbook")) return U("photo-1517336714731-489689fd1ca8");
  if (n.includes("laptop") || n.includes("thinkpad") || n.includes("notebook"))
    return U("photo-1496181133206-80ce9b88a853");

  // --- Watches ---
  if (n.includes("apple watch")) return U("photo-1546868871-7041f2a55e12");
  if (n.includes("watch")) return U("photo-1523275335684-37898b6baf30");

  // --- Smartphones ---
  if (n.includes("galaxy") || (n.includes("samsung") && !n.includes("tv")))
    return U("photo-1610945265064-0e34e5519bbf");
  if (n.includes("iphone")) return U("photo-1591337676887-a217a6970a8a");
  if (
    n.includes("smartphone") ||
    n.includes("5g") ||
    n.includes("pixel") ||
    n.includes("vivo") ||
    n.includes("phone")
  )
    return U("photo-1591337676887-a217a6970a8a");

  // --- Default (tech gjenerik) ---
  return U("photo-1498049794561-7780e7231661");
}

module.exports = { imageForProduct };
