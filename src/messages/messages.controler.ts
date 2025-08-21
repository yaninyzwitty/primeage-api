import { Request, Response } from 'express';
import { createMessageService, deleteMessageService, getAllMessagesService, getMessageByIdService, updateMessageService } from './messages.service';

 
export const createMessageController = async(req: Request, res:Response) => {

  try {

    const message = req.body

    //convert date to date object
    if( message.createdAt  ){

      message.createdAt = new Date(message.createdAt)
    }
    const createdMessage = await createMessageService(message)
    if(!createdMessage) return res.json({message: "Message  not created"})
    return res.status(201).json({message:createdMessage})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllMessagesController = async(req: Request, res:Response) => {
    try {
        const message = await getAllMessagesService()
        if(!message) return res.json({message: "No Message  found"})
        return res.status(200).json({message:"Message  fetched successfully"})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getMessageByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const message = await getMessageByIdService(id);

    if (!message) return res.status(404).json({ message: "Message  not found" });


    return res.status(200).json( message);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateMessageController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const messagesData = req.body;
    //convert date to date object
    if( messagesData.createdAt ){
      messagesData.createdAt = new Date(messagesData.createdAt)
    }


    const existingMessage = await getMessageByIdService(id);
    if (!existingMessage) {
      return res.status(404).json({ message: "Message  not found" });
    }


    const updatedMessage = await updateMessageService(id, messagesData);
     if (!updatedMessage) {
            return res.status(400).json({ message: "Message  not updated" });
        }
    return res.status(200).json({ message: "Message  updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteMessageController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingMessage = await getMessageByIdService(id);
    if(!existingMessage){
      return res.status(404).json({ message: "Message  not found" });
    }

    const deletedMessage = await deleteMessageService(id);

    if(!deletedMessage){
      return res.status(400).json({ message: "Message not deleted" })
    }


    return res.status(200).json({ message: "Message  deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

