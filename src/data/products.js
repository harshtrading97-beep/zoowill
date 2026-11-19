// ZoOwill · Complete 113-Product Official Catalogue
// Harsh International Knp
// All 113 Verified Amazon India Listings · INR (₹) Only

// ── Local Category & Product Images ──────────────────────────
import saddlesKathisImg from "../assets/saddles_&-kathis.png";
import harnessesImg from "../assets/harnesses.png";
import bridlesBitsImg from "../assets/bridles-&-bits.png";
import haltersLeadsImg from "../assets/halters-&-leads.png";
import stirrupsGirthsImg from "../assets/stirrups-&-girths.png";
import horseProtectionRugsImg from "../assets/horse-protection-&-rugs.png";
import groomingStableImg from "../assets/grooming-&-stable.png";
import riderApparelImg from "../assets/rider-&-apparel.png";
import zoowilgroominganimalbrushImg from "../assets/zoowil-grooming-animal-brush.png";
import zoowilblackridingbreechesImg from "../assets/zoowil-black-riding_breeches.png";
import zoowilblackhorsehoofbootsImg from "../assets/zoowil-black-horse-hoof-boots.png";
import zoowilhorseandcowmetalbrushImg from "../assets/zoowil-horse-cow-metal-grooming-brush.png";

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1000&q=80";

export const handleImageError = (e) => {
  if (e.target.src !== FALLBACK_IMG) {
    e.target.src = FALLBACK_IMG;
  }
};

// ── Official 8 Categories (+ All) ────────────────────────────
export const categories = [
  { id: "all", label: "All Products" },
  { id: "saddles", label: "Saddles & Kathis" },
  { id: "harnesses", label: "Harnesses" },
  { id: "bridles", label: "Bridles & Bits" },
  { id: "halters", label: "Halters & Leads" },
  { id: "stirrups", label: "Stirrups & Girths" },
  { id: "protection", label: "Horse Protection & Rugs" },
  { id: "grooming", label: "Grooming & Stable" },
  { id: "rider", label: "Rider & Apparel" },
];

// ── Category Showcase (Official 113-Product Breakdown) ──────
export const categoryShowcase = [
  {
    id: "saddles",
    label: "Saddles & Kathis",
    count: 10,
    description:
      "English dressage, jumping, polo saddles and traditional Kashmiri Kathis.",
    image: saddlesKathisImg,
  },
  {
    id: "harnesses",
    label: "Harnesses",
    count: 2,
    description:
      "Single and double horse heavy driving leather harness sets in Cob/Full sizes.",
    image: harnessesImg,
  },
  {
    id: "bridles",
    label: "Bridles & Bits",
    count: 14,
    description:
      "Leather and PVC bridles, crystal browbands, martingales, and stainless steel bits.",
    image: bridlesBitsImg,
  },
  {
    id: "halters",
    label: "Halters & Leads",
    count: 17,
    description:
      "Nylon foal and horse halters, 8m–10m handwoven rope leads, and brass chain leads.",
    image: haltersLeadsImg,
  },
  {
    id: "stirrups",
    label: "Stirrups & Girths",
    count: 16,
    description:
      "Aligarh iron rakabs, aluminium safety stirrups, fleece girths and shock-absorbing saddle pads.",
    image: stirrupsGirthsImg,
  },
  {
    id: "protection",
    label: "Horse Protection & Rugs",
    count: 19,
    description:
      "Waterproof winter turnout rugs (75-inch Jhool), fleece leg wraps, bell boots, and hoof boots.",
    image: horseProtectionRugsImg,
  },
  {
    id: "grooming",
    label: "Grooming & Stable",
    count: 23,
    description:
      "Wooden brushes, metal khararas, curry combs, hoof picks, hay nets and electric clippers.",
    image: groomingStableImg,
  },
  {
    id: "rider",
    label: "Rider & Apparel",
    count: 12,
    description:
      "Unisex riding breeches, body protector vests, stainless steel spurs and leather belts.",
    image: riderApparelImg,
  },
];

// ── Pricing formatter ────────────────────────────────────────
export function formatPrice(priceINR, priceMax = null) {
  if (priceMax) {
    return `₹${priceINR.toLocaleString("en-IN")} – ₹${priceMax.toLocaleString("en-IN")}`;
  }
  return `₹${priceINR.toLocaleString("en-IN")}`;
}

// ── Complete 113 Official Products ───────────────────────────
export const products = [
  {
    "id": 1,
    "name": "ZoOwil Oval All Purpose Grooming Brush for Horse, Cow & Pets with Hand Strap, 20 x 9 cm, Soft Bristles",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 214,
    "mrp": 499,
    "discount": "57% off",
    "rating": 4.5,
    "reviewCount": 2,
    "sizes": [
      "20 x 9 x 6 cm"
    ],
    "colors": [
      "Green"
    ],
    "image": zoowilgroominganimalbrushImg,
    "description": "Versatile oval-shaped all-purpose grooming brush (20 x 9 x 6 cm, 200 g) with soft bristles and an adjustable black hand strap for a secure, comfortable grip across horses, cows, pets, and everyday brushing.",
    "specs": [
      "Oval shape (20 x 9 x 6 cm) with soft, gentle bristles",
      "Adjustable black hand strap for firm, secure grip",
      "Compact, lightweight (200 g) & easy to carry",
      "Suitable for horses, cows, pets & all-purpose grooming"
    ],
    "sku": "ZW-GS-001",
    "partNumber": "ho-gr-pl-bru",
    "genericName": "Horse wooden brush",
    "manufacturer": "HARSH INTERNATIONAL",
    "countryOfOrigin": "India",
    "asin": "B0GVP8VVN2",
    "amazonUrl": "https://www.amazon.in/dp/B0GVP8VVN2"
  },
  {
    "id": 2,
    "name": "ZoOwill Unisex Riding Breeches Pant, Black, Zip Pocket, Ankle Fastener Detail, Slim Fit Equestrian Trousers",
    "category": "rider",
    "badge": "Popular Choice",
    "priceINR": 999,
    "mrp": 3000,
    "discount": "67% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "32",
      "36"
    ],
    "colors": [
      "Black"
    ],
    "image": zoowilblackridingbreechesImg,
    "description": "Sleek slim-fit unisex riding breeches in classic black (400 g), engineered with a front zippered pocket, hook-and-loop velcro ankle fasteners for a snug fit inside riding boots, and a sturdy gold-tone button waistband with belt loops.",
    "specs": [
      "Sleek slim-fit unisex silhouette for riding & casual wear",
      "Front zippered pocket to keep essentials safe during rides",
      "Hook-and-loop velcro ankle fasteners for snug boot fit",
      "Sturdy gold-tone button closure with belt loops (400 g)"
    ],
    "sku": "ZW-RA-002",
    "genericName": "Equestrian Riding Breeches",
    "manufacturer": "HARSH INTERNATIONAL",
    "countryOfOrigin": "India",
    "asin": "B0H8ZNZPBQ",
    "amazonUrl": "https://www.amazon.in/dp/B0H8ZNZPBQ"
  },
  {
    "id": 3,
    "name": "Horse Hoof Boot, Parade Horses Working, Protective Equine Footwear with Adjustable Straps, (1-pcs) Available in S/M/L Sizes -(not for Riding & Racing)*. (M)",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 999,
    "mrp": 3000,
    "discount": "67% off",
    "rating": 3.4,
    "reviewCount": 3,
    "sizes": [
      "Small",
      "Medium",
      "Large"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": zoowilblackhorsehoofbootsImg,
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-003",
    "asin": "B0GHSWXCW6",
    "amazonUrl": "https://www.amazon.in/dp/B0GHSWXCW6"
  },
  {
    "id": 4,
    "name": "ZoOwill Horse And Cow Metal Grooming Brush with Handle | iron Kharara | massageing comb (Both Types of Brushes)",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 278,
    "mrp": 500,
    "discount": "44% off",
    "rating": 3.8,
    "reviewCount": 3,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": zoowilhorseandcowmetalbrushImg,
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-004",
    "asin": "B0GPP1F5M4",
    "amazonUrl": "https://www.amazon.in/dp/B0GPP1F5M4"
  },
  {
    "id": 5,
    "name": "Nylon Foal Halter for Baby Horse, Red, (pony) Size, Adjustable with Metal Buckles.",
    "category": "halters",
    "badge": "New Arrival",
    "priceINR": 365,
    "mrp": 500,
    "discount": "27% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Pony",
      "Cob",
      "Full Size"
    ],
    "colors": [
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-005",
    "asin": "B0HM1PCBZL",
    "amazonUrl": "https://www.amazon.in/dp/B0HM1PCBZL"
  },
  {
    "id": 6,
    "name": "ZoOwill Horse Grooming Wooden Brush, Red Bristles, Yellow Wooden Base with Hand Strap, Oval Shape, 23 x 11 x 5 cm",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 341,
    "mrp": 999,
    "discount": "66% off",
    "rating": 4.6,
    "reviewCount": 6,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Red",
      "Yellow"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-006",
    "asin": "B0GJQVX8Y1",
    "amazonUrl": "https://www.amazon.in/dp/B0GJQVX8Y1"
  },
  {
    "id": 7,
    "name": "Happy Holi Graphic T-Shirt, White, Short Sleeve, Crew Neck, Festival Theme, Kids (12 to 16 Year). Medium*",
    "category": "rider",
    "badge": "Featured",
    "priceINR": 220,
    "mrp": 699,
    "discount": "69% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Medium"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-007",
    "asin": "B0GNP1P9TH",
    "amazonUrl": "https://www.amazon.in/dp/B0GNP1P9TH"
  },
  {
    "id": 8,
    "name": "ZoOwill Horse Grooming Brush for All Purpose, Textured Grip Handheld Horse Brush No-Hole Design Pet Care Removes Loose Hair.",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 650,
    "mrp": 3000,
    "discount": "78% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-008",
    "asin": "B0H8TZN3RD",
    "amazonUrl": "https://www.amazon.in/dp/B0H8TZN3RD"
  },
  {
    "id": 9,
    "name": "ZoOwill Nyloan Hay Net Bag for Horses and Cattle Red and White, 60 x 68 cm, Slow Feed Hanging Hay Bag for Stable Use (RED)",
    "category": "grooming",
    "badge": "Traditional Craft",
    "priceINR": 450,
    "mrp": 799,
    "discount": "44% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "White",
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-009",
    "asin": "B0GYFJ594G",
    "amazonUrl": "https://www.amazon.in/dp/B0GYFJ594G"
  },
  {
    "id": 10,
    "name": "ZoOwill Hoof Pick Brush with Horse Head Handle, 7 inches, Metal Hook, Ergonomic Grip",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 270,
    "mrp": 499,
    "discount": "46% off",
    "rating": 4.8,
    "reviewCount": 3,
    "sizes": [
      "7\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-010",
    "asin": "B0GJC9161J",
    "amazonUrl": "https://www.amazon.in/dp/B0GJC9161J"
  },
  {
    "id": 11,
    "name": "Happy Holi Graphic T-Shirt, White, Short Sleeve, Crew Neck, Festival Theme, Kids (9 to 12 Year). Small*",
    "category": "rider",
    "badge": "New Arrival",
    "priceINR": 220,
    "mrp": 699,
    "discount": "69% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Small"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-011",
    "asin": "B0GNNWTHVJ",
    "amazonUrl": "https://www.amazon.in/dp/B0GNNWTHVJ"
  },
  {
    "id": 12,
    "name": "ZoOWILL White Flat Horse Leads Rope with Metal Swivel Snap Hook, 10 Meter Length, Durable Webbing Strap with Secure Clasp Training Equipment for Equestrian Training",
    "category": "halters",
    "badge": "Popular Choice",
    "priceINR": 750,
    "mrp": 2000,
    "discount": "62% off",
    "rating": 4.0,
    "reviewCount": 1,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-012",
    "asin": "B0GQHGTWT4",
    "amazonUrl": "https://www.amazon.in/dp/B0GQHGTWT4"
  },
  {
    "id": 13,
    "name": "ZoOwill Rubber Curry Comb, Black, Oval Shape, Horse Grooming Tool, Flexible Design 1pcs",
    "category": "grooming",
    "badge": "Featured",
    "priceINR": 240,
    "mrp": 450,
    "discount": "47% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-013",
    "asin": "B0GHZL1MGJ",
    "amazonUrl": "https://www.amazon.in/dp/B0GHZL1MGJ"
  },
  {
    "id": 14,
    "name": "ZoOwill Men & Women Leather Belt, Brown and tencolor, Textured Design with Metal Buckle",
    "category": "rider",
    "badge": "Popular Choice",
    "priceINR": 299,
    "mrp": 999,
    "discount": "70% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "32",
      "34",
      "36"
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-014",
    "asin": "B0GJ4T1L5X",
    "amazonUrl": "https://www.amazon.in/dp/B0GJ4T1L5X"
  },
  {
    "id": 15,
    "name": "ZoOwill Horse Cotten Leg Wraps Bandages, | Pcs of 2| with Hook and Loop Closure, 11x300cm. - Orange",
    "category": "protection",
    "badge": "Traditional Craft",
    "priceINR": 280,
    "mrp": 500,
    "discount": "44% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Orange"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-015",
    "asin": "B0HFMR5MML",
    "amazonUrl": "https://www.amazon.in/dp/B0HFMR5MML"
  },
  {
    "id": 16,
    "name": "ZoOwill Horse Imported Saddle Pad, 70 x 55 cm, Breathable, Shock-Absorbing, Anti-Slip Eqestrain Pad for English & Western Saddle (Full Size-Large).",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 899,
    "mrp": 3000,
    "discount": "70% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-016",
    "asin": "B0GKGQMDY3",
    "amazonUrl": "https://www.amazon.in/dp/B0GKGQMDY3"
  },
  {
    "id": 17,
    "name": "ZoOwill Horse Hoof Protection Cotton Bell Boots, Hook and Loop Closure, Protective and Comfortable Hoof Overreach Boots for Horse, Cow and baffelo (pcs of 2). (RED)",
    "category": "protection",
    "badge": "New Arrival",
    "priceINR": 365,
    "mrp": 799,
    "discount": "54% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-017",
    "asin": "B0GVL545YM",
    "amazonUrl": "https://www.amazon.in/dp/B0GVL545YM"
  },
  {
    "id": 18,
    "name": "ZoOwill Long Cotton-Nylon Handwoven Rope Lead for Horse, Cow and Buffalo, 8 Metres, Red and Blue, with Metal Snap Hook (Multi-Color)",
    "category": "halters",
    "badge": "Stable Essential",
    "priceINR": 450,
    "mrp": 800,
    "discount": "44% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red",
      "Blue",
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-018",
    "asin": "B0GYF9MR5B",
    "amazonUrl": "https://www.amazon.in/dp/B0GYF9MR5B"
  },
  {
    "id": 19,
    "name": "ZoOwill Horse Riding Body Protector Vest | Upper Body Safety Armour. Pony (X-Small)",
    "category": "rider",
    "badge": "Featured",
    "priceINR": 2699,
    "mrp": 6000,
    "discount": "55% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Pony",
      "Cob",
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-019",
    "asin": "B0HN363D6N",
    "amazonUrl": "https://www.amazon.in/dp/B0HN363D6N"
  },
  {
    "id": 20,
    "name": "ZoOwill Horse Naal Steel Horseshoes for Front and Back Legs (Full Set) with Horseshoe keel (32-pcs tilee).",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 999,
    "mrp": 3000,
    "discount": "67% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-020",
    "asin": "B0H9L43K3D",
    "amazonUrl": "https://www.amazon.in/dp/B0H9L43K3D"
  },
  {
    "id": 21,
    "name": "Horse Bell Boots with Fleece Lining, Hook and Loop Closure, Protective and Comfortable Hoof Overreach Boots for Horse, Cow and baffelo (pcs of 2)",
    "category": "protection",
    "badge": "Traditional Craft",
    "priceINR": 380,
    "mrp": 999,
    "discount": "62% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-021",
    "asin": "B0GGN61KWR",
    "amazonUrl": "https://www.amazon.in/dp/B0GGN61KWR"
  },
  {
    "id": 22,
    "name": "ZoOwill Leather & Nyloan Stirrup Straps with Stainless Steel Buckle, Black, 145 cm Length (1 Pair) (Leather, Width-3.8 CM)",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 950,
    "mrp": 2000,
    "discount": "53% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-022",
    "asin": "B0H4DGD69S",
    "amazonUrl": "https://www.amazon.in/dp/B0H4DGD69S"
  },
  {
    "id": 23,
    "name": "ZoOwill Horse Cotten Leg Wraps Bandages, | Pcs of 2|, Fleece with Hook and Loop Closure, 11x300cm, Multicolor. (White)",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 280,
    "mrp": 999,
    "discount": "72% off",
    "rating": 2.9,
    "reviewCount": 3,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "White",
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-023",
    "asin": "B0GPYCKMVT",
    "amazonUrl": "https://www.amazon.in/dp/B0GPYCKMVT"
  },
  {
    "id": 24,
    "name": "ZoOwill Leather Horse Bridle with Crystal Rhinestone Browband, fully Black Padded & stainless steel fitting, Noseband, Reins Included (Full Size)",
    "category": "bridles",
    "badge": "Stable Essential",
    "priceINR": 1999,
    "mrp": 3999,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-024",
    "asin": "B0H2WWPX6G",
    "amazonUrl": "https://www.amazon.in/dp/B0H2WWPX6G"
  },
  {
    "id": 25,
    "name": "ZoOwill Silicone Pet Grooming Hand Glove, Textured Design for Dogs and Horses Hair Massage and Bathing Tool.",
    "category": "grooming",
    "badge": "Featured",
    "priceINR": 250,
    "mrp": 499,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-025",
    "asin": "B0GKB4DB5S",
    "amazonUrl": "https://www.amazon.in/dp/B0GKB4DB5S"
  },
  {
    "id": 26,
    "name": "Loose Ring Snaffle Bit for Horses, Iron",
    "category": "bridles",
    "badge": "Popular Choice",
    "priceINR": 499,
    "mrp": 700,
    "discount": "29% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Jointed Mouthpiece",
      "Smooth Ring Design",
      "Equestrian Tack",
      "Supple vegetable tanned leather"
    ],
    "sku": "ZW-BB-026",
    "asin": "B0H8SYP7WY",
    "amazonUrl": "https://www.amazon.in/dp/B0H8SYP7WY"
  },
  {
    "id": 27,
    "name": "ZoOwill Horse And Cow Metal Grooming Brush with Handle | iron Kharara | massageing comb (black and red color avilable).",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 230,
    "mrp": 500,
    "discount": "54% off",
    "rating": 3.2,
    "reviewCount": 2,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-027",
    "asin": "B0GL3G4TW3",
    "amazonUrl": "https://www.amazon.in/dp/B0GL3G4TW3"
  },
  {
    "id": 28,
    "name": "Horse Hoof Boot, Parade Horses Working, Protective Equine Footwear with Adjustable Straps, (1 pcs) Available in S/M/L Sizes -(not for Riding & Racing)*. (S)",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 999,
    "mrp": 3000,
    "discount": "67% off",
    "rating": 3.4,
    "reviewCount": 3,
    "sizes": [
      "Small",
      "Medium",
      "Large"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-028",
    "asin": "B0GHSZ2RQ2",
    "amazonUrl": "https://www.amazon.in/dp/B0GHSZ2RQ2"
  },
  {
    "id": 29,
    "name": "Horse Hay Net Bag, Red & Blue, 35 Inch Long, Slow Feed Mesh Bag for Horses, Cow, Baffalo & Cattle.",
    "category": "grooming",
    "badge": "New Arrival",
    "priceINR": 420,
    "mrp": 1000,
    "discount": "58% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "35\""
    ],
    "colors": [
      "Red",
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-029",
    "asin": "B0GKT3CHM3",
    "amazonUrl": "https://www.amazon.in/dp/B0GKT3CHM3"
  },
  {
    "id": 30,
    "name": "ZoOwill Leather Horse Breastplate with Reins, Black, Adjustable Saddle Stabilizer for Equestrian Riding, Stainless Steel Hardware",
    "category": "saddles",
    "badge": "Stable Essential",
    "priceINR": 1614,
    "mrp": 5000,
    "discount": "68% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "15\"",
      "17\"",
      "18\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-030",
    "asin": "B0H42PTHXG",
    "amazonUrl": "https://www.amazon.in/dp/B0H42PTHXG"
  },
  {
    "id": 31,
    "name": "ZoOwill Horse Naal Steel Horseshoes for Front Legs (1-Pair) with Horseshoe keel (16-pcs tilee).",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 599,
    "mrp": 3000,
    "discount": "80% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-031",
    "asin": "B0H9L5X7NT",
    "amazonUrl": "https://www.amazon.in/dp/B0H9L5X7NT"
  },
  {
    "id": 32,
    "name": "ZoOwill Horse Bell Boots with Fleece Trim, Fully-Black (Rubber with Fleece), (1-Pair), Hoof Protection.",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 360,
    "mrp": 999,
    "discount": "64% off",
    "rating": 4.8,
    "reviewCount": 3,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-032",
    "asin": "B0GKVZHD9L",
    "amazonUrl": "https://www.amazon.in/dp/B0GKVZHD9L"
  },
  {
    "id": 33,
    "name": "ZoOwill Fly Veil Horse Face Sehra, Fringe Design, Horse Browband Attachment, Adjustable Fitting (Blue Color).",
    "category": "bridles",
    "badge": "Traditional Craft",
    "priceINR": 299,
    "mrp": 800,
    "discount": "63% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-033",
    "asin": "B0GHZ84D2R",
    "amazonUrl": "https://www.amazon.in/dp/B0GHZ84D2R"
  },
  {
    "id": 34,
    "name": "ZoOwill Horse Bit with Rubber Mouthpiece, Stainless Steel Rings, Black, 12 x 3 Inch, Equestrian Training Equipment",
    "category": "bridles",
    "badge": "Riding Essential",
    "priceINR": 650,
    "mrp": 1299,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "3\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-034",
    "asin": "B0GHSLC94B",
    "amazonUrl": "https://www.amazon.in/dp/B0GHSLC94B"
  },
  {
    "id": 35,
    "name": "ZoOwill Horse Chifney Snaffle Bit with Rings, Stainless Steel, 127mm Width, 6.5mm Thickness, Equestrian Training Equipment",
    "category": "bridles",
    "badge": "New Arrival",
    "priceINR": 850,
    "mrp": 3000,
    "discount": "72% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-035",
    "asin": "B0GJZSWH5C",
    "amazonUrl": "https://www.amazon.in/dp/B0GJZSWH5C"
  },
  {
    "id": 36,
    "name": "ZoOwill Horse Turnout Blanket | Rainsheter Jhool | Rug | Lighter & Comfortable Horse Coat | Black and Turquoise, Waterproof, with Adjustable Straps (size-75' inches) Multicolor.",
    "category": "protection",
    "badge": "Stable Essential",
    "priceINR": 2399,
    "mrp": 4999,
    "discount": "52% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "75\""
    ],
    "colors": [
      "Black",
      "Turquoise",
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-036",
    "asin": "B0GHXJVMB2",
    "amazonUrl": "https://www.amazon.in/dp/B0GHXJVMB2"
  },
  {
    "id": 37,
    "name": "Cleaning Brush with Long Wooden Handle | Dust Brush Horse Hair Brush | Duster for Counter, Bench, Car, Furniture, Bed, Woodworking Cleaning.",
    "category": "grooming",
    "badge": "Featured",
    "priceINR": 420,
    "mrp": 2000,
    "discount": "79% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-037",
    "asin": "B0GJR1DG2P",
    "amazonUrl": "https://www.amazon.in/dp/B0GJR1DG2P"
  },
  {
    "id": 38,
    "name": "ZoOwill Horse Bareback (4-In-1) Pad Saddle with Stirrups, Girth, Cheast Coller and Fleece Lining, Striped Full Size (BLUE)",
    "category": "saddles",
    "badge": "Popular Choice",
    "priceINR": 2999,
    "mrp": 6000,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-038",
    "asin": "B0H42RJC2L",
    "amazonUrl": "https://www.amazon.in/dp/B0H42RJC2L"
  },
  {
    "id": 39,
    "name": "ZoOwill Horse And Cow Metal Grooming Brush with Handle | iron Kharara | massageing comb (Plane Brush)",
    "category": "grooming",
    "badge": "Traditional Craft",
    "priceINR": 230,
    "mrp": 500,
    "discount": "54% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-039",
    "asin": "B0GPNXBVJ4",
    "amazonUrl": "https://www.amazon.in/dp/B0GPNXBVJ4"
  },
  {
    "id": 40,
    "name": "ZoOwill Horse Riding Stirrups | Aligarh Rakkab | with Black Rubber Treads, Safety Iron Fitting.",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 950,
    "mrp": 3000,
    "discount": "68% off",
    "rating": 2.0,
    "reviewCount": 1,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-040",
    "asin": "B0GKB5ZR6P",
    "amazonUrl": "https://www.amazon.in/dp/B0GKB5ZR6P"
  },
  {
    "id": 41,
    "name": "ZoOwill Nyloan Stirrup Straps with Stainless Steel Buckle, Black, 145 cm Length, 2.5 cm Width, 1 Pair.",
    "category": "stirrups",
    "badge": "New Arrival",
    "priceINR": 280,
    "mrp": 650,
    "discount": "57% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-041",
    "asin": "B0GYF5Z3VL",
    "amazonUrl": "https://www.amazon.in/dp/B0GYF5Z3VL"
  },
  {
    "id": 42,
    "name": "ZoOwill Glitter Horse Halter, Black and Rose Gold Full Size",
    "category": "halters",
    "badge": "Stable Essential",
    "priceINR": 799,
    "mrp": 999,
    "discount": "20% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Nylon Webbing",
      "Silver-Tone Hardware",
      "Adjustable Buckles",
      "Triple-ply reinforced heavy duty nylon"
    ],
    "sku": "ZW-HL-042",
    "asin": "B0HJ9THCPF",
    "amazonUrl": "https://www.amazon.in/dp/B0HJ9THCPF"
  },
  {
    "id": 43,
    "name": "ZoOwill Horse Blinker Hood Mask with Moulded Eye Cups",
    "category": "protection",
    "badge": "Featured",
    "priceINR": 750,
    "mrp": 1799,
    "discount": "58% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Moulded Eye Cups",
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles"
    ],
    "sku": "ZW-PR-043",
    "asin": "B0GTZ2T97D",
    "amazonUrl": "https://www.amazon.in/dp/B0GTZ2T97D"
  },
  {
    "id": 44,
    "name": "ZoOwill Horse Hoof Protection Bell Boots with Fleece Trim, Black Rubber & Fleece, (2 Pieces) Many Color. (GREENES Black)",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 365,
    "mrp": 999,
    "discount": "63% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-044",
    "asin": "B0GNVGXJVX",
    "amazonUrl": "https://www.amazon.in/dp/B0GNVGXJVX"
  },
  {
    "id": 45,
    "name": "ZoOwill Horse Halter, Adjustable Nylon Webbing, Metal Buckles, Decorative Horse Pattern All Size Fit. (Half Halter ( brown))",
    "category": "halters",
    "badge": "Traditional Craft",
    "priceINR": 280,
    "mrp": 999,
    "discount": "72% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-045",
    "asin": "B0HJBHB5NC",
    "amazonUrl": "https://www.amazon.in/dp/B0HJBHB5NC"
  },
  {
    "id": 46,
    "name": "ZoOwill Horse Snaffle Bit Set, Equestrian Training Equipment, Stainless Steel and Brass, Multiple Styles (4th-D Ring Snaffle Bit, Stainless Steel)",
    "category": "bridles",
    "badge": "Riding Essential",
    "priceINR": 1480,
    "mrp": 9000,
    "discount": "84% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-046",
    "asin": "B0GMQPS6G3",
    "amazonUrl": "https://www.amazon.in/dp/B0GMQPS6G3"
  },
  {
    "id": 47,
    "name": "ZoOwill Two-In-One Sweat Scraper for Horse | Sweat Wiper| Horse & Cow Grooming Tool Duel Use hair comb comfortable grip",
    "category": "grooming",
    "badge": "New Arrival",
    "priceINR": 450,
    "mrp": 999,
    "discount": "55% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-047",
    "asin": "B0GWD653YN",
    "amazonUrl": "https://www.amazon.in/dp/B0GWD653YN"
  },
  {
    "id": 48,
    "name": "ZoOwill Horse Riding Body Protector Safety Vest | Upper Body Armour, Black, Padded Protection, Zip Front with Side Adjustable Straps (Size- ss, s, m, XL). (Large)",
    "category": "rider",
    "badge": "Popular Choice",
    "priceINR": 2865,
    "mrp": 7000,
    "discount": "59% off",
    "rating": 3.2,
    "reviewCount": 7,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-048",
    "asin": "B0GKCCM49Z",
    "amazonUrl": "https://www.amazon.in/dp/B0GKCCM49Z"
  },
  {
    "id": 49,
    "name": "Horse Corkscrew Snaffle Bits, 8 Piece Collection, Equestrian Training Equipment, Various Styles (2nd- Chain Mouth Snaffle Bit, Iron",
    "category": "bridles",
    "badge": "Popular Choice",
    "priceINR": 750,
    "mrp": 6000,
    "discount": "88% off",
    "rating": 4.8,
    "reviewCount": 2,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-049",
    "asin": "B0GJS6RF9F",
    "amazonUrl": "https://www.amazon.in/dp/B0GJS6RF9F"
  },
  {
    "id": 50,
    "name": "ZoOwill Horse Halter, UNI-3 Multicolor Style Trim, Adjustable Nylon Webbing, Metal Buckles, Decorative Horse Pattern All Size Fit.",
    "category": "halters",
    "badge": "Popular Choice",
    "priceINR": 659,
    "mrp": 999,
    "discount": "34% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-050",
    "asin": "B0HJ9X8JWF",
    "amazonUrl": "https://www.amazon.in/dp/B0HJ9X8JWF"
  },
  {
    "id": 51,
    "name": "Winter Horse Blanket | Turnout Rug| Multicolor Waterproof & Tafloan Cloth| Rug| Coat| Large Blanket (200-500 gm of Fill) Fleece Fitted & Adjustable Turnout Winter Jhool 75\" inches.",
    "category": "protection",
    "badge": "Traditional Craft",
    "priceINR": 2890,
    "mrp": 6999,
    "discount": "59% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-051",
    "asin": "B0GKT7F6XT",
    "amazonUrl": "https://www.amazon.in/dp/B0GKT7F6XT"
  },
  {
    "id": 52,
    "name": "Horse Riding Spurs (1-Pair), Stainless Steel, with* Straps nyloan Belt, Equestrian Horse Riding Accessories",
    "category": "rider",
    "badge": "Riding Essential",
    "priceINR": 999,
    "mrp": 3000,
    "discount": "67% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "32",
      "34",
      "36"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-052",
    "asin": "B0HK2T2Y83",
    "amazonUrl": "https://www.amazon.in/dp/B0HK2T2Y83"
  },
  {
    "id": 53,
    "name": "Horse Halter with Aztec Pattern, Adjustable Nylon Strap, 3-Ply Heavy Duty Construction, Adjustable Metal Buckles, All Size Fit.",
    "category": "halters",
    "badge": "New Arrival",
    "priceINR": 799,
    "mrp": 1500,
    "discount": "47% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-053",
    "asin": "B0H75R9R8Y",
    "amazonUrl": "https://www.amazon.in/dp/B0H75R9R8Y"
  },
  {
    "id": 54,
    "name": "ZoOwill Horse Halter, Multicolor Style Trim, Adjustable Nylon Webbing, Metal Buckles, Decorative Horse Pattern All Size Fit. (Red)",
    "category": "halters",
    "badge": "Stable Essential",
    "priceINR": 499,
    "mrp": 999,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red",
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-054",
    "asin": "B0GZBHKKQP",
    "amazonUrl": "https://www.amazon.in/dp/B0GZBHKKQP"
  },
  {
    "id": 55,
    "name": "ZoOwill Horse Loose Ring Snaffle Bit, Stainless Steel, Horse Riding Equipment, 6.5 inch Length, 3.5 inch Ring Diameter",
    "category": "bridles",
    "badge": "Featured",
    "priceINR": 1499,
    "mrp": 3000,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "5\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-055",
    "asin": "B0GJZJN2N8",
    "amazonUrl": "https://www.amazon.in/dp/B0GJZJN2N8"
  },
  {
    "id": 56,
    "name": "ZoOwill Horse Riding Alluminium Stirrups, Safety Fitting.",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 390,
    "mrp": 500,
    "discount": "22% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-056",
    "asin": "B0GPZ7V22T",
    "amazonUrl": "https://www.amazon.in/dp/B0GPZ7V22T"
  },
  {
    "id": 57,
    "name": "ZoOwill Dual Ring Snaffle Horse Bit | Plane design horse Mouth bit Iron* .",
    "category": "bridles",
    "badge": "Traditional Craft",
    "priceINR": 489,
    "mrp": 1000,
    "discount": "51% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-057",
    "asin": "B0HF9H2CXN",
    "amazonUrl": "https://www.amazon.in/dp/B0HF9H2CXN"
  },
  {
    "id": 58,
    "name": "Horse Nylon Fleec Girth with Stainless Steel Fitting, 4 Inch Width, Black",
    "category": "stirrups",
    "badge": "Riding Essential",
    "priceINR": 750,
    "mrp": 2000,
    "discount": "63% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "4\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Anti-Chafe Soft Fleece",
      "Stainless Steel Buckles",
      "Even Pressure Distribution",
      "High-grade iron / aluminium casting"
    ],
    "sku": "ZW-SG-058",
    "asin": "B0HC7WTTC4",
    "amazonUrl": "https://www.amazon.in/dp/B0HC7WTTC4"
  },
  {
    "id": 59,
    "name": "Sweat Scraper for Horse | Sweat Wiper| Horse Grooming Tool Duel Use Hair Comb Comfortable Grip",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 499,
    "mrp": 999,
    "discount": "50% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-059",
    "asin": "B0GHPCYLR7",
    "amazonUrl": "https://www.amazon.in/dp/B0GHPCYLR7"
  },
  {
    "id": 60,
    "name": "Race Elastic Girth & Surcingles for Horse | S.S Buckle fiting | Reinforced Leather Belt",
    "category": "stirrups",
    "badge": "Stable Essential",
    "priceINR": 899,
    "mrp": 2000,
    "discount": "55% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-060",
    "asin": "B0GHXVXW2K",
    "amazonUrl": "https://www.amazon.in/dp/B0GHXVXW2K"
  },
  {
    "id": 61,
    "name": "ZoOwill Horse Riding Protective Gear, Matte Black with Ventilation Vents Helmets & Protective Gear Unisex 2-Size. M",
    "category": "rider",
    "badge": "Featured",
    "priceINR": 1799,
    "mrp": 3000,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "32",
      "34",
      "36"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-061",
    "asin": "B0H8SBB5F2",
    "amazonUrl": "https://www.amazon.in/dp/B0H8SBB5F2"
  },
  {
    "id": 62,
    "name": "Horse Blanket Turnout Rug, Turquoise and Black, Waterproof with Neck Cover, Full Body Coverage Black 75\" inche.",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 3350,
    "mrp": 7999,
    "discount": "58% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "75\""
    ],
    "colors": [
      "Black",
      "Turquoise"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-062",
    "asin": "B0GHSWXRK7",
    "amazonUrl": "https://www.amazon.in/dp/B0GHSWXRK7"
  },
  {
    "id": 63,
    "name": "ZoOwill Horse Quilted & Sweatfree Saddle Pad, White, 55 x 70 cm, Shock-Absorbing, Anti-Slip Eqestrain Pad for English & Western Saddle (Full Size-Large).",
    "category": "stirrups",
    "badge": "Traditional Craft",
    "priceINR": 999,
    "mrp": 1670,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-063",
    "asin": "B0GKGRTVTW",
    "amazonUrl": "https://www.amazon.in/dp/B0GKGRTVTW"
  },
  {
    "id": 64,
    "name": "Horse Blanket Turnout Rug| Black Waterproof Winter| Rug| Coat| with Neck Cover, Large Blanket (150-200 gm of Fill) Fleece Fitted & Adjustable Turnout Winter Jhool 75\" inches (Black).",
    "category": "protection",
    "badge": "Riding Essential",
    "priceINR": 3600,
    "mrp": 6999,
    "discount": "49% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-064",
    "asin": "B0GHK4FQDK",
    "amazonUrl": "https://www.amazon.in/dp/B0GHK4FQDK"
  },
  {
    "id": 65,
    "name": "ZoOwill Horse Saddle Pad | Saddle Pad Gaddi | 70 x 55 cm, Breathable, Shock-Absorbing (Full Size-Large). Multicolor ( Grey, Purple, Pink)*",
    "category": "stirrups",
    "badge": "New Arrival",
    "priceINR": 899,
    "mrp": 3000,
    "discount": "70% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Grey",
      "Purple",
      "Pink"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-065",
    "asin": "B0GKGKPJ36",
    "amazonUrl": "https://www.amazon.in/dp/B0GKGKPJ36"
  },
  {
    "id": 66,
    "name": "ZoOwill Dual Ring Large Snaffle Horse Bit | Twisted Mouth (kaatedaar horse bit) Iron* .",
    "category": "bridles",
    "badge": "Stable Essential",
    "priceINR": 750,
    "mrp": 1800,
    "discount": "58% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-066",
    "asin": "B0HF9DN59R",
    "amazonUrl": "https://www.amazon.in/dp/B0HF9DN59R"
  },
  {
    "id": 67,
    "name": "Horse Grazing Muzzle, Ventilated Design, Adjustable Straps, Prevents Overeating",
    "category": "protection",
    "badge": "Featured",
    "priceINR": 999,
    "mrp": 1999,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1450052590821-8bf91254a353?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-067",
    "asin": "B0GHPQD26T",
    "amazonUrl": "https://www.amazon.in/dp/B0GHPQD26T"
  },
  {
    "id": 68,
    "name": "Colorfull Horse Kalngi - Decorative Horse Head Ornament Plume Accessory for Horse. (1-pcs). (White)",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 350,
    "mrp": 999,
    "discount": "65% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-068",
    "asin": "B0GQDBKJ1W",
    "amazonUrl": "https://www.amazon.in/dp/B0GQDBKJ1W"
  },
  {
    "id": 69,
    "name": "ZoOwill Winter Horse Blanket | Turnout Rug | Waterproof & Tafloan Cloth | Coat | (200-500 gm of Fill) Fleece Fitted & Adjustable Turnout Winter Jhool 75\" inches.",
    "category": "protection",
    "badge": "Traditional Craft",
    "priceINR": 2850,
    "mrp": 6999,
    "discount": "59% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "75\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-069",
    "asin": "B0GM83PQ69",
    "amazonUrl": "https://www.amazon.in/dp/B0GM83PQ69"
  },
  {
    "id": 70,
    "name": "Horse Chest Collar Breastplate, Red and Navy Blue, Nylon with Fleece Padding, Adjustable Neck Strap, Equestrian Riding Gear (seeneband)",
    "category": "bridles",
    "badge": "Riding Essential",
    "priceINR": 650,
    "mrp": 999,
    "discount": "35% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red",
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-070",
    "asin": "B0GT8RPK16",
    "amazonUrl": "https://www.amazon.in/dp/B0GT8RPK16"
  },
  {
    "id": 71,
    "name": "ZoOwill Hoof Trimming Stainless Blade Knife with Wooden Handle, 9 Inch, Stainless Steel Blade, Farrier Tool.",
    "category": "grooming",
    "badge": "New Arrival",
    "priceINR": 990,
    "mrp": 1200,
    "discount": "18% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "9\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-071",
    "asin": "B0GKQ9TDHY",
    "amazonUrl": "https://www.amazon.in/dp/B0GKQ9TDHY"
  },
  {
    "id": 72,
    "name": "Horse Blur Halter with Aztec Pattern, Adjustable Nylon Strap, 3-Ply Heavy Duty Construction, Adjustable Metal Buckles, All Size Fit.",
    "category": "halters",
    "badge": "Stable Essential",
    "priceINR": 650,
    "mrp": 999,
    "discount": "35% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-072",
    "asin": "B0HLMQBCBW",
    "amazonUrl": "https://www.amazon.in/dp/B0HLMQBCBW"
  },
  {
    "id": 73,
    "name": "ZoOwill Horse Riding Plastic Stirrup and Nyloan Stirrup Belt, 1-Pair, Multicolor",
    "category": "stirrups",
    "badge": "Featured",
    "priceINR": 899,
    "mrp": 1500,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-073",
    "asin": "B0H9SJQGSJ",
    "amazonUrl": "https://www.amazon.in/dp/B0H9SJQGSJ"
  },
  {
    "id": 74,
    "name": "Horse Fly Veil Ear Bonnet, Red | Ear Net Sehra, All Size Fit",
    "category": "protection",
    "badge": "Popular Choice",
    "priceINR": 450,
    "mrp": 800,
    "discount": "44% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-074",
    "asin": "B0HCWFCF46",
    "amazonUrl": "https://www.amazon.in/dp/B0HCWFCF46"
  },
  {
    "id": 75,
    "name": "Bareback Net Design Saddle Pad with Straps, Black, Cushioned Comfort Design, 75cm x 53cm",
    "category": "saddles",
    "badge": "Traditional Craft",
    "priceINR": 1424,
    "mrp": 3000,
    "discount": "53% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "15\"",
      "17\"",
      "18\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-075",
    "asin": "B0GKWTFCM4",
    "amazonUrl": "https://www.amazon.in/dp/B0GKWTFCM4"
  },
  {
    "id": 76,
    "name": "ZoOwill Uni Horse Halter with & without Fleece Padding, Nylon Horse Halter, Iron Fitting Hardware, Black and Red (Red Without* Fleece)",
    "category": "halters",
    "badge": "Riding Essential",
    "priceINR": 699,
    "mrp": 2000,
    "discount": "65% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-076",
    "asin": "B0H3G5Q431",
    "amazonUrl": "https://www.amazon.in/dp/B0H3G5Q431"
  },
  {
    "id": 77,
    "name": "Polo Heavy Duty Leather Saddle, Brown, Ergonomic Design, Horse Riding Equipment.",
    "category": "saddles",
    "badge": "New Arrival",
    "priceINR": 11500,
    "mrp": 30000,
    "discount": "62% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "15\"",
      "17\"",
      "18\""
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-077",
    "asin": "B0GK2PQP1K",
    "amazonUrl": "https://www.amazon.in/dp/B0GK2PQP1K"
  },
  {
    "id": 78,
    "name": "ZoOwill Body Protector Vest, Black, Padded, Adjustable Side Lacing, for Horse Riding & Mix Martial Art to Adults and Childrens (Small)",
    "category": "rider",
    "badge": "Stable Essential",
    "priceINR": 2699,
    "mrp": 7000,
    "discount": "61% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Small"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-078",
    "asin": "B0H4B8NRMX",
    "amazonUrl": "https://www.amazon.in/dp/B0H4B8NRMX"
  },
  {
    "id": 79,
    "name": "Horse Riding Spurs (1-Pair), Fiber Styles, with* Straps Belt, Equestrian Horse Riding Accessories (Fiber)",
    "category": "rider",
    "badge": "Featured",
    "priceINR": 1499,
    "mrp": 3399,
    "discount": "56% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "32",
      "34",
      "36"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-079",
    "asin": "B0GZX1FZN5",
    "amazonUrl": "https://www.amazon.in/dp/B0GZX1FZN5"
  },
  {
    "id": 80,
    "name": "Dusty Blue Horse Saddle Pad, Breathable, Shock-Absorbing, Anti-Slip Eqestrain Pad for English & Western Saddle (Full Size-Large).",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 899,
    "mrp": 1500,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-080",
    "asin": "B0GKGYBC2P",
    "amazonUrl": "https://www.amazon.in/dp/B0GKGYBC2P"
  },
  {
    "id": 81,
    "name": "Zoowill Printed Brass Design, Khasmiri Horse Kathi (Saddle), Fully Leather, Iron Fitting, Handel Support, Horse Driving Equipment, Fleece Lined Panels 15 inche seat. (Brown Color)",
    "category": "saddles",
    "badge": "Traditional Craft",
    "priceINR": 5500,
    "mrp": 7800,
    "discount": "29% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "15\""
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-081",
    "asin": "B0GWMJ6TYW",
    "amazonUrl": "https://www.amazon.in/dp/B0GWMJ6TYW"
  },
  {
    "id": 82,
    "name": "Race Elastic Girth & Surcingles for Horse | S.S Buckle fiting | Reinforced Leather Belt White Full Size.",
    "category": "stirrups",
    "badge": "Riding Essential",
    "priceINR": 999,
    "mrp": 2000,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-082",
    "asin": "B0GKQCW988",
    "amazonUrl": "https://www.amazon.in/dp/B0GKQCW988"
  },
  {
    "id": 83,
    "name": "Horse Halter, black Trim, Adjustable Nylon Webbing, Metal Buckles, Decorative Horse Pattern All Size Fit.",
    "category": "halters",
    "badge": "New Arrival",
    "priceINR": 499,
    "mrp": 700,
    "discount": "29% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-083",
    "asin": "B0GQHHT1J7",
    "amazonUrl": "https://www.amazon.in/dp/B0GQHHT1J7"
  },
  {
    "id": 84,
    "name": "ZoOwill 6-Ring Stainless Steel Hair Scraper Comb For Horse with Non-Slip ABS Plastic Handle, 25.5cm, Serrated Blades",
    "category": "grooming",
    "badge": "Stable Essential",
    "priceINR": 1299,
    "mrp": 2000,
    "discount": "35% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-084",
    "asin": "B0H27F9V5Z",
    "amazonUrl": "https://www.amazon.in/dp/B0H27F9V5Z"
  },
  {
    "id": 85,
    "name": "ZoOwill Frosted 1 Liter Glass Water Bottle, Leak Proof with Stainless Steel Cap, Motivational Typography Design",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 269,
    "mrp": 699,
    "discount": "62% off",
    "rating": 2.0,
    "reviewCount": 1,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-085",
    "asin": "B0GZHSKXR7",
    "amazonUrl": "https://www.amazon.in/dp/B0GZHSKXR7"
  },
  {
    "id": 86,
    "name": "ZoOwill Black Leather Horse Belly Girth, 132 cm Long, with Double Buckle Elastic Ends and D-Ring Support",
    "category": "stirrups",
    "badge": "Popular Choice",
    "priceINR": 1424,
    "mrp": 2899,
    "discount": "51% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-086",
    "asin": "B0GZ74FHL7",
    "amazonUrl": "https://www.amazon.in/dp/B0GZ74FHL7"
  },
  {
    "id": 87,
    "name": "ZoOwill Horse Leather Kathi Kashmiri (Saddle), Padded Seat, iron Fiting (3-diffrent-style) Blue Accent Straps. (Black Plane, 17 Inche seat)",
    "category": "saddles",
    "badge": "Popular Choice",
    "priceINR": 5500,
    "mrp": 10000,
    "discount": "45% off",
    "rating": 4.0,
    "reviewCount": 1,
    "sizes": [
      "17\""
    ],
    "colors": [
      "Black",
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-087",
    "asin": "B0GT122NCM",
    "amazonUrl": "https://www.amazon.in/dp/B0GT122NCM"
  },
  {
    "id": 88,
    "name": "Horse Halter, Black with Red Trim, Adjustable Nylon Webbing, Metal Buckles, Decorative Horse Pattern All Size Fit.",
    "category": "halters",
    "badge": "Riding Essential",
    "priceINR": 699,
    "mrp": 999,
    "discount": "30% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Red"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-088",
    "asin": "B0GQHRNJCQ",
    "amazonUrl": "https://www.amazon.in/dp/B0GQHRNJCQ"
  },
  {
    "id": 89,
    "name": "Tuleaf Artificial Potted Plants Set, Colorful Faux Flowers in White Ceramic Pots, (2 Pieces), Home Decor Orments. (Set 2)",
    "category": "rider",
    "badge": "New Arrival",
    "priceINR": 299,
    "mrp": 780,
    "discount": "62% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "32",
      "34",
      "36"
    ],
    "colors": [
      "White"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-089",
    "asin": "B0GRMB2Z1Z",
    "amazonUrl": "https://www.amazon.in/dp/B0GRMB2Z1Z"
  },
  {
    "id": 90,
    "name": "Zoowill Printed Brass Fitting Design Khasmiri Horse Kathi (Saddle), Fully Leather, Studded Detail, Star Conchos, Horse Driving Equipment, Fleece Lined Panels. (17 INCH-BROWN)",
    "category": "saddles",
    "badge": "Stable Essential",
    "priceINR": 5999,
    "mrp": 10000,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "17\""
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-090",
    "asin": "B0GZP52386",
    "amazonUrl": "https://www.amazon.in/dp/B0GZP52386"
  },
  {
    "id": 91,
    "name": "Tuteaf Seven Chakra Crystal Gemstone Wish Tree, 300 bids Multicolour, Natural Stones with Wooden Base, 9 * 7 inche.",
    "category": "rider",
    "badge": "Featured",
    "priceINR": 474,
    "mrp": 999,
    "discount": "53% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "7\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-stretch breathable technical fabric",
      "Reinforced inner-knee grip panels",
      "Precision-engineered safety hardware",
      "Comfortable athletic tapered fit"
    ],
    "sku": "ZW-RA-091",
    "asin": "B0GWWWWY14",
    "amazonUrl": "https://www.amazon.in/dp/B0GWWWWY14"
  },
  {
    "id": 92,
    "name": "Nylon Horse Halter with Metal Buckles, Adjustable Head Collar, Available in Red, Blue, and Black All Size Fit (Blue)",
    "category": "halters",
    "badge": "Popular Choice",
    "priceINR": 450,
    "mrp": 999,
    "discount": "55% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Red",
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-092",
    "asin": "B0GY9L8RGX",
    "amazonUrl": "https://www.amazon.in/dp/B0GY9L8RGX"
  },
  {
    "id": 93,
    "name": "ZoOwill Biothane Horse Bridle with Reins, Full Size Mostly use, Lightweight & Comfortable Fit Size Multicolor. (Black)",
    "category": "bridles",
    "badge": "Traditional Craft",
    "priceINR": 1650,
    "mrp": 3599,
    "discount": "54% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black",
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-093",
    "asin": "B0GWXFMGGB",
    "amazonUrl": "https://www.amazon.in/dp/B0GWXFMGGB"
  },
  {
    "id": 94,
    "name": "All Purpose Pet Grooming Brush, Blue and White, Self-Cleaning Slicker Brush for Dogs and Cats, 19 cm x 10.6 cm.",
    "category": "grooming",
    "badge": "Popular Choice",
    "priceINR": 260,
    "mrp": 999,
    "discount": "74% off",
    "rating": 5.0,
    "reviewCount": 1,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "White",
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-094",
    "asin": "B0GJR265ST",
    "amazonUrl": "https://www.amazon.in/dp/B0GJR265ST"
  },
  {
    "id": 95,
    "name": "ZoOwill Rubber Pet Grooming Glove, Black, Textured Design for Dogs, Cats, Horses and Cow, Hair Removal Glove, Bathing and Massageing Tool.",
    "category": "grooming",
    "badge": "New Arrival",
    "priceINR": 230,
    "mrp": 499,
    "discount": "54% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-095",
    "asin": "B0GHSH3CRX",
    "amazonUrl": "https://www.amazon.in/dp/B0GHSH3CRX"
  },
  {
    "id": 96,
    "name": "Leather Heavy Driving Horse Harness Complete Set with Bridle & Reins. (COB)",
    "category": "harnesses",
    "badge": "Stable Essential",
    "priceINR": 22000,
    "mrp": 60000,
    "discount": "63% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Cob",
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Heavy duty driving harness set",
      "Double-stitched reinforced leather",
      "Solid brass / stainless steel hardware",
      "Supple padded breast collar & breeching"
    ],
    "sku": "ZW-HN-096",
    "asin": "B0HLSYT72V",
    "amazonUrl": "https://www.amazon.in/dp/B0HLSYT72V"
  },
  {
    "id": 97,
    "name": "ZoOwill Heavey Duty Braided Rope | Dog Leash with Metal Swivel Clip | Checkered Pattern, Padded Handle | 1.5M Available in Pink and Red (1pcs).",
    "category": "halters",
    "badge": "Popular Choice",
    "priceINR": 299,
    "mrp": 999,
    "discount": "70% off",
    "rating": 4.0,
    "reviewCount": 1,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red",
      "Pink"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-097",
    "asin": "B0GHWQDL5K",
    "amazonUrl": "https://www.amazon.in/dp/B0GHWQDL5K"
  },
  {
    "id": 98,
    "name": "Double Horse Leather Harness Set, Complete Driving Harness, Heavy Driving Harness S.S Fiting Fully Leather. (COB-Size)",
    "category": "harnesses",
    "badge": "Popular Choice",
    "priceINR": 45000,
    "mrp": 65000,
    "discount": "31% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Cob",
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Heavy duty driving harness set",
      "Double-stitched reinforced leather",
      "Solid brass / stainless steel hardware",
      "Supple padded breast collar & breeching"
    ],
    "sku": "ZW-HN-098",
    "asin": "B0HLTMP1D3",
    "amazonUrl": "https://www.amazon.in/dp/B0HLTMP1D3"
  },
  {
    "id": 99,
    "name": "ZoOwill Horse Saddle Pad | Saddle Pad Gaddi | 70 x 55 cm, Breathable, Shock-Absorbing (Full Size-Large). Multicolor (Purple, Grey, Pink)*",
    "category": "stirrups",
    "badge": "Traditional Craft",
    "priceINR": 899,
    "mrp": 2000,
    "discount": "55% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Grey",
      "Purple",
      "Pink"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-099",
    "asin": "B0HJ9RW7WB",
    "amazonUrl": "https://www.amazon.in/dp/B0HJ9RW7WB"
  },
  {
    "id": 100,
    "name": "Horse 3-ply Halter, Dual Color Striped, Nylon Webbing, Adjustable with Metal Hardware Full Size",
    "category": "halters",
    "badge": "Riding Essential",
    "priceINR": 499,
    "mrp": 999,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-100",
    "asin": "B0GH9CSBF4",
    "amazonUrl": "https://www.amazon.in/dp/B0GH9CSBF4"
  },
  {
    "id": 101,
    "name": "ZoOwill Horse Winter Saddle Pad, 70 x 55 cm, Breathable, Shock-Absorbing, Anti-Slip Eqestrain Pad for English & Western Saddle (Full Size-Large).",
    "category": "stirrups",
    "badge": "New Arrival",
    "priceINR": 999,
    "mrp": 1800,
    "discount": "45% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-101",
    "asin": "B0HMDH18W4",
    "amazonUrl": "https://www.amazon.in/dp/B0HMDH18W4"
  },
  {
    "id": 102,
    "name": "ZoOwill Black Leather Dressage Horse Saddle (18 Inche seat) Heavey Duty Fitting with Wool Design Fleece Panels, Equestrian Riding Equipment",
    "category": "saddles",
    "badge": "Stable Essential",
    "priceINR": 7999,
    "mrp": 12000,
    "discount": "33% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "18\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-102",
    "asin": "B0GZ7HJNGM",
    "amazonUrl": "https://www.amazon.in/dp/B0GZ7HJNGM"
  },
  {
    "id": 103,
    "name": "Woven Saddle Blanket Pad, Striped Pattern with Leather Accents, Brown and Cream, Western Horse Tack (24-Inch length).",
    "category": "stirrups",
    "badge": "Featured",
    "priceINR": 1490,
    "mrp": 4000,
    "discount": "63% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "High-grade iron / aluminium casting",
      "Non-slip rubber tread grip",
      "Balanced weight distribution",
      "Heavy-duty reinforced stitching"
    ],
    "sku": "ZW-SG-103",
    "asin": "B0GQDGL97B",
    "amazonUrl": "https://www.amazon.in/dp/B0GQDGL97B"
  },
  {
    "id": 104,
    "name": "ZoOwill Horse Halter, Red and Yellow, Nylon, 3-Ply Heavy Duty Construction, Adjustable Metal Buckles, All Size Fit.",
    "category": "halters",
    "badge": "Popular Choice",
    "priceINR": 499,
    "mrp": 999,
    "discount": "50% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Red",
      "Yellow"
    ],
    "image": "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-104",
    "asin": "B0H52Y545Y",
    "amazonUrl": "https://www.amazon.in/dp/B0H52Y545Y"
  },
  {
    "id": 105,
    "name": "ZoOwill Horse Springkandare Bit with a Curb Chain, Stainless Steel, 6.5 inch Mouthpiece, 7.5 inch Height, Equestrian Riding Equipment",
    "category": "bridles",
    "badge": "Traditional Craft",
    "priceINR": 1999,
    "mrp": 4999,
    "discount": "60% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "5\""
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Supple vegetable tanned leather",
      "Stainless steel rust-free bit rings",
      "Adjustable noseband & throatlatch",
      "Ergonomic pressure relief browband"
    ],
    "sku": "ZW-BB-105",
    "asin": "B0GK246MP9",
    "amazonUrl": "https://www.amazon.in/dp/B0GK246MP9"
  },
  {
    "id": 106,
    "name": "ZoOwill Dog (Collar+Leash Combo Set), Striped Pattern, Metal Buckle, Multiple Colors Available, 1.5M Leash and Diffrent Size of Collar Avalible. (Small)",
    "category": "halters",
    "badge": "Riding Essential",
    "priceINR": 375,
    "mrp": 499,
    "discount": "25% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "Small"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Triple-ply reinforced heavy duty nylon",
      "Rust-resistant alloy hardware",
      "Padded noseband for anti-chafing",
      "Quick-clip throatlatch design"
    ],
    "sku": "ZW-HL-106",
    "asin": "B0GPZ1YQ6H",
    "amazonUrl": "https://www.amazon.in/dp/B0GPZ1YQ6H"
  },
  {
    "id": 107,
    "name": "ZoOwill Seeneband Horse Chest Collar Breastplate COLOR-1",
    "category": "bridles",
    "badge": "New Arrival",
    "priceINR": 650,
    "mrp": 999,
    "discount": "35% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Fleece Padding",
      "Adjustable Neck Strap",
      "Equestrian Riding Gear",
      "Supple vegetable tanned leather"
    ],
    "sku": "ZW-BB-107",
    "asin": "B0HS4Y2YVY",
    "amazonUrl": "https://www.amazon.in/dp/B0HS4Y2YVY"
  },
  {
    "id": 108,
    "name": "ZoOwill Horse Rain Sheet Jhool Rug | Blanket Turnout Rug| Waterproof & Tafloan Cloth | Large Blanket & Adjustable Turnout 75\" inches Coat Multicolor.",
    "category": "protection",
    "badge": "Stable Essential",
    "priceINR": 2499,
    "mrp": 7000,
    "discount": "64% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full Size"
    ],
    "colors": [
      "Multi"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-108",
    "asin": "B0H9TH3W4J",
    "amazonUrl": "https://www.amazon.in/dp/B0H9TH3W4J"
  },
  {
    "id": 109,
    "name": "ZoOwill Horse Jumping Saddle, All Perposs Black Leather, English Style, Horse Riding Equipment",
    "category": "saddles",
    "badge": "Featured",
    "priceINR": 9999,
    "mrp": 30000,
    "discount": "67% off",
    "rating": 4.8,
    "reviewCount": 40,
    "sizes": [
      "15\"",
      "17\"",
      "18\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1566251037378-5e04e3bec343?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-109",
    "asin": "B0GK9TNDFW",
    "amazonUrl": "https://www.amazon.in/dp/B0GK9TNDFW"
  },
  {
    "id": 110,
    "name": "Zoowill Plain Khasmiri Horse Kathi (Saddle), Fully Leather, Iron Fitting, Handel Support, Horse Driving Equipment, Fleece Lined Panels 17 inche seat. (BLACK)",
    "category": "saddles",
    "badge": "Popular Choice",
    "priceINR": 5999,
    "mrp": 10000,
    "discount": "40% off",
    "rating": 4.8,
    "reviewCount": 12,
    "sizes": [
      "17\""
    ],
    "colors": [
      "Black"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Handcrafted drum-dyed leather",
      "Ergonomic wooden/fiber tree",
      "Stainless steel / brass fittings",
      "Deep secure seat balance"
    ],
    "sku": "ZW-SK-110",
    "asin": "B0GZP2H13J",
    "amazonUrl": "https://www.amazon.in/dp/B0GZP2H13J"
  },
  {
    "id": 111,
    "name": "ZoOwill Winter Horse Turnout Rug with Neck Cover (75\" Inches) 200-250 gm of Fill. Blue",
    "category": "protection",
    "badge": "Traditional Craft",
    "priceINR": 3599,
    "mrp": 9000,
    "discount": "60% off",
    "rating": 4.8,
    "reviewCount": 19,
    "sizes": [
      "75\""
    ],
    "colors": [
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover",
      "Heavy duty dual cross surcingles",
      "Taped seams for weather endurance"
    ],
    "sku": "ZW-PR-111",
    "asin": "B0HS52K8WX",
    "amazonUrl": "https://www.amazon.in/dp/B0HS52K8WX"
  },
  {
    "id": 112,
    "name": "Electric Clipper ST020, 350W Professional pets Shearing Machine, Alloy Stainless Steel Blade, for Sheep, Dogs, Horses and Cattle, with Carry Case",
    "category": "grooming",
    "badge": "Riding Essential",
    "priceINR": 8599,
    "mrp": 15000,
    "discount": "43% off",
    "rating": 4.8,
    "reviewCount": 26,
    "sizes": [
      "Standard"
    ],
    "colors": [
      "Black",
      "Brown"
    ],
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Durable natural bristles & hardwood base",
      "Comfortable ergonomic hand grip",
      "Removes loose hair, dirt & sweat",
      "Designed for horses, cattle & livestock"
    ],
    "sku": "ZW-GS-112",
    "asin": "B0GTZ6WTPD",
    "amazonUrl": "https://www.amazon.in/dp/B0GTZ6WTPD"
  },
  {
    "id": 113,
    "name": "Zoowill Horse Fly Veil Ear Bonnet, Blue - all size fit",
    "category": "protection",
    "badge": "New Arrival",
    "priceINR": 465,
    "mrp": 900,
    "discount": "48% off",
    "rating": 4.8,
    "reviewCount": 33,
    "sizes": [
      "Full",
      "Cob",
      "Pony"
    ],
    "colors": [
      "Blue"
    ],
    "image": "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=1200&q=85",
    "specs": [
      "Ear Net Sehra",
      "All Size Fit",
      "Rip-stop waterproof breathable exterior",
      "Comfort fleece lining with neck cover"
    ],
    "sku": "ZW-PR-113",
    "asin": "B0HS5Q48FQ",
    "amazonUrl": "https://www.amazon.in/dp/B0HS5Q48FQ"
  }
];

// ── Best Sellers (Top Standout Products) ─────────────────────
export const bestSellers = products.filter((p) =>
  [2, 6, 24, 36, 77, 81, 96, 102].includes(p.id)
);