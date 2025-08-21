import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TISellerProfile, SellerProfilesTable } from "../Drizzle/schema"


export const createSellerProfileService = async(sellerProfile: TISellerProfile) => {
    const [ inserted ] = await db.insert(SellerProfilesTable).values(sellerProfile).returning()
    if(inserted){
        return "seller profile created successfully"
    }

    return null
}



export const getAllSellerProfileService = async() => {
    const sellerProfile = await db.query.SellerProfilesTable.findMany({
        columns:{
            sellerProfileId: true,
            userId: true,
            businessName: true,
            category: true,
            description: true,
            location: true,
            contactPhone: true,
            contactEmail: true,
            businessLicenseNumber: true,
            nationalIdNumber: true,
            verificationDocumentsUrl: true,
            verified: true,
            rejected: true,
            adminComment: true,
            rating: true,
        }
      
    })
      return sellerProfile
    
}

// get Seller by id
export const getSellerProfileByIdService = async (id: number) => {
    const sellerProfile = await db.query.SellerProfilesTable.findFirst({
        where: eq(SellerProfilesTable.sellerProfileId, id)
    })
    return sellerProfile;
}


// update seller profile by id
export const updateSellerProfileService = async (id: number, sellerProfile: TISellerProfile) => {
    await db.update(SellerProfilesTable).set(sellerProfile).where(eq(SellerProfilesTable.sellerProfileId, id)).returning();
    return "Seller profile updated successfully";
}

// delete Booking by id
export const deleteSellerProfileService = async (id: number) => {
    await db.delete(SellerProfilesTable).where(eq(SellerProfilesTable.sellerProfileId, id))
    return "Seller Profile deleted successfully";
}

