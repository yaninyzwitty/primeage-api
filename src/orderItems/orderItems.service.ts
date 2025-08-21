import { eq } from "drizzle-orm"
import db from "../Drizzle/db"
import { OrderItemsTable, TIOrder, TIOrderItems } from "../Drizzle/schema"


export const createOrderItemsService = async(orderItems: TIOrderItems) => {
    const [ inserted ] = await db.insert(OrderItemsTable).values(orderItems).returning()
    if(inserted){
        return "Order created successfully"
    }

    return null
}



export const getAllOrderItemsService = async() => {
    const orderItems = await db.query.OrderItemsTable.findMany({
        columns:{
            orderItemId: true,
            orderId: true,
            productId: true,
            quantity: true,
            price: true
        }
      
    })
      return orderItems;

}

// get Order by id
export const getOrderItemsByIdService = async (id: number) => {
    const orderItems = await db.query.OrderItemsTable.findFirst({
        where: eq(OrderItemsTable.orderItemId, id)
    })
    return orderItems;
}


// update Order by id
export const updateOrderItemsService = async (id: number, orderItem: TIOrderItems) => {
    await db.update(OrderItemsTable).set(orderItem).where(eq(OrderItemsTable.orderItemId, id)).returning();
    return "Order items updated successfully";
}

// delete Order by id
export const deleteOrderItemsService = async (id: number) => {
    await db.delete(OrderItemsTable).where(eq(OrderItemsTable.orderItemId, id))
    return "Order items deleted successfully";
}

