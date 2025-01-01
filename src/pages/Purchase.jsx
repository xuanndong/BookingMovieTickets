import { TicketIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ShowtimeDetails from "../components/ShowtimeDetails";
import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const Purchase = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const showtime = location.state.showtime;
  const selectedSeats = location.state.selectedSeats || [];
  const [isPurchasing, SetIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null); // State for error message

  console.log(auth.token);
  console.log(showtime._id);
  console.log(selectedSeats);
  localStorage.authToken = auth.token;
  localStorage.showtime = showtime._id;
  localStorage.seats = JSON.stringify(selectedSeats);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QbuxiIZdVuheAoClGFGvfWY8FnW5eo1XPLGk5cDefRkNyeDUqyvEbQiOywGcpREscoLReN2CY4pmQc2WXVUvAcP0033x7wrAN"
    );

    const body = {
      showtimes: showtime,
      seats: selectedSeats,
      auth: auth.token,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result);
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
      <Navbar />
      <div className="mx-4 h-fit rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
        <ShowtimeDetails showtime={showtime} />
        <div className="flex flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
          <div className="flex flex-col items-center gap-x-4 px-4 py-2 md:flex-row">
            <p className="font-semibold">Selected Seats : </p>
            <p className="text-start">{selectedSeats.join(", ")}</p>
            {!!selectedSeats.length && (
              <p className="whitespace-nowrap">
                ({selectedSeats.length} seats)
              </p>
            )}
          </div>
          {!!selectedSeats.length && (
            <button
              onClick={() => makePayment()}
              className="flex items-center justify-center gap-2 rounded-b-lg  bg-gradient-to-br from-indigo-600 to-blue-500 px-4 py-1 font-semibold text-white hover:from-indigo-500 hover:to-blue-500 disabled:from-slate-500 disabled:to-slate-400 md:rounded-none md:rounded-br-lg"
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                "Processing..."
              ) : (
                <>
                  <p>Pay</p>
                  <TicketIcon className="h-7 w-7 text-white" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
