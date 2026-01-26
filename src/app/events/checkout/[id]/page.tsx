"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams, useSearchParams } from "next/navigation";

// Replace with your actual publishable key
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
const CheckOut = () => {
  const searchParams = useSearchParams();
  const clientSec = searchParams.get("client_secret");
  const { id }: { id: string } = useParams();
  //   rtk
  console.log(id);
  console.log(clientSec);

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center pb-10">
      {clientSec && (
        <Elements stripe={stripePromise} options={{ clientSecret: clientSec }}>
          <CheckoutForm />
        </Elements>
      )}
    </section>
  );
};

export default CheckOut;
