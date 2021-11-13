#####################
# FIRST STEP STATE
####################
FROM node:14.18.1-alpine as node
WORKDIR /usr/app
USER ${USER}
COPY package*.json ./
COPY . ./
RUN apk add --update && make

#####################
# SECOND STAGE STEP
#####################
COPY --from=node ./ ./usr/app/
RUN make install
EXPOSE 3000 3000
CMD npm start