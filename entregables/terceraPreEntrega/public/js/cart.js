const addProductInCart = async (cid,pid) => {
  const baseUrl = `${window.location.protocol}//${window.location.host}/api/`;
  console.log(pid)
  const endpoint = `cart/${cid}/product/${pid}`;
  const url = `${baseUrl}${endpoint}`;
  await fetch(url, {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json",
      },
  });
  getCart()
};
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
const minusQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) !== 0) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    await getQuantityInCart() + 1
   
    setQuantity(pid);
  }
};
const plusQuantity = async (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
  await getQuantityInCart() + 1
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
  await getCart()
};