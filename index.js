require("dotenv").config();
const PORT = process.env.PORT || 4200;
const { httpServer } = require("./entregables/entregable7/src/socket");
httpServer.listen(PORT, ()=> console.log(`Server listening on port ${httpServer.address().port}`))
httpServer.on("error", error => console.log(error))