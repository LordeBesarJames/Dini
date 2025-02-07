// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with updated settings
    AOS.init({
        duration: 1000,
        once: false, // Makes animations play every time
        mirror: true, // Enables animations when scrolling up
        offset: 100, // Offset (in px) from the original trigger point
        delay: 0, // Values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // Default easing for AOS animations
        anchorPlacement: 'top-bottom' // Defines which position of the element regarding to window should trigger the animation
    });

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const homeTitle = document.getElementById('home-title');
    const aboutSection = document.querySelector('.about-section');
    
    let currentIndex = 0;
    // Initial state
    prevBtn.style.display = 'none';
    slides[0].style.display = 'block';
    
    // Slide functionality
    nextBtn.addEventListener('click', () => {
        slides[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.display = 'block';
        prevBtn.style.display = 'flex';
    });
    
    prevBtn.addEventListener('click', () => {
        slides[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].style.display = 'block';
        if (currentIndex === 0) {
            prevBtn.style.display = 'none';
        }
    });
    
    // Sidebar functionality
    document.getElementById('hamburger').addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('-translate-x-full');
        
        if (sidebar.classList.contains('-translate-x-full')) {
            homeTitle.style.left = '4rem';
        } else {
            homeTitle.style.left = '17rem';
        }
    });
    
    // Scroll observer for section visibility and header text change
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update active state in navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', 
                        link.getAttribute('href') === `#${sectionId}`);
                });
                
                // Update header text based on visible section
                if (sectionId === 'about') {
                    homeTitle.textContent = 'About';
                    document.title = 'About Us';
                } else if (sectionId === 'home') {
                    homeTitle.textContent = 'Home';
                    document.title = 'Home';
                } else if (sectionId === 'memories') {
                    homeTitle.textContent = 'Memories';
                    document.title = 'Memories';
                }
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px' // This helps with more accurate section detection
    });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update title based on clicked link
                const sectionId = this.getAttribute('href').substring(1);
                if (sectionId === 'about') {
                    homeTitle.textContent = 'About';
                    document.title = 'About Us';
                } else if (sectionId === 'home') {
                    homeTitle.textContent = 'Home';
                    document.title = 'Home';
                } else if (sectionId === 'memories') {
                    homeTitle.textContent = 'Memories';
                    document.title = 'Memories';
                }
                else if (sectionId === 'present') {
                    homeTitle.textContent = 'Present';
                    document.title = 'Present';
                }
            }
        });
    });
});

// About section slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const aboutSlides = document.querySelectorAll('.about-slide');
    const aboutPrevBtn = document.querySelector('.about-slider-container .prev-btn');
    const aboutNextBtn = document.querySelector('.about-slider-container .next-btn');
    
    let aboutCurrentIndex = 0;
    
    // Initial state
    if (aboutPrevBtn && aboutNextBtn && aboutSlides.length > 0) {
        aboutPrevBtn.style.display = 'none';
        aboutSlides[0].style.display = 'block';
        
        // Next button functionality
        aboutNextBtn.addEventListener('click', () => {
            aboutSlides[aboutCurrentIndex].style.display = 'none';
            aboutCurrentIndex = (aboutCurrentIndex + 1) % aboutSlides.length;
            aboutSlides[aboutCurrentIndex].style.display = 'block';
            aboutPrevBtn.style.display = 'flex';
            
            if (aboutCurrentIndex === aboutSlides.length - 1) {
                aboutNextBtn.style.display = 'none';
            }
        });
        
        // Previous button functionality
        aboutPrevBtn.addEventListener('click', () => {
            aboutSlides[aboutCurrentIndex].style.display = 'none';
            aboutCurrentIndex = (aboutCurrentIndex - 1 + aboutSlides.length) % aboutSlides.length;
            aboutSlides[aboutCurrentIndex].style.display = 'block';
            aboutNextBtn.style.display = 'flex';
            
            if (aboutCurrentIndex === 0) {
                aboutPrevBtn.style.display = 'none';
            }
        });
    }
});
// Scroll Animation Functionality
function applyScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of card is visible
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}
// Call after rendering cards
function renderCards(cards) {
    cardGrid.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <div class="card-content">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
            </div>
        `;
        cardElement.addEventListener('click', () => openModal(card));
        cardGrid.appendChild(cardElement);
    });
    
    // Apply scroll animation after rendering
    applyScrollAnimation();
}

// Add this to your script.js file
const presentPasswords = {
    1: "1234567", // Password untuk hadiah pertama
    2: "dini", // Password untuk hadiah kedua
    3: "cindy"  // Password untuk hadiah ketiga
};

const presentUrls = {
    1: "/Dini/hapid.html",
    2: "/Dini/dini.html",
    3: "/Dini/cindy.html"
};

function checkPassword(presentId) {
    const passwordInput = document.querySelector(`input[data-present-id="${presentId}"]`);
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === presentPasswords[presentId]) {
        // Password benar, arahkan ke URL hadiah
        window.location.href = presentUrls[presentId];
    } else {
        // Password salah, tampilkan pesan error
        alert("Wrong password! Please try again.");
        passwordInput.value = ""; // Clear input
    }
}

// Tambahkan event listener untuk tombol Enter
document.addEventListener('DOMContentLoaded', () => {
    const passwordInputs = document.querySelectorAll('.password-input');
    
    passwordInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const presentId = parseInt(input.getAttribute('data-present-id'));
                checkPassword(presentId);
            }
        });
    });
});