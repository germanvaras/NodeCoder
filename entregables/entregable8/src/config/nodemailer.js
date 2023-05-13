const nodemailer = require("nodemailer");
const transportGmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailerEmail,
        pass: process.env.nodemailerPassword,
    },
});
const createBodyMail = (ticket, user) => {
    return `
    <!DOCTYPE html>
<html lang="es"
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <h1>Bienvenido a la familia Sublime ${user.name}</h1>
        <h2>Ticket de compra ${ticket.code}</h2>
        <p> El total de tu compra es: $${ticket.amount}</p>
        <p>Este email es generado automaticamente, por favor no responder al mismo!</p>
    </main>
</body>
</html>`
}
const sendEmailPurchase = async (ticket, user) => {
    try {
        let result = await transportGmail.sendMail({
            from: "Sublime <tiendasublime@gmail.com> ",
            to: user.email,
            subject: `Compra ${ticket.code}`,
            html: createBodyMail(ticket, user),
            attachments: [],
        });
        return result;
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = {sendEmailPurchase}