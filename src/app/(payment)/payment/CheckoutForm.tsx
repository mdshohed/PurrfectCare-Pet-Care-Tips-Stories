'use client'

import { useAddPayment } from "@/hooks/payment.hook";
import { Input } from "@nextui-org/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { toast } from "sonner";


const CheckoutForm = () => {
  // const navigate = useNavigate();
  const searchParams = useSearchParams();
  const paymentAmount = searchParams.get("fee");

  const [details, setDetails] = useState<{
    name: string;
    email: string;
    totalPaid: number;
  }>({} as {name:string, email: string, totalPaid: number});
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();


  const [clientSecret, setClientSecret] = useState("");
  const {
    mutate: submitPayment,
    isPending: createPostPending,
    isSuccess,
  } = useAddPayment();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = submitPayment(
          parseFloat((paymentAmount !== null && paymentAmount !== undefined) ? paymentAmount.toString() : '0')
        );
        
        setClientSecret(response?.clientSecret);
      } catch (error) {
        console.error("Payment error:", error);
      }
    };

    initiatePayment();
  }, [paymentAmount]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!details.name || !details.email) {
      (
        Object.keys(details) as (keyof { name: string; email: string })[]
      ).forEach((key) => {
        if (!details[key]) {
          setError(`${key} field is incomplete!`);
          return;
        }
      });
    }
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const toastId = toast.loading("Rental Processing");

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error.message, { id: toastId, duration: 2000 });
      setError(error.message || "");
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: "mdshohed170@gmail.com",
            name: "mdshohed",
          },
        },
      });
    if (confirmError) {
      toast.error("confirm Error", { id: toastId, duration: 2000 });
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        try {
        console.log(`transaction id: ${paymentIntent.id}`);
        // setTransactionId(paymentIntent.id);
        //   const payload = {
        //     bikeId: bookingId,
        //     startTime: selectedTime,
        //     totalPaid: details.totalPaid,
        //     discount: discount, 
        //   };
        //   console.log("payload", payload);
          
        //   const res = await createRental(payload).unwrap();
        //   if (res.statusCode === 200 && res.success) {
        //     navigate(`/`);
        //     dispatch(clearBookingDetail());
        //     toast.success(`${res.message}`, { id: toastId, duration: 2000 });
        //   }
          
        } catch (err) {
          toast.error("Booking Error!", { id: toastId, duration: 2000 });
        }
      }
    }
  };

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 flex justify-center">
        <div className="mx-auto max-w-screen-xl px-[5%] 2xl:px-0">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-xl ms-2 font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Payment
            </h2>

            <div className="mt-6 sm:mt-5 lg:flex lg:items-start lg:gap-12">
              <form
                onSubmit={handleSubmit}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Full name
                    </label>
                    {/* <Input type="email" label="Email" /> */}

                    <Input
                      onChange={(e) =>
                        setDetails({ ...details, name: e.target.value })
                      }
                      type="text"
                      id="full_name"
                      className="py-2"
                      placeholder="Enter The Name"
                      // required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Email
                    </label>
                    <Input
                      onChange={(e) =>
                        setDetails({ ...details, email: e.target.value })
                      }
                      type="text"
                      id="email"
                       className="py-2"
                      // className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Enter The Email"
                      // pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                      // required
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="paid"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subscription Fee
                    </label>
                    <Input
                      // defaultValue={details.totalPaid}
                      onChange={(e: any) =>
                        setDetails({
                          ...details,
                          totalPaid: parseInt(e.target.value),
                        })
                      }
                      type="number"
                      id="paid"
                      min={0}
                      className="py-2"
                      placeholder="Block Subscription fee"
                      // pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                      // required
                    />
                  </div>
                </div>
               
                
                <div className="my-10 border p-2 rounded-md">
                  <CardElement
                  onChange={()=>setError('')}
                    options={{
                      style: {
                        base: {
                          fontSize: "18px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>

                <button
                  disabled={!stripe || !clientSecret}
                  type="submit"
                  className="flex w-full my-5 items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none  "
                >
                  Pay now
                </button>
                <p className="text-red-600 text-center">{error}</p>
                {transactionId && (
                  <p className="text-green-500 text-center text-2xl">
                    Your Transaction Id: {transactionId}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutForm;
