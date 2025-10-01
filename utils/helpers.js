// --- Fungsi Pembantu Utilitas ---

export const toTitleCase = (str) => {
    if (!str) return '';
    // Handle tier yang sudah uppercase
    if (str.toUpperCase() === str && str.includes(' ')) return str;
    
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

export const getTierClass = (tier) => {
    if (!tier) return 'tier-unranked';
    // Gunakan huruf kecil dan ganti spasi dengan strip
    return `tier-${tier.toLowerCase().replace(' ', '-')}`;
};

export const getCardTierClass = (tier) => {
    if (!tier) return 'card-tier-unranked';
    return `card-tier-${tier.toLowerCase().replace(' ', '-')}`;
};

export const getFlagClass = (code) => {
    return `flag-${code}`;
};

export const formatWinRate = (w, total) => {
    if (total === 0) return '0.0%';
    return ((w / total) * 100).toFixed(1) + '%';
};
