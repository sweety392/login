import Razorpay from "razorpay";



const razorpay = new Razorpay({

  key_id:

  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,


  key_secret:

  process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,

});




export async function POST(req) {

  try {

    const body = await req.json();



    const { amount } = body;



    const options = {

      amount:

      Number(amount) * 100,


      currency:

      "INR",


      receipt:

      `receipt_${Date.now()}`

    };



    const order =

    await razorpay.orders.create(

      options

    );



    return Response.json(

      {

        success: true,

        order

      },

      {

        status: 200

      }

    );



  }

  catch (error) {

    console.log(error);



    return Response.json(

      {

        success: false,

        message:

        error.message

      },

      {

        status: 500

      }

    );

  }

}