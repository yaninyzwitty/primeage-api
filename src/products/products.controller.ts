import { Request, Response } from 'express';
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "./products.service";
 
export const createProductController = async(req: Request, res:Response) => {

  try {

    const product = req.body

    //convert date to date object
    if( product.createdAt || product.verifiedAt ){
      
      product.createdAt = new Date(product.createdAt)
      product.verifiedAt = new Date(product.verifiedAt)
    }
    const createdProduct = await createProductService(product)
    if(!createdProduct) return res.json({message: "Product not created"})
    return res.status(201).json({message:createdProduct})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllProductsController = async(req: Request, res:Response) => {
    try {
        const products = await getAllProductsService()
        if(!products) return res.json({message: "No Products found"})
        return res.status(200).json({message:"Products fetched succesfully",products})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const product = await getProductByIdService(id);

    if (!product) return res.status(404).json({ message: "Product not found" });


    return res.status(200).json( product);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const productData = req.body;
    //convert date to date object
    if( productData.createdAt ){
      productData.createdAt = new Date(productData.createdAt)
    }


    const existingProduct = await getProductByIdService(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }


    const updatedProduct = await updateProductService(id, productData);
     if (!updatedProduct) {
            return res.status(400).json({ message: "Product not updated" });
        }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingProduct = await deleteProductService(id);
    if(!existingProduct){
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await deleteProductService(id);

    if(!deletedProduct){
      return res.status(400).json({ message: "Product not deleted" })
    }


    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

