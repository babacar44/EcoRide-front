FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build --configuration=production

FROM nginx:alpine
COPY --from=builder /app/dist/EcoRide/browser /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
