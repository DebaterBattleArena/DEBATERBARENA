// --- View: Debaters Page (Reaktif & Cerda) ---
import { DBAModel } from '../models/DBAModel.js';
import { getState, subscribe } from '../state/Store.js';
import { setDebaterFilter, resetDebaterFilters } from '../state/actions.js';
import { UI_Templates } from '../components/UI_Templates.js';
import { virtualRender } from '../core/VirtualRenderer.js';
import { FILTERS } from '../config/AppConfig.js';

const DEBATERS_PAGE_ID = 'debaters-page-content';
const DEBATER_GRID_ID = 'debater-grid';
let unsubscribeFromStore = null;

const renderDebaterGrid = () => {
    const state = getState();
    const container = document.getElementById(DEBATER_GRID_ID);
    const filterInfo = document.getElementById('filter-info');
    if (!container || !filterInfo) return;
    
    const debaters = DBAModel.getFilteredDebaters(state.filters); 
    
    if (debaters.length === 0) {
        virtualRender(container, UI_Templates.noResults()); 
    } else {
        const gridHTML = debaters.map(debater => UI_Templates.debaterCard(debater)).join('');
        virtualRender(container, gridHTML); 
    }
    
    // Update filter info secara reaktif
    filterInfo.innerHTML = `Menampilkan **${debaters.length}** Debater. | Tier: <strong>${state.filters.tier || 'Semua'}</strong> | Status: <strong>${state.filters.status || 'Semua'}</strong>`;
};

const attachFilterListeners = () => {
    const pageContainer = document.getElementById(DEBATERS_PAGE_ID);
    if (!pageContainer) return;
    
    // Event Delegation
    pageContainer.addEventListener('input', (e) => {
        if (e.target.id === 'search-debater') {
            setDebaterFilter('searchQuery', e.target.value);
        }
    });
    pageContainer.addEventListener('change', (e) => {
        if (e.target.id === 'filter-tier') {
            setDebaterFilter('tier', e.target.value);
        } else if (e.target.id === 'filter-status') {
            setDebaterFilter('status', e.target.value);
        }
    });
    pageContainer.addEventListener('click', (e) => {
        if (e.target.id === 'reset-filter') {
            resetDebaterFilters();
        }
    });
};

export const renderDebatersPage = () => {
    const appMain = document.getElementById('content-area');
    const state = getState();
    
    // Hapus langganan lama jika ada (Penting untuk SPA yang kompleks)
    if(unsubscribeFromStore) unsubscribeFromStore(); 

    appMain.innerHTML = `
        <div id="${DEBATERS_PAGE_ID}">
            ${UI_Templates.pageTitle('Daftar Debater', 'DBA')}
            <section class="content-section">
                <div class="container">
                    ${UI_Templates.filterControls(state.filters, FILTERS)}
                    <div id="${DEBATER_GRID_ID}" class="debater-grid">
                        ${UI_Templates.loadingSpinner()}
                    </div>
                </div>
            </section>
        </div>
    `;

    // Berlangganan ke Store untuk pembaruan reaktif
    unsubscribeFromStore = subscribe(renderDebaterGrid);
    attachFilterListeners(); 
    renderDebaterGrid(); 
};
