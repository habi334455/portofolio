// 1. Fitur Dark Mode Toggle (Khusus Tailwind)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // Mengambil tag <html>

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    
    // Ubah teks tombol sesuai tema yang aktif
    if (htmlElement.classList.contains('dark')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});

// 2. Fitur Animasi Typewriter (Sama seperti sebelumnya)
const words = ["Multimedia", "Game Dev", "3D Modeling"];
let i = 0; 
let j = 0; 
let isDeleting = false;
let textElement = document.getElementById("typewriter");

function type() {
    let currentWord = words[i];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, j - 1);
        j--;
    } else {
        textElement.textContent = currentWord.substring(0, j + 1);
        j++;
    }

    let typingSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && j === currentWord.length) {
        typingSpeed = 2000; // Jeda saat kata utuh
        isDeleting = true;
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length; 
        typingSpeed = 500; // Jeda sebelum mengetik kata baru
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});
// 3. Fitur Scroll Reveal (Animasi Muncul Saat Di-scroll)
const revealElements = document.querySelectorAll('.reveal-card');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Jika elemen sudah masuk ke dalam layar (viewport)
        if (entry.isIntersecting) {
            // Hapus class yang menyembunyikan elemen
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            // Tambahkan class yang memunculkan elemen
            entry.target.classList.add('opacity-100', 'translate-y-0');
            
            // Hentikan observasi agar animasi tidak berulang-ulang saat di-scroll naik turun
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1, // Animasi terpicu saat 10% bagian card terlihat di layar
    rootMargin: "0px 0px -50px 0px" // Sedikit margin agar munculnya tidak terlalu awal
});

// Pasang observer ke setiap card proyek
revealElements.forEach(el => {
    revealObserver.observe(el);
});
// 4. Fitur Back to Top
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Tombol muncul setelah scroll lebih dari 300px
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});