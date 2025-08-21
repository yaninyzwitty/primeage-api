import { Express } from 'express'


import { createMessageController, deleteMessageController, getAllMessagesController, getMessageByIdController, updateMessageController } from './messages.controler'

export const message = (app: Express) => {

    //Get all message
    app.route("/messages").get(
        async( req, res, next) => {
            try {
                await getAllMessagesController(req, res)
            } catch (error) {
                next(error)
            }
        }
    )

    //Add a message
    app.route("/message").post(
      async(req, res , next) => {
        try {
          await createMessageController(req, res)
          
        } catch (error) {
          next(error)
          
        }
      }
    )


    //Get message by id
       app.route("/message/:id").get(
      
          async (req, res, next) => {
            try {
              await getMessageByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update message by ID
    
      app.route("/message/:id").put(
        
      
        async (req, res, next) => {
          try {
            await updateMessageController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete message by id
      
      app.route("/message/:id").delete(
        
    
        async (req, res, next) => {
          try {
            await deleteMessageController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

     


}

export default message
    