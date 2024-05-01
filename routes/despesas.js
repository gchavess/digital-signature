const express = require("express");
const router = express.Router();
const Despesa = require("../models").Despesa;
const Funcionario = require("../models").Funcionario;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gustavojchaves1@gmail.com",
    pass: "gmcz hnsb wnbb gffx",
  },
});

router.post("/", async (req, res) => {
  try {
    const { funcionarioId, data, descricao, valor, status } = req.body;

    const novaDespesa = await Despesa.create({
      descricao: descricao,
      data: data,
      valor: valor,
      funcionarioId: funcionarioId,
      status: status,
    });

    const gerentes = await Funcionario.findAll({
      where: {
        cargo: ["Gerente"],
      },
    });

    for (const gerente of gerentes) {
      await transporter.sendMail({
        from: "gustavojchaves1@gmail.com",
        to: gerente.email,
        subject: "Nova Despesa Criada",
        text: `Uma nova despesa foi criada com a seguinte descrição: ${descricao}. Valor: ${valor}`,
      });
    }

    res.status(201).json(novaDespesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const despesas = await Despesa.findAll();
    res.json(despesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/pendentes", async (req, res) => {
  try {
    const despesas = await Despesa.findAll({
      where: {
        status: "Pendente",
      },
    });
    res.json(despesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/assinados", async (req, res) => {
  try {
    const despesas = await Despesa.findAll({
      where: {
        status: ["Aprovado", "Reprovado"],
      },
    });
    res.json(despesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
