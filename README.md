# MeetHub
MeetHub adalah platform aggregator ruang kerja (co-working space) yang membantu pengguna menemukan tempat meeting atau bekerja berdasarkan lokasi dan popularitas. Project ini dibangun menggunakan Node.js (backend) dan HTML/CSS (frontend statis), serta menggunakan Redis untuk caching dan OpenCage Geocoding API untuk konversi lokasi ke koordinat.

# Fitur Utama
1. Filter tempat co-working berdasarkan lokasi, rating, dan review
2. Caching menggunakan Redis untuk mempercepat respons
3. Rate limiting untuk membatasi akses berlebih
4. Integrasi API eksternal untuk mendapatkan data tempat dan review

# Struktur Proyek
### Backend
<pre>
coworking-aggregator/
├── controllers/         # Logika untuk filtering tempat
├── models/              # Model data (misal: CachedReview)
├── server.js            # Entry point aplikasi
├── db.js                # Koneksi ke database
├── redisClients.js      # Setup Redis
├── rateLimiter.js       # Middleware rate limiting
├── throttle.js          # Middleware throttle tambahan
├── .env                 # Konfigurasi lingkungan (tidak dibagikan)
├── package.json         # Metadata dan dependensi
</pre>
### Frontend
<pre>
MeetHub-Website/
    MeetHub-Website/
        about_us.html
        index.html
        popular_spaces.html
        signup.html
        style.css
    images/
        coze_space.jpg
        foto_meeting.jpg
        kopitagram_cinere.jpg
        meethub_logo_transparent_fixed.png
        teamwork.jpg
        work_coffee.jpg
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

# Endpoint API
1. /places : GET, GET by id, POST, PUT, DELETE
2. /facilities : GET, GET by id, POST, PUT, DELETE
3. /activities : GET, GET by id, POST, PUT, DELETE
4. /place-facilities : GET, GET by id, POST, DELETE
5. /place-activities : GET, GET by id, POST, DELETE
6. /cached-reviews : GET, GET by id, POST, PUT, DELETE
7. /filter : GET by city and activity
8. /signup : POST
9. /login : POST

# ERD
![ERD MeetHub (1)](https://github.com/user-attachments/assets/2ff1fe72-ec13-4be1-b4c0-92d21180b1ee)

### One-to-Many (1:M) :
- Places  → Cached_Reviews
- Places  → Place_Facilities
- Facilities  → Place_Facilities
- Places  → Place_Activities
- Activities_Place_Activities

### Many-to-Many (M:M) :
- Places  → Facilities
- Places  → Activities
