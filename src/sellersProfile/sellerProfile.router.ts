import { Express } from 'express'
import { createSellerProfileController, deleteSellerProfileController, getAllSellerProfilesController, getSellerProfileByIdController, updateSellerProfileController } from './sellerProfile.controller'

export const sellerProfile = (app: Express) => {

  //Add a sellerProfile
  app.route("/sellerProfile").post(
    async(req, res , next) => {
      try {
        await createSellerProfileController(req, res)
        
      } catch (error) {
        next(error)
        
      }
    }
  )
    //Get all sellerProfile
    app.route("/sellerProfile").get(
        async( req, res, next) => {
            try {
                await getAllSellerProfilesController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )



    //Get sellerProfile by id
       app.route("/sellerProfile/:id").get(
      
          async (req, res, next) => {
            try {
              await getSellerProfileByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update sellerProfile by ID
    
      app.route("/sellerProfile/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateSellerProfileController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete sellerProfile by id
      
      app.route("/sellerProfile/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteSellerProfileController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default sellerProfile
    