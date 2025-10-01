// --- Komponen: Template HTML Reusable ---
import { getTierClass, getCardTierClass, getFlagClass, toTitleCase, formatWinRate } from '../utils/helpers.js';
import { APP_NAME, FILTERS } from '../config/AppConfig.js';

export const UI_Templates = {
    /**
     * Membuat kartu Debater.
     */
    debaterCard: (debater) => {
        const { w, l, d } = debater.record;
        const tierClass = getCardTierClass(debater.tier);
        const flagClass = getFlagClass(debater.code);
        
        return `
            <article class="debater-card ${tierClass}" data-name="${debater.name}">
                <a href="#/profile/${debater.name}" class="text-white" data-link>
                    <header class="card-header">
                        <img src="${debater.getProfilePic()}" alt="Foto ${debater.displayName}" class="profile-picture">
                    </header>
                    <div class="card-body">
                        <h3 class="debater-name">
                            <img src="${debater.getFlagUrl()}" alt="${debater.country}" class="country-flag ${flagClass}">
                            ${debater.displayName}
                        </h3>
                        <p class="debater-division text-${debater.tier.toLowerCase().replace(' ', '-') || 'unranked'}">
                            ${debater.tier || 'UNRANKED'}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <div class="stats">
                            <div class="stat-item"><span class="stat-value text-win">${w}</span><span class="stat-label">WIN</span></div>
                            <div class="stat-item"><span class="stat-value text-loss">${l}</span><span class="stat-label">LOSS</span></div>
                            <div class="stat-item"><span class="stat-value">${formatWinRate(w, w + l + d)}</span><span class="stat-label">WIN RATE</span></div>
                        </div>
                    </footer>
                </a>
            </article>
        `;
    },

    pageTitle: (mainText, accentText) => {
        return `
            <header class="page-title bg-darker">
                <div class="container">
                    <h1>${mainText} <span class="text-accent">${accentText}</span></h1>
                </div>
            </header>
        `;
    },

    loadingSpinner: () => {
        return `<div class="text-center padding-50"><div class="spinner"></div><p class="text-secondary">Memuat konten...</p></div>`;
    },

    noResults: () => {
        return `<p class="text-secondary text-center padding-50">Tidak ada hasil yang ditemukan. Coba ubah filter atau pencarian Anda.</p>`;
    },
    
    /**
     * Membuat kartu poster Event besar. (BARU)
     */
    eventPosterCard: (event) => {
        return `
            <article class="event-poster-card" style="background-image: url('${event.poster_url}');">
                <div class="poster-overlay">
                    <h2 class="text-caps">${event.name}</h2>
                    <span class="tier-badge ${getTierClass(event.tier)}">${event.tier}</span>
                    <p class="match-up text-accent font-xl">
                        ${toTitleCase(event.matches[0].d1)} VS ${toTitleCase(event.matches[0].d2)}
                    </p>
                    <div class="event-details">
                        <p class="font-lg font-extra-bold">${event.date}</p>
                        <p class="font-sm">${event.time_wib} | ${event.time_wita}</p>
                        <p class="font-sm mt-10 text-secondary">Siaran di: ${event.broadcasters.join(', ')}</p>
                    </div>
                </div>
            </article>
        `;
    },

    /**
     * Template untuk kontrol filter
     */
    filterControls: (currentFilters, availableFilters) => {
        const searchVal = currentFilters.searchQuery || '';
        
        const tierOptions = [''].concat(availableFilters.TIER).map(t => 
            `<option value="${t}" ${t === currentFilters.tier ? 'selected' : ''}>${t || 'Semua Tier'}</option>`
        ).join('');
        
        const statusOptions = [''].concat(availableFilters.STATUS).map(s => 
            `<option value="${s}" ${s === currentFilters.status ? 'selected' : ''}>${s || 'Semua Status'}</option>`
        ).join('');

        return `
            <div class="filter-controls margin-y-30">
                <input type="text" id="search-debater" class="input-field" placeholder="Cari Nama/Negara..." value="${searchVal}">
                <select id="filter-tier" class="select-field">${tierOptions}</select>
                <select id="filter-status" class="select-field">${statusOptions}</select>
                <button id="reset-filter" class="btn btn-secondary font-sm">RESET FILTER</button>
            </div>
            <p id="filter-info" class="text-info-sm mb-20">
                Menampilkan hasil untuk: 
                <strong>${currentFilters.tier || 'Semua Tier'}</strong> | 
                <strong>${currentFilters.status || 'Semua Status'}</strong> | 
                Pencarian: <strong>${searchVal || 'Kosong'}</strong>
            </p>
        `;
    }
};
