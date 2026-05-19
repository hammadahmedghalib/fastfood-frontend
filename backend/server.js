form.addEventListener('submit', e => {
  e.preventDefault();

  const order = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    location: document.getElementById("userLocation").value,
    payment: document.getElementById("payment").value,
    items: cart,
    status: "Preparing"
  };

  let orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  msg.innerText = "✅ Order Placed!";

  let txt = `🍔 New Order:
👤 Name: ${order.name}
📞 Phone: ${order.phone}
🛒 Items: ${cart.map(i => i.n).join(', ')}
📍 Location: ${order.location}
💳 Payment: ${order.payment}`;

  window.open(`https://wa.me/923199608782?text=${encodeURIComponent(txt)}`);

  cart = [];
  render();
});

function render(){
  let ul = document.getElementById("items");
  let totalEl = document.getElementById("total");

  ul.innerHTML = '';
  let t = 0;

  cart.forEach(i => {
    ul.innerHTML += `<li>${i.n} - Rs.${i.p}</li>`;
    t += i.p;
  });

  totalEl.innerText = t;
}