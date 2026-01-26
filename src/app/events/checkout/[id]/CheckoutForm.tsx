import { Button } from "@/components/ui/button";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect URL after payment completion
        return_url: "http://10.0.20.135:5000/profile/my-bookings",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className="mt-5 cursor-pointer w-full" disabled={!stripe}>
        Submit Payment
      </Button>
      {errorMessage && (
        <div className="mt-5 text-sm text-red-700">{errorMessage}</div>
      )}
    </form>
  );
};
export default CheckoutForm;
