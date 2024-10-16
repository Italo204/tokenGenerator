FROM node:22.8.0

WORKDIR /usr/src/app

COPY package*.json ./

# Se você estiver em ambiente de produção e não quiser instalar dependências de desenvolvimento, use:
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]