// --- Layer Service (Simulasi API) ---
import { RAW_DEBATERS, RAW_EVENTS, RAW_RANKINGS } from './rawData.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DataService {
    constructor() {
        this._cache = {};
    }
    async fetchDebaters() {
        if (this._cache.debaters) return this._cache.debaters;
        await delay(500); // Simulasi latensi jaringan
        this._cache.debaters = RAW_DEBATERS;
        return RAW_DEBATERS;
    }
    async fetchEvents() {
        if (this._cache.events) return this._cache.events;
        await delay(300);
        this._cache.events = RAW_EVENTS;
        return RAW_EVENTS;
    }
     async fetchRankings() {
        if (this._cache.rankings) return this._cache.rankings;
        await delay(100);
        this._cache.rankings = RAW_RANKINGS;
        return RAW_RANKINGS;
    }
}

export const dataService = new DataService();
