FROM node:14.15.4

RUN mkdir /code
WORKDIR /code

COPY index.js /code
COPY package.json /code

RUN npm i

CMD [ "node", "index.js" ]
