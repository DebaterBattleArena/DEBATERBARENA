// --- Titik Masuk Utama Aplikasi (Final) ---
import { loadInitialData } from './state/actions.js';
import { getState, subscribe } from './state/Store.js';
import { initializeRouter } from './router/Router.js';
import { createLayoutRoot } from './core/VirtualRenderer.js';
import { renderLayout } from './views/Layout.js';

const handleLoadingState = (state) => {
    const loader = document.querySelector('.loader-overlay');
    if (state.isAppLoaded) {
        if (loader) loader.style.display = 'none';
    } else if (!state.loading) {
        if (loader) {
             loader.innerHTML = '<h1 class="text-accent">DBA ERROR</h1><p class="text-danger">Gagal memuat data utama. Periksa koneksi atau kode.</p>';
        }
    }
};

async function initApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;
    
    // Berlangganan ke state untuk mengelola loading screen
    subscribe(handleLoadingState);
    
    // Muat data utama secara asinkron
    await loadInitialData();
    
    // Setelah data dimuat, buat kerangka aplikasi
    const state = getState();
    if (state.isAppLoaded) {
        const { headerHTML, mainHTML, footerHTML } = renderLayout();
        createLayoutRoot(headerHTML, mainHTML, footerHTML);
        
        // Inisialisasi Router
        initializeRouter();
    }
}

document.addEventListener('DOMContentLoaded', initApp);
