
#Multi-stage building

# --- Base Node --- #
FROM node:8 AS base

#Working Directory
WORKDIR /app
#Copy package.json and package-lock.json
COPY package*.json ./

# --- Dependencies Node --- #
FROM base AS dependencies
#Installing node packages
RUN npm install --only=production
#Copy production node_modules
RUN cp -R node_modules node_modules_prod
#Install all modukes including devDependencies
RUN npm install


# --- Release Node --- #
FROM base AS release
#Copy production node_modules
COPY --from=dependencies /app/node_modules_prod ./node_modules
#Copy app
COPY . .
ENV PORT=3000
#Expose port
EXPOSE 3000
#Run app production mode
CMD npm run start-prod