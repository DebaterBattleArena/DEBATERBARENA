// --- View: Profile Page ---
import { DBAModel } from '../models/DBAModel.js';
import { UI_Templates } from '../components/UI_Templates.js';
import { toTitleCase, formatWinRate } from '../utils/helpers.js';

export const renderProfilePage = async (params) => {
    const appMain = document.getElementById('content-area');
    const debaterName = params.name;
    const debater = DBAModel.getDebaterByName(debaterName);

    if (!debater) {
        appMain.innerHTML = UI_Templates.pageTitle('404', 'Debater Tidak Ditemukan');
        return;
    }
    
    const { w, l, d } = debater.record;
    const winRate = formatWinRate(w, w + l + d);
    const matchHistory = DBAModel.getMatchHistory(debater.name);

    const historyHTML = matchHistory.map(match => {
        const opponentNameRaw = match.d1 === debater.name ? match.d2 : match.d1;
        let resultClass = '';
        if (match.winner === "DRAW") resultClass = 'draw';
        else if (match.winner === debater.name) resultClass = 'winner';
        else if (match.winner) resultClass = 'loser';

        return `
            <div class="event-card ${resultClass}">
                <h3>${match.eventName} (${match.tier})</h3>
                <ul class="match-list">
                    <li>
                        <strong class="text-${resultClass}">${debater.displayName}</strong>
                        <span class="vs mx-10">${match.winner === "DRAW" ? 'SERI' : 'VS'}</span>
                        <a href="#/profile/${opponentNameRaw}" data-link>${toTitleCase(opponentNameRaw)}</a>
                    </li>
                </ul>
            </div>
        `;
    }).join('');

    appMain.innerHTML = `
        <div id="profile-page">
            <header class="page-title bg-darker">
                <div class="container profile-header-container">
                    <img src="${debater.getProfilePic()}" alt="${debater.displayName}" class="profile-picture">
                    <div class="profile-details text-center">
                        <h1 class="debater-name justify-center">
                            <img src="${debater.getFlagUrl()}" alt="${debater.country}" class="country-flag">
                            ${debater.displayName}
                        </h1>
                        <p class="font-md mb-0">${debater.tier} | Negara: ${toTitleCase(debater.country)} | Status: <span class="status-${debater.status.toLowerCase()}">${debater.status}</span></p>
                    </div>
                    <div class="profile-stats-grid grid-4">
                        <div class="stat-item text-center"><span class="stat-value text-win">${w}</span><span class="stat-label">TOTAL WIN</span></div>
                        <div class="stat-item text-center"><span class="stat-value text-loss">${l}</span><span class="stat-label">TOTAL LOSS</span></div>
                        <div class="stat-item text-center"><span class="stat-value text-draw">${d}</span><span class="stat-label">TOTAL DRAW</span></div>
                        <div class="stat-item text-center"><span class="stat-value text-accent">${winRate}</span><span class="stat-label">WIN RATE</span></div>
                    </div>
                </div>
            </header>
            <section class="content-section">
                <div class="container">
                    <h2 class="font-lg mb-30">Riwayat Pertandingan Lampau (${matchHistory.length} total)</h2>
                    <div id="match-history-grid" class="grid-2 flex-gap-10">
                        ${matchHistory.length > 0 ? historyHTML : `<p class="text-secondary">Tidak ada riwayat pertandingan yang tercatat.</p>`}
                    </div>
                </div>
            </section>
        </div>
    `;
};
