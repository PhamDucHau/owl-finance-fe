# Giai đoạn build
FROM node:20 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock (chỉ dùng yarn, không cần package-lock.json)
COPY package.json yarn.lock ./

# Cài đặt phiên bản npm và Angular CLI (tuỳ chọn)
RUN npm install -g npm@10.2.3
RUN npm install -g @angular/cli@18.0.4

# Cài dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch ứng dụng Angular
RUN yarn build

# Giai đoạn production
FROM nginx:latest AS production

# Sao chép kết quả build vào nginx
COPY --from=build /app/dist/Modernize /usr/share/nginx/html

# Copy file cấu hình nginx nếu có
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Khởi chạy nginx
CMD ["nginx", "-g", "daemon off;"]
