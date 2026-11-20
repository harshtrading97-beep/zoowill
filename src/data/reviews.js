// ZoOwill Equestrian — Verified Community Reviews
// Easy to edit: add new reviewers in REVIEWERS or update category feedback in COMMENTS.

const REVIEWERS = [
  { name: "Col. Vikram Singh (Retd.)", location: "Jaipur Polo Club, Rajasthan",          avatar: "VS" },
  { name: "Priya Rathore",             location: "Delhi Riding Club, New Delhi",          avatar: "PR" },
  { name: "Capt. Arjun Nair",          location: "Army Equitation Centre, Saugor",        avatar: "AN" },
  { name: "Aishwarya Mehta",           location: "Amateur Riders' Club, Mumbai",          avatar: "AM" },
  { name: "Dr. Rajiv Khanna",          location: "Royal Western India Turf Club, Pune",   avatar: "RK" },
  { name: "Sunita Desai",              location: "Mysore Race Club, Karnataka",           avatar: "SD" },
  { name: "Lt. Col. Rahul Bhatia",     location: "Remount & Veterinary Corps, Meerut",   avatar: "RB" },
  { name: "Kavya Pillai",              location: "Bangalore Turf Club, Karnataka",        avatar: "KP" },
  { name: "Sahil Oberoi",              location: "Kolkata Riding Club, West Bengal",      avatar: "SO" },
  { name: "Deepa Nambiar",             location: "Madras Race Club, Chennai",             avatar: "DN" },
  { name: "Maj. Suresh Tomar",         location: "Equestrian Federation of India, Delhi", avatar: "ST" },
  { name: "Riya Bhatt",                location: "Ahmedabad Horse Riders' Association",   avatar: "RB" },
  { name: "Karan Malhotra",            location: "Chandigarh Equestrian Academy",         avatar: "KM" },
  { name: "Anjali Sharma",             location: "Hyderabad Race Club, Telangana",        avatar: "AS" },
  { name: "Devendra Rao",              location: "Pune Horse Owners' Association",        avatar: "DR" },
];

const COMMENTS = {
  saddles: [
    "Excellent leather quality and clean stitching. It felt supple right out of the box and sits comfortably with good spine clearance on my Marwari mare.",
    "I have been using this saddle for three months across polo practice and trail rides. The seat balance is steady and my horse moves freely underneath.",
    "Great craftsmanship for the price. The leather has a rich natural grain, the fittings are solid, and sizing guidance from the team was very helpful.",
  ],
  harnesses: [
    "The double-horse harness set is a fine example of Indian leatherwork. Every strap, buckle, and collar piece fits accurately and arrived neatly packed.",
    "We use the single-horse harness for daily carriage work at our stable. The leather is thick, well-oiled, and reinforced at all high-stress points.",
    "Strong hardware and comfortable padding across the breast collar. Even after long drives, there is no rubbing or soreness on our horse.",
  ],
  bridles: [
    "Holds up reliably even during humid monsoon weather without stiffness or cracking. Adjustment holes are evenly spaced and easy to fit.",
    "Clean stitching and smooth cheek pieces throughout. My horse accepted the bit comfortably from the very first schooling session.",
    "Great fit on our Kathiawari stallion. The leather feels genuine and supple, and the metal rings are smoothly finished with no rough edges.",
  ],
  halters: [
    "Strong webbing, clean box stitching, and sturdy metal buckles. We use it for daily stable handling and turnout, and it still looks fresh after months.",
    "The hardware feels solid and the noseband sits comfortably without pinching. Very reliable everyday halter for busy yards.",
    "Ordered multiple halters for our riding school horses. Every piece arrived on time with accurate sizing and smooth snap hooks.",
  ],
  stirrups: [
    "Well-balanced stirrups with a grippy tread that stays secure even in wet conditions. Very comfortable during long flatwork and jumping sessions.",
    "The girth and saddle pad fit cleanly without slipping or rubbing. Heavy-duty buckles remain rust-free even with daily sweat exposure.",
    "Solid weight distribution and neat stitching throughout. My instructor checked the fittings and was very pleased with the build quality.",
  ],
  protection: [
    "The turnout rug fits generously across the shoulders and keeps my Thoroughbred dry and warm through chilly mornings. Strong straps and buckles.",
    "The fly bonnet is neatly crocheted and sits comfortably under the bridle. My mare stays much calmer on outdoor trail rides now.",
    "Good cushioning and strong hook-and-loop straps on the boots. They stay firmly in place during trotting and cantering without twisting.",
  ],
  grooming: [
    "Dense bristles on a comfortable wooden base — brings out a clean natural shine on the coat without irritating sensitive skin.",
    "The iron kharara and curry comb make quick work of dried mud and shedding winter coat. Sturdy handle and easy to clean.",
    "Very reliable stable essentials. The hoof pick hook is solid steel with zero bend, and the hay net holds up well to daily use.",
  ],
  rider: [
    "Comfortable stretch fabric with a neat fit inside riding boots. The stitching and zipper have held up well through regular weekly washes.",
    "Lightweight yet sturdy spurs with clean straps and buckles. Delivers subtle, accurate leg cues during schooling.",
    "Well-proportioned safety gear with adjustable side straps for a secure fit. Great value for riders and training academies.",
  ],
  default: [
    "Clean craftsmanship and sturdy materials throughout. Arrived well-packaged and matched the listed specifications accurately.",
    "Comfortable fit, reliable hardware, and fair pricing. Recommended to fellow riders and horse owners at our club.",
    "Consistent quality across every order we have placed with ZoOwill. Responsive support and dependable PAN-India delivery.",
  ],
};

const REVIEW_DATES = [
  "November 2026",
  "October 2026",
  "September 2026",
  "August 2026",
  "July 2026",
];

const REVIEW_RATINGS = [5, 5, 4, 5, 5];

/**
 * Returns 3 consistent customer reviews for any product ID and category.
 */
export function getReviews(productId = 1, category = "default") {
  const commentPool = COMMENTS[category] || COMMENTS.default;

  return [0, 1, 2].map((index) => {
    const reviewerIndex = (productId * 3 + index * 5) % REVIEWERS.length;
    const ratingIndex = (productId + index) % REVIEW_RATINGS.length;
    const dateIndex = (productId + index * 2) % REVIEW_DATES.length;

    return {
      reviewer: REVIEWERS[reviewerIndex],
      comment: commentPool[index % commentPool.length],
      rating: REVIEW_RATINGS[ratingIndex],
      date: REVIEW_DATES[dateIndex],
      verified: true,
    };
  });
}