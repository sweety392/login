import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
  },

});



const cartSchema = new mongoose.Schema(

  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    products: [cartItemSchema],

  },

  {
    timestamps: true,
  }

);


const Cart =
  mongoose.models.carts ||
  mongoose.model("carts", cartSchema);

export default Cart;