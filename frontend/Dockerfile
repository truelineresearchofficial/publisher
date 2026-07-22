# --- build the Vite app ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_BASE=/api
ENV VITE_API_BASE=$VITE_API_BASE
# Public Apps Script Web App URL for Contact -> Google Sheet mirroring.
ARG VITE_GOOGLE_SCRIPT_URL=ARG VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzfD8FMZxAVWlCh5epy9RLKxdCfWTDShUfyQEJtKbWKah9Swp69TN-Lkfd0E93xlKpt4A/exec
ENV VITE_GOOGLE_SCRIPT_URL=$VITE_GOOGLE_SCRIPT_URL
RUN npm run build

# --- serve static dist with nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
