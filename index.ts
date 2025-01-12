import express from "express";
import router from "./routes";
// import * as jwt from "jsonwebtoken";
// import * as bcrypt from "bcrypt";

// const pass = "minhasenha123";
// const saltRounds = 10;

// bcrypt.hash(pass, saltRounds, (error, hash) => {
//   bcrypt.compare(pass, hash, (error, result) => {
//     if (result) {
//       console.log("Acertou miseravi");
//     } else {
//       console.log("Perdeu Playboy");
//     }
//   });
// });

// const payload = {
//   userId: "6042ced6-3e7a-43d9-bcd3-b4bd32e23aad",
//   nome: "Juliana Maria",
// };

// const secret = "a4c30763-14fd-46db-b666-c686ed327e6b";

// const option = {
//   expiresIn: "1h",
// };

// const token = jwt.sign(payload, secret, option);

// console.log(token);

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(router);

server.listen(3000);
