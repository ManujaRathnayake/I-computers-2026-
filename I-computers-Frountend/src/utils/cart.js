export function getcart(){
    const cartString = localStorage.getItem("cart");

    if(cartString == null){
        localStorage.setItem("cart" , "[]")
        return[]
    }else{
        const cart = JSON.parse(cartString)
        return cart;
    }
}

export function addToCart(product , quantity){
    const cart = getcart()
    const existingProductIndex = cart.findIndex(
        (item)=>{
            return item.product.productId == product.productId
        }
    )

    if(existingProductIndex == -1){
        if(quantity > 0){
            cart.push(
                {
                    product : {
                        productId : product.productId,
                        name : product.name,
                        image : product.images[0],
                        labelledPrice : product.labelledPrice,
                        price : product.price
                    },
                    quantity : quantity
                }
            )
        }
    }else{
        const newQty = cart[existingProductIndex].quantity + quantity;
        if (newQty > 0 ){
            cart[existingProductIndex].quantity = newQty;
        }else{
            cart.splice(existingProductIndex,1)
        }
    }

    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart" , cartString)
}