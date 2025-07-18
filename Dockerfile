FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Expõe a porta que o Easypanel usará
EXPOSE 80

# Comando para iniciar o servidor
CMD ["node", "server.js"]
