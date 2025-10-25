import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SYNC_API_KEY = "c868ca1a-4f65-4a3e-b545-fd71ba4fec3b"; // sua chave

app.post("/gerar-pix", async (req, res) => {
  try {
    const valor = 12.90; // valor fixo
    const payload = {
      amount: valor,
      // Ajuste os dados abaixo conforme documentação da SyncPay
      reference: "pedido_001",
      webhookUrl: "", // opcional
      expireIn: 3600 // expira em 1h
    };

    const response = await axios.post("https://api.syncpay.com/v1/payments/pix", payload, {
      headers: {
        "Authorization": `Bearer ${SYNC_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    // Retorna o Pix copia e cola
    return res.json({
      pix: response.data.pixCopyPaste
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Erro ao gerar PIX" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
