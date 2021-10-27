const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("The server started on port 3001 !!!!!!");
});

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Contato Blog</h1>");
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", //coloque o smtp do seu email
    port: 587,
    secure: false, // true se houver mais de uma porta
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: "Usuario: " + user.email + "<"+details.email+">",
    to: details.email,
    subject: `Usuário ${user.name} (${user.email})`,
    html: `<h4>${user.name}, entrou em contato!</h4><p>${user.message}</p>`
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
