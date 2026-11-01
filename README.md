# Portfolio Reffa Fabyan Maulana

Website portofolio statis (HTML5, CSS3, Vanilla JavaScript) yang menggabungkan profil IT Developer dan Student Athlete.

## Struktur Folder

```
portfolio/
├── index.html
├── README.md
├── assets/
│   └── favicon.svg
├── css/
│   └── style.css
└── js/
    ├── config.js
    └── main.js
```

- `index.html`: seluruh konten dan struktur halaman.
- `css/style.css`: gaya, CSS variables, dan responsivitas.
- `js/config.js`: tempat mengisi tautan sosial, tautan proyek, daftar skill, dan galeri.
- `js/main.js`: navigasi mobile, animasi scroll, tahun dinamis, dan pengisian data dari `config.js`.

## Menjalankan Secara Lokal

Cara paling mudah: klik dua kali `index.html` untuk membukanya di browser.

Atau dengan server lokal (opsional):

```
cd portfolio
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Cara Mengisi Data

Buka `js/config.js`:

- `links`: isi alamat email dan URL akun. Tombol yang URL-nya masih kosong otomatis nonaktif (kontak) atau disembunyikan (Live Demo), sehingga tidak ada tautan palsu.
- `skills`: isi daftar nama skill yang benar-benar Anda kuasai, misalnya `languages: ["Python"]`.
- `gallery`: isi `src` dengan path foto, misalnya `assets/foto-lomba.jpg`, dan `alt` dengan deskripsi foto.

Teks dalam kurung siku seperti `[Nama Proyek 2]` di `index.html` adalah placeholder yang perlu diganti.

## Data yang Masih Perlu Dilengkapi

1. Email, GitHub, LinkedIn, Instagram, dan Strava di `js/config.js`.
2. Daftar skill (bahasa pemrograman, frontend, backend, tools).
3. Tautan GitHub untuk Proyek 2 dan Proyek 3, jika kodenya ingin dipublikasikan.
4. Tautan GitHub proyek portofolio ini setelah repository dibuat.
5. Nama kejuaraan, nomor lomba, dan tingkat untuk setiap prestasi (tabel Riwayat Kompetisi dan Timeline).
6. Verifikasi Personal Best 5K 17:42 dan 10K 38:04, serta tujuh prestasi yang tertulis.
7. Filosofi latihan dan target atletik.
8. Cerita Learning Journey.
9. Titik awal perjalanan IT dan atletik, serta pengalaman organisasi atau sertifikasi jika ada.
10. Foto galeri kompetisi dan latihan (gunakan foto milik sendiri atau yang berizin).
11. Gambar pratinjau untuk media sosial: tambahkan `<meta property="og:image" content="https://domain-anda/assets/og-image.jpg">` di `<head>` setelah domain aktif (ukuran disarankan 1200×630).
12. Tambahkan `<meta property="og:url">` dan `<link rel="canonical">` berisi alamat final website.

## Publikasi dengan GitHub Pages

1. Buat akun di github.com, lalu buat repository baru, misalnya `portfolio` (public).
2. Unggah file lewat tombol **Add file → Upload files**, atau lewat Git:

```
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

3. Di repository, buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu 1-2 menit. Alamat website: `https://USERNAME.github.io/portfolio/`.

Jika repository diberi nama `USERNAME.github.io`, alamatnya menjadi `https://USERNAME.github.io/`.

## Publikasi dengan Netlify

1. Masuk ke app.netlify.com.
2. Pilih **Add new site → Deploy manually**, lalu seret folder `portfolio` ke halaman tersebut.
3. Atau pilih **Import from Git** dan hubungkan repository GitHub agar setiap perubahan terbit otomatis.
4. Ubah nama situs di **Site configuration → Change site name**.

## Custom Domain dan HTTPS

1. Beli domain dari penyedia domain pilihan Anda.
2. GitHub Pages: di **Settings → Pages → Custom domain**, isi domain Anda lalu **Save**.
3. Atur DNS di penyedia domain:
   - Domain utama (apex): buat record `A` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, dan `185.199.111.153`.
   - Subdomain `www`: buat record `CNAME` ke `USERNAME.github.io`.
4. Setelah DNS aktif (bisa sampai beberapa jam), centang **Enforce HTTPS** di pengaturan Pages.
5. Netlify: buka **Domain management → Add a domain** dan ikuti petunjuk DNS. HTTPS diaktifkan otomatis lewat Let's Encrypt.

Periksa kembali alamat IP GitHub Pages di dokumentasi resmi GitHub sebelum mengatur DNS, karena dapat berubah.

## Catatan Aksesibilitas dan Performa

- Semantic HTML, tautan lewati konten, fokus keyboard yang jelas, dan dukungan `prefers-reduced-motion`.
- Tanpa framework dan tanpa library eksternal; font memakai font sistem sehingga cepat dimuat.
- Gambar galeri memakai `loading="lazy"`. Kompres foto sebelum diunggah (disarankan di bawah 300 KB per foto).
