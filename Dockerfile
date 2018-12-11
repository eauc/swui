FROM node:10 as build

ARG UID=1000
ARG GID=1000
RUN groupadd -r -g ${GID} swui || true
RUN useradd -r -g swui -u ${UID} swui || true

WORKDIR /app
RUN chown ${UID}:${GID} .
USER ${UID}

COPY ./package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]

FROM nginx as production

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/conf.d/conf.template

ENV PORT 80

CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
