const axios = require('axios');

// Pega a URL do Zapier da variável de ambiente.
const ZAPIER_URL = process.env.ZAPIER_WEBHOOK_URL;
if (!ZAPIER_URL) {
  console.error("ERRO: A variável de ambiente ZAPIER_WEBHOOK_URL não está definida.");
  process.exit(1);
}

let inputJson = '';

process.stdin.on('data', chunk => {
  inputJson += chunk;
});

process.stdin.on('end', () => {
  try {
    // O MCP envia o contexto como um objeto JSON.
    const context = JSON.parse(inputJson);
    const textToSend = context.prompt;

    if (textToSend) {
      console.log(`Enviando prompt para o Zapier: "${textToSend}"`);
      axios.post(ZAPIER_URL, { text: textToSend })
        .then(() => {
          console.log("Webhook enviado com sucesso.");
          process.exit(0); // Termina com sucesso
        })
        .catch(err => {
          console.error("Erro ao enviar webhook:", err.message);
          process.exit(1); // Termina com erro
        });
    }
  } catch (e) {
    console.error("Erro ao processar a entrada:", e.message);
    process.exit(1); // Termina com erro
  }
});
