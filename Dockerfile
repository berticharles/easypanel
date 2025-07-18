FROM node:20-alpine

WORKDIR /app

# Instala a ferramenta de servidor MCP oficial globalmente
RUN npm install -g @typingmind/mcp

# O comando final e robusto para iniciar o servidor,
# passando o token de forma segura, sem interpretar caracteres especiais.
CMD ["/bin/sh", "-c", "exec mcp \"$MCP_AUTH_TOKEN\""]
