import { Express } from 'express'

import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from './categories.controller'

export const category = (app: Express) => {

    //Get all category
    app.route("/category").get(
        async( req, res, next) => {
            try {
                await getAllCategoriesController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a category
    app.route("/category").post(
      async(req, res , next) => {
        try {
          await createCategoryController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get category by id
       app.route("/category/:id").get(
      
          async (req, res, next) => {
            try {
              await getCategoryByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update category by ID
    
      app.route("/category/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateCategoryController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete category by id
      
      app.route("/category/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteCategoryController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default category
    