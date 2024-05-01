const express = require("express");
const router = express.Router();
const AssinaturaDigital = require("../models").AssinaturaDigital;
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
    const { relatorioId, gerenteId, assinatura, status } = req.body;

    const novaAssinaturadigital = await AssinaturaDigital.create({
      data: new Date(),
      relatorioId: relatorioId,
      gerenteId: gerenteId,
      assinatura: assinatura,
    });

    await Despesa.update({ status: status }, { where: { id: relatorioId } });

    const despesa = await Despesa.findOne({ where: { id: relatorioId } });

    const funcionario = await Funcionario.findOne({
      where: { id: despesa.funcionarioId },
    });

    await transporter.sendMail({
      from: "gustavojchaves1@gmail.com",
      to: funcionario.email,
      subject: `Sua despesa foi ${status}`,
      text: `A despesa com a seguinte descrição: ${despesa.descricao} e valor: ${despesa.valor} foi ${status}.`,
    });

    res.status(201).json(novaAssinaturadigital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
