import { eq } from "drizzle-orm"
import db from "../Drizzle/db"
import { CategoriesTable, TICategory } from "../Drizzle/schema"


export const createCategoryService = async(categories: TICategory) => {
    const [ inserted ] = await db.insert(CategoriesTable).values(categories).returning()
    if(inserted){
        return "Category created successfully"
    }

    return null
}



export const getAllCategoriesService = async() => {
    const categories = await db.query.CategoriesTable.findMany({
        columns:{
            categoryId: true,
            name: true,
            description: true
        }
      
    })
      return categories;

}

// get category by id
export const getCategoryByIdService = async (id: number) => {
    const category = await db.query.CategoriesTable.findFirst({
        where: eq(CategoriesTable.categoryId, id)
    })
    return category;
}


// update Category by id
export const updateCategoryService = async (id: number, category: TICategory) => {
    await db.update(CategoriesTable).set(category).where(eq(CategoriesTable.categoryId, id)).returning();
    return "Category updated successfully";
}

// delete Category by id
export const deleteCategoryService = async (id: number) => {
    await db.delete(CategoriesTable).where(eq(CategoriesTable.categoryId, id))
    return "Category deleted successfully";
}

