"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState, NoTrackingInfo } from "@/components/global/status-messages";

interface TrackingEvent {
  dateTime: string;
  carrierStatusDescription: string;
  location: {
    cityLocality: string;
    stateProvince: string;
    countryCode: string;
  };
}

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface ReturnTo {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  name: string;
}

interface TrackingInfo {
  trackingId: string;
  trackingStatus: string;
  shipDate: string;
  events: TrackingEvent[];
  totalAmount: number;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  shippingAddress: ReturnTo;
  orderItems: OrderItem[];
}

export default function TrackOrderPage() {
  const { trackingId } = useParams();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrackingInfo() {
      try {
        const response = await fetch(`/api/track-order/${trackingId}`);
        const data = await response.json();
        if (data.success) {
          setTrackingInfo(data.trackingInfo);
        } else {
          throw new Error(data.error || "Failed to fetch tracking information");
        }
      } catch (error) {
        console.error("Error fetching tracking info:", error);
        alert("Unable to fetch tracking information. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrackingInfo();
  }, [trackingId]);

  if (loading) {
    return <LoadingState />;
  }

  if (!trackingInfo) {
    return <NoTrackingInfo />;
  }

  console.log(trackingInfo);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="mb-2">
              <strong>Tracking Number:</strong> {trackingInfo.trackingId}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {trackingInfo.trackingStatus}
            </p>
            <p className="mb-2">
              <strong>Ship Delivery:</strong>{" "}
              {new Date(trackingInfo.shipDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Order Date:</strong>{" "}
              {new Date(trackingInfo.orderDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Order Status:</strong> {trackingInfo.orderStatus}
            </p>
            <p className="mb-2">
              <strong>Payment Method:</strong> {trackingInfo.paymentMethod}
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          {trackingInfo.orderItems.map((item, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>Product Name:</strong> {item.productName}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Price:</strong> ${item.price.toFixed(2)}
              </p>
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-6 mb-4">Shipping Address</h3>
          <p>
            <strong>Name:</strong> {trackingInfo.shippingAddress.name}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${trackingInfo.shippingAddress.street}, ${trackingInfo.shippingAddress.city}, ${trackingInfo.shippingAddress.state} - ${trackingInfo.shippingAddress.postalCode}`}
          </p>

          {/* <h3 className="text-xl font-semibold mt-6 mb-4">Tracking Events</h3> */}
          {/* {trackingInfo?.events.map((event, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {event.carrierStatusDescription}
              </p>
              <p>
                <strong>Location:</strong> {`${event.location.cityLocality}, ${event.location.stateProvince}, ${event.location.countryCode}`}
              </p>
            </div>
          ))} */}
        </CardContent>
      </Card>
    </div>
  );
}
