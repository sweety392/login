
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

  userId:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"User"

  },

  name:{

    type:String,

    required:true

  },

  rating:{

    type:Number,

    required:true,

    min:1,

    max:5

  },

  comment:{

    type:String,

    required:true

  }

},

{

timestamps:true

});





const productSchema = new mongoose.Schema({

  // Basic Info

  title:{

    type:String,

    required:true,

    trim:true

  },

  slug:{

    type:String,

    required:true,

    unique:true,

    lowercase:true

  },

  description:{

    type:String,

    required:true

  },

  shortDescription:{

    type:String

  },



  // Brand

  brand:{

    type:String,

    required:true

  },



  // Category

  category:{

    type:String,

    required:true

  },



  subCategory:{

    type:String

  },



  // Pricing

  price:{

    type:Number,

    required:true

  },



  discountPercentage:{

    type:Number,

    default:0

  },



  // Stock

  stock:{

    type:Number,

    default:0

  },



  sku:{

    type:String,

    
  },



  // Images

  images:[

    {

      type:String

    }

  ],



  // Ratings

  ratings:{

    type:Number,

    default:0

  },



  numReviews:{

    type:Number,

    default:0

  },



  reviews:[

    reviewSchema

  ],



  // Variants

  colors:[

    {

      type:String

    }

  ],



  sizes:[

    {

      type:String

    }

  ],



  // Shipping

  weight:{

    type:Number

  },



  dimensions:{

    width:Number,

    height:Number,

    length:Number

  },



  // Search Tags

  tags:[

    {

      type:String

    }

  ],



  // Product Status

  isFeatured:{

    type:Boolean,

    default:false

  },



  isBestSeller:{

    type:Boolean,

    default:false

  },



  isNewArrival:{

    type:Boolean,

    default:true

  },



  isAvailable:{

    type:Boolean,

    default:true

  },



  // SEO

  metaTitle:{

    type:String

  },



  metaDescription:{

    type:String

  }

},

{

timestamps:true

});



const Product =

mongoose.models.Product ||

mongoose.model(

"Product",

productSchema

);



export default Product;