const deleteProductInCart = async (pid) => {
  await fetch(`${window.location.href}/product/${pid}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
  .then(() => {
    window.location.reload()
  });
};
const deleteProductsInCart = async () => {
  await fetch(`${window.location.href}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then(() => {
      window.location.reload()
    });

};
const minusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) !== 0) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    setQuantity(pid);
  }
};
const plusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
  setQuantity(pid);
};

const setQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity").innerHTML;

  await fetch(`${window.location.href}/product/${pid}`, {

    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: Number(quantity) }),
  })
};