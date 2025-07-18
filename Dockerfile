# Usar uma imagem oficial do Node.js como base.
# A versão 'alpine' é pequena e eficiente.
FROM node:20-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# O conector do TypingMind espera rodar na porta 50880.
# Podemos definir isso como uma variável de ambiente.
ENV PORT=50880

# Expor a porta para que o Docker possa mapeá-la.
EXPOSE 50880

# O comando que será executado quando o container iniciar.
# Ele usa uma variável de ambiente (MCP_SECRET_KEY) que vamos configurar no Easypanel.
# Isso evita colocar sua chave secreta diretamente no código.
CMD npx @typingmind/mcp $MCP_SECRET_KEY```

