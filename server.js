const { McpSdk } = require('@typingmind/mcp-sdk');
const axios = require('axios');

// IMPORTANTE: URL do seu webhook do n8n.
// Você pode colocar a URL aqui ou, melhor ainda, usar uma variável de ambiente.
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

async function main() {
  const mcp = new McpSdk();

  // Define o nosso comando personalizado.
  mcp.registerServer('enviar_para_n8n', {
    run: async (args, context) => {
      const promptText = context.prompt;
      console.log(`Recebido prompt: ${promptText}`);
      console.log(`Enviando para o n8n: ${N8N_WEBHOOK_URL}`);

      try {
        // Usa o axios para fazer a chamada HTTP, sem precisar de 'curl'.
        await axios.post(N8N_WEBHOOK_URL, {
          text: promptText,
        });

        console.log('Dados enviados com sucesso para o n8n.');
        // Responde ao TypingMind com sucesso!
        return { success: true };
      } catch (error) {
        console.error('Erro ao enviar dados para o n8n:', error.message);
        // Responde ao TypingMind com erro.
        return { success: false, error: error.message };
      }
    },
  });

  // Inicia o servidor MCP.
  await mcp.start();
  console.log('Servidor-Ponte MCP iniciado e aguardando conexões...');
}

main();
