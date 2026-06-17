// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('ecom-monolith');

db.getCollection('products').deleteMany({});

// Create a new document in the collection.
db.getCollection('products').insertMany(
  [
    // Electronics
    {
      name: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
      description: "Industry leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
      price: 348,
      stock: 50,
      images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Apple AirPods Pro",
      description: "Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you.",
      price: 249,
      stock: 120,
      images: ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Bose SoundLink Revolve+ Speaker",
      description: "Deep, loud, and immersive sound, with True 360-degree coverage. Built-in microphone for speakerphone to take clear conference or personal calls.",
      price: 299,
      stock: 35,
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Dell UltraSharp 27\" 4K Monitor",
      description: "Experience true color and stunning details on this 27” 4K monitor with a wide color coverage.",
      price: 549,
      stock: 20,
      images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Keychron K2 Mechanical Keyboard",
      description: "A versatile wireless mechanical keyboard with Mac layout, tactile brown switches, and customizable RGB backlighting.",
      price: 99,
      stock: 75,
      images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Logitech MX Master 3 Advanced Wireless Mouse",
      description: "Ultrafast magspeed scrolling. Ergonomic design for comfort and precision. Seamlessly work on multiple computers.",
      price: 99,
      stock: 60,
      images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "Canon EOS R5 Mirrorless Camera",
      description: "45 Megapixel Full-Frame CMOS Sensor. 8K Video recording capabilities. Advanced autofocus tracking.",
      price: 3899,
      stock: 10,
      images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
      category: "Electronics"
    },
    {
      name: "LG 55-Inch Class OLED TV",
      description: "Self-lit OLED pixels create infinite contrast and perfect black. Features AI-powered 4K upscaling.",
      price: 1299,
      stock: 15,
      images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80"],
      category: "Electronics"
    },
    // Clothing
    {
      name: "Men's Classic Leather Moto Jacket",
      description: "Genuine leather motorcycle jacket with asymmetric zip closure and multiple pockets for a rugged, timeless look.",
      price: 199,
      stock: 25,
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "Nike Air Force 1 '07 Sneakers",
      description: "The legend lives on in this modern take on the iconic AF1 that blends classic style with fresh details.",
      price: 110,
      stock: 150,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "Adidas Ultraboost 22 Running Shoes",
      description: "Experience ultimate comfort and energy return with every step. Made with Parley Ocean Plastic.",
      price: 190,
      stock: 80,
      images: ["https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "Levi's 501 Original Fit Jeans",
      description: "The original blue jean since 1873. A cultural icon worn by generations, defining style for decades.",
      price: 79,
      stock: 120,
      images: ["https://images.unsplash.com/photo-1542272604-780c8d52a5ca?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "Patagonia Better Sweater Fleece Jacket",
      description: "A warm, low-bulk quarter-zip jacket made of soft, sweater-knit polyester fleece. Fair Trade Certified sewn.",
      price: 129,
      stock: 45,
      images: ["https://images.unsplash.com/photo-1544441893-675973e31985?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "The North Face Nuptse Retro Jacket",
      description: "An iconic silhouette from the 90s, built for warmth and style in cold weather conditions.",
      price: 280,
      stock: 30,
      images: ["https://images.unsplash.com/photo-1601053424106-953e1a681c5d?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "V-Neck Pure Cashmere Sweater",
      description: "Luxuriously soft and lightweight cashmere sweater, perfect for layering or wearing on its own.",
      price: 150,
      stock: 40,
      images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80"],
      category: "Clothing"
    },
    {
      name: "Classic Oxford Button-Down Shirt",
      description: "A wardrobe staple made from durable oxford cloth that gets softer with every wash.",
      price: 65,
      stock: 90,
      images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80"],
      category: "Clothing"
    },
    // Home & Kitchen
    {
      name: "Nespresso VertuoPlus Coffee Maker",
      description: "Brews multiple cup sizes at the touch of a button. Includes a complimentary welcome set of Nespresso capsules.",
      price: 179,
      stock: 50,
      images: ["https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "KitchenAid Artisan Series 5-Qt. Stand Mixer",
      description: "The ultimate culinary center with 10 speeds and a 5-quart stainless steel bowl for all your baking needs.",
      price: 449,
      stock: 15,
      images: ["https://images.unsplash.com/photo-1581481615985-ba4775734a9b?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "Dyson V11 Cordless Vacuum",
      description: "Intelligently optimizes suction and run time across all floor types. LCD screen displays real-time performance.",
      price: 599,
      stock: 22,
      images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "Le Creuset Enameled Cast Iron Signature Dutch Oven",
      description: "Iconic cookware offering exceptional heat retention. Ideal for slow-cooking, roasting, and baking.",
      price: 369,
      stock: 28,
      images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "Ninja Air Fryer Max XL",
      description: "Cooks, crisps, and dehydrates with little to no oil. Family-sized capacity for quick and healthy meals.",
      price: 159,
      stock: 65,
      images: ["https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "Vitamix 5200 Blender Professional-Grade",
      description: "Easily adjust speed to achieve a variety of textures. The dial can be rotated at any point during the blend.",
      price: 479,
      stock: 18,
      images: ["https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "YETI Rambler 20 oz Stainless Steel Tumbler",
      description: "Double-wall vacuum insulated tumbler that keeps your beverages cold or hot for hours on end.",
      price: 35,
      stock: 200,
      images: ["https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80"],
      category: "Home & Kitchen"
    },
    {
      name: "Philips Hue White & Color Ambiance Smart Bulb",
      description: "Voice-activated smart LED bulb. Create ambiance with millions of colors and shades of white light.",
      price: 49,
      stock: 150,
      images: ["https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80"],
      category: "Home & Kitchen"
    },
    // Sports
    {
      name: "Manduka PRO Yoga Mat",
      description: "Ultra-dense cushioning provides superior support, stability, and joint protection during yoga practice.",
      price: 129,
      stock: 85,
      images: ["https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Bowflex SelectTech 552 Adjustable Dumbbells",
      description: "Replaces 15 sets of weights. Weight adjusts from 5 to 52.5 lbs with a simple turn of a dial.",
      price: 429,
      stock: 12,
      images: ["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Hydro Flask Standard Mouth Water Bottle",
      description: "TempShield insulation eliminates condensation and keeps beverages cold up to 24 hours or hot up to 12 hours.",
      price: 34,
      stock: 110,
      images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Fitbit Charge 5 Advanced Fitness Tracker",
      description: "Track your health with built-in GPS, stress management tools, sleep tracking, and a 24/7 heart rate monitor.",
      price: 149,
      stock: 75,
      images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b9?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Garmin Forerunner 245 GPS Running Smartwatch",
      description: "Evaluates your training status to indicate if you're undertraining or overdoing it. Offers advanced running dynamics.",
      price: 299,
      stock: 45,
      images: ["https://images.unsplash.com/photo-1508380702597-707c1b00695c?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Spalding NBA Official Game Basketball",
      description: "The official ball of the NBA. Full grain leather cover that turns buttery soft after breaking in.",
      price: 169,
      stock: 25,
      images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Titleist Pro V1 Golf Balls",
      description: "Provides total performance from tee to green with penetrating flight and very soft feel.",
      price: 54,
      stock: 200,
      images: ["https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=500&q=80"],
      category: "Sports"
    },
    {
      name: "Everlast Pro Style Training Boxing Gloves",
      description: "Premium synthetic leather along with superior construction increases durability for rigorous training sessions.",
      price: 39,
      stock: 60,
      images: ["https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80"],
      category: "Sports"
    },
    // Accessories
    {
      name: "Herschel Little America Backpack",
      description: "A popular mountaineering silhouette elevated with modern functionality, featuring a padded laptop sleeve.",
      price: 109,
      stock: 90,
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Fossil Men's Minimalist Stainless Steel Watch",
      description: "A sleek, incredibly thin case features a clean, simple dial with genuine leather strap.",
      price: 115,
      stock: 55,
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Ray-Ban Classic Aviator Sunglasses",
      description: "Originally designed for U.S. aviators, this iconic design provides superior protection and style.",
      price: 160,
      stock: 70,
      images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Bellroy Slim Sleeve Leather Wallet",
      description: "A beautifully slim wallet constructed with premium, environmentally certified leather.",
      price: 79,
      stock: 120,
      images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Apple Watch Series 8",
      description: "Your essential companion for a healthy life is now even more powerful. Features advanced health sensors.",
      price: 399,
      stock: 80,
      images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Peak Design Everyday Messenger Bag",
      description: "An incredibly versatile and durable messenger bag designed for creatives, commuters, and photographers.",
      price: 229,
      stock: 35,
      images: ["https://images.unsplash.com/photo-1554342872-034a06541bad?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Oakley Holbrook Square Sunglasses",
      description: "A timeless, classic design fused with modern Oakley technology for performance and active lifestyles.",
      price: 140,
      stock: 45,
      images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80"],
      category: "Accessories"
    },
    {
      name: "Samsonite Omni PC Hardside Expandable Luggage",
      description: "Built to take on the harshest travel elements. Features spinner wheels and a TSA-compatible lock.",
      price: 169,
      stock: 40,
      images: ["https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&q=80"],
      category: "Accessories"
    }
  ]
);
