const express = require("express");
const router = express.Router();

router.get("/pendentes", async (req, res) => {
  try {
    res.status(200).json({ message: "Listagem dos relatórios pendentes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
