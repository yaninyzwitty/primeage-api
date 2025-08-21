import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIProduct,  ProductsTable } from "../Drizzle/schema"


export const createProductService = async(products: TIProduct) => {
    const [ inserted ] = await db.insert(ProductsTable).values(products).returning()
    if(inserted){
        return "Product created successfully"
    }

    return null
}



export const getAllProductsService = async() => {
    const products = await db.query.ProductsTable.findMany({
        columns:{
            productId: true,
            sellerProfileId: true,
            categoryId: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            imageUrl: true,
            createdAt: true,
        }
      
    })
      return products;

}

// get Product by id
export const getProductByIdService = async (id: number) => {
    const product = await db.query.ProductsTable.findFirst({
        where: eq(ProductsTable.productId, id)
    })
    return product;
}


// update Product by id
export const updateProductService = async (id: number, product: TIProduct) => {
    await db.update(ProductsTable).set(product).where(eq(ProductsTable.productId, id)).returning();
    return "Product updated successfully";
}

// delete Product by id
export const deleteProductService = async (id: number) => {
    await db.delete(ProductsTable).where(eq(ProductsTable.productId, id))
    return "Product deleted successfully";
}

