const rolUser = document.getElementById("admin") ?
    document.getElementById("admin") :
    document.getElementById("user")
const rolUserButton = (text, url) => {
    rolUser.innerText = text
    rolUser.onclick = () => {
        let newUrl = `${window.location.protocol}//${window.location.host}/api/${url}`
        window.location.href = newUrl;
    }
}
if (rolUser.id === "admin") {
    rolUserButton("Sección Admin", "products/form")
}
else {
    rolUserButton("Ir al Chat", "chat")
}
