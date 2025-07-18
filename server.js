// A CORREÇÃO FINAL: O pacote exporta a classe como o item principal.
const McpServer = require('@typingmind/mcp');
const axios = require('axios');

// Pega a URL do webhook do Zapier da variável de ambiente.
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;
if (!ZAPIER_WEBHOOK_URL) {
  console.error('ERRO: A variável de ambiente ZAPIER_WEBHOOK_URL não está definida!');
  process.exit(1);
}

// Agora, new McpServer() funciona, pois a variável contém o construtor.
const server = new McpServer();

// Registra nosso comando personalizado.
server.register('enviar_para_zapier', {
  run: async (args, context) => {
    const promptText = context.prompt;
    console.log(`[INFO] Recebido prompt: "${promptText}"`);
    console.log(`[INFO] Enviando para o Zapier...`);

    try {
      await axios.post(ZAPIER_WEBHOOK_URL, { text: promptText });
      console.log('[SUCCESS] Dados enviados para o Zapier.');
      return { success: true, message: 'Enviado para o Zapier.' };
    } catch (error) {
      console.error('[ERROR] Falha ao enviar para o Zapier:', error.message);
      return { success: false, error: error.message };
    }
  },
});

// Inicia o servidor.
server.listen().then(() => {
  console.log(`[INFO] Servidor-Ponte MCP iniciado e pronto na porta ${process.env.PORT || 'default'}.`);
}).catch(err => {
  console.error('[FATAL] Não foi possível iniciar o servidor MCP:', err);
});
