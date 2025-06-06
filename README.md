# MeetHub
MeetHub adalah platform aggregator ruang kerja (co-working space) yang membantu pengguna menemukan tempat meeting atau bekerja berdasarkan lokasi dan popularitas. Project ini dibangun menggunakan Node.js (backend) dan HTML/CSS (frontend statis), serta akan menggunakan Redis untuk caching dan OpenCage Geocoding API untuk konversi lokasi ke koordinat.

# Fitur Utama
1. Filter tempat co-working berdasarkan lokasi, rating, dan review
2. Rate limiting untuk membatasi akses berlebih
3. Caching menggunakan Redis untuk mempercepat respons
4. Integrasi API eksternal untuk mendapatkan data tempat dan review

# Mockup
![MacBook Air (1)](https://github.com/user-attachments/assets/4b31801b-cb40-42f0-91be-a0ea877de6a8)

# Struktur Proyek
### Backend
<pre>
coworking-aggregator/
├── controllers/         # Logika untuk filtering tempat
├── models/              # Model data (misal: CachedReview)
├── server.js            # Entry point aplikasi
├── db.js                # Koneksi ke database
├── redisClients.js      # Setup 
Redis
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

### Masuk ke Direktori 
<pre>
cd coworking-aggregator
</pre>

### Install Dependencies
<pre>
npm install
</pre>

### Buat file .env di root folder Meethub
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

### Testing API
Gunakan Postman atau tool API lain untuk mencoba endpoint filtering, caching, dan validasi review.

# Endpoint API
### /places
1. GET /places/
2. GET /places/:id
3. POST /places/
4. PUT /places/:id
5. DELETE /places/:id

### /facilities
1. GET /facilities/
2. GET /facilities/:id
3. POST /facilities/
4. PUT /facilities/:id
5. DELETE /facilities/:id

### /activities
1. GET /activities/
2. GET /activities/:id
3. POST /activities/
4. PUT /activities/:id
5. DELETE /activities/:id

### /place-facilities
1. GET /place-facilities/
2. GET /place-facilities/:id
3. POST /place-facilities/
4. DELETE /place-facilities/:place_id/:facility_id

### /place-activities
1. GET /place-activities/
2. GET /place-activities/:id
3. POST /place-activities/
4. DELETE /place-activities/:place_id/:activity_id

### /cached-reviews
1. GET /cached-reviews/:place_id
2. POST /cached-reviews/

### /filter
1. GET /filter/ dengan query param seperti ?city=&activity=&...
<pre>
Contoh Request:
http://localhost:3000/filter?city=jakarta&activity=meeting&price_max=30

Contoh Response:
[
    {
        "place_id": 2,
        "name_place": "StudyClubs",
        "address": "Jl. Margasatwa 2 No.29",
        "city": "Jakarta",
        "latitude": "-6.21460000",
        "longitude": "106.84510000",
        "description": "Tempat belajar modern dengan kapasitas besar dan proyektor.",
        "rating": 4.7,
        "rating_source": "Google",
        "price_range": 30,
        "capacity": 20
    }
]
</pre>

### /signup
1. POST /signup
<pre>
Contoh Request:
http://localhost:3000/signup

Contoh Response:
{
    "message": "User berhasil dibuat"
}
</pre>

### /login
1. POST /login
<pre>
Contoh Request:
http://localhost:3000/login

Contoh Response:
{
    "message": "Login berhasil",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ2aW5hMTIzIiwiaWF0IjoxNzQ1MTYyNzUwLCJleHAiOjE3NDUxNjYzNTB9.ErL7G0eIDv_Zjrmt1BA9AAfF0ynESzRcTAs4AwxKI2A"
}
</pre>

# Teknologi yang Digunakan
1. Node.js + Express
2. MySQL
3. MongoDB
4. API eksternal untuk data tempat dan review
5. Middleware rate limiter & throttle
6. HTML + CSS
7. Redis

# Databases
MeetHub menggunakan pendekatan **hybrid database**, yaitu gabungan antara **MySQL** dan **MongoDB**.

### MySQL 
Digunakan untuk menyimpan data terstruktur.
<pre>
places
activities
facilities
place_activities
place_facilities
users
</pre>

### MongoDB
Digunakan untuk menyimpan data yang lebih fleksibel dan tidak membutuhkan relasi kompleks.
<pre>
cached_review
</pre>

# ERD
![ERD MeetHub (1)](https://github.com/user-attachments/assets/ed46dcfa-ab60-45bc-919a-a1ef67dfc3dd)

### One-to-Many (1:M) :
- Places  → Place_Facilities
- Facilities  → Place_Facilities
- Places  → Place_Activities
- Activities_Place_Activities

### Many-to-Many (M:M) :
- Places  → Facilities (via Place_Facilities)
- Places  → Activities (via Place_Activities)
