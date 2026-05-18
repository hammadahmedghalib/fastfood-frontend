const supabase = require("./supabase");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// in-memory storage (SAFE FOR RENDER FREE)
let orders = [];

// home route
app.get('/', (req, res) => {
    res.send("Restaurant Backend Running on Render ✅");
});

// save order
app.post('/order', (req, res) => {
    const { name, order, phone, location } = req.body;

    orders.push({
        id: Date.now(),
        name,
        order,
        phone,
        location
    });

    res.json({ message: "Order saved successfully ✅" });
});

// get orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// render port fix
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

app.use(express.json());

app.post("/order", async (req, res) => {
  const { name, phone, location, payment, items } = req.body;

  const { data, error } = await supabase
    .from("orders")   // IMPORTANT: must match table name
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
