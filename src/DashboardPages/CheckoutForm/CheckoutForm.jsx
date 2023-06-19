import { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("access-token");

const CheckoutForm = ({
  money,
  adminFeedback,
  availableSeats,
  className,
  email,
  enrolledStudents,
  imageURL,
  classDetails,
  instructorEmail,
  instructorName,
  price,
  status,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const [buttonId, setButtonId] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState();
  const [classesId, setClassesId] = useState([]);

  // const {
  //   adminFeedback,
  //   availableSeats,
  //   className,
  //   email,
  //   enrolledStudents,
  //   imageURL,
  //   classDetails,
  //   instructorEmail,
  //   instructorName,
  //   price,
  //   status,
  // } = selectedClassData;

  // const newData = {
  //   adminFeedback,
  //   availableSeats,
  //   className,
  //   email,
  //   enrolledStudentsm,
  //   imageURL,
  //   classDetails,
  //   instructorEmail,
  //   instructorName,
  //   price,
  //   status,
  // };

  useEffect(() => {
    const storedButtonId = localStorage.getItem("buttonId");
    const storedSelectedClass = localStorage.getItem("selectedClass");

    if (storedButtonId) {
      setButtonId(storedButtonId);
    }
    if (storedSelectedClass) {
      setSelectedClassId(JSON.parse(storedSelectedClass));
    }
  }, []);

  useEffect(() => {
    if (money > 0 && !isNaN(money)) {
      axiosSecure
        .post("https://skillz-zone-server.vercel.app/create-payment-intent", {
          money,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [money, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        money,
        date: new Date(),
        status: "service pending",
      };
      // save the payment details on database
      fetch(`https://skillz-zone-server.vercel.app/payments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(payment),
      })
        .then((response) => response.json())
        .then((insertResult) => {
          // console.log("Insert Result:", insertResult);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });

      // Delete from my Selected Classes
      fetch(
        `https://skillz-zone-server.vercel.app/mySelectedClasses/${buttonId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data );
        });

      // save the enrolled classes on database
      fetch(`https://skillz-zone-server.vercel.app/myEnrolledClasses`, {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminFeedback,
          availableSeats,
          className,
          email,
          enrolledStudents,
          imageURL,
          classDetails,
          instructorEmail,
          instructorName,
          price,
          status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // const updatedObject = data;
        });

      // save the enrolled students on database
      fetch(`https://skillz-zone-server.vercel.app/enrolled-students/`, {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: user?.displayName,
          studentEmail: user?.email,
          studentPhoto: user?.photoURL,
          transactionId: paymentIntent.id,
          instructorEmail: selectedClassId.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // const updatedObject = data;
        });
      // =========================================================================

      fetch(`https://skillz-zone-server.vercel.app/all-classes/${buttonId}`, {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableSeats: parseInt(selectedClassId.availableSeats) - 1,
          enrolledStudents: parseInt(selectedClassId.enrolledStudents) + 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // localStorage.removeItem("buttonId");
          localStorage.removeItem("selectedClass");
          navigate("/dashboard/my-selected-classes");
        });
    }
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
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
        <button
          className=""
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <p
          style={{
            color: "#fff",
            marginLeft: "10%",
            padding: "30px",
            textAlign: "center",
            backgroundColor: "red",
            borderRadius: "20px",
          }}
        >
          {cardError}
        </p>
      )}
      {transactionId && (
        <p
          style={{
            color: "#fff",
            marginLeft: "10%",
            padding: "30px",
            textAlign: "center",
            backgroundColor: "green",
            borderRadius: "20px",
          }}
        >
          Transaction is complete and Your transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
