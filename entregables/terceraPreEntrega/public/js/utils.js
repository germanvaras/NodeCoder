const alerts = (status ,errorMessage) => {
    status === "error" || "Unauthorized" ? status = "error" : status = "success"
    Swal.fire({
        position: 'top-end',
        icon: status,
        title: errorMessage,
        showConfirmButton: false,
        iconColor: 'var(--main-color)',
        background: 'var(--black)',
        timer: 15000
    })
}