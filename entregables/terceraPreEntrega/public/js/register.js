const form = document.getElementById("formRegister");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
});
const submitForm = async () => {
    const name = document.getElementById("userName").value;
    const lastname = document.getElementById("userLastname").value;
    const email = document.getElementById("userEmail").value;
    const age = document.getElementById("userAge").value;
    const password = document.getElementById("userPassword").value;
    await fetch(`${window.location.href}`, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:name,
            lastname:lastname,
            email: email,
            age:age,
            password: password,
        }),
    }).then(async (res) => {
        data = await res.json();
        if (data.status === "error") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: data.payload,
                showConfirmButton: false,
                iconColor: 'var(--main-color)',
                background: 'var(--black)',
                timer: 1500
            })
        }
        if (data.status === 'success') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.payload,
                showConfirmButton: false,
                iconColor: 'var(--main-color)',
                background: 'var(--black)',
                timer: 1500
            })
            setTimeout(() => {
                window.location.replace("/api/user/login");
            }, 1500);
        }
    });
}