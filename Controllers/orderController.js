import order from "../models/order.js"
import Product from "../models/product.js"

export default async function createOrder(req,res){
 
    const user = req.User

    if(user == null){
        res.status(401).json({
            message : "You need to login first to create an order"
        })
        return
    }

    const orderData =  {
        orderId : "ORD00000001",
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        addressLineOne : req.body.addressLineOne,
        addressLineTwo : req.body.addressLineTwo,
        city : req.body.city,
        state : req.body.state,
        date : user.date,
        total : 0,
        postalcode : req.body.postalcode,
        phoneNumber : req.body.phoneNumber,
       items : []


    }

    if(req.body.firstName != null && req.body.firstName != ""){
        orderData.firstName = req.body.firstName
    }
    if(req.body.lastName != null && req.body.lastName != ""){
        orderData.lastName = req.body.lastName
    }

    try{
        const lastOrder = await order.findOne().sort({date: -1})
        
        if(lastOrder != null){
            const lastOrderId = lastOrder.orderId
            const lastOrderNumInString = lastOrderId.replace("ORD" , "")//order Id is Still a string
            const lastOrderNumber = parseInt(lastOrderNumInString)
            const newOrderNumber = lastOrderNumber + 1;
            const paddedNewOrderNumberinString = newOrderNumber.toString().padStart(8 , "0")

            orderData.orderId =  "ORD" + paddedNewOrderNumberinString //00000001
        }
    
     for(let i=0 ; i<req.body.items.length; i++){
        const product = await Product.findOne(
            
            { 
                productId : req.body.items[i].productId
    
            }
            
        )
        if(product == null || !product.isAvailable){
            res.status(400).json({
                message : "Product with ProductId " + req.body.items[i].productId + " not found.Please place your order without this product"
            })
            return
        }else{
            orderData.items.push({
                Product : {
                    productId : product.productId,
                    name : product.name,
                    price : product.price,
                    labelledPrice : product.labelledPrice,
                    image : product.images[0]
                },
                quantity : req.body.items[i].quantity
            })

            orderData.total += product.price * req.body.items[i].quantity
        }
     }
    
     const newOrder = new order(orderData)
     await newOrder.save()


     res.status(201).json({
        message : "Order Placed Sucessfully"
     })
    
    }catch(error){
        res.status(500).json({
            message : "error creating order"
        })
    }
}