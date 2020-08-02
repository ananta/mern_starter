
FROM node:10 AS frontend
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:10 AS backend
WORKDIR /root/
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/server.js ./backend/

FROM nginx:1.16.0-alpine
WORKDIR /root/
COPY --from=frontend /usr/src/app/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

LABEL maintainer="anantarajbastola@gmail.com"

# CMD ["node", "./backend/server.js"]



