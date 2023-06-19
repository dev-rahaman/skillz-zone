import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../../../DashboardPages/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STIPE_TEST_KEY_PK);

const Payment = () => {
  const [selectedClassData, setSelectedClassData] = useState();

  useEffect(() => {
    const storedSelectedClass = localStorage.getItem("selectedClass");
    if (storedSelectedClass) {
      setSelectedClassData(JSON.parse(storedSelectedClass));
    }
  }, []);
  const money = selectedClassData?.price;

  const adminFeedback = selectedClassData?.adminFeedback;
  const availableSeats = selectedClassData?.availableSeats;
  const className = selectedClassData?.className;
  const email = selectedClassData?.email;
  const enrolledStudents = selectedClassData?.enrolledStudents;
  const imageURL = selectedClassData?.imageURL;
  const classDetails = selectedClassData?.classDetails;
  const instructorEmail = selectedClassData?.instructorEmail;
  const instructorName = selectedClassData?.instructorName;
  const price = selectedClassData?.price;
  const status = selectedClassData?.status;

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Pay Now!</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          money={money}
          adminFeedback={adminFeedback}
          availableSeats={availableSeats}
          className={className}
          email={email}
          enrolledStudents={enrolledStudents}
          imageURL={imageURL}
          classDetails={classDetails}
          instructorEmail={instructorEmail}
          instructorName={instructorName}
          price={price}
          status={status}
        ></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
