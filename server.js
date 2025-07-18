const { McpServer } = require('@typingmind/mcp');
const axios = require('axios');

// Pega a URL do webhook do Zapier da variável de ambiente.
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;
if (!ZAPIER_WEBHOOK_URL) {
  console.error('ERRO: A variável de ambiente ZAPIER_WEBHOOK_URL não está definida!');
  process.exit(1);
}

// Cria uma nova instância do servidor MCP.
const server = new McpServer();

// Registra nosso comando personalizado.
server.register('enviar_para_zapier', {
  run: async (args, context) => {
    const promptText = context.prompt;
    console.log(`[INFO] Recebido prompt: "${promptText}"`);
    console.log(`[INFO] Enviando para o Zapier...`);

    try {
      // Usa o axios para fazer a chamada HTTP para o Zapier.
      const response = await axios.post(ZAPIER_WEBHOOK_URL, {
        text: promptText,
      });

      console.log('[SUCCESS] Dados enviados com sucesso para o Zapier.');
      // Responde ao TypingMind com sucesso!
      return { success: true, message: 'Enviado para o Zapier.' };
    } catch (error) {
      console.error('[ERROR] Falha ao enviar dados para o Zapier:', error.message);
      // Responde ao TypingMind com a mensagem de erro.
      return { success: false, error: error.message };
    }
  },
});

// Inicia o servidor. Ele vai usar a porta da variável de ambiente PORT.
server.listen().then(() => {
  console.log(`[INFO] Servidor-Ponte MCP iniciado e pronto.`);
}).catch(err => {
  console.error('[FATAL] Não foi possível iniciar o servidor MCP:', err);
});
