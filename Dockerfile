FROM node:20-alpine3.19 AS ui-build

WORKDIR /usr/src/am

COPY . .

RUN npm install && npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image

FROM nginx:latest

COPY k8s/nginx-config/nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.

COPY --from=ui-build /usr/src/am/dist/ /usr/share/nginx/html

# Expose port 80

EXPOSE 1000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
