FROM node:18.14.2-slim as dependencies
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i --legacy-peer-deps

FROM node:18.14.2-slim as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ARG HASURA_URL
ENV HASURA_URL=$HASURA_URL

ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY

COPY . .
RUN npm i --legacy-peer-deps
RUN npm run build

FROM node:18.14.2-slim as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["node_modules/.bin/next", "start"]
