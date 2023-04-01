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
    }).then(async(res) => {
        data = await res.json();
        if(data.status === "error"){
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
        if(data.status === 'success') {
            window.location.replace("/api/products");
        } 
      })
      
        
 
}