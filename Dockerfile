# Usar uma imagem oficial do Node.js como base
FROM node:20-alpine

# Instalar o conector do TypingMind globalmente durante a construção da imagem.
# Isso é mais robusto do que usar npx toda vez.
RUN npm install -g @typingmind/mcp

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# O comando que será executado quando o container iniciar.
# Ele agora usa o comando 'mcp' (que foi instalado globalmente)
# e passa a chave secreta como um argumento.
CMD mcp $MCP_SECRET_KEY
```5.  Role até o final da página e clique no botão verde **"Commit changes"** para salvar a alteração.
