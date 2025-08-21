import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIOrder, OrdersTable } from "../Drizzle/schema"


export const createOrderService = async(orders: TIOrder) => {
    const [ inserted ] = await db.insert(OrdersTable).values(orders).returning()
    if(inserted){
        return "Order created successfully"
    }

    return null
}



export const getAllOrdersService = async() => {
    const orders = await db.query.OrdersTable.findMany({
        columns:{
            orderId: true,
            userId: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            updatedAt: true

        }
      
    })
      return orders;

}

// get Order by id
export const getOrderByIdService = async (id: number) => {
    const order = await db.query.OrdersTable.findFirst({
        where: eq(OrdersTable.orderId, id)
    })
    return order;
}


// update Order by id
export const updateOrderService = async (id: number, order: TIOrder) => {
    await db.update(OrdersTable).set(order).where(eq(OrdersTable.orderId, id)).returning();
    return "Order updated successfully";
}

// delete Order by id
export const deleteOrderService = async (id: number) => {
    await db.delete(OrdersTable).where(eq(OrdersTable.orderId, id))
    return "Order deleted successfully";
}

