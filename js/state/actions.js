// --- ACTIONS: Logika Bisnis Mutasi State ---
import { commit, getState } from './Store.js';
import { DBAModel } from '../models/DBAModel.js';

export const loadInitialData = async () => {
    commit({ loading: true });
    try {
        await DBAModel.loadData();
        const data = DBAModel.getRawDataForStore();
        
        commit({
            debaters: data.debaters,
            events: data.events,
            rankings: data.rankings,
            isAppLoaded: true,
            loading: false,
        });
    } catch (error) {
        console.error("Gagal memuat data utama:", error);
        commit({ isAppLoaded: false, loading: false });
    }
};

export const setRouteState = (path, params) => {
    commit({ route: { path, params } });
};

export const setDebaterFilter = (filterName, value) => {
    const { filters } = getState();
    const newValue = value === '' ? null : value; 

    const newFilters = JSON.parse(JSON.stringify(filters));
    newFilters[filterName] = newValue;

    commit({ filters: newFilters });
};

export const resetDebaterFilters = () => {
    commit({ 
        filters: { tier: null, status: null, searchQuery: '' } 
    });
};
