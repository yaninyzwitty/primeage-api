import { eq } from "drizzle-orm"
import db from "../Drizzle/db"
import { PaymentsTable, TIPayment } from "../Drizzle/schema"


export const createPaymentService = async(Payments: TIPayment) => {
    const [ inserted ] = await db.insert(PaymentsTable).values(Payments).returning()
    if(inserted){
        return "Payment created successfully"
    }

    return null
}



export const getAllPaymentsService = async() => {
    const payments = await db.query.PaymentsTable.findMany({
        columns:{
            paymentId: true,
            orderId: true,
            amount: true,
            paymentStatus: true,
            paymentMethod: true,
            paymentDate: true,
            transactionId: true,
            createdAt: true,
            updatedAt: true
        }
      
    })
      return payments;

}

// get Payment by id
export const getPaymentByIdService = async (id: number) => {
    const payment = await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.paymentId, id)
    })
    return payment;
}


// update Payment by id
export const updatePaymentService = async (id: number, payment: TIPayment) => {
    await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.paymentId, id)).returning();
    return "Payment updated successfully";
}

// delete Payment by id
export const deletePaymentService = async (id: number) => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, id))
    return "Payment deleted successfully";
}

