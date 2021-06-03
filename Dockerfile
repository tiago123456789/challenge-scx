FROM node:14-alpine

MAINTAINER Tiago rosa da costa

ENV DIR ./

COPY tsconfig.json tsconfig.build.json package.json package-lock.json $DIR

WORKDIR $DIR 

COPY . $DIR 

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]