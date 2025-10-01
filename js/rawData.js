// --- DATABASE TIRUAN (RAW DATA) ---
export const RAW_DEBATERS = [
    { name: 'LIANX', country: 'INDONESIA', code: 'id', status: 'ACTIVE', tier: 'MID TIER' },
    { name: 'RANZT', country: 'INDONESIA', code: 'id', status: 'ACTIVE', tier: 'MID TIER' },
    { name: 'ZOGRATIS', country: 'INDONESIA', code: 'id', status: 'ACTIVE', tier: 'HIGH TIER' },
    { name: 'AARON', country: 'MEXICO', code: 'mx', status: 'ACTIVE', tier: 'HIGH TIER' },
    { name: 'RAJU', country: 'UNKNOWN', code: 'unknown', status: 'ACTIVE', tier: 'HIGH TIER' }, 
    // ... Tambahkan debater lain agar mencapai banyak baris
];

export const RAW_EVENTS = [
    // --- PENAMBAHAN EVENT BARU DARI POSTER (DBA 3) ---
    {
        name: "DBA 3: King Division",
        status: "Mendatang",
        date: "FRI OCT 10", 
        time_wib: "8.00PM WIB",
        time_wita: "9.00PM WITA",
        tier: "MID TIER KING DIVISION",
        poster_url: "images/dba3_poster.png", // <--- Ganti dengan path gambar Anda
        matches: [
            { 
                d1: "LIANX", 
                d2: "RANZT", 
                winner: null, 
                tier: "MID TIER" 
            },
        ],
        broadcasters: ["DBARENA.COM", "VSBATTLEWIKI"]
    },
    {
        name: "DBA 2: The Uprising",
        status: "Lampau",
        date: "2025-05-15",
        tier: "HIGH TIER",
        matches: [
            { d1: "ZOGRATIS", d2: "AARON", winner: "ZOGRATIS", tier: "HIGH TIER" },
            { d1: "RANZT", d2: "RAJU", winner: "RANZT", tier: "MID TIER" },
        ]
    },
];

export const RAW_RANKINGS = {
    "HIGH TIER": {
        king: "ZOGRATIS",
        list: ["AARON", "RAJU", "SHADE", "REX", "MAX"]
    },
};
