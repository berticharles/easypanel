# Usar uma imagem oficial do Node.js como base
FROM node:20-alpine

# --- DIAGNÓSTICO DURANTE A CONSTRUÇÃO ---
# 1. Qual usuário está executando estes comandos?
RUN whoami

# 2. Listar as permissões do 'echo' e do 'curl'
RUN apk add curl && ls -la /bin/sh && ls -la /bin/echo && ls -la /usr/bin/curl

# --- MANTER O CONTAINER VIVO PARA INSPEÇÃO ---
# Este comando não faz nada além de manter o container rodando
# para que possamos entrar nele e investigar.
CMD tail -f /dev/null
