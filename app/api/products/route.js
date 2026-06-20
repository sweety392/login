import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/product";

connectDB();


// ============================
// CREATE PRODUCT (POST)
// ============================
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      brand,
      category,
      price,
      stock,
      images,
      isFeatured
    } = body;

    // Validation
    if (!title || !price || !category || !description || !brand) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Price, Category required"
        },
        { status: 400 }
      );
    }
    const slug = title
.toLowerCase()
.replace(/\s+/g,"-");

    // Create product
    const product = await Product.create({
      title,
      description,
      brand,
      slug,
      category,
      price,
      stock,
      images,
      isFeatured: isFeatured || false
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product
      },
      { status: 201 }
    );
  } catch(error){

console.log(error);

return NextResponse.json({

success:false,

message:error.message

},

{

status:500

})

}
}


// ============================
// GET PRODUCTS (ALL / FILTER)
// ============================
export async function GET(request){

try{

const {searchParams}

=

new URL(request.url);



const search=

searchParams.get("search");



let query={};



if(search){

query={

$or:[

{

title:{

$regex:search,

$options:"i"

}

},

{

brand:{

$regex:search,

$options:"i"

}

},

{

category:{

$regex:search,

$options:"i"

}

}

]

}

}



const products=

await Product.find(query)

.sort({

createdAt:-1

});



return NextResponse.json({

success:true,

products

})



}

catch(error){

return NextResponse.json({

success:false,

message:error.message

})

}

}