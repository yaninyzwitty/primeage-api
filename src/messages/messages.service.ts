import { eq } from "drizzle-orm"
import db from "../Drizzle/db"
import { MessagesTable, TIMessage } from "../Drizzle/schema"


export const createMessageService = async(Messages: TIMessage) => {
    const [ inserted ] = await db.insert(MessagesTable).values(Messages).returning()
    if(inserted){
        return "Message created successfully"
    }

    return null
}



export const getAllMessagesService = async() => {
    const messages = await db.query.MessagesTable.findMany({
        columns:{
            messageId: true,
            senderId: true,
            receiverId: true,
            content: true,
            createdAt: true
            
        }
      
    })
      return messages;

}

// get Message by id
export const getMessageByIdService = async (id: number) => {
    const message = await db.query.MessagesTable.findFirst({
        where: eq(MessagesTable.messageId, id)
    })
    return message;
}


// update Message by id
export const updateMessageService = async (id: number, Message: TIMessage) => {
    await db.update(MessagesTable).set(Message).where(eq(MessagesTable.messageId, id)).returning();
    return "Message updated successfully";
}

// delete Message by id
export const deleteMessageService = async (id: number) => {
    await db.delete(MessagesTable).where(eq(MessagesTable.messageId, id))
    return "Message deleted successfully";
}

