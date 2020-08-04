FROM node:14-slim

EXPOSE 3000

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD npm run dev