// --- Model Data (Logika Bisnis) ---
import { dataService } from '../data/dataService.js';
import { PROFILE_PIC_BASE_URL, FLAG_BASE_URL } from '../config/AppConfig.js';
import { toTitleCase } from '../utils/helpers.js';

class Debater {
    constructor(data) {
        this.name = data.name.toUpperCase();
        this.displayName = toTitleCase(data.name);
        this.country = data.country;
        this.code = data.code || 'unknown';
        this.status = data.status;
        this.tier = data.tier || 'UNRANKED';
        this.record = { w: 0, l: 0, d: 0, total: 0 };
    }
    getProfilePic() { return `${PROFILE_PIC_BASE_URL}?name=${this.name}&background=1e1e1e&color=fff&size=128`; }
    getFlagUrl() { return `${FLAG_BASE_URL}${this.code}.png`; }
    
    updateRecord(match) {
        if (!match.winner) return;
        if (match.winner === "DRAW") this.record.d++;
        else if (match.winner.toUpperCase() === this.name) this.record.w++;
        else if (match.d1.toUpperCase() === this.name || match.d2.toUpperCase() === this.name) this.record.l++;
        this.record.total = this.record.w + this.record.l + this.record.d;
    }
}

class DataManager {
    constructor() {
        this._debaters = new Map();
        this._events = [];
        this._rankings = {};
        this._isLoaded = false;
    }

    async loadData() {
        if (this._isLoaded) return;
        
        const rawDebaters = await dataService.fetchDebaters();
        this._events = await dataService.fetchEvents();
        this._rankings = await dataService.fetchRankings();
        
        this._debaters = this._processDebaters(rawDebaters);
        this._calculateAllRecords();
        this._isLoaded = true;
    }
    
    _processDebaters(rawDebaters) {
        const debaterMap = new Map();
        rawDebaters.forEach(d => {
            const debater = new Debater(d);
            debaterMap.set(debater.name, debater);
        });
        return debaterMap;
    }

    _calculateAllRecords() {
        this._events.filter(e => e.status === 'Lampau').forEach(event => {
            event.matches.forEach(match => {
                const d1 = this._debaters.get(match.d1.toUpperCase());
                const d2 = this._debaters.get(match.d2.toUpperCase());
                if (d1) d1.updateRecord(match);
                if (d2) d2.updateRecord(match);
            });
        });
    }

    // Mengembalikan data mentah (yang sudah diproses model) untuk Store
    getRawDataForStore() {
        return {
            debaters: Array.from(this._debaters.values()),
            events: this._events,
            rankings: this._rankings,
        };
    }
    
    // --- Logika Filter Kompleks ---
    getFilteredDebaters(filters) {
        const allDebaters = Array.from(this._debaters.values());
        const query = (filters.searchQuery || '').toLowerCase();

        let filtered = allDebaters.filter(debater => {
            if (filters.tier && debater.tier !== filters.tier) return false;
            if (filters.status && debater.status !== filters.status) return false;
            if (query && !debater.name.toLowerCase().includes(query) && !debater.country.toLowerCase().includes(query)) return false;
            return true;
        });

        // Selalu sort berdasarkan nama
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    getDebaterByName(name) { return this._debaters.get(name.toUpperCase()); }
    getEvents() { return this._events; }
    // ... getter lainnya
}

export const DBAModel = new DataManager();
