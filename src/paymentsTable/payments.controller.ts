import { Request, Response } from 'express';
import { createPaymentService, deletePaymentService, getAllPaymentsService, getPaymentByIdService, updatePaymentService } from './payments.service';

 
export const createPaymentController = async(req: Request, res:Response) => {

  try {

    const paymentItems = req.body

    //convert date to date object
    if( paymentItems.createdAt || paymentItems.verifiedAt ){

      paymentItems.createdAt = new Date(paymentItems.createdAt)
      paymentItems.verifiedAt = new Date(paymentItems.verifiedAt)
    }
    const createdPaymentItems = await createPaymentService(paymentItems)
    if(!createdPaymentItems) return res.json({message: "Payment items not created"})
    return res.status(201).json({message:createdPaymentItems})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllPaymentsController = async(req: Request, res:Response) => {
    try {
        const PaymentItems = await getAllPaymentsService()
        if(!PaymentItems) return res.json({message: "No Payment items found"})
        return res.status(200).json({message:"Payment items fetched successfully", PaymentItems})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const PaymentItems = await getPaymentByIdService(id);

    if (!PaymentItems) return res.status(404).json({ message: "Payment items not found" });


    return res.status(200).json( PaymentItems);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updatePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const paymentsData = req.body;
    //convert date to date object
    if( paymentsData.createdAt ){
      paymentsData.createdAt = new Date(paymentsData.createdAt)
    }


    const existingPaymentItems = await getPaymentByIdService(id);
    if (!existingPaymentItems) {
      return res.status(404).json({ message: "Payment items not found" });
    }


    const updatedPaymentItems = await updatePaymentService(id, paymentsData);
     if (!updatedPaymentItems) {
            return res.status(400).json({ message: "Payment items not updated" });
        }
    return res.status(200).json({ message: "Payment items updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePaymentController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingPaymentItems = await getPaymentByIdService(id);
    if(!existingPaymentItems){
      return res.status(404).json({ message: "Payment items not found" });
    }

    const deletedPaymentItems = await deletePaymentService(id);

    if(!deletedPaymentItems){
      return res.status(400).json({ message: "Payment items not deleted" })
    }


    return res.status(200).json({ message: "Payment items deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

