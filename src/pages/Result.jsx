import { TicketIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ShowtimeDetails from "../components/ShowtimeDetails";
import { AuthContext } from "../context/AuthContext";

const Result = () => {
  const navigate = useNavigate();
  // const { auth } = useContext(AuthContext);
  // const location = useLocation();
  // const showtime = location.state.showtime;
  // const selectedSeats = location.state.selectedSeats || [];
  const [isPurchasing, SetIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null); // State for error message

  const authToken = localStorage.getItem("authToken");
  const showtimeID = localStorage.getItem("showtime");
  const selectedSeats = localStorage.getItem("seats");

  console.log(authToken);
  console.log(showtimeID);
  console.log(selectedSeats);
  const onPurchase = async (data) => {
    try {
      SetIsPurchasing(true);
      const response = await axios.post(
        `/showtime/${showtimeID}`,
        { seats: JSON.parse(selectedSeats) },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      navigate("/ticket");
    } catch (error) {
      setPurchaseError(error.response?.data?.message || "Purchase failed");
      navigate("/");
    } finally {
      SetIsPurchasing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
      <Navbar />
      {purchaseError ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Purchase Failed</h2>
          <p>We encountered an error while processing your purchase.</p>
          {purchaseError && <p className="text-red-500">{purchaseError}</p>}
          <button
            onClick={() => {
              setPurchaseError(null); // Clear error state on retry
              // Optionally, re-render ShowtimeDetails or take other actions
            }}
            disabled={isPurchasing}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retry Purchase
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Thanh toán thành công!</h1>
          <p style={{ marginBottom: "3px" }}>Cảm ơn bạn đã đặt vé.</p>
          <button
            onClick={() => onPurchase()}
            disabled={isPurchasing}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Xem thông tin vé
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
