import { Request, Response } from 'express';
import { createCategoryService, deleteCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from './catgories.service';

 
export const createCategoryController = async(req: Request, res:Response) => {

  try {

    const categoryItems = req.body

    //convert date to date object
    if( categoryItems.createdAt || categoryItems.verifiedAt ){

      categoryItems.createdAt = new Date(categoryItems.createdAt)
      categoryItems.verifiedAt = new Date(categoryItems.verifiedAt)
    }
    const createdCategoryItems = await createCategoryService(categoryItems)
    if(!createdCategoryItems) return res.json({message: "Category items not created"})
    return res.status(201).json({message:createdCategoryItems})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllCategoriesController = async(req: Request, res:Response) => {
    try {
        const categoryItems = await getAllCategoriesService()
        if(!categoryItems) return res.json({message: "No category items found"})
        return res.status(200).json({message:"Category items fetched successfully", categoryItems})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getCategoryByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const CategoryItems = await getCategoryByIdService(id);

    if (!CategoryItems) return res.status(404).json({ message: "Category items not found" });


    return res.status(200).json( CategoryItems);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const CategorysData = req.body;
    //convert date to date object
    if( CategorysData.createdAt ){
      CategorysData.createdAt = new Date(CategorysData.createdAt)
    }


    const existingCategoryItems = await getCategoryByIdService(id);
    if (!existingCategoryItems) {
      return res.status(404).json({ message: "Category item not found" });
    }


    const updatedCategoryItems = await updateCategoryService(id, CategorysData);
     if (!updatedCategoryItems) {
            return res.status(400).json({ message: "Category item not updated" });
        }
    return res.status(200).json({ message: "Category item updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingCategoryItems = await getCategoryByIdService(id);
    if(!existingCategoryItems){
      return res.status(404).json({ message: "Category item not found" });
    }

    const deletedCategoryItems = await deleteCategoryService(id);

    if(!deletedCategoryItems){
      return res.status(400).json({ message: "Category item not deleted" })
    }


    return res.status(200).json({ message: "Category item deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

