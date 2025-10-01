// --- STATE MANAGEMENT: Observable Store ---

const state = {
    isAppLoaded: false,
    route: { path: '/', params: {} },
    debaters: [],
    events: [],
    rankings: {},
    filters: { tier: null, status: null, searchQuery: '' },
    loading: true,
};

const subscribers = new Set();

export const commit = (newState) => {
    Object.assign(state, newState);
    subscribers.forEach(callback => callback(state));
};

export const getState = () => {
    return JSON.parse(JSON.stringify(state)); 
};

export const subscribe = (callback) => {
    subscribers.add(callback);
    callback(state);
    return () => subscribers.delete(callback);
};
