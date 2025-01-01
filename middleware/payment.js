require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function calculateTotalPrice(seats, pricePerSeat) {
  // Implement logic to calculate total price based on seat quantity and price per seat
  return seats.length * pricePerSeat;
}

exports.payment = async (req, res) => {
  const { showtimes, seats, auth } = req.body;

  if (!showtimes || !seats.length) {
    return res.status(400).json({ error: "Missing accommodation data" });
  }

  // const lineItems = showtimes.map((showtime) => ({
  //   price_data: {
  //     currency: "VND",
  //     product_data: {
  //       name: showtime.movie.name,
  //       images: showtime.movie.image
  //     },
  //     unit_amount: calculateTotalPrice(seats, 35) * 1000,
  //   },
  //   quantity: product.quantity,
  // }))

  // time
  const date = new Date(showtimes.showtime);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedShowtime = `${day}/${month}/${year} ${hours}:${minutes}`;
  // time

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    metadata: {
      showtime_id: showtimes._id,
    },
    line_items: [
      {
        price_data: {
          currency: "VND",
          product_data: {
            name: `Movie: ${showtimes.movie.name}`,
            images: [showtimes.movie.img],
            description: `Time: ${formattedShowtime}\n At: ${
              showtimes.theater.cinema.name
            }\nSeats: ${seats.join(", ")}`,
          },
          unit_amount: calculateTotalPrice(seats, 35) * 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.VITE_URL}/result`,
    cancel_url: `${process.env.VITE_URL}/result`,
  });

  res.json({ id: session.id });
};

exports.complete = async (req, res) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, {
      expand: ["payment_intent.payment_method"],
    }),
    stripe.checkout.sessions.listLineItems(req.query.session_id),
  ]);

  console.log(JSON.stringify(await result));

  res.send("Your payment was successful");
};

exports.cancel = (req, res) => {
  res.redirect("/showtime");
};
