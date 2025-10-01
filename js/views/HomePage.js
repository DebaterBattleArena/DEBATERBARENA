// --- View: Home Page ---
import { DBAModel } from '../models/DBAModel.js';
import { getState } from '../state/Store.js';
import { UI_Templates } from '../components/UI_Templates.js';
import { ROUTES } from '../config/AppConfig.js';

export const renderHomePage = async () => {
    const appMain = document.getElementById('content-area');
    const state = getState();
    
    if (!state.isAppLoaded) {
        appMain.innerHTML = UI_Templates.loadingSpinner();
        return;
    }
    
    const allDebaters = DBAModel.getFilteredDebaters({searchQuery: ''}).slice(0, 4); 
    const debatersGridHTML = allDebaters.map(d => UI_Templates.debaterCard(d)).join('');
    
    // Cari event mendatang untuk dijadikan highlight poster
    const upcomingEvent = state.events.find(e => e.status === "Mendatang");

    appMain.innerHTML = `
        <section class="hero-section">
            <div class="container text-center padding-y-30">
                <h1>Selamat Datang di <span class="text-accent">DBA</span></h1>
                <p class="font-md text-secondary">Arena Pertarungan Debater Paling Kompetitif di Asia Tenggara.</p>
                <a href="#${ROUTES.DEBATERS.slice(1)}" class="btn btn-primary font-lg mt-30" data-link>Lihat Semua Debater</a>
            </div>
        </section>
        
        ${upcomingEvent ? `
            <section class="content-section bg-secondary-light">
                <div class="container">
                    <h2 class="text-center mb-30">🔥 SUPER MAIN EVENT MENDATANG 🔥</h2>
                    <div class="poster-container">
                        ${UI_Templates.eventPosterCard(upcomingEvent)}
                    </div>
                </div>
            </section>
        ` : ''}
        
        <section class="content-section bg-darker">
            <div class="container">
                <h2 class="text-center mb-30">Debater Unggulan Saat Ini</h2>
                <div class="debater-grid">${debatersGridHTML}</div>
            </div>
        </section>
    `;
};
