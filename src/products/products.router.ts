import { Express } from 'express'

import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from './products.controller'

export const product = (app: Express) => {

    //Get all product
    app.route("/products").get(
        async( req, res, next) => {
            try {
                await getAllProductsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a product
    app.route("/product").post(
      async(req, res , next) => {
        try {
          await createProductController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get product by id
       app.route("/product/:id").get(
      
          async (req, res, next) => {
            try {
              await getProductByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update product by ID
    
      app.route("/product/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateProductController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete product by id
      
      app.route("/product/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteProductController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default product
    