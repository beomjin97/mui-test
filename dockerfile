FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

VOLUME /etc/nginx/ssl

COPY ./dist /usr/share/nginx/html

EXPOSE 80 443

# nginx를 foreground에서 실행
# CMD ["nginx", "-g", "daemon off"]

CMD ["nginx", "-t"]