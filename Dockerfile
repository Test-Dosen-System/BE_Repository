# Gunakan image Node.js versi 18.17.0 sebagai dasar
FROM node:18.18-alpine3.18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode sumber aplikasi
COPY . .

# Port yang akan diexpose oleh aplikasi
EXPOSE 1242

# Perintah untuk menjalankan aplikasi
CMD ["./node_modules/.bin/nodemon", "app.js"]
