const express = require("express");
const router = express.Router();
const Funcionario = require("../models").Funcionario;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/gerentes", async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({
      where: {
        cargo: "Gerente",
      },
    });
    res.json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, email, cargo, senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoFuncionario = await Funcionario.create({
      nome: nome,
      email: email,
      cargo: cargo,
      senha: senhaCriptografada,
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const funcionario = await Funcionario.findOne({ where: { email: email } });
    if (!funcionario) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: funcionario.id, email: funcionario.email },
      "chave_secreta_do_token",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token, cargo: funcionario.cargo, id: funcionario.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
