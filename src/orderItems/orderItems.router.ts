import { Express } from 'express'


import { createOrderItemsController, deleteOrderItemsController, getAllOrderItemsController, getOrderItemsByIdController, updateOrderItemsController } from './orderItems.controller'

export const orderItem = (app: Express) => {

    //Get all order items
    app.route("/orderItems").get(
        async( req, res, next) => {
            try {
                await getAllOrderItemsController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a order item
    app.route("/orderItem").post(
      async(req, res , next) => {
        try {
          await createOrderItemsController(req, res)

        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get order by id
       app.route("/orderItem/:id").get(
      
          async (req, res, next) => {
            try {
              await getOrderItemsByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update order by ID
    
      app.route("/orderItem/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateOrderItemsController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete order by id
      
      app.route("/orderItem/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteOrderItemsController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default orderItem;
