import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
        orderItems: [
            {
                title: {type: String, required: true},
                qty: {type: Number, required: true},
                img: {type: String, required: true},
                price: {type: Number, required: true},
            },],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

export default Order