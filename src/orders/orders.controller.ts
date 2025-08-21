import { Request, Response } from 'express';

import { getOrderByIdService, updateOrderService, getAllOrdersService, createOrderService, deleteOrderService } from './orders.service';

export const createOrderController = async(req: Request, res:Response) => {

  try {

    const order = req.body

    //convert date to date object
    if( order.createdAt || order.updatedAt ){
      
      order.createdAt = new Date(order.createdAt)
      order.updatedAt = new Date(order.updatedAt)
    }
    const createdOrder = await createOrderService(order)
    if(!createdOrder) return res.json({message: "Order not created"})
    return res.status(201).json({message:createdOrder})

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }

}


export const getAllOrdersController = async(req: Request, res:Response) => {
    try {
        const orders = await getAllOrdersService()
        if(!orders) return res.json({message: "No Orders found"})
        return res.status(200).json({message:"Orders fetched succesfully",orders})

        
    } catch (error :any) {
            return res.status(500).json({ error: error.message });

        
    }
}

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const order = await getOrderByIdService(id);

    if (!order) return res.status(404).json({ message: "Order not found" });


    return res.status(200).json( order);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const orderData = req.body;
    // convert date to date object
    if(  orderData.updatedAt ){
      
      
      orderData.updatedAt = new Date(orderData.updatedAt)
    }


    const existingOrder = await getOrderByIdService(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await updateOrderService(id, orderData);
    if (!updatedOrder) {
      return res.status(400).json({ message: "Order not updated" });
    }
    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingOrder = await getOrderByIdService(id);
    if(!existingOrder){
      return res.status(404).json({ message: "Order not found" });
    }

    const deleteOrder = await deleteOrderService(id);

    if(!deleteOrder){
      return res.status(400).json({ message: "Order not deleted" })
    }


    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

