import { eq } from "drizzle-orm"
import db from "../Drizzle/db"
import { SupportTicketsTable, TISupportTickets } from "../Drizzle/schema"


export const createSupportTicketService = async(SupportTickets: TISupportTickets) => {
    const [ inserted ] = await db.insert(SupportTicketsTable).values(SupportTickets).returning()
    if(inserted){
        return "Support ticket created successfully"
    }

    return null
}



export const getAllSupportTicketsService = async() => {
    const SupportTickets = await db.query.SupportTicketsTable.findMany({
        columns:{
            ticketId: true,
            userId: true,
            subject: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
      
    })
      return SupportTickets;

}

// get SupportTicket by id
export const getSupportTicketByIdService = async (id: number) => {
    const SupportTicket = await db.query.SupportTicketsTable.findFirst({
        where: eq(SupportTicketsTable.ticketId, id)
    })
    return SupportTicket;
}


// update SupportTicket by id
export const updateSupportTicketService = async (id: number, supportTicket: TISupportTickets) => {
    await db.update(SupportTicketsTable).set(supportTicket).where(eq(SupportTicketsTable.ticketId, id)).returning();
    return "Support ticket updated successfully";
}

// delete SupportTicket by id
export const deleteSupportTicketService = async (id: number) => {
    await db.delete(SupportTicketsTable).where(eq(SupportTicketsTable.ticketId, id))
    return "Support ticket deleted successfully";
}

