import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Rahul Verma',
    city: 'Indore',
    state: 'Madhya Pradesh',
    rating: 5,
    date: '2026-03-14',
    title: 'Top notch quality from Ranipura! Best kicks in town',
    comment: 'Visited their store at Nandlalpura Near Ranipura first, then ordered the Retro Court Sneaker online. The fit (UK 9) is spot on and the royal blue finish is premium. Ordered via WhatsApp and got doorstep delivery in 24 hours in Indore.',
    footwearModel: 'Air Velocity Retro Court Sneaker',
    verifiedBuyer: true,
    sizeBought: 9,
    helpfulCount: 42
  },
  {
    id: 'rev-02',
    author: 'Vikas Sharma',
    city: 'Pune',
    state: 'Maharashtra',
    rating: 5,
    date: '2026-03-21',
    title: 'PAN India delivery arrived in 3 days!',
    comment: 'Was hesitant to order shoes online from Indore to Pune, but their team was super helpful on WhatsApp (+91 8770690143) sending real video proof of the shoe before packing. The HyperMesh running shoe is featherweight and cushioning is exceptional.',
    footwearModel: 'Pro-Stride HyperMesh Running Shoes',
    verifiedBuyer: true,
    sizeBought: 8,
    helpfulCount: 38
  },
  {
    id: 'rev-03',
    author: 'Aditya Chouhan',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    rating: 5,
    date: '2026-03-28',
    title: 'Wore these for my cousin’s wedding - pure luxury',
    comment: 'The Tan Oxford Brogues look like an ₹8,000 shoe. Wore them for a 10-hour wedding function with zero shoe bite. Payment via UPI was smooth and instant receipt was generated. Highly recommend Ahilya Footwear!',
    footwearModel: 'Artisan Handcrafted Tan Oxford Brogues',
    verifiedBuyer: true,
    sizeBought: 10,
    helpfulCount: 29
  },
  {
    id: 'rev-04',
    author: 'Priya Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    rating: 5,
    date: '2026-04-02',
    title: 'Comfortable everyday court shoes',
    comment: 'Bought UK 7. Looks amazing with mom jeans and casual outfits. Also relieved that they put up the warning about their old disabled account so I could reach their authentic contact 8770690143 easily.',
    footwearModel: 'Urban Classic Streetwear Court Kicks',
    verifiedBuyer: true,
    sizeBought: 7,
    helpfulCount: 19
  },
  {
    id: 'rev-05',
    author: 'Mohit Agrawal',
    city: 'Jaipur',
    state: 'Rajasthan',
    rating: 5,
    date: '2026-04-10',
    title: 'Navy Suede Loafer is a head-turner',
    comment: 'The tassels and suede texture are extremely rich. Paired it with an ivory linen kurta and got countless compliments. Fast dispatch from Indore to Jaipur within 48 hours.',
    footwearModel: 'Royal Heritage Navy Suede Tassel Loafer',
    verifiedBuyer: true,
    sizeBought: 9,
    helpfulCount: 24
  },
  {
    id: 'rev-06',
    author: 'Sandeep Tiwari',
    city: 'Delhi NCR',
    state: 'Delhi',
    rating: 4,
    date: '2026-04-16',
    title: 'CloudFloat slides are pure bliss',
    comment: 'Wear them right after coming home from work. Sole is thick and spongy. Cash on delivery option was hassle-free. Will be ordering the running shoes next week.',
    footwearModel: 'CloudFloat Ergonomic Recovery Slides',
    verifiedBuyer: true,
    sizeBought: 8,
    helpfulCount: 15
  }
];

export const REVIEWS_STORAGE_KEY = 'ahilya_footwear_customer_reviews';

export function getStoredReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read stored reviews', e);
  }
  return INITIAL_REVIEWS;
}

export function saveReviewToStorage(review: Review): Review[] {
  const current = getStoredReviews();
  const updated = [review, ...current];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to write review', e);
  }
  return updated;
}
