import { Request, Response } from 'express';
import { createSellerProfileService, deleteSellerProfileService, getAllSellerProfileService, getSellerProfileByIdService,  updateSellerProfileService } from "./sellerProfile.service"
 
export const createSellerProfileController = async(req: Request, res:Response) => {

  try {

    const sellerProfile = req.body

    //convert date to date object
    if( sellerProfile.createdAt || sellerProfile.verifiedAt ){
      
      sellerProfile.createdAt = new Date(sellerProfile.createdAt)
      sellerProfile.verifiedAt = new Date(sellerProfile.verifiedAt)
    }
    const createdSellerProfile = await createSellerProfileService(sellerProfile)
    if(!createdSellerProfile) return res.json({message: "Seller profile not created"})
    return res.status(201).json({message:createdSellerProfile})
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllSellerProfilesController = async(req: Request, res:Response) => {
    try {
        const sellerProfiles = await getAllSellerProfileService()
        if(!sellerProfiles) return res.json({message: "No seller profiles found"})
        return res.status(200).json({message:"seller profiles fetched succesfully",sellerProfiles})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getSellerProfileByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const sellerProfile = await getSellerProfileByIdService(id);

    if (!sellerProfile) return res.status(404).json({ message: "sellerProfile not found" });


    return res.status(200).json( sellerProfile);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateSellerProfileController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const sellerProfileData = req.body;
    //convert date to date object
    if( sellerProfileData.createdAt || sellerProfileData.verifiedAt ){
      
      sellerProfileData.createdAt = new Date(sellerProfileData.createdAt)
      sellerProfileData.verifiedAt = new Date(sellerProfileData.verifiedAt)
    }


    const existingsellerProfile = await getSellerProfileByIdService(id);
    if (!existingsellerProfile) {
      return res.status(404).json({ message: "Seller profile not found" });
    }


    const updatedsellerProfile = await updateSellerProfileService(id, sellerProfileData);
     if (!updatedsellerProfile) {
            return res.status(400).json({ message: "Seller profile not updated" });
        }
    return res.status(200).json({ message: "Seller profile updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSellerProfileController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingsellerProfile = await deleteSellerProfileService(id);
    if(!existingsellerProfile){
      return res.status(404).json({ message: "Seller profile not found" });
    }

    const deletedsellerProfile = await deleteSellerProfileService(id);

    if(!deletedsellerProfile){
      return res.status(400).json({ message: "Seller profile not deleted" })
    }


    return res.status(200).json({ message: "Seller profile deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

