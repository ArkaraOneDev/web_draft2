// Konfigurasi Aplikasi Arkara Group
const CONFIG = {
    APP_NAME: "Arkara Group",
    VERSION: "1.0.0",
    COMPANY: {
        NAME: "Arkara Group Holdings",
        EMAIL: "info@arkaragroup.com",
        PHONE: "+62 21 1234 5678",
        ADDRESS: "Jl. Sudirman No. 123, Jakarta Pusat"
    },
    
    // Data user yang terdaftar
    REGISTERED_USERS: [
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
    ],
    
    // Pengaturan session
    SESSION: {
        TIMEOUT: 60, // menit
        STORAGE_KEY: "arkara_current_user"
    },
    
    // Pengaturan API (jika ada)
    API: {
        BASE_URL: "",
        TIMEOUT: 10000
    },
    
    // Pengaturan theme
   