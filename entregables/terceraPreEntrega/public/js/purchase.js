const purchaseProducts = () => {
    Swal.fire({
        title:"Te gustaria continuar con tu compra?",
        text: "Recorda que no contamos con todos los productos en stock, aquellos que no cuenten con la cantidad a comprar pemaneceran en el carrito",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        background: 'var(--black)',
    }).then(async (result) => {
        if (result.isConfirmed) {
            fetch(window.location.href + "/purchase", { method: "GET" })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.payload)
                    if (res.status === "success") {
                        Swal.fire({
                            html: `<p>{res.payload.purchaser} tu total de tu compra es: $${res.payload.amount}</p> <p>Codigo de compra:${res.payload.code}</p> `,
                            icon: res.status,
                            background: 'var(--black)',
                        });
                    }
                });
        }
    });
};