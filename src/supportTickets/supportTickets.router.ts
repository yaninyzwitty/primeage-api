import { Express } from 'express'


import { createSupportTicketsController, deleteSupportTicketsController, getAllCategoriesController, getSupportTicketsByIdController, updateSupportTicketsController } from './supportTickets.controller'


export const supportTickets = (app: Express) => {

    //Get all supportTickets
    app.route("/supportTickets").get(
        async( req, res, next) => {
            try {
                await getAllCategoriesController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a supportTickets
    app.route("/supportTickets").post(
      async(req, res , next) => {
        try {
          await createSupportTicketsController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get supportTickets by id
       app.route("/supportTickets/:id").get(
      
          async (req, res, next) => {
            try {
              await getSupportTicketsByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update supportTickets by ID
    
      app.route("/supportTickets/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateSupportTicketsController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete supportTickets by id
      
      app.route("/supportTickets/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteSupportTicketsController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default supportTickets
    