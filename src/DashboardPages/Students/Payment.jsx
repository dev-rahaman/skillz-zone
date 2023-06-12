import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import useMySelectedClasses from "../../Hooks/usemySelectedClasses";
import { useEffect, useState } from "react";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STIPE_TEST_KEY_PK);

const Payment = () => {
  const [selectedClassId, setSelectedClassId] = useState();
  const [mySelectedClasses] = useMySelectedClasses();

  useEffect(() => {
    const storedSelectedClass = localStorage.getItem("selectedClass");
    if (storedSelectedClass) {
      setSelectedClassId(JSON.parse(storedSelectedClass));
    }
  }, []);
  const total = selectedClassId?.price;

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Pay Now!</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          mySelectedClasses={mySelectedClasses}
          price={total}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
