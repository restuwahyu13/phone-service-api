#####################
# NODE ENVIRONMENT
####################
FROM node:14.18.1-alpine
WORKDIR /app
USER ${USER}
COPY package*.json /app/
COPY . /app/
RUN apk add --update \
  && apk add make \
  && npm ci \
  npm run build \
  npm test
EXPOSE 3000
CMD npm start