const form = document.getElementById("formLogin");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
});
const submitForm = async () => {
    const  user = document.getElementById("userName").value;
    const password = document.getElementById("userPassword").value;
    await fetch(`${window.location.href}`, {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: user ,
            password: password,
        }),
    }).then(() => {
        window.location.replace("/api/products");
    });
}