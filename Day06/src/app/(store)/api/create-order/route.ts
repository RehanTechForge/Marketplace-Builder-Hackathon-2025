// import { NextResponse } from "next/server";
// import { shipengine } from "@/lib/shipengine";
// import { backendClient } from "@/sanity/lib/backendClient";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     if (!body.fullName || body.fullName.length > 35) {
//       console.error(
//         "Full name is required and must be less than 35 characters"
//       );
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Full name is required and must be less than 35 characters",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate address fields
//     const address = body.shippingAddress;
//     if (!address.street || address.street.length > 35) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Street address is required and must be less than 35 characters",
//         },
//         { status: 400 }
//       );
//     }

//     const shipmentResponse = await shipengine.getRatesWithShipmentDetails({
//       rateOptions: {
//         carrierIds: [
//           process.env.CARRIER_ID_ONE!,
//           process.env.CARRIER_ID_TWO!,
//           process.env.CARRIER_ID_THREE!,
//           process.env.CARRIER_ID_FOUR!,
//         ],
//       },
//       shipment: {
//         shipTo: {
//           name: body.fullName,
//           phone: body.phone,
//           addressLine1: body.shippingAddress.street,
//           cityLocality: body.shippingAddress.city,
//           stateProvince: body.shippingAddress.state,
//           postalCode: body.shippingAddress.postalCode,
//           countryCode: "US",
//           addressResidentialIndicator: "yes",
//         },
//         shipFrom: {
//           companyName: "Example Corp.",
//           name: "John Doe",
//           phone: "111-111-1111",
//           addressLine1: "4009 Marathon Blvd",
//           addressLine2: "Suite 300",
//           cityLocality: "Austin",
//           stateProvince: "TX",
//           postalCode: "78756",
//           countryCode: "US",
//           addressResidentialIndicator: "no",
//         },
//         packages: [
//           {
//             weight: {
//               value: 1,
//               unit: "pound",
//             },
//             dimensions: {
//               length: 12,
//               width: 8,
//               height: 6,
//               unit: "inch",
//             },
//           },
//         ],
//       },
//     });

//     // minus quantity in sanity

//     // await backendClient.patch()

//     const orderData = {
//       _type: "order",
//       customerId: body.customerId || "customer-id",
//       orderDate: new Date().toISOString(),
//       orderStatus: "pending",
//       shippingAddress: {
//         street: shipmentResponse.shipTo?.addressLine1 || "123132dasda", // From shipment data
//         city: shipmentResponse.shipTo?.cityLocality || "dsadsa", // From shipment data
//         state: shipmentResponse.shipTo?.stateProvince || "AZ", // From shipment data
//         postalCode: shipmentResponse.shipTo?.postalCode || "12345", // From shipment data
//       },
//       orderItems: body.orderItems.map((item: any) => ({
//         productId: { _type: "reference", _ref: item.productId._ref },
//         productName: item.productName,
//         quantity: item.quantity,
//         price: item.price,
//         subtotal: item.subtotal,
//       })),
//       totalAmount: body.totalAmount,
//       paymentMethod: body.paymentMethod,
//       paymentStatus: "pending",
//       trackingId: shipmentResponse.shipmentId, // From shipment data
//       trackingStatus: shipmentResponse.shipmentStatus, // From shipment data
//       shipDate: shipmentResponse.shipDate, // From shipment data
//       shipFrom: {
//         name: shipmentResponse.shipFrom?.name,
//         address: shipmentResponse.shipFrom?.addressLine1,
//         city: shipmentResponse.shipFrom?.cityLocality,
//         state: shipmentResponse.shipFrom?.stateProvince,
//         postalCode: shipmentResponse.shipFrom?.postalCode,
//         countryCode: shipmentResponse.shipFrom?.countryCode,
//       },
//       returnTo: {
//         name: shipmentResponse.returnTo.name,
//         address: shipmentResponse.returnTo.addressLine1,
//         city: shipmentResponse.returnTo.cityLocality,
//         state: shipmentResponse.returnTo.stateProvince,
//         postalCode: shipmentResponse.returnTo.postalCode,
//         countryCode: shipmentResponse.returnTo.countryCode,
//       },
//       totalWeight: shipmentResponse.totalWeight.value, // From shipment data
//       labelMessages: shipmentResponse.packages[0]?.labelMessages || {}, // From package data
//       insuranceProvider: shipmentResponse.insuranceProvider || "none", // From shipment data
//     };

//     console.log("Order Data", orderData);

//     const result = await backendClient.create(orderData);

//     // console.log("Order created in Sanity:", result);

//     return NextResponse.json({
//       success: true,
//       message: "Order created successfully",
//       orderDetails: {
//         orderId: result._id, // Sanity's generated order ID
//         trackingId: shipmentResponse.shipmentId, // Shipment tracking ID
//         orderStatus: shipmentResponse.shipmentStatus, // Order status (e.g., pending)
//         shippingDetails: {
//           address: {
//             street: shipmentResponse.shipTo?.addressLine1,
//             city: shipmentResponse.shipTo?.cityLocality,
//             state: shipmentResponse.shipTo?.stateProvince,
//             postalCode: shipmentResponse.shipTo?.postalCode,
//           },
//           shipDate: shipmentResponse.shipDate,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to create order",
//         details: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { shipengine } from "@/lib/shipengine";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName || body.fullName.length > 35) {
      console.error(
        "Full name is required and must be less than 35 characters"
      );
      return NextResponse.json(
        {
          success: false,
          error: "Full name is required and must be less than 35 characters",
        },
        { status: 400 }
      );
    }

    // Validate address fields
    const address = body.shippingAddress;
    if (!address.street || address.street.length > 35) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Street address is required and must be less than 35 characters",
        },
        { status: 400 }
      );
    }

    // Decrease product quantities
    for (const item of body.orderItems) {
      await backendClient
        .patch(item.productId._ref) // Reference the product by its ID
        .dec({ quantity: item.quantity }) // Decrease the stock by the ordered quantity
        .commit();
    }

    const shipmentResponse = await shipengine.getRatesWithShipmentDetails({
      rateOptions: {
        carrierIds: [
          process.env.CARRIER_ID_ONE!,
          process.env.CARRIER_ID_TWO!,
          process.env.CARRIER_ID_THREE!,
          process.env.CARRIER_ID_FOUR!,
        ],
      },
      shipment: {
        shipTo: {
          name: body.fullName,
          phone: body.phone,
          addressLine1: body.shippingAddress.street,
          cityLocality: body.shippingAddress.city,
          stateProvince: body.shippingAddress.state,
          postalCode: body.shippingAddress.postalCode,
          countryCode: "US",
          addressResidentialIndicator: "yes",
        },
        shipFrom: {
          companyName: "Example Corp.",
          name: "John Doe",
          phone: "111-111-1111",
          addressLine1: "4009 Marathon Blvd",
          addressLine2: "Suite 300",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        packages: [
          {
            weight: {
              value: 1,
              unit: "pound",
            },
            dimensions: {
              length: 12,
              width: 8,
              height: 6,
              unit: "inch",
            },
          },
        ],
      },
    });

    const orderData = {
      _type: "order",
      customerId: body.customerId || "customer-id",
      orderDate: new Date().toISOString(),
      orderStatus: "pending",
      shippingAddress: {
        street: shipmentResponse.shipTo?.addressLine1 || "123132dasda",
        city: shipmentResponse.shipTo?.cityLocality || "dsadsa",
        state: shipmentResponse.shipTo?.stateProvince || "AZ",
        postalCode: shipmentResponse.shipTo?.postalCode || "12345",
      },
      orderItems: body.orderItems.map((item: any) => ({
        _key: item._key,
        productId: { _type: "reference", _ref: item.productId._ref },
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      paymentStatus: "pending",
      trackingId: shipmentResponse.shipmentId,
      trackingStatus: shipmentResponse.shipmentStatus,
      shipDate: shipmentResponse.shipDate,
      shipFrom: {
        name: shipmentResponse.shipFrom?.name,
        address: shipmentResponse.shipFrom?.addressLine1,
        city: shipmentResponse.shipFrom?.cityLocality,
        state: shipmentResponse.shipFrom?.stateProvince,
        postalCode: shipmentResponse.shipFrom?.postalCode,
        countryCode: shipmentResponse.shipFrom?.countryCode,
      },
      returnTo: {
        name: shipmentResponse.returnTo.name,
        address: shipmentResponse.returnTo.addressLine1,
        city: shipmentResponse.returnTo.cityLocality,
        state: shipmentResponse.returnTo.stateProvince,
        postalCode: shipmentResponse.returnTo.postalCode,
        countryCode: shipmentResponse.returnTo.countryCode,
      },
      totalWeight: shipmentResponse.totalWeight.value,
      labelMessages: shipmentResponse.packages[0]?.labelMessages || {},
      insuranceProvider: shipmentResponse.insuranceProvider || "none",
    };

    // console.log("Order Data", orderData);

    const result = await backendClient.create(orderData);

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderDetails: {
        orderId: result._id,
        trackingId: shipmentResponse.shipmentId,
        orderStatus: shipmentResponse.shipmentStatus,
        shippingDetails: {
          address: {
            street: shipmentResponse.shipTo?.addressLine1,
            city: shipmentResponse.shipTo?.cityLocality,
            state: shipmentResponse.shipTo?.stateProvince,
            postalCode: shipmentResponse.shipTo?.postalCode,
          },
          shipDate: shipmentResponse.shipDate,
        },
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
