// Integrantes: Gustavo João Chaves e Michael Varaldo

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const corsOptions = {
  origin: "*", // Permitir solicitações de qualquer origem
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir métodos de requisição especificados
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Adicionando o middleware CORS com as opções configuradas
app.use(cors(corsOptions));
app.use(express.json());

app.use("/funcionarios", require("./routes/funcionarios"));
app.use("/despesas", require("./routes/despesas"));
app.use("/verificar-assinatura", require("./routes/verificarAssinatura"));
app.use("/validar-despesa", require("./routes/validarDespesa"));
app.use("/assinatura-digital", require("./routes/assinaturaDigital"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
