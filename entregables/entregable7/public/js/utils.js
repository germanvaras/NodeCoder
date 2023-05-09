const alerts = (status, errorMessage) => {
    Swal.fire({
        position: 'top-end',
        icon: status,
        text: errorMessage,
        showConfirmButton: false,
        iconColor: 'var(--main-color)',
        background: 'var(--black)',
        timer: 1500,
    })
}
const backHome = () => {
    location.href = `${window.location.protocol}//${window.location.host}/api/products`
}