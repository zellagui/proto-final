FROM bitnami/node:18 AS build
WORKDIR /app

ARG GTM_ID
ARG VITE_APP_URL
ARG VITE_MAPBOX_ACCESS_TOKEN

RUN corepack enable

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./
RUN CYPRESS_INSTALL_BINARY=0 pnpm install

COPY . .
RUN GTM_ID=$GTM_ID \
  VITE_APP_URL=$VITE_APP_URL \
  VITE_MAPBOX_ACCESS_TOKEN=$VITE_MAPBOX_ACCESS_TOKEN \
  pnpm ssg:build

FROM bitnami/node:18 AS prod
WORKDIR /app

RUN corepack enable

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json .
COPY --from=build /app/server.ts .

EXPOSE 3000

CMD ["pnpm", "ssg:serve"]