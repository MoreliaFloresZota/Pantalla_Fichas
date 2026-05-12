var REFRESH_MS = 5000;
var MAX_LOCAL_EVENTS = 20;
var HOT_MS = 7000;

var AREA_MAP = {
    "ANTICONCEPCION": { icon: "shield" },
    "BACTERIOLOGIA": { icon: "bacteria" },

    "CE CARDIOLOGIA": { icon: "heartPulse" },

    "CE CIRUGIA GENERAL": { icon: "surgeryTools" },
    "CE CIRUGIA MAXILOFACIAL": { icon: "face" },
    "CE CIRUGIA EX SEDES": { icon: "surgeryTools" },

    "CE DERMATOLOGIA": { icon: "dermatology" },
    "CE DERMATOLOGIA EX SEDES": { icon: "dermatology" },

    "CE EMERGENCIA EX SEDES": { icon: "emergency" },
    "CE EMERGENCIAS": { icon: "emergency" },

    "CE ENDOCRINOLOGIA": { icon: "thyroid" },

    "CE GASTROENTEROLOGIA": { icon: "stomach" },
    "CE GENETICA": { icon: "dna" },

    "CE GINECO OBSTETRICIA EX SEDES": { icon: "pregnant" },
    "CE GINECOLOGIA": { icon: "pregnant" },
    "CE GINECOLOGIA EX SEDES": { icon: "pregnant" },
    "CE OBSTETRICIA": { icon: "pregnant" },

    "CE HEMATOLOGIA": { icon: "blood" },

    "CE MEDICINA INTERNA": { icon: "medicalChart" },
    "CE MEDICINA EX SEDES": { icon: "medicalChart" },
    "CE MEDICINA NATURAL": { icon: "leaf" },

    "CE NEFROLOGIA": { icon: "kidneys" },
    "CE NEONATOLOGIA": { icon: "baby" },
    "CE NEUMOLOGIA": { icon: "lungs" },

    "CE NEUROCIRUGIA": { icon: "brain" },
    "CE NEUROLOGIA": { icon: "brainWave" },
    "CE NEUROLOGIA PEDIATRICA": { icon: "brainBaby" },

    "CE NUTRICION Y DIETETICA": { icon: "apple" },

    "CE ODONTO EX SEDES": { icon: "tooth" },
    "CE ODONTOLOGIA": { icon: "tooth" },

    "CE OFTALMOLOGIA": { icon: "eye" },

    "CE ONCOLOGIA": { icon: "ribbon" },

    "CE OTORRINOLARINGOLOGIA": { icon: "ear" },

    "CE PEDIATRIA": { icon: "kids" },
    "CE PEDIATRIA EX SEDES": { icon: "kids" },

    "CE PSICOLOGIA TARAPAYA": { icon: "messageHeart" },
    "CE PSICOLOGIA EX SEDES": { icon: "messageHeart" },
    "CE PSICOPEDAGOGIA TARAPAYA": { icon: "bookHeart" },
    "CE PSIQUIATRIA": { icon: "brainHeart" },

    "CE QUEMOLOGIA": { icon: "burn" },

    "CE REHABILITACION TARAPAYA": { icon: "dumbbells" },

    "CE REUMATOLOGIA": { icon: "joint" },

    "CE TRAUMATOLOGIA": { icon: "bone" },
    "CE TRAUMATOLOGIA EX SEDES": { icon: "bone" },

    "CE UROLOGIA": { icon: "urinarySystem" }
};

function normalizeAreaText(area) {
    var value = String(area || "").toUpperCase();

    if (value.normalize) {
        value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return value
        .replace(/-/g, " ")
        .replace(/[^A-Z0-9 ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function getAreaConfig(area) {
    var key = normalizeAreaText(area);

    if (AREA_MAP[key]) return AREA_MAP[key];

    if (key.indexOf("ANTICONCEPC") >= 0) return { icon: "shield" };
    if (key.indexOf("BACTER") >= 0 || key.indexOf("LAB") >= 0 || key.indexOf("CELULA") >= 0) return { icon: "bacteria" };
    if (key.indexOf("CARDIO") >= 0) return { icon: "heartPulse" };
    if (key.indexOf("MAXILO") >= 0) return { icon: "face" };
    if (key.indexOf("CIRUG") >= 0 || key.indexOf("QUIROF") >= 0) return { icon: "surgeryTools" };
    if (key.indexOf("DERMA") >= 0 || key.indexOf("PIEL") >= 0) return { icon: "dermatology" };
    if (key.indexOf("EMER") >= 0 || key.indexOf("URGEN") >= 0) return { icon: "emergency" };
    if (key.indexOf("ENDO") >= 0 || key.indexOf("TIROID") >= 0) return { icon: "thyroid" };
    if (key.indexOf("GASTRO") >= 0 || key.indexOf("DIGEST") >= 0) return { icon: "stomach" };
    if (key.indexOf("GENET") >= 0) return { icon: "dna" };
    if (key.indexOf("GINE") >= 0 || key.indexOf("OBST") >= 0 || key.indexOf("PARTO") >= 0) return { icon: "pregnant" };
    if (key.indexOf("HEMA") >= 0 || key.indexOf("SANGRE") >= 0) return { icon: "blood" };
    if (key.indexOf("MEDICINA NATURAL") >= 0 || key.indexOf("NATURAL") >= 0) return { icon: "leaf" };
    if (key.indexOf("MEDICINA") >= 0 || key.indexOf("INTERNA") >= 0) return { icon: "medicalChart" };
    if (key.indexOf("NEFRO") >= 0 || key.indexOf("RINON") >= 0 || key.indexOf("RIÑON") >= 0) return { icon: "kidneys" };
    if (key.indexOf("URO") >= 0) return { icon: "urinarySystem" };
    if (key.indexOf("NEONATO") >= 0) return { icon: "baby" };
    if (key.indexOf("NEUMO") >= 0 || key.indexOf("PULMON") >= 0) return { icon: "lungs" };
    if (key.indexOf("NEUROCIR") >= 0) return { icon: "brain" };
    if (key.indexOf("NEURO") >= 0 && key.indexOf("PEDIATR") >= 0) return { icon: "brainBaby" };
    if (key.indexOf("NEURO") >= 0) return { icon: "brainWave" };
    if (key.indexOf("NUTRI") >= 0 || key.indexOf("DIET") >= 0) return { icon: "apple" };
    if (key.indexOf("ODONTO") >= 0 || key.indexOf("DENT") >= 0) return { icon: "tooth" };
    if (key.indexOf("OFTAL") >= 0 || key.indexOf("OJO") >= 0) return { icon: "eye" };
    if (key.indexOf("ONCO") >= 0 || key.indexOf("CANCER") >= 0 || key.indexOf("CÁNCER") >= 0) return { icon: "ribbon" };
    if (key.indexOf("OTORR") >= 0 || key.indexOf("OIDO") >= 0 || key.indexOf("OÍDO") >= 0 || key.indexOf("AUDIO") >= 0) return { icon: "ear" };
    if (key.indexOf("PEDIATR") >= 0 || key.indexOf("NINO") >= 0 || key.indexOf("NIÑO") >= 0) return { icon: "kids" };
    if (key.indexOf("PSICOPED") >= 0) return { icon: "bookHeart" };
    if (key.indexOf("PSICO") >= 0) return { icon: "messageHeart" };
    if (key.indexOf("PSIQ") >= 0 || key.indexOf("MENTAL") >= 0) return { icon: "brainHeart" };
    if (key.indexOf("QUEM") >= 0 || key.indexOf("QUEMAD") >= 0) return { icon: "burn" };
    if (key.indexOf("REHAB") >= 0 || key.indexOf("FISIO") >= 0) return { icon: "dumbbells" };
    if (key.indexOf("REUMA") >= 0) return { icon: "joint" };
    if (key.indexOf("TRAUMA") >= 0 || key.indexOf("ORTOP") >= 0 || key.indexOf("HUESO") >= 0) return { icon: "bone" };

    return { icon: "hospital" };
}

function getMedicalSvgIcon(name) {
    var icons = {
        hospital: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M4 21V7l8-4 8 4v14"/><path d="M8 21v-8h8v8"/><path d="M12 7v5"/><path d="M9.5 9.5h5"/></svg>',

        shield: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 3 20 6v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="M8.5 12 11 14.5 15.8 9.5"/></svg>',

        bacteria: '<svg class="medical-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="5.2" ry="6.8" transform="rotate(-25 12 12)"/><path d="M8.5 5.5 7 3.5"/><path d="M15.5 18.5 17 20.5"/><path d="M5.5 10 3 9.2"/><path d="M18.5 14 21 14.8"/><path d="M9 17 7.2 19"/><path d="M15 7 16.8 5"/><circle cx="10" cy="10" r=".7" class="fill"/><circle cx="13.8" cy="12.2" r=".7" class="fill"/><circle cx="11.4" cy="15" r=".7" class="fill"/></svg>',

        heartPulse: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 2.1Z"/><path d="M5 12h3l1.4-3 2.6 6 1.8-3H19"/></svg>',

        surgeryTools: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M4 20 20 4"/><path d="M14 4 20 10"/><path d="M6 18 4 20"/><circle cx="7" cy="7" r="2.3"/><circle cx="7" cy="17" r="2.3"/><path d="M9 8.5 20 19"/><path d="M9 15.5 12.5 12"/></svg>',

        face: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01"/><path d="M9 15c1.8 1.4 4.2 1.4 6 0"/><path d="M12 12v1.5"/><path d="M7 7.5c2-1.5 8-1.5 10 0"/></svg>',

        dermatology: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="10" cy="10" r="5.5"/><path d="M14.2 14.2 19 19"/><path d="M10 12.6s-2.1-1.2-2.1-2.8A1.3 1.3 0 0 1 10 8.9a1.3 1.3 0 0 1 2.1.9c0 1.6-2.1 2.8-2.1 2.8Z"/></svg>',
        skin: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="10" cy="10" r="5.5"/><path d="M14.2 14.2 19 19"/><path d="M10 12.6s-2.1-1.2-2.1-2.8A1.3 1.3 0 0 1 10 8.9a1.3 1.3 0 0 1 2.1.9c0 1.6-2.1 2.8-2.1 2.8Z"/></svg>',

        emergency: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z"/></svg>',

        thyroid: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 4c0 2-.7 3.4-1.8 4.7-1.1 1.3-1.8 2.6-1.8 4.2 0 3 2.2 5.1 5.2 5.1h2.8c3 0 5.2-2.1 5.2-5.1 0-1.6-.7-2.9-1.8-4.2C15.7 7.4 15 6 15 4"/><path d="M10.8 10.8c-1.7-1.7-4.8-.9-4.8 1.8 0 1.9 1.5 3.4 3.3 3.4 1.2 0 2.1-.5 2.7-1.7"/><path d="M13.2 10.8c1.7-1.7 4.8-.9 4.8 1.8 0 1.9-1.5 3.4-3.3 3.4-1.2 0-2.1-.5-2.7-1.7"/><path d="M12 10v6"/></svg>',
        endocrine: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 4c0 2-.7 3.4-1.8 4.7-1.1 1.3-1.8 2.6-1.8 4.2 0 3 2.2 5.1 5.2 5.1h2.8c3 0 5.2-2.1 5.2-5.1 0-1.6-.7-2.9-1.8-4.2C15.7 7.4 15 6 15 4"/><path d="M10.8 10.8c-1.7-1.7-4.8-.9-4.8 1.8 0 1.9 1.5 3.4 3.3 3.4 1.2 0 2.1-.5 2.7-1.7"/><path d="M13.2 10.8c1.7-1.7 4.8-.9 4.8 1.8 0 1.9-1.5 3.4-3.3 3.4-1.2 0-2.1-.5-2.7-1.7"/><path d="M12 10v6"/></svg>',

        stomach: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M13 3c0 4 4 4 4 8 0 6-4 10-9 10-2.5 0-4-1.5-4-3.7 0-2.8 2.4-4 5-4 2 0 3-1.5 3-3.2V3"/><path d="M16 14c2.5.5 4 2 4 4.5"/></svg>',

        dna: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M7 3c6 4 10 8 10 18"/><path d="M17 3C11 7 7 11 7 21"/><path d="M8.5 6h7"/><path d="M7.5 10h9"/><path d="M7.5 14h9"/><path d="M8.5 18h7"/></svg>',

        pregnant: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="2.2"/><path d="M10.7 7.5c-1.6 2.1-2.2 4.9-1.7 7.8.4 2.2 1.5 4 3.2 5.2"/><path d="M13.1 7.5c2.7 1.6 4.3 4.3 4.3 7.4 0 2.7-1.2 4.8-3 6"/><path d="M10.7 12.4c3.7-.6 5.7 3.4 3.8 6.3"/><path d="M9.4 21h6.4"/></svg>',

        blood: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z"/><path d="M9 15a3 3 0 0 0 5 2"/></svg>',

        medicalChart: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M7 3h10v4H7z"/><path d="M5 5h14v16H5z"/><path d="M9 13h6"/><path d="M12 10v6"/></svg>',

        leaf: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M20 4C11 4 5 9 5 17c0 2 1 3 3 3 8 0 12-7 12-16Z"/><path d="M5 20c3-6 7-9 12-12"/></svg>',

        kidneys: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 3c2.2 0 3.5 2 3.5 5v7.3c0 3.3-1.8 5.7-4.2 5.7C5.8 21 4 18.5 4 15c0-6.2 2.1-12 5-12Z"/><path d="M15 3c-2.2 0-3.5 2-3.5 5v7.3c0 3.3 1.8 5.7 4.2 5.7 2.5 0 4.3-2.5 4.3-6 0-6.2-2.1-12-5-12Z"/><path d="M12 8h2.4"/><path d="M12 16v3"/></svg>',
        kidney: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 3c2.2 0 3.5 2 3.5 5v7.3c0 3.3-1.8 5.7-4.2 5.7C5.8 21 4 18.5 4 15c0-6.2 2.1-12 5-12Z"/><path d="M15 3c-2.2 0-3.5 2-3.5 5v7.3c0 3.3 1.8 5.7 4.2 5.7 2.5 0 4.3-2.5 4.3-6 0-6.2-2.1-12-5-12Z"/><path d="M12 8h2.4"/><path d="M12 16v3"/></svg>',

        baby: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="12" cy="10" r="5"/><path d="M8 9h.01M16 9h.01"/><path d="M10 13c1.2.8 2.8.8 4 0"/><path d="M7 20c1.4-2 3-3 5-3s3.6 1 5 3"/><path d="M9 4c.7-1 2.1-1.4 3-.4"/></svg>',

        lungs: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 3v7"/><path d="M12 10c-2-2.4-4.1-3.8-6.1-3.8-1.5 0-1.9 5.8-1.9 9.6 0 2.2 1.1 3.7 2.8 3.7 2.8 0 4.7-2.8 5.2-6.8"/><path d="M12 10c2-2.4 4.1-3.8 6.1-3.8 1.5 0 1.9 5.8 1.9 9.6 0 2.2-1.1 3.7-2.8 3.7-2.8 0-4.7-2.8-5.2-6.8"/><path d="M9.7 7.8 12 10l2.3-2.2"/></svg>',

        brain: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 5a3 3 0 0 1 5.5-1.7A3.5 3.5 0 0 1 19 6.7a3.5 3.5 0 0 1 1 6.6A4 4 0 0 1 16.3 20H9a5 5 0 0 1-1.8-9.7A3.7 3.7 0 0 1 9 5Z"/><path d="M12 4v16"/><path d="M8 11h4"/><path d="M12 14h5"/></svg>',

        brainWave: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M8 5a4 4 0 0 1 7.2-2.4A4.5 4.5 0 0 1 19 10a4.5 4.5 0 0 1-4.5 8H9A5 5 0 0 1 6.8 8.5"/><path d="M3 14h4l1.5-3 2.5 6 2-4h8"/></svg>',

        brainBaby: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 6a4 4 0 0 1 6.4-2A4 4 0 0 1 20 8c0 3-2.3 5-5 5H9a4 4 0 0 1 0-8Z"/><circle cx="12" cy="17" r="3.5"/><path d="M10.5 17h.01M13.5 17h.01"/></svg>',

        apple: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M16 8c1.2-2 0-4-2-5-1.2 1.8-1 3.7.5 5"/><path d="M12 8c-4-2-8 1-7 6 1 5 4 7 7 5 3 2 6 0 7-5 1-5-3-8-7-6Z"/></svg>',

        tooth: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 3c4 0 6 2.4 6 6 0 2.6-1.4 4.5-2 7-.5 2-1 5-3 5-1.2 0-1-3.5-1-5s-2-1.5-2 0 .2 5-1 5c-2 0-2.5-3-3-5-.6-2.5-2-4.4-2-7 0-3.6 2-6 6-6 1.1 0 1.7.4 2 .7.3-.3.9-.7 2-.7Z"/></svg>',

        eye: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></svg>',

        ribbon: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 4c3.2 2.8 5 5.8 5 8.8a5 5 0 0 1-10 0c0-3 1.8-6 5-8.8Z"/><path d="M10.2 16.8 6.8 21"/><path d="M13.8 16.8 17.2 21"/><path d="M9.8 9.8c1.1 1.2 2 2.8 2.2 5.2"/><path d="M14.2 9.8c-1.1 1.2-2 2.8-2.2 5.2"/></svg>',

        ear: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 18c0-4 6-4 6-9a5 5 0 0 0-10 0"/><path d="M9 9a2 2 0 1 1 4 0c0 3-4 3.5-4 6"/><path d="M13 20c-1.7 1-4 .2-4-2"/></svg>',

        kids: '<svg class="medical-icon" viewBox="0 0 24 24"><circle cx="8.5" cy="8" r="2.4"/><circle cx="15.5" cy="8.8" r="2.2"/><path d="M5.2 19c.5-3 2.2-4.7 4.7-4.7s4.2 1.7 4.7 4.7"/><path d="M12.7 19c.4-2.2 1.7-3.5 3.7-3.5 1.6 0 2.8.9 3.5 2.6"/><path d="M7.7 10.7h.01M15 11.3h.01"/></svg>',

        messageHeart: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M5 5h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7l-5 3v-3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/><path d="M12 14s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.2-3 4-3 4Z"/></svg>',
        psychology: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M5 5h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7l-5 3v-3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/><path d="M12 14s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.2-3 4-3 4Z"/></svg>',

        bookHeart: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z"/><path d="M8 6h8"/><path d="M12 16s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.2-3 4-3 4Z"/></svg>',

        brainHeart: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 5a3 3 0 0 1 5.5-1.7A3.5 3.5 0 0 1 19 6.7a3.5 3.5 0 0 1 1 6.6A4 4 0 0 1 16.3 20H9a5 5 0 0 1-1.8-9.7A3.7 3.7 0 0 1 9 5Z"/><path d="M12 4v7"/><path d="M12 17s-3-1.7-3-3.8a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.1-3 3.8-3 3.8Z"/></svg>',
        mind: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M9 5a3 3 0 0 1 5.5-1.7A3.5 3.5 0 0 1 19 6.7a3.5 3.5 0 0 1 1 6.6A4 4 0 0 1 16.3 20H9a5 5 0 0 1-1.8-9.7A3.7 3.7 0 0 1 9 5Z"/><path d="M12 4v7"/><path d="M12 17s-3-1.7-3-3.8a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.1-3 3.8-3 3.8Z"/></svg>',

        burn: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.8 7-6.8 0-4.5-4-7-5-12.2-3 2-2 5-5 7-2 1.4-4 3-4 6.2C5 19.2 8 22 12 22Z"/><path d="M12 18c1.7 0 3-1.2 3-2.8 0-2-1.7-3.2-2.2-5.2-1.2 1.2-1 2.5-2.5 3.7-.8.7-1.3 1.3-1.3 2.2 0 1.2 1.2 2.1 3 2.1Z"/></svg>',

        dumbbells: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M6 8v8"/><path d="M3.5 9.5v5"/><path d="M18 8v8"/><path d="M20.5 9.5v5"/><path d="M6 12h12"/></svg>',
        rehab: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M6 8v8"/><path d="M3.5 9.5v5"/><path d="M18 8v8"/><path d="M20.5 9.5v5"/><path d="M6 12h12"/></svg>',

        joint: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M8 4v6a4 4 0 0 0 8 0V4"/><path d="M8 20v-6a4 4 0 0 1 8 0v6"/><path d="M6 10h12"/><path d="M6 14h12"/></svg>',

        bone: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M7.3 8.2a3 3 0 1 1 4.2-4.2l8.5 8.5a3 3 0 1 1-4.2 4.2L7.3 8.2Z"/><path d="M4 11.5a3 3 0 0 0 4.2 4.2"/><path d="M5.6 17.3a3 3 0 1 0 4.2-4.2"/></svg>',

        urinarySystem: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M8 3c2 0 3.2 1.8 3.2 4.5V13c0 2.8-1.5 4.8-3.7 4.8C5.4 17.8 4 15.7 4 12.7 4 7.5 5.8 3 8 3Z"/><path d="M16 3c-2 0-3.2 1.8-3.2 4.5V13c0 2.8 1.5 4.8 3.7 4.8 2.1 0 3.5-2.1 3.5-5.1C20 7.5 18.2 3 16 3Z"/><path d="M12 13v5"/><path d="M9.5 21h5"/><path d="M12 18c-1.4 0-2.5.8-2.5 2"/><path d="M12 18c1.4 0 2.5.8 2.5 2"/></svg>',
        urology: '<svg class="medical-icon" viewBox="0 0 24 24"><path d="M8 3c2 0 3.2 1.8 3.2 4.5V13c0 2.8-1.5 4.8-3.7 4.8C5.4 17.8 4 15.7 4 12.7 4 7.5 5.8 3 8 3Z"/><path d="M16 3c-2 0-3.2 1.8-3.2 4.5V13c0 2.8 1.5 4.8 3.7 4.8 2.1 0 3.5-2.1 3.5-5.1C20 7.5 18.2 3 16 3Z"/><path d="M12 13v5"/><path d="M9.5 21h5"/><path d="M12 18c-1.4 0-2.5.8-2.5 2"/><path d="M12 18c1.4 0 2.5.8 2.5 2"/></svg>'
    };

    return icons[name] || icons.hospital;
}

function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (m) {
        switch (m) {
            case "&": return "&amp;";
            case "<": return "&lt;";
            case ">": return "&gt;";
            case '"': return "&quot;";
            case "'": return "&#039;";
            default: return m;
        }
    });
}

function cssId(s) {
    return String(s || "").replace(/[^a-zA-Z0-9]/g, "_");
}

function areaKey(r) {
    return String((r && r.Area) || "").trim().toUpperCase();
}

function getStateByRestantes(restantes) {
    var n = Number(restantes || 0);
    if (n >= 6) return "VERDE";
    if (n >= 1) return "AMARILLO";
    return "ROJO";
}

function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.innerText = value;
}

function setHtml(id, value) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = value;
}

function setConn(isOn) {
    var el = document.getElementById("conn");
    if (!el) return;
    el.className = isOn ? "conn-badge on" : "conn-badge off";
    el.innerText = isOn ? "Conectado ✓" : "Sin conexión";
}

function setSyncBadge(text, isSyncing) {
    var el = document.getElementById("syncBadge");
    if (!el) return;
    el.innerText = text;
    if (isSyncing) el.classList.add("syncing");
    else el.classList.remove("syncing");
}

function tickClock() {
    var d = new Date();
    var dias = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

    setText("date", dias[d.getDay()] + " " + String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear());
    setText("clock", String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + ":" + String(d.getSeconds()).padStart(2, "0"));
}

var prev = {};
var lastTickets = [];
var fetching = false;
var agotadasCarruselIndex = 0;
var pocasCarruselIndex = 0;
var hotKeys = [];
var hotUntil = 0;
var hotTimer = null;
var pauseScroll = false;
var recentPriority = [];

function renderEmptyState(message) {
    return '<div class="empty-state">' + escapeHtml(message) + '</div>';
}

function isHotArea(key) {
    return hotKeys.indexOf(key) >= 0 && Date.now() < hotUntil;
}

function renderCard(r) {
    var restantes = Number(r.FichasRestantes || 0);
    var state = getStateByRestantes(restantes);
    var key = areaKey(r);
    var id = "card-" + cssId(key);
    var cfg = getAreaConfig(r.Area);
    var isHot = isHotArea(key);

    return ''
        + '<div class="card-row state-' + state + ' ' + (isHot ? 'ticket-hot' : '') + '" id="' + id + '">'
        + (isHot ? '<div class="hot-ribbon">ÚLTIMA FICHA SACADA</div>' : '')
        + '<div class="left-block">'
        + '  <div class="title-row">'
        + '      <div class="icon-circle">' + getMedicalSvgIcon(cfg.icon || "hospital") + '</div>'
        + '      <div class="area-pill">' + escapeHtml(r.Area || "SIN ÁREA") + '</div>'
        + '  </div>'
        + '  <div class="meta-row">'
        + '      <span class="chip-pill">' + escapeHtml(r.Doctor || "SIN DOCTOR") + '</span>'
        + '      <span class="chip-pill">' + escapeHtml(r.Horario || "SIN HORARIO") + '</span>'
        + '  </div>'
        + '</div>'
        + '<div class="right-block">'
        + '  <div class="num">' + restantes + '</div>'
        + '  <div class="lbl">DISPONIBLES</div>'
        + '</div>'
        + '</div>';
}

function renderMiniItem(text, n) {
    if (n === undefined || n === null || n === "") {
        return '<div class="mini-item"><span>' + escapeHtml(text) + '</span></div>';
    }

    return '<div class="mini-item"><span>' + escapeHtml(text) + '</span><span>' + escapeHtml(n) + '</span></div>';
}

function chunkRotate(arr, start, take) {
    if (!arr || !arr.length) return [];

    var out = [];
    var count = Math.min(take, arr.length);

    for (var i = 0; i < count; i++) {
        out.push(arr[(start + i) % arr.length]);
    }

    return out;
}

function getVisibleCountForTrack(trackId) {
    var track = document.getElementById(trackId);
    if (!track || !track.parentElement) return 1;

    var viewportHeight = track.parentElement.clientHeight || 0;
    var style = window.getComputedStyle(track);
    var gap = parseInt(style.rowGap || style.gap || "6", 10) || 6;
    var itemHeight = 38;
    var firstItem = track.querySelector(".mini-item");

    if (firstItem) itemHeight = firstItem.offsetHeight || 38;
    if (viewportHeight <= 0) return 1;

    return Math.max(1, Math.floor((viewportHeight + gap) / (itemHeight + gap)));
}

function getSideVisibleCount() {
    var ids = ["lastTickets", "agotadasList", "pocasList"];
    var counts = [];

    ids.forEach(function (id) {
        var count = getVisibleCountForTrack(id);
        if (count > 0) counts.push(count);
    });

    if (!counts.length) return 1;

    return Math.max(1, Math.min.apply(null, counts));
}

function renderMiniCollection(items, formatter, emptyText) {
    if (!items || !items.length) {
        return renderMiniItem(emptyText || "Sin datos");
    }

    var html = "";

    for (var i = 0; i < items.length; i++) {
        html += formatter(items[i]);
    }

    return html;
}

function updateSide(rows) {
    var agotadas = rows.filter(function (x) {
        return Number(x.FichasRestantes || 0) === 0;
    });

    var pocas = rows.filter(function (x) {
        var n = Number(x.FichasRestantes || 0);
        return n >= 1 && n <= 5;
    }).sort(function (a, b) {
        return Number(a.FichasRestantes || 0) - Number(b.FichasRestantes || 0);
    });

    var sideCount = getSideVisibleCount();

    var lastVisible = lastTickets.slice(0, sideCount);
    var agotadasVisible = chunkRotate(agotadas, agotadasCarruselIndex, sideCount);
    var pocasVisible = chunkRotate(pocas, pocasCarruselIndex, sideCount);

    setHtml("lastTickets",
        renderMiniCollection(lastVisible, function (x) {
            return renderMiniItem(x.text, x.time);
        }, "Sin cambios detectados")
    );

    setHtml("agotadasList",
        renderMiniCollection(agotadasVisible, function (x) {
            return renderMiniItem(x.Area, x.FichasRestantes || 0);
        }, "No existen áreas agotadas")
    );

    setHtml("pocasList",
        renderMiniCollection(pocasVisible, function (x) {
            return renderMiniItem(x.Area, x.FichasRestantes || 0);
        }, "No existen áreas con pocas fichas")
    );
}

function buildChangeEvent(row) {
    var now = new Date();

    return {
        text: (row.Area || "SIN ÁREA") + " · " + (row.Doctor || "SIN DOCTOR"),
        time: String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + ":" + String(now.getSeconds()).padStart(2, "0")
    };
}

function getOrderedRows(rows) {
    return rows.slice().sort(function (a, b) {
        var ak = areaKey(a);
        var bk = areaKey(b);
        var ai = recentPriority.indexOf(ak);
        var bi = recentPriority.indexOf(bk);
        var aRecent = ai === -1 ? 1 : 0;
        var bRecent = bi === -1 ? 1 : 0;

        if (aRecent !== bRecent) return aRecent - bRecent;
        if (ai !== -1 && bi !== -1 && ai !== bi) return ai - bi;

        return ak.localeCompare(bk);
    });
}

function focusTopAndShowLatest() {
    var cards = document.getElementById("cards");
    var last = document.getElementById("lastTickets");

    pauseScroll = true;

    if (cards) {
        cards.scrollTop = 0;
        requestAnimationFrame(function () { cards.scrollTop = 0; });
        setTimeout(function () { cards.scrollTop = 0; }, 60);
    }

    if (last) last.scrollTop = 0;
}

function repaintRows(rows) {
    var wrap = document.getElementById("cards");
    if (!wrap) return;

    if (!rows || !rows.length) {
        wrap.innerHTML = renderEmptyState("No hay fichas habilitadas hoy.");
        updateSide([]);
        return;
    }

    var ordered = getOrderedRows(rows);
    var html = "";

    for (var i = 0; i < ordered.length; i++) {
        html += renderCard(ordered[i]);
    }

    wrap.innerHTML = html;
    updateSide(ordered);
}

function apply(rows) {
    if (!Array.isArray(rows)) return;

    window.__lastRows = rows;

    if (rows.length === 0) {
        prev = {};
        lastTickets = [];
        hotKeys = [];
        hotUntil = 0;
        recentPriority = [];
        agotadasCarruselIndex = 0;
        pocasCarruselIndex = 0;
        repaintRows([]);
        return;
    }

    var nextPrev = {};
    var changedKeys = [];
    var seenChanged = {};

    rows.forEach(function (r) {
        var key = areaKey(r);
        var oldVal = prev[key];
        var newVal = Number(r.FichasRestantes || 0);

        if (oldVal !== undefined && newVal < oldVal) {
            if (!seenChanged[key]) {
                changedKeys.push(key);
                seenChanged[key] = true;
            }

            lastTickets.unshift(buildChangeEvent(r));
        }

        nextPrev[key] = newVal;
    });

    lastTickets = lastTickets.slice(0, MAX_LOCAL_EVENTS);
    prev = nextPrev;

    if (changedKeys.length > 0) {
        recentPriority = changedKeys.concat(
            recentPriority.filter(function (k) {
                return changedKeys.indexOf(k) === -1;
            })
        );

        hotKeys = changedKeys.slice();
        hotUntil = Date.now() + HOT_MS;

        repaintRows(rows);
        focusTopAndShowLatest();

        if (hotTimer) clearTimeout(hotTimer);

        hotTimer = setTimeout(function () {
            hotKeys = [];
            repaintRows(window.__lastRows || []);
            pauseScroll = false;
        }, HOT_MS);

        return;
    }

    repaintRows(rows);
}

function fetchData() {
    if (fetching) return;

    fetching = true;
    setSyncBadge("Actualizando...", true);

    fetch(window.dashboardDataUrl, {
        method: "GET",
        cache: "no-store"
    })
        .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        })
        .then(function (rows) {
            if (rows && rows.error) throw new Error(rows.error);

            apply(rows || []);
            setConn(true);
            setSyncBadge("Actualización automática", false);
        })
        .catch(function (e) {
            console.error(e);
            setConn(false);
            setSyncBadge("Último intento fallido", false);
        })
        .finally(function () {
            fetching = false;
        });
}

function startAutoScroll() {
    var el = document.getElementById("cards");
    if (!el) return;

    var dir = 1;

    setInterval(function () {
        if (document.hidden || pauseScroll) return;
        if (el.scrollHeight <= el.clientHeight + 1) return;

        el.scrollTop += dir;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) dir = -1;
        if (el.scrollTop <= 0) dir = 1;
    }, 60);
}

function startSideRotation() {
    setInterval(function () {
        if (document.hidden) return;

        var rows = getOrderedRows(window.__lastRows || []);
        var agotadas = rows.filter(function (x) {
            return Number(x.FichasRestantes || 0) === 0;
        });

        var pocas = rows.filter(function (x) {
            var n = Number(x.FichasRestantes || 0);
            return n >= 1 && n <= 5;
        });

        var sideCount = getSideVisibleCount();

        if (agotadas.length > sideCount) {
            agotadasCarruselIndex = (agotadasCarruselIndex + sideCount) % agotadas.length;
        } else {
            agotadasCarruselIndex = 0;
        }

        if (pocas.length > sideCount) {
            pocasCarruselIndex = (pocasCarruselIndex + sideCount) % pocas.length;
        } else {
            pocasCarruselIndex = 0;
        }

        updateSide(rows);
    }, 3000);
}

function scheduleMidnightReload() {
    var now = new Date();
    var next = new Date();
    next.setHours(24, 0, 10, 0);

    setTimeout(function () {
        location.reload();
    }, next.getTime() - now.getTime());
}

window.addEventListener("resize", function () {
    updateSide(window.__lastRows || []);
});

document.addEventListener("fullscreenchange", function () {
    updateSide(window.__lastRows || []);
});

document.addEventListener("DOMContentLoaded", function () {
    tickClock();
    setInterval(tickClock, 1000);

    setConn(true);
    setSyncBadge("Actualización automática · cada 5 s", false);

    fetchData();
    setInterval(fetchData, REFRESH_MS);

    setTimeout(startAutoScroll, 2500);
    startSideRotation();
    scheduleMidnightReload();
});