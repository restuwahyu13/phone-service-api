#####################
# NODE ENVIRONMENT
####################
FROM node:14.18.1-alpine
WORKDIR /app
COPY ./package*.json \
  ./Makefile /app/
COPY . /app/
RUN apk add --update \
  && apk add make
RUN make install
EXPOSE 3000
CMD npm start