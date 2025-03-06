# Giai đoạn build
FROM node:20 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package*.json package-lock.json ./

# Cài đặt dependencies
RUN npm install -g npm@10.2.3
RUN yarn install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch ứng dụng Angular
RUN yarn build

# Bước 2: Giai đoạn production
FROM nginx:latest AS production

# Sao chép tệp build từ giai đoạn build
COPY --from=build /app/dist/Modernize /usr/share/nginx/html

# Sao chép tệp cấu hình Nginx nếu cần
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]