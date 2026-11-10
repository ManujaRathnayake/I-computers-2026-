import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true // ORD000001
        },
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber : {
            type: Number,
            required: true
        },
        addressLineOne: {
            type: String,
            required: true
        },
        addressLineTwo: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        date: {
            type: Date, // 'date' වෙනුවට 'Date'
            required: true,
            default: Date.now
        },
        postalcode: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "Pending" // Shipped, Delivered, etc.
        },
        notes: {
            type: String
        },
        total: {
            type: Number, // මුදල් අගයක් බැවින් Number යෙදීම සුදුසුයි
            required: true
        },
        items: [
            {
                product: {
                    productId: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    labelledPrice: {
                        type: Number,
                        required: true
                    },
                    image: {
                        type: String, // 'type: String' එක් කරන ලදී
                        required: true
                    }
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;