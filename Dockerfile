FROM node:lts-alpine AS script
ADD ./script.js /app/script.js
RUN node /app/script.js

FROM nginx:stable-alpine
COPY --from=script /app/nginx.conf /etc/nginx