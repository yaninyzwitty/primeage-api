import { Request, Response } from 'express';
import { createSupportTicketService, deleteSupportTicketService, getAllSupportTicketsService, getSupportTicketByIdService, updateSupportTicketService } from './supportTickets.service';

 
export const createSupportTicketsController = async(req: Request, res:Response) => {

  try {

    const SupportTickets = req.body

    //convert date to date object
    if( SupportTickets.createdAt || SupportTickets.verifiedAt ){

      SupportTickets.createdAt = new Date(SupportTickets.createdAt)
      SupportTickets.verifiedAt = new Date(SupportTickets.verifiedAt)
    }
    const createdSupportTickets = await createSupportTicketService(SupportTickets)
    if(!createdSupportTickets) return res.json({message: "Support tickets  not created"})
    return res.status(201).json({message:createdSupportTickets})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllCategoriesController = async(req: Request, res:Response) => {
    try {
        const SupportTickets = await getAllSupportTicketsService()
        if(!SupportTickets) return res.json({message: "No Support tickets  found"})
        return res.status(200).json({message:"Support tickets fetched successfully", SupportTickets})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getSupportTicketsByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const SupportTickets = await getSupportTicketByIdService(id);

    if (!SupportTickets) return res.status(404).json({ message: "Support ticket  not found" });


    return res.status(200).json( SupportTickets);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateSupportTicketsController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const SupportTicketssData = req.body;
    //convert date to date object
    if( SupportTicketssData.createdAt ){
      SupportTicketssData.createdAt = new Date(SupportTicketssData.createdAt)
    }


    const existingSupportTickets = await getSupportTicketByIdService(id);
    if (!existingSupportTickets) {
      return res.status(404).json({ message: "Support tickets  not found" });
    }


    const updatedSupportTickets = await updateSupportTicketService(id, SupportTicketssData);
     if (!updatedSupportTickets) {
            return res.status(400).json({ message: "Support tickets  not updated" });
        }
    return res.status(200).json({ message: "Support tickets  updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSupportTicketsController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingSupportTickets = await getSupportTicketByIdService(id);
    if(!existingSupportTickets){
      return res.status(404).json({ message: "Support ticket  not found" });
    }

    const deletedSupportTickets = await deleteSupportTicketService(id);

    if(!deletedSupportTickets){
      return res.status(400).json({ message: "Support ticket  not deleted" })
    }


    return res.status(200).json({ message: "Support tickets  deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

