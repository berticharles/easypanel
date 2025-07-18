FROM node:20-alpine

WORKDIR /app

# Instala a ferramenta de servidor MCP globalmente
RUN npm install -g @typingmind/mcp

# Copia e instala as dependências do nosso script (axios)
COPY package.json ./
RUN npm install

# Copia nosso script de ação para o container
COPY send_webhook.js ./

# O comando que inicia o servidor MCP e o mantém ouvindo.
CMD ["/bin/sh", "-c", "exec mcp \"$MCP_AUTH_TOKEN\""]
