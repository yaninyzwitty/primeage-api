import { Express } from 'express'

import { createOrderController,  deleteOrderController,   getAllOrdersController,  getOrderByIdController,  updateOrderController } from './orders.controller'

export const order = (app: Express) => {

    //Get all order
    app.route("/orders").get(
        async( req, res, next) => {
            try {
                await getAllOrdersController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a order
    app.route("/order").post(
      async(req, res , next) => {
        try {
          await createOrderController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get order by id
       app.route("/order/:id").get(
      
          async (req, res, next) => {
            try {
              await getOrderByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update order by ID
    
      app.route("/order/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateOrderController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete order by id
      
      app.route("/order/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteOrderController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default order
    