import { useState } from "react";
import { Container } from "react-bootstrap";
import { createProduct } from "../api";

const seedProducts = [
  {
    title: "Wireless Noise-Cancelling Headphones",
    price: 89.99,
    category: "electronics",
    description:
      "Over-ear headphones with active noise cancellation and 30-hour battery life.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: '4K Ultra HD Smart TV 55"',
    price: 449.99,
    category: "electronics",
    description:
      "55-inch smart TV with HDR support and built-in streaming apps.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Mechanical Gaming Keyboard",
    price: 74.5,
    category: "electronics",
    description: "RGB backlit mechanical keyboard with hot-swappable switches.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Portable Bluetooth Speaker",
    price: 39.99,
    category: "electronics",
    description: "Waterproof speaker with 12-hour playtime and deep bass.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Smartwatch Fitness Tracker",
    price: 129.0,
    category: "electronics",
    description: "Tracks heart rate, sleep, and workouts with a 7-day battery.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Wireless Charging Pad",
    price: 24.99,
    category: "electronics",
    description: "Fast 15W wireless charger compatible with all Qi devices.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "USB-C Hub 7-in-1",
    price: 34.99,
    category: "electronics",
    description:
      "Expands one USB-C port into HDMI, USB 3.0, and SD card slots.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Mirrorless Digital Camera",
    price: 599.0,
    category: "electronics",
    description: "24MP mirrorless camera with interchangeable lens support.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Noise-Isolating Earbuds",
    price: 49.99,
    category: "electronics",
    description: "In-ear earbuds with a compact charging case.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Gaming Mouse RGB",
    price: 29.99,
    category: "electronics",
    description: "High-precision gaming mouse with adjustable DPI.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },

  {
    title: "Men's Slim Fit Denim Jacket",
    price: 59.99,
    category: "men's clothing",
    description: "Classic denim jacket with a modern slim fit cut.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Crew Neck T-Shirt Pack",
    price: 19.99,
    category: "men's clothing",
    description: "Pack of 3 cotton crew neck tees in assorted colors.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Chino Pants",
    price: 44.99,
    category: "men's clothing",
    description: "Slim tapered chinos suitable for casual or business wear.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Wool Blend Overcoat",
    price: 129.99,
    category: "men's clothing",
    description: "Warm wool blend coat with a tailored silhouette.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Running Shorts",
    price: 24.99,
    category: "men's clothing",
    description: "Lightweight breathable shorts with a built-in liner.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Flannel Shirt",
    price: 34.99,
    category: "men's clothing",
    description: "Soft brushed flannel shirt with a classic plaid pattern.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Leather Belt",
    price: 22.5,
    category: "men's clothing",
    description: "Genuine leather belt with a brushed metal buckle.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Athletic Hoodie",
    price: 39.99,
    category: "men's clothing",
    description: "Fleece-lined hoodie with a kangaroo pocket.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Formal Dress Shirt",
    price: 42.0,
    category: "men's clothing",
    description: "Wrinkle-resistant dress shirt for formal occasions.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Men's Cargo Shorts",
    price: 27.99,
    category: "men's clothing",
    description: "Durable cargo shorts with multiple utility pockets.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },

  {
    title: "Women's Floral Wrap Dress",
    price: 54.99,
    category: "women's clothing",
    description:
      "Lightweight wrap dress with a floral print, perfect for spring.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's High-Waisted Jeans",
    price: 49.99,
    category: "women's clothing",
    description: "Stretch denim jeans with a flattering high-rise fit.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Cropped Cardigan",
    price: 32.99,
    category: "women's clothing",
    description: "Soft knit cardigan with a cropped, cozy fit.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Yoga Leggings",
    price: 28.5,
    category: "women's clothing",
    description: "High-waist leggings with moisture-wicking fabric.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Puffer Vest",
    price: 44.99,
    category: "women's clothing",
    description: "Lightweight insulated puffer vest for layering.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Silk Blouse",
    price: 38.0,
    category: "women's clothing",
    description: "Elegant silk blouse suitable for work or evening wear.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Maxi Skirt",
    price: 36.99,
    category: "women's clothing",
    description: "Flowy maxi skirt with an elastic waistband.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Denim Jacket",
    price: 52.99,
    category: "women's clothing",
    description: "Classic cropped denim jacket with button closures.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Athletic Sports Bra",
    price: 21.99,
    category: "women's clothing",
    description: "Medium-support sports bra with breathable mesh panels.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
  {
    title: "Women's Wool Sweater",
    price: 46.5,
    category: "women's clothing",
    description: "Chunky knit wool sweater for cold weather.",
    image: "https://fakestoreapi.com/img/placeholder.jpg",
  },
];

export default function Seed() {
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(0);

  async function handleSeed() {
    setStatus("running");
    setCount(0);
    for (const product of seedProducts) {
      await createProduct(product);
      setCount((c) => c + 1);
    }
    setStatus("done");
  }

  return (
    <Container className="py-4">
      <h2>Seed Products</h2>
      <p>This will add {seedProducts.length} products to Firestore.</p>
      <button
        className="btn-cyber btn-cyber-primary"
        onClick={handleSeed}
        disabled={status === "running"}
      >
        {status === "running"
          ? `Seeding... (${count}/${seedProducts.length})`
          : "Run Seed"}
      </button>
      {status === "done" && (
        <p className="mt-3">✅ Done! Added {count} products.</p>
      )}
    </Container>
  );
}
