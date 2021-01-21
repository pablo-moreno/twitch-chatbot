FROM node:12.16.3

RUN mkdir /code
WORKDIR /code

COPY index.js /code
COPY package.json /code

RUN npm i

CMD [ "node", "index.js" ]
