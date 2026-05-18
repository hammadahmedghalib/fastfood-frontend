const supabase = require("./supabase");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// home route
app.get('/', (req, res) => {
    res.send("Restaurant Backend Running on Render ✅");
});

// SAVE ORDER (ONLY ONE ROUTE)
app.post("/order", async (req, res) => {
  const { name, phone, location, payment, items } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        name,
        phone,
        location,
        payment,
        items,
        status: "Preparing"
      }
    ]);

  res.json({ data, error });
});

// GET ORDERS
app.get('/orders', async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*");

  res.json(data);
});

// PORT
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});