// const gambar = document.getElementById("gambar");

// gambar.setAttribute("width", 300);
// gambar.setAttribute("height",215);


const links = document.getElementById('links');

// Manipulasi HTML dengan InnerTEXT dan Inner HTML

// inner HTML digunakan untuk mengedit tag
const dicoding = document.getElementById('dicodingLink');
dicoding.innerHTML = '<i>Belajar programming di Dicoding</i>';


// inner text tidak bisa meng edit tag
const google = document.getElementById('googleLink');
google.innerText = 'Mencari sesuatu di google'

// Manipulasi style konten dengan style properties
const buttons = document.getElementsByClassName('button');

for (const button of buttons) {
    button.children[0].style.borderRadius = '6px';
}