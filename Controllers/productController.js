import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied ! Admins only"
        })
        return
    }

    try{
        const existingProduct = await Product.findOne({
            productId : req.body.productId
        })

        if(existingProduct !==  null){
            res.status(400).json({
                message : "Product with this product ID is Already Exist"
            })
            return;
        }

        const newProduct = new Product({
            productId : req.body.productId,
            name : req.body.name,
            altNames : req.body.altNames,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            catagory : req.body.catagory,
            stock : req.body.stock
        })

        await newProduct.save()
        res.status(200).json({
            message : "product created sucessfully"
        })

    }catch(error){
        res.json({
            message : "Error creating product"
        })
    }
}

export async function getAllProducts(req,res){
    try{
        if(isAdmin(req)){
            const products = await Product.find();
            res.json(products)
        }else {
            const products = await Product.find({isAvailable : true});
            res.json(products)
        }


    }catch(error){
        res.status(400).json({
            message : "Error getting products"
        })
    }
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied ! Admin only"
        })
        return;
    }

    try{
        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message : "Product Deleted Sucesfully"
        })


    }catch(error){
        res.json({
            message : "error"
        })
    }
}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "You haven't any authority to update product"
        })
        return
    }

    try{
        await Product.updateOne({
            productId : req.params.productId
            
        },{
            
            name : req.body.name,
            altNames : req.body.altNames,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            catagory : req.body.catagory,
            stock : req.body.stock

        })
        res.status(200).json({
            message : "Product updated Sucessfully"
        })


    }catch(error){
        res.status(400).json({
            message : "Product update error"
        })
    }
}

export async function getProductById(req,res){
    try{
        const product = await Product.findOne({
            productId : req.params.productId
        })
        if(product == null){
            res.json({
                message : "Can't find product please try again"
            })
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                if(isAdmin(req)){
                    res.json(product)
                }else{
                    res.json({
                        message : "Access Denied ! Only Admins Can view this!"
                    })
                }
            }
        }




    }catch(error){
        res.json({
            message : "Error Getting product by ID"
        })
    }
}