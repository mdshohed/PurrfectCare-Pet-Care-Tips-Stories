'use client'

import { useUser } from "@/context/user.provider";
import { useCreateClientSecret, useCreatePayment } from "@/hooks/payment.hook";
import { TPayment } from "@/types";
// import { addPayment } from "@/services/Payment";
import { Input } from "@nextui-org/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { toast } from "sonner";


const CheckoutForm = () => {
  const {user } = useUser();   
  const route = useRouter(); 
  // const navigate = useNavigate();
  const searchParams = useSearchParams();
  const paymentAmount = searchParams.get("fee");
  const postId = searchParams.get("PostId");
  

  const [details, setDetails] = useState<{
    name: string;
    email: string;
    totalPaid: string;
  }>({name: user?.name||'', email: user?.email||'', totalPaid: paymentAmount||''});
  useEffect(()=>{
    if(user){
      setDetails({name:user?.name, email: user?.email, totalPaid: paymentAmount||''})
    }
  },[user])
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();


  const [clientSecret, setClientSecret] = useState("");

  const {
    mutate: handleClientSecret,
    data: paymentApi, 
    isPending: clientSecretPending,
    isSuccess,
  } = useCreateClientSecret();

  const {
    mutate: handleCreatePayment,
    isPending: createPostPending,
    isSuccess: createPayment
  } = useCreatePayment();
  
  useEffect(() => {
    const initiatePayment = async () => {
      try {
        handleClientSecret(parseFloat(paymentAmount?.toString() || '0'));
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("Failed to initiate payment");
      }
    };
  
    if (paymentAmount) {
      initiatePayment();
    }
  }, [paymentAmount]);

  useEffect(()=>{
    if(paymentApi){
      setClientSecret(paymentApi); 
    }
  },[isSuccess])
  

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

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message || "");
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.name,
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        try {
        console.log(`transaction id: ${paymentIntent.id}`);
        const payload: TPayment = {
          postId: postId || '', 
          transactionId: paymentIntent.id, 
          userId: user?._id || '',
          paidAmount: parseFloat(details.totalPaid)
        }
        handleCreatePayment(payload)
        
        } catch (err) {
          console.log("payment error");
        }
      }
    }
  };

  useEffect(()=>{
    if(!createPostPending&&createPayment){
      route.push('/')
    }
  },[createPayment])

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
                      value={details.name}
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
                      value={details.email}
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
                      value={details.totalPaid}
                      onChange={(e: any) =>
                        setDetails({
                          ...details,
                          totalPaid: e.target.value,
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
