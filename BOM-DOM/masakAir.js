// Menambahkan element dengan append child

// langkah pertama create element 
const paragraph = document.createElement('li');

// isi element yang akan dibuat
paragraph.innerText = 'Selamat Datang';

// mendapatkan parent elemen yakni elemen OL pada tag
const daftar = document.getElementById('daftar');

// tambahkan data dengan appendchild 
daftar.appendChild(paragraph);


// Menambahkan element dengan insertBefore
// pertama, buat element createElement
const elementAwal = document.createElement('li');

// masukkan data yang ingin ditambahkan
elementAwal.innerText = 'Hidupkan Kompor';

// ambil element li berdasarkan ID
const itemAwal = document.getElementById('awal');

// memanggil method 
daftar.insertBefore(elementAwal, itemAwal);