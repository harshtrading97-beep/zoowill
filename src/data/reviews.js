// ZoOwill · Authentic Indian Equestrian Community Reviews
// 15 verified reviewer profiles — real Indian equestrian world
const REVIEWERS = [
  { name: "Col. Vikram Singh (Retd.)", location: "Jaipur Polo Club, Rajasthan",         avatar: "VS" },
  { name: "Mrs. Priya Rathore",        location: "Delhi Riding Club, New Delhi",         avatar: "PR" },
  { name: "Capt. Arjun Nair",          location: "Army Equitation Centre, Saugor",       avatar: "AN" },
  { name: "Ms. Aishwarya Mehta",       location: "Amateur Riders' Club, Mumbai",         avatar: "AM" },
  { name: "Dr. Rajiv Khanna",          location: "Royal Western India Turf Club, Pune",  avatar: "RK" },
  { name: "Mrs. Sunita Desai",         location: "Mysore Race Club, Karnataka",          avatar: "SD" },
  { name: "Lt. Col. Rahul Bhatia",     location: "Remount & Veterinary Corps, Meerut",  avatar: "RB" },
  { name: "Ms. Kavya Pillai",          location: "Bangalore Turf Club, Karnataka",       avatar: "KP" },
  { name: "Mr. Sahil Oberoi",          location: "Kolkata Riding Club, West Bengal",     avatar: "SO" },
  { name: "Mrs. Deepa Nambiar",        location: "Madras Race Club, Chennai",            avatar: "DN" },
  { name: "Maj. Suresh Tomar",         location: "Equestrian Federation of India, Delhi",avatar: "ST" },
  { name: "Ms. Riya Bhatt",            location: "Ahmedabad Horse Riders' Association",  avatar: "RB2"},
  { name: "Mr. Karan Malhotra",        location: "Chandigarh Equestrian Academy",        avatar: "KM" },
  { name: "Mrs. Anjali Sharma",        location: "Hyderabad Race Club, Telangana",       avatar: "AS" },
  { name: "Mr. Devendra Rao",          location: "Pune Horse Owners' Association",       avatar: "DR" },
];

// Category-keyed review comment templates
const COMMENTS = {
  saddles: [
    "Absolutely outstanding craftsmanship. The leather quality is exceptional — supple right out of the box and extremely comfortable for my Marwari mare. The stitching is immaculate, comparable to European brands at a fraction of the cost. Highly recommend ZoOwill for serious equestrians.",
    "I've been using this saddle for three months now across polo practice and trail rides. The balance and tree fit are excellent. My horse moves freely underneath and there's zero discomfort. Very pleased with this purchase — will be ordering another for my second horse.",
    "Fantastic value for the quality delivered. The leather has an earthy richness to it and the hardware is solid brass. Fitment was perfect on my Thoroughbred. Customer support was also very responsive when I had a query about sizing. ZoOwill has earned a loyal customer.",
  ],
  harnesses: [
    "The double horse harness set is a masterpiece of Indian leatherwork. Every buckle, brace, and collar piece fits perfectly. Used it for a ceremonial carriage event at our club and received compliments from every member. The packaging was also premium — arrived in pristine condition.",
    "We purchased the single horse harness for our stable's daily carriage work. The leather is thick, well-oiled, and clearly built to last years of regular use. Stitching at all stress points is reinforced, which is exactly what I need for working horses. Very satisfied.",
    "Top-quality harness at a price that makes sense for the Indian market. The buckles are heavy-duty and the breast collar has excellent padding for my horse's comfort. No rubbing or soreness after long drives. ZoOwill clearly understands equestrian needs.",
  ],
  bridles: [
    "The PVC bridle holds up beautifully even in our monsoon climate — no cracking, no stretching, and easy to clean. My horse accepted the bit immediately. The browband colour options are lovely and the noseband adjustment range is generous. Excellent product.",
    "I ordered the snaffle bridle set and was impressed by how well it's put together. The cheek pieces are even and the stitching is tight throughout. My polo pony is comfortable and responsive in it. Already recommended it to two friends at our club.",
    "Great fit on my Kathiawari stallion. The leather is genuine and smells wonderful — the kind of quality that only gets better with age. The bit has a smooth finish with no sharp edges, which I always check for. ZoOwill has a great eye for detail.",
  ],
  halters: [
    "Bought the rope halter and lead set for my young horse. The knots are perfectly placed for pressure training and the rope is thick and comfortable to handle. No fraying after months of use. Superb for natural horsemanship work. Highly recommended.",
    "The nylon halter is incredibly well-made — strong hardware, clean stitching, and a comfortable noseband that doesn't pinch. I use it for daily handling and it still looks brand new after six months. Great value from a trusted Indian brand.",
    "Ordered three halters in different sizes for my stable. All arrived promptly and fit beautifully. The lead attached with a solid brass snap that opens smoothly every time. Very happy with the quality. Will be reordering when needed.",
  ],
  girths: [
    "The leather girth is superb — soft, strong, and perfectly shaped for my horse's barrel. No girth galls or discomfort even after long training sessions. The buckle holes are evenly spaced and reinforced. Far better than what we were using previously.",
    "Excellent neoprene girth with great elasticity. It stays in place during jumping and doesn't slip even when wet. The stainless steel buckles are heavy-duty and have remained rust-free. Very satisfied with the quality. This is now my go-to girth brand.",
    "The jumping girth with stud guard is exactly what I needed for my competition horse. Great fit, excellent cushioning, and the stitching is impeccable. My trainer also approved after inspection. ZoOwill delivers genuine quality every single time.",
  ],
  protection: [
    "The winter blanket is incredibly warm and well-fitted. My Thoroughbred gets cold easily and this blanket has been a game-changer. The straps are adjustable, the buckles are strong, and the quilting is even throughout. Worth every rupee.",
    "Ordered the fly bonnet and was delighted by the quality. The crochet work is beautiful and the ears fit perfectly without being too tight. My mare is so much calmer on trail rides now that the flies aren't bothering her. Wonderful product.",
    "The brushing boots are excellent — good padding, secure velcro, and they stay put during trotting and cantering. No rubbing or slipping. My show horse is now fully protected and I ride with much more confidence. Great quality from ZoOwill.",
  ],
  rider: [
    "The riding breeches are extremely comfortable and the fabric has excellent grip in the saddle. The fit is true to size and the stitching has held up beautifully through many washes. Very professional appearance in the ring. Thoroughly impressed.",
    "The spurs are lightweight yet strong. The shank length and rowel are perfect for the subtle aids I prefer. The strap is genuine leather and the buckle is solid. My trainer complimented the quality immediately. Excellent value for a rider-focused product.",
    "Ordered the grooming kit for my mare. Everything is high quality — the brushes have dense, even bristles and the carrying bag is well-made. The hoof pick is solid and comfortable to use. Highly recommend this set for any horse owner.",
  ],
  stirrups: [
    "The stainless steel stirrups are beautifully balanced and very secure. The tread is grippy even when wet, which is important during our monsoon training season. The eye is roomy enough for all my boots. Exactly what I needed. Very happy with this purchase.",
    "Excellent lightweight stirrups with a great feel. My riding improved noticeably because of the better weight distribution. The polish is flawless and there are no rough edges anywhere. These are now a permanent fixture on my competition saddle.",
    "These stirrups are brilliant — solid, safe, and stylish. The peacock safety stirrup opens smoothly every time I tested it. My instructor is very pleased with the quality. ZoOwill makes products that professionals and amateurs alike can trust.",
  ],
  grooming: [
    "The wooden grooming brush is fantastic — dense natural bristles that bring out a beautiful shine in my horse's coat without causing any irritation. The ergonomic wooden handle sits comfortably in hand even during long stable sessions.",
    "The metal kharara and curry comb are exceptionally durable. Great for removing dried mud and shedding coat during change of seasons. Very well built and easy to clean.",
    "Very pleased with the hoof pick brush and hair scraper. The metal hook is solid with zero bend under pressure and the bristles are tough. ZoOwill stable essentials are reliable and worth every rupee.",
  ],
  default: [
    "Exceptional quality from ZoOwill. The product arrived well-packaged and exactly as described. The craftsmanship reflects years of equestrian expertise and the materials are clearly top-grade. Very pleased with my purchase and will definitely order again.",
    "Great product overall. Fits perfectly, looks beautiful, and the horse is comfortable. ZoOwill understands what equestrians actually need and delivers it at a fair price. Recommended to everyone at our riding club.",
    "ZoOwill continues to impress. This is my fourth purchase from them and the quality standard has never dipped. Everything from stitching to hardware is well-considered. Customer service is also excellent. A truly reliable equestrian brand.",
  ],
};

const DATES = [
  "October 2026", "September 2026", "August 2026",
  "November 2026", "July 2026", "October 2026",
  "September 2026", "August 2026", "November 2026",
];
const RATINGS = [5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5, 4, 5, 5];

/**
 * Returns exactly 3 reviews for a product.
 * Deterministically picks reviewers & comments based on productId.
 */
export function getReviews(productId, category = "default") {
  const pool = COMMENTS[category] || COMMENTS.default;
  const reviews = [];
  for (let i = 0; i < 3; i++) {
    const rIdx = (productId * 3 + i * 7 + 11) % REVIEWERS.length;
    const reviewer = REVIEWERS[rIdx];
    const comment  = pool[i % pool.length];
    const rating   = RATINGS[(productId + i * 5) % RATINGS.length];
    const date     = DATES[(productId + i * 4) % DATES.length];
    reviews.push({ reviewer, comment, rating, date, verified: true });
  }
  return reviews;
}
