const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seu_email@gmail.com",
    pass: "sua_senha",
  },
});

const enviarEmail = async (destinatario, assunto, corpo) => {
  try {
    await transporter.sendMail({
      from: "seu_email@gmail.com",
      to: destinatario,
      subject: assunto,
      text: corpo,
    });
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};

module.exports = enviarEmail;
