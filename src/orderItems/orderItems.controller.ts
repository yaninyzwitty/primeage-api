import { Request, Response } from 'express';
import { createOrderItemsService, deleteOrderItemsService,  getAllOrderItemsService,  getOrderItemsByIdService, updateOrderItemsService } from "./orderItems.service";
import { getOrderByIdService } from '../orders/orders.service';
 
export const createOrderItemsController = async(req: Request, res:Response) => {

  try {

    const orderItems = req.body

    //check if order exists

    const order = await getOrderByIdService(orderItems.orderId)

    if(!order){
            return res.status(400).json({ message: `Order with ID ${orderItems.orderId} does not exist.` });

    }


    //convert date to date object
    if( orderItems.createdAt || orderItems.verifiedAt ){

      orderItems.createdAt = new Date(orderItems.createdAt)
      orderItems.verifiedAt = new Date(orderItems.verifiedAt)
    }
    const createdOrderItems = await createOrderItemsService(orderItems)
    if(!createdOrderItems) return res.json({message: "OrderItems not created"})
    return res.status(201).json({message:createdOrderItems})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllOrderItemsController = async(req: Request, res:Response) => {
    try {
        const orderItems = await getAllOrderItemsService()
        if(!orderItems) return res.json({message: "No order items found"})
        return res.status(200).json({message:"Order items fetched successfully", orderItems})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getOrderItemsByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const orderItems = await getOrderItemsByIdService(id);

    if (!orderItems) return res.status(404).json({ message: "Order items not found" });


    return res.status(200).json( orderItems);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateOrderItemsController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const orderItemsData = req.body;
    //convert date to date object
    if( orderItemsData.createdAt ){
      orderItemsData.createdAt = new Date(orderItemsData.createdAt)
    }


    const existingOrderItems = await getOrderItemsByIdService(id);
    if (!existingOrderItems) {
      return res.status(404).json({ message: "OrderItems not found" });
    }


    const updatedOrderItems = await updateOrderItemsService(id, orderItemsData);
     if (!updatedOrderItems) {
            return res.status(400).json({ message: "Order items not updated" });
        }
    return res.status(200).json({ message: "Order items updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrderItemsController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingOrderItems = await deleteOrderItemsService(id);
    if(!existingOrderItems){
      return res.status(404).json({ message: "Order items not found" });
    }

    const deletedOrderItems = await deleteOrderItemsService(id);

    if(!deletedOrderItems){
      return res.status(400).json({ message: "Order items not deleted" })
    }


    return res.status(200).json({ message: "Order items deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

