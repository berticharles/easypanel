// A CORREÇÃO: Importamos 'McpServer' diretamente.
// O pacote exporta a classe como o item principal.
const McpServer = require('@typingmind/mcp');
const axios = require('axios');

// Pega a URL do webhook do Zapier da variável de ambiente.
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;
if (!ZAPIER_WEBHOOK_URL) {
  console.error('ERRO: A variável de ambiente ZAPIER_WEBHOOK_URL não está definida!');
  process.exit(1);
}

// Agora, new McpServer() vai funcionar, pois a variável McpServer contém o construtor correto.
const server = new McpServer();

// Registra nosso comando personalizado.
server.register('enviar_para_zapier', {
  run: async (args, context) => {
    const promptText = context.prompt;
    console.log(`[INFO] Recebido prompt: "${promptText}"`);
    console.log(`[INFO] Enviando para o Zapier...`);

    try {
      // Usa o axios para fazer a chamada HTTP para o Zapier.
      await axios.post(ZAPIER_WEBHOOK_URL, {
        text: promptText
