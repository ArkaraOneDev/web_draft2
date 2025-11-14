// ===== KONFIGURASI DAN INISIALISASI =====

// Data user yang terdaftar
const REGISTERED_USERS = [
    { 
        username: "admin", 
        password: "admin123", 
        role: "administrator",
        name: "Administrator",
        email: "admin@arkaragroup.com"
    },
    { 
        username: "manager", 
        password: "manager123", 
        role: "manager",
        name: "Project Manager",
        email: "manager@arkaragroup.com"
    },
    { 
        username: "staff", 
        password: "staff123", 
        role: "staff",
        name: "Staff Member",
        email: "staff@arkaragroup.com"
    },
    { 
        username: "arkara", 
        password: "arkara2024", 
        role: "owner",
        name: "Arkara Owner",
        email: "owner@arkaragroup.com"
    }
];

// Konstanta aplikasi
const SESSION_KEY = "arkara_current_user";
const LOGIN_PAGE = "index.html";
const DASHBOARD_PAGE = "dashboard.html";

// ===== FUNGSI UTILITAS =====

// Create interactive background particles
function createParticles() {
    const background = document.getElementById('background');
    if (!background) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 20px and 80px
        const size = Math.random() * 60 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        background.appendChild(particle);
    }
}

// Validasi login
function validateLogin(username, password) {
    return REGISTERED_USERS.find(user => 
        user.username === username && user.password === password
    );
}

// Simpan session user
function saveUserSession(user) {
    const sessionData = {
        username: user.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString(),
        token: btoa(`${user.username}:${Date.now()}`) // Simple token
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Cek session user
function getCurrentUser() {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
}

// Hapus session (logout)
function clearUserSession() {
    localStorage.removeItem(SESSION_KEY);
}

// Cek jika user sudah login
function checkExistingLogin() {
    const currentUser = getCurrentUser();
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentUser) {
        // Jika di halaman login, redirect ke dashboard
        if (currentPage === LOGIN_PAGE || currentPage === '') {
            window.location.href = DASHBOARD_PAGE;
        }
    } else {
        // Jika tidak ada session dan di dashboard, redirect ke login
        if (currentPage === DASHBOARD_PAGE) {
            window.location.href = LOGIN_PAGE;
        }
    }
}

// Format waktu
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID');
}

// ===== FUNGSI LOGIN PAGE =====

function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const forgotPassword = document.getElementById('forgotPassword');
    const needHelp = document.getElementById('needHelp');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (forgotPassword) {
        forgotPassword.addEventListener('click', handleForgotPassword);
    }
    
    if (needHelp) {
        needHelp.addEventListener('click', handleNeedHelp);
    }
    
    createParticles();
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginBtn = document.getElementById('loginBtn');

    // Sembunyikan pesan error/success sebelumnya
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';

    // Validasi input
    if (username.trim() === '' || password.trim() === '') {
        showError('Harap masukkan username dan password');
        return;
    }

    // Validasi login
    const user = validateLogin(username, password);
    
    if (user) {
        // Login berhasil
        showSuccess('Login berhasil! Mengarahkan ke dashboard...');
        loginBtn.textContent = 'Berhasil!';
        loginBtn.disabled = true;
        loginBtn.style.background = '#27ae60';

        // Simpan session
        saveUserSession(user);

        // Redirect ke dashboard setelah 2 detik
        setTimeout(() => {
            window.location.href = DASHBOARD_PAGE;
        }, 2000);
    } else {
        // Login gagal
        showError('Username atau password salah!');
        loginBtn.textContent = 'LOGIN';
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    alert('Untuk reset password, silakan hubungi administrator di admin@arkaragroup.com');
}

function handleNeedHelp(e) {
    e.preventDefault();
    alert('Hubungi tim support kami di support@arkaragroup.com atau telepon +62 21 1234 5678');
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

// ===== FUNGSI DASHBOARD PAGE =====

function initializeDashboardPage() {
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Initialize logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Initialize mobile menu
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Initialize contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Initialize newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Update user info jika ada
    updateUserInfo();
}

function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        clearUserSession();
        window.location.href = LOGIN_PAGE;
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const nav = document.querySelector('nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Untuk link internal (hash)
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Tutup mobile menu setelah klik
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
}

function initializeScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

function updateUserInfo() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        console.log(`User logged in: ${currentUser.name} (${currentUser.role})`);
        // Anda bisa menampilkan info user di navbar jika diperlukan
        // const userInfoElement = document.getElementById('userInfo');
        // if (userInfoElement) {
        //     userInfoElement.textContent = `Welcome, ${currentUser.name}`;
        // }
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Simulasi pengiriman pesan
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan membalas ke ${email} dalam waktu 1x24 jam.`);
    
    // Reset form
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulasi subscribe newsletter
    alert(`Terima kasih! Email ${email} telah berhasil terdaftar untuk newsletter kami.`);
    
    // Reset form
    e.target.reset();
}

// ===== ANIMASI DAN EFFECTS =====

function initializeAnimations() {
    // Animasi fade in untuk elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements untuk animasi
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== INISIALISASI APLIKASI =====

document.addEventListener('DOMContentLoaded', function() {
    // Cek session existing
    checkExistingLogin();
    
    // Deteksi halaman saat ini dan initialize sesuai halaman
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === LOGIN_PAGE || currentPage === '') {
        initializeLoginPage();
    } else if (currentPage === DASHBOARD_PAGE) {
        initializeDashboardPage();
        initializeAnimations();
    }
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
    });
});

// ===== SERVICE WORKER (Optional - untuk PWA) =====

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// ===== OFFLINE SUPPORT =====

function checkOnlineStatus() {
    if (!navigator.onLine) {
        alert('Anda sedang offline. Beberapa fitur mungkin tidak tersedia.');
    }
}

window.addEventListener('online', checkOnlineStatus);
window.addEventListener('offline', checkOnlineStatus);

// Export functions untuk penggunaan di console (development)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateLogin,
        getCurrentUser,
        clearUserSession
    };
}