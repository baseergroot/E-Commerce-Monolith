import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import Product from "../../models/product";
import Order from "../../models/order";

export interface ProductPayload {
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
}

export interface ProductsResponse {
  success: boolean;
  products?: any[];
  message?: string;
}

export interface SingleProductResponse {
  success: boolean;
  product?: any;
  message?: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface RecommendationResponse {
  success: boolean;
  result?: any[];
  length?: number;
  message?: string;
}

export interface SeedResponse {
  success: boolean;
  message: string;
  products?: any[];
  error?: any;
}

export interface SearchResponse {
  success: boolean;
  result?: any[];
  message?: string;
}

export interface OrderPayload {
  user: {
    email: string;
    name: string;
    phone: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export interface OrderResponse {
  success: boolean;
  order?: any;
  message?: string;
}

@Route("api/v1/products")
export class ProductsController extends Controller {
  /**
   * IMPORTANT: "recommend" is placed above "{id}" so Express/TSOA matches
   * the exact path '/api/v1/products/recommend' before attempting to match 
   * 'recommend' as a dynamic {id} argument.
   */
  @Get("recommend")
  public async getRecommendedProducts(
    @Query() catagory?: string
  ): Promise<RecommendationResponse> {
    if (!catagory) {
      this.setStatus(400);
      return { success: false, message: "Catagory is required" };
    }
    try {
      // only get 5 products based on the catagory (case-insensitive)
      const result = await Product.find({
        category: {
          $regex: catagory as string,
          $options: "i",
        },
      }).limit(5);

      if (!result) {
        this.setStatus(404);
        return { success: false, message: "No products found" };
      }

      return { success: true, result, length: result.length };
    } catch (error) {
      console.error("Error fetching orders", error);
      this.setStatus(500);
      return {
        success: false,
        message: "Internal server error at recommendProductsRouter",
      };
    }
  }

  @Get("seed")
  public async seedProducts(): Promise<SeedResponse> {
    try {
      const adjectives = ["Wireless", "Smart", "Portable", "Ergonomic", "Premium", "Durable", "Compact", "Luxury", "Classic", "Modern"];
      const nouns = ["Headphones", "Speaker", "Monitor", "Keyboard", "Mouse", "Jacket", "Sneakers", "Backpack", "Watch", "Camera"];
      const categories = ["Electronics", "Clothing", "Home & Kitchen", "Sports", "Accessories"];

      const productsToSeed = [];

      for (let i = 1; i <= 50; i++) {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const category = categories[i % categories.length];
        
        productsToSeed.push({
          name: `${adjective} ${noun} ${i}`,
          description: `This ${adjective.toLowerCase()} ${noun.toLowerCase()} is perfect for your everyday needs. Highly recommended in the ${category} category.`,
          price: Math.floor(Math.random() * 1000) + 15,
          stock: Math.floor(Math.random() * 50) + 5,
          images: [`https://via.placeholder.com/300?text=${adjective}+${noun}`],
          category: category
        });
      }

      await Product.deleteMany({});
      const inserted = await Product.insertMany(productsToSeed);
      
      return { success: true, message: `Successfully seeded ${inserted.length} products.`, products: inserted };
    } catch (error) {
      console.error("Failed to seed products", error);
      this.setStatus(500);
      return { success: false, message: "Failed to seed products", error };
    }
  }

  @Post("order")
  public async placeOrder(
    @Body() requestBody: OrderPayload
  ): Promise<OrderResponse> {
    const { user, items, total } = requestBody;

    if (!user || !items || !total) {
      this.setStatus(400);
      return { success: false, message: "All fields are required" };
    }
    try {
      const order = await Order.create({ user, items, total });
      return { success: true, order };
    } catch (error) {
      console.error("Error fetching orders", error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }

  @Get("search")
  public async searchProducts(
    @Query() searchTerm?: string
  ): Promise<SearchResponse> {
    if (!searchTerm) {
      this.setStatus(400);
      return { success: false, message: "All fields are required" };
    }
    try {
      const term = searchTerm as string;
      const result = await Product.find({
        $or: [
          { name: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
          { category: { $regex: term, $options: "i" } }
        ]
      });

      return { success: true, result };
    } catch (error) {
      console.error("Error fetching orders", error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }

  @Get()
  public async getProducts(): Promise<ProductsResponse> {
    try {
      const products = await Product.find();
      return { success: true, products };
    } catch (error) {
      console.error("Error fetching products", error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }

  @Get("{id}")
  public async getProduct(@Path() id: string): Promise<SingleProductResponse> {
    try {
      const product = await Product.findById(id);

      if (!product) {
        this.setStatus(404);
        return { success: false, message: "No product with this ID found" };
      }

      return { success: true, product };
    } catch (error) {
      console.error("Error fetching product", error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createProduct(
    @Body() requestBody: ProductPayload
  ): Promise<ActionResponse> {
    const { name, price, description, images, category, stock } = requestBody;

    if (!name || !price || !description || !images || !category || !stock) {
      this.setStatus(400);
      return { success: false, message: "Missing product details" };
    }

    await Product.create({ name, price, description, images, category, stock });
    this.setStatus(201);
    return { success: true, message: "Product is created successfully" };
  }

  @Put("{id}")
  public async updateProduct(
    @Path() id: string,
    @Body() requestBody: ProductPayload
  ): Promise<ActionResponse> {
    const product = await Product.findById(id);

    if (!product) {
      this.setStatus(404);
      return { success: false, message: "No product with this ID found" };
    }

    const { name, price, description, images, category, stock } = requestBody;

    if (!name || !price || !description || !images || !category || !stock) {
      this.setStatus(400);
      return { success: false, message: "Missing product details" };
    }

    try {
      await Product.updateOne(
        { _id: id },
        { name, price, description, images, category, stock }
      );
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.log(error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }

  @Delete("{id}")
  public async deleteProduct(@Path() id: string): Promise<ActionResponse> {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        this.setStatus(404);
        return { success: false, message: "No product with this ID found" };
      }

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.log(error);
      this.setStatus(500);
      return { success: false, message: "Internal server error" };
    }
  }
}
