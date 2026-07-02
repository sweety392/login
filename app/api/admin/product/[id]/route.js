import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/product";

connectDB();

/* ---------------- GET SINGLE PRODUCT ---------------- */

export async function GET(request, { params }) {
  try {

    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}

/* ---------------- DELETE PRODUCT ---------------- */

export async function DELETE(request, { params }) {

  try {

    const { id } = params;

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}

/* ---------------- UPDATE PRODUCT ---------------- */

export async function PUT(request, { params }) {

  try {

    const { id } = params;

    const body = await request.json();

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({

      success: true,

      message: "Product Updated Successfully",

      product: updatedProduct,

    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}