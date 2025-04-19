# MeetHub
MeetHub adalah aplikasi web backend yang membantu pengguna menemukan tempat co-working berdasarkan lokasi, rating, dan review. Aplikasi ini mengintegrasikan API eksternal dan menggunakan caching serta rate limiting untuk performa maksimal.

# Fitur Utama
1. Filter tempat co-working berdasarkan lokasi, rating, dan review
2. Caching menggunakan Redis untuk mempercepat respons
3. Rate limiting untuk membatasi akses berlebih
4. Integrasi API eksternal untuk mendapatkan data tempat dan review

# Struktur Proyek
<pre>
coworking-aggregator/
├── controllers/          # Logika untuk filtering tempat
├── models/              # Model data (misal: CachedReview)
├── server.js            # Entry point aplikasi
├── db.js                # Koneksi ke database
├── redisClients.js      # Setup Redis
├── rateLimiter.js       # Middleware rate limiting
├── throttle.js          # Middleware throttle tambahan
├── .env                 # Konfigurasi lingkungan (tidak dibagikan)
├── package.json         # Metadata dan dependensi
</pre>

# Cara Menjalankan
### Clone Repositori
<pre>
git clone https://github.com/vinaarvi/coworking-aggregator.git
</pre>

### Ubah Direktori
<pre>
cd coworking-aggregator
</pre>

### Install Dependencies
<pre>
npm install
</pre>

### Siapkan file .env
<pre>
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=meethub
REDIS_PORT=6379
</pre>

### Jalankan Server
<pre>
node server.js
</pre>

# Testing
Gunakan Postman atau tool API lain untuk mencoba endpoint filtering, caching, dan validasi review.

# Teknologi yang Digunakan
1. Node.js + Express
2. Redis
3. MySQL
4. API eksternal untuk data tempat dan review
5. Middleware rate limiter & throttle
