# Usar uma imagem oficial do Node.js como base (Alpine Linux)
FROM node:20-alpine

# Instalar o 'curl', que é necessário para enviar o webhook para o Zapier.
RUN apk add curl

# Instalar o conector do TypingMind globalmente durante a construção da imagem.
RUN npm install -g @typingmind/mcp

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# O comando que será executado quando o container iniciar.
# Esta é a forma "exec", recomendada pelo Docker para maior estabilidade.
CMD ["/bin/sh", "-c", "mcp $MCP_SECRET_KEY"]
