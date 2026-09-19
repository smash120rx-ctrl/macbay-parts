if (typeof emailjs !== 'undefined') {
    emailjs.init("OlxFyi8xILVI7jL2O");
}


// =====================================================
// 1. БОКОВЕ МЕНЮ
// =====================================================

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

if (menuButton && sideMenu && overlay) {
    menuButton.addEventListener("click", function () {
        sideMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if (closeMenu && sideMenu && overlay) {
    closeMenu.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    });
}

if (overlay && sideMenu) {
    overlay.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (sideMenu) sideMenu.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});


// =====================================================
// 2. ВСІ ТОВАРИ ТА МОДЕЛІ
// =====================================================

const products = [

    // --- MACBOOK AIR ---
    { name: "MacBook Air A1466", url: "models/a1466.html", type: "MacBook Air" },
    { name: "MacBook Air A1932", url: "models/a1932.html", type: "MacBook Air" },
    { name: "MacBook Air A2179", url: "models/a2179.html", type: "MacBook Air" },
    { name: "MacBook Air M1 A2337", url: "models/a2337.html", type: "MacBook Air" },
    { name: "MacBook Air M2 A2681", url: "models/a2681.html", type: "MacBook Air" },
    { name: "MacBook Air A2941", url: "models/matrices.html", type: "MacBook Air" },
    { name: "MacBook Air A3113", url: "models/matrices.html", type: "MacBook Air" },
    { name: "MacBook Air A3114", url: "models/matrices.html", type: "MacBook Air" },

    // --- MACBOOK PRO ---
    { name: "MacBook Pro A1502", url: "models/a1502.html", type: "MacBook Pro" },
    { name: "MacBook Pro A1706", url: "models/a1706.html", type: "MacBook Pro" },
    { name: "MacBook Pro A1707", url: "models/a1707.html", type: "MacBook Pro" },
    { name: "MacBook Pro A1708", url: "models/a1708.html", type: "MacBook Pro" },
    { name: "MacBook Pro A1989", url: "models/a1989.html", type: "MacBook Pro" },
    { name: "MacBook Pro A1990", url: "models/a1990.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2141", url: "models/a2141.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2251", url: "models/a2251.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2289", url: "models/a2289.html", type: "MacBook Pro" },
    { name: "MacBook Pro M1 A2338", url: "models/a2338.html", type: "MacBook Pro" },
    { name: "MacBook Pro 14 A2442", url: "models/a2442.html", type: "MacBook Pro" },
    { name: "MacBook Pro 16 A2485", url: "models/a2485.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2779", url: "models/a2779.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2780", url: "models/matrices.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2991", url: "models/matrices.html", type: "MacBook Pro" },
    { name: "MacBook Pro A2992", url: "models/matrices.html", type: "MacBook Pro" },
    { name: "MacBook Pro A3112", url: "models/matrices.html", type: "MacBook Pro" },
    { name: "MacBook Pro A3401", url: "models/matrices.html", type: "MacBook Pro" },

    // --- МАТРИЦІ ---
    { name: "Дисплей у зборі MacBook Air A3113 (Midnight Blue, Midnight)", url: "models/matrices.html", type: "Матриця" },
    { name: "Дисплей у зборі MacBook Air A2941 (Midnight Blue, Space Gray)", url: "models/matrices.html", type: "Матриця" },
    { name: "Дисплей у зборі MacBook Air A3114 (Space Gray, StarLight)", url: "models/matrices.html", type: "Матриця" },
    { name: "Дисплей у зборі MacBook Pro A2992 (Space Black)", url: "models/matrices.html", type: "Матриця" },
    { name: "Дисплей у зборі MacBook Pro A3112 (Space Black)", url: "models/matrices.html", type: "Матриця" },
    { name: "Дисплей у зборі MacBook Pro A3401 (Space Black)", url: "models/matrices.html", type: "Матриця" },

    // --- МАТЕРИНСЬКІ ПЛАТИ ---
    { name: "Материнська плата MacBook Air A1932 (T2)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Air A2337 (M1)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Air A2941 (M2)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Air A3113 (M3 24GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Air A3114 (M3)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2485 (M1 Pro 16GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2485 (M1 Max 32GB/1TB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2779 (M2 Pro 16GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2991 (M3 Pro 18GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2992 (M3 Pro 18GB/1TB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A2992 (M3 Pro 18GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },
    { name: "Материнська плата MacBook Pro A3401 (M4 Pro 24GB/512GB)", url: "models/motherboards.html", type: "Материнська плата" },

    // --- БАТАРЕЇ ---
    { name: "Акумулятор MacBook Air A1965 (A1932/A2179)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Air A2389 (A2337 M1)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Air A2669 (A2681 M2)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Air A2797 (A2941 M2)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2171 (A2159/A2289/A2338)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2113 (A2141 16\")", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2519 (A2442/A2779/A2918/A2992)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2527 (A2485/A2780/A2991)", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2977", url: "models/batteries.html", type: "Батареї" },
    { name: "Акумулятор MacBook Pro A2976", url: "models/batteries.html", type: "Батареї" },

    // --- АКСЕСУАРИ ---
    { name: "Адаптер живлення Apple 30W USB-C (MR2A2)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 61W USB-C (MNF72)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 67W USB-C (MKU63)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 70W USB-C (MQLN3)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 87W USB-C (MNF82)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 96W USB-C (MX0J2)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Адаптер живлення Apple 140W USB-C (MLYU3)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Кабель MagSafe 3 (2m) White (MLYV3)", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Кабель MagSafe 3 (2m) Space Gray", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Кабель MagSafe 3 (2m) Sky Blue", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Кабель MagSafe 3 (2m) Space Black", url: "models/accessories.html", type: "Аксесуари" },
    { name: "Кабель MagSafe 3 (2m) Midnight", url: "models/accessories.html", type: "Аксесуари" },

    // --- АНТЕНИ ---
    { name: "Антена MacBook Pro A2141", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2338", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2442", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2779", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2780", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2991", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A2992", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A3112", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Pro A3401", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Air A2337", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Air A2941", url: "models/Antens.html", type: "Антена" },
    { name: "Антена MacBook Air A3114", url: "models/Antens.html", type: "Антена" },

    // --- КУЛЕРИ ---
    { name: "Вентилятор (кулер) MacBook Air A2337", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Air A2941", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Air A3114", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2141", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2338", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2442", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2779", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2780", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2991", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A2992", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A3112", url: "models/coolers.html", type: "Кулер" },
    { name: "Вентилятор (кулер) MacBook Pro A3401", url: "models/coolers.html", type: "Кулер" },

    // --- ЗАПЧАСТИНИ ---
    { name: "Аудіо роз'єм MacBook Pro A2442", url: "models/cables.html", type: "Запчастини" },
    { name: "Дочірня плата MacBook Air A2681", url: "models/motherboards.html", type: "Запчастини" },
    { name: "Дочірня плата MacBook Air A2941", url: "models/motherboards.html", type: "Запчастини" },
    { name: "Плата роз'єму MacBook Air A2337", url: "models/cables.html", type: "Запчастини" },
    { name: "Плата роз'єму MacBook Pro A2442", url: "models/cables.html", type: "Запчастини" },
    { name: "Плата роз'єму MacBook Pro A2991", url: "models/cables.html", type: "Запчастини" },
    { name: "Роз'єм живлення MacBook Pro A2141", url: "models/cables.html", type: "Запчастини" },
    { name: "Роз'єм живлення MacBook Pro A2442", url: "models/cables.html", type: "Запчастини" },
    { name: "Роз'єм живлення MacBook Air A2941", url: "models/cables.html", type: "Запчастини" },
    { name: "Роз'єм живлення MacBook Air A3113", url: "models/cables.html", type: "Запчастини" },
    { name: "Шлейф та роз'єм MacBook Air A2941", url: "models/cables.html", type: "Запчастини" },

    // --- ШЛЕЙФИ ---
    { name: "Шлейф аудіо / роз'єм навушників MacBook Pro A2141", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф аудіо / роз'єм навушників MacBook Air A2337", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф аудіо / роз'єм навушників MacBook Pro A2338", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф аудіо / роз'єм навушників MacBook Air A2941", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф аудіо / роз'єм навушників MacBook Pro A2991", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф датчиків MacBook Pro A2141", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф датчиків MacBook Pro A2442", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф датчиків MacBook Air A3113", url: "models/cables.html", type: "Шлейфи" },
    { name: "Кнопка живлення з Touch ID MacBook Pro A2141", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Air A2337", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Pro A2338", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Pro A2442 / A2779 / A2992 / A3112 / A3401", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Air A2681", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Air A2941", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Pro A2991", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Кнопка живлення з Touch ID MacBook Air A3113", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Гнучкий шлейф (кабель) MacBook Pro A2141", url: "models/cables.html", type: "Шлейфи" },
    { name: "Гнучкий шлейф (кабель) MacBook Air A2681", url: "models/cables.html", type: "Шлейфи" },
    { name: "Гнучкий шлейф (кабель) MacBook Air A2941", url: "models/cables.html", type: "Шлейфи" },
    { name: "Гнучкий шлейф (кабель) MacBook Air A3113", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф дисплея MacBook Pro A2338", url: "models/cables.html", type: "Шлейфи" },
    { name: "Шлейф мікрофона MacBook Air A2681", url: "models/cables.html", type: "Шлейфи" },

    // --- ІНШІ ---
    { name: "Антена", url: "models/Antens.html", type: "Запчастини" },
    { name: "Дисплеї MacBook", url: "models/LCD-дисплеї.html", type: "Запчастини" },
    { name: "Матриця", url: "models/matrices.html", type: "Запчастини" },
    { name: "Дисплеї Матриця в зборі", url: "models/matrices.html", type: "Запчастини" },
    { name: "Тачпад", url: "models/touchpads.html", type: "Запчастини" },
    { name: "Акумуляторні батареї", url: "models/batteries.html", type: "Запчастини" },
    { name: "Батареї", url: "models/batteries.html", type: "Запчастини" },
    { name: "Клавіатури та кнопки", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Клавіатури", url: "models/keyboards.html", type: "Запчастини" },
    { name: "Аксесуари", url: "models/accessories.html", type: "Запчастини" },
    { name: "Динамік", url: "models/speakers.html", type: "Запчастини" },
    { name: "Кулер", url: "models/coolers.html", type: "Запчастини" },
    { name: "Материнська плата", url: "models/motherboards.html", type: "Запчастини" },
    { name: "Топкейс", url: "models/topcases.html", type: "Запчастини" },
    { name: "Шлейфи", url: "models/cables.html", type: "Запчастини" },
    { name: "Гравіювання", url: "models/Gravi.html", type: "Послуги" },
    { name: "Мікросхеми", url: "models/chips.html", type: "Запчастини" },
    { name: "Оперативна пам'ять", url: "models/memory.html", type: "Запчастини" },
    { name: "Пам'ять MacBook", url: "models/memory.html", type: "Запчастини" },
    { name: "Елементи корпуса", url: "models/caseparts.html", type: "Запчастини" },
    { name: "Корпусні деталі", url: "models/caseparts.html", type: "Запчастини" },
    { name: "Скло", url: "models/glass.html", type: "Запчастини" },
    { name: "Wi-Fi карти", url: "models/wifi.html", type: "Запчастини" },
    { name: "Wi-Fi модулі", url: "models/wifi.html", type: "Запчастини" },
    { name: "SuperDrive", url: "models/superdrive.html", type: "Запчастини" },
    { name: "Жорсткі диски", url: "models/hdd.html", type: "Запчастини" },
    { name: "HDD", url: "models/hdd.html", type: "Запчастини" },
    { name: "Звукові карти", url: "models/soundcards.html", type: "Запчастини" },
    { name: "Інструменти", url: "models/tools.html", type: "Запчастини" },
    { name: "Чохли", url: "models/covers.html", type: "Аксесуари" }
];


// =====================================================
// 3. ПОШУК — UNIVERSAL DATABASE SEARCH
// =====================================================

const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchClear = document.getElementById("searchClear");

const MACBAY_SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
const MACBAY_SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

let dbProducts = [];
let dbSearchLoaded = false;

// Нормалізація робить пошук терпимим до регістру,
// дефісів, зайвих пробілів та різних написань категорій.
function normalizeSearchText(value) {
    return String(value ?? '')
        .toLowerCase()
        .replace(/[ё]/g, 'е')
        .replace(/[ґ]/g, 'г')
        .replace(/[’'`]/g, '')
        .replace(/[–—−]/g, '-')
        .replace(/[^a-zа-яіїє0-9]+/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeModel(value) {
    return String(value ?? '')
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
    const safeText = escapeHtml(text);
    const words = String(query || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(escapeRegex);

    if (!words.length) return safeText;

    try {
        const regex = new RegExp(`(${words.join('|')})`, 'giu');
        return safeText.replace(regex, '<mark class="search-highlight">$1</mark>');
    } catch {
        return safeText;
    }
}

// Назви категорій можуть бути різні в старих/нових записах БД.
const CATEGORY_ALIASES = {
    'антена': ['антена', 'антени', 'antennas', 'antenna'],
    'антени': ['антена', 'антени', 'antennas', 'antenna'],
    'тачпад': ['тачпад', 'тачпади', 'touchpad', 'trackpad'],
    'тачпади': ['тачпад', 'тачпади', 'touchpad', 'trackpad'],
    'топкейс': ['топкейс', 'топкейси', 'topcase'],
    'топкейси': ['топкейс', 'топкейси', 'topcase'],
    'акумулятор': ['акумулятор', 'акумулятори', 'battery', 'batteries'],
    'акумулятори': ['акумулятор', 'акумулятори', 'battery', 'batteries'],
    'батарея': ['батарея', 'батареї', 'battery', 'batteries'],
    'матриця': ['матриця', 'матриці', 'display', 'displays'],
    'матриці': ['матриця', 'матриці', 'display', 'displays'],
    'динамік': ['динамік', 'динаміки', 'speakers', 'speaker'],
    'динаміки': ['динамік', 'динаміки', 'speakers', 'speaker'],
    'материнська': ['материнська', 'motherboard'],
    'материнська плата': ['материнська', 'motherboard'],
    'шлейф': ['шлейф', 'шлейфи', 'cable', 'cables'],
    'кулер': ['кулер', 'cooler', 'coolers'],
    'плата': ['плата', 'board', 'motherboard']
};

function getCategoryAliases(queryWord) {
    const key = normalizeSearchText(queryWord);
    return CATEGORY_ALIASES[key] || [key];
}

function productSearchText(product) {
    return normalizeSearchText([
        product.title,
        product.model,
        product.category,
        product.description,
        product.search_text
    ].filter(Boolean).join(' '));
}

function productModelText(product) {
    return normalizeModel(product.model);
}

function scoreProduct(product, query) {
    const words = normalizeSearchText(query).split(/\s+/).filter(Boolean);
    if (!words.length) return 0;

    const title = normalizeSearchText(product.title);
    const model = productModelText(product);
    const category = normalizeSearchText(product.category);
    const description = normalizeSearchText(product.description);
    const searchText = normalizeSearchText(product.search_text);
    const all = productSearchText(product);
    const queryModel = normalizeModel(query);

    let score = 0;
    let matchedWords = 0;

    // Точний номер моделі — найсильніший збіг.
    if (queryModel && model && model === queryModel) score += 1000;
    else if (queryModel && model && model.includes(queryModel)) score += 700;

    for (const word of words) {
        const aliases = getCategoryAliases(word);
        const categoryMatch = aliases.some(alias =>
            normalizeSearchText(category).includes(normalizeSearchText(alias))
        );

        let matched = false;

        if (title.includes(word)) {
            score += 120;
            matched = true;
        }
        if (model.toLowerCase().includes(normalizeModel(word).toLowerCase())) {
            score += 180;
            matched = true;
        }
        if (categoryMatch) {
            score += 90;
            matched = true;
        }
        if (searchText.includes(word)) {
            score += 55;
            matched = true;
        }
        if (description.includes(word)) {
            score += 20;
            matched = true;
        }

        if (matched) matchedWords++;
    }

    // Усі слова мають бути знайдені — інакше не показуємо сміття.
    if (matchedWords < words.length) return 0;

    // Перевага коротшим точнішим назвам.
    if (title === normalizeSearchText(query)) score += 250;
    if (all.includes(normalizeSearchText(query))) score += 40;

    return score;
}

function dbProductUrl(product) {
    const model = normalizeModel(product.model).toLowerCase();
    const category = normalizeSearchText(product.category);

    const categoryMap = {
        display: 'display',
        displays: 'display',
        матриця: 'display',
        матриці: 'display',
        topcase: 'topcase',
        топкейс: 'topcase',
        топкейси: 'topcase',
        battery: 'battery',
        batteries: 'battery',
        акумулятор: 'battery',
        акумулятори: 'battery',
        antennas: 'antennas',
        antenna: 'antennas',
        антена: 'antennas',
        антени: 'antennas',
        cables: 'cables',
        cable: 'cables',
        шлейф: 'cables',
        шлейфи: 'cables',
        cooler: 'cooler',
        coolers: 'cooler',
        кулер: 'cooler',
        motherboard: 'motherboard',
        материнська: 'motherboard',
        speakers: 'speakers',
        speaker: 'speakers',
        динамік: 'speakers',
        динаміки: 'speakers',
        trackpad: 'trackpad',
        touchpad: 'trackpad',
        тачпад: 'trackpad',
        тачпади: 'trackpad',
    };

    const slug = categoryMap[category];
    if (model && slug) return `models/${model}-${slug}.html`;

    const fallback = {
        display: 'models/matrices.html',
        displays: 'models/matrices.html',
        матриця: 'models/matrices.html',
        матриці: 'models/matrices.html',
        battery: 'models/batteries.html',
        batteries: 'models/batteries.html',
        акумулятор: 'models/batteries.html',
        акумулятори: 'models/batteries.html',
        antennas: 'models/Antens.html',
        antenna: 'models/Antens.html',
        антена: 'models/Antens.html',
        антени: 'models/Antens.html',
        cables: 'models/cables.html',
        cable: 'models/cables.html',
        шлейф: 'models/cables.html',
        шлейфи: 'models/cables.html',
        cooler: 'models/coolers.html',
        coolers: 'models/coolers.html',
        кулер: 'models/coolers.html',
        motherboard: 'models/motherboards.html',
        материнська: 'models/motherboards.html',
        speakers: 'models/speakers.html',
        speaker: 'models/speakers.html',
        динамік: 'models/speakers.html',
        динаміки: 'models/speakers.html',
        trackpad: 'models/touchpads.html',
        touchpad: 'models/touchpads.html',
        тачпад: 'models/touchpads.html',
        тачпади: 'models/touchpads.html',
        topcase: 'models/topcases.html',
        топкейс: 'models/topcases.html',
        топкейси: 'models/topcases.html'
    };

    return fallback[category] || 'macbook-air.html';
}

async function loadDatabaseSearchProducts() {
    try {
        dbProducts = [];

        // Supabase за замовчуванням може повертати максимум 1000 рядків.
        // Тому забираємо таблицю частинами.
        const pageSize = 1000;
        let from = 0;

        while (true) {
            const to = from + pageSize - 1;
            const response = await fetch(
                `${MACBAY_SUPABASE_URL}/rest/v1/products_new?select=id,title,model,category,description,search_text&order=id`,
                {
                    headers: {
                        apikey: MACBAY_SUPABASE_KEY,
                        Authorization: `Bearer ${MACBAY_SUPABASE_KEY}`,
                        Range: `${from}-${to}`,
                        Prefer: 'count=none'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Supabase ${response.status}: ${await response.text()}`);
            }

            const rows = await response.json();
            dbProducts.push(...rows);

            if (rows.length < pageSize) break;
            from += pageSize;
        }

        dbSearchLoaded = true;

        if (searchInput && searchInput.value.trim()) {
            renderSearchResults(searchInput.value.trim());
        }

    } catch (error) {
        console.error('Database search:', error);
        dbSearchLoaded = false;
    }
}

loadDatabaseSearchProducts();

function renderSearchResults(value) {
    if (!searchResults) return;

    searchResults.innerHTML = '';

    const query = String(value || '').trim();
    if (!query) return;

    const staticFound = products
        .map(product => ({
            ...product,
            _score: scoreProduct({
                title: product.name,
                category: product.type,
                model: '',
                description: '',
                search_text: ''
            }, query)
        }))
        .filter(product => product._score > 0)
        .sort((a, b) => b._score - a._score);

    const dbFound = dbProducts
        .map(product => ({
            ...product,
            _score: scoreProduct(product, query)
        }))
        .filter(product => product._score > 0)
        .sort((a, b) => b._score - a._score);

    const seen = new Set();
    const found = [];

    [...dbFound, ...staticFound].forEach(product => {
        const name = product.title || product.name || '';
        const url = product.url || dbProductUrl(product);
        const key = `${normalizeSearchText(name)}|${url}`;

        if (!seen.has(key)) {
            seen.add(key);
            found.push({
                name,
                type: product.model
                    ? `${product.model} · ${product.category || 'Запчастина'}`
                    : (product.type || 'Каталог'),
                url,
                image: product.image_url || '',
                score: product._score
            });
        }
    });

    const limited = found.slice(0, 30);

    if (!limited.length) {
        searchResults.innerHTML = `
            <div class="no-results">
                <strong>Нічого не знайдено</strong>
                <span>Спробуй модель, наприклад A1932, або назву запчастини.</span>
            </div>`;
        return;
    }

    const currentPath = window.location.pathname;

    limited.forEach(product => {
        const link = document.createElement('a');
        let productUrl = product.url;

        if (currentPath.includes('/models/') && productUrl.startsWith('models/')) {
            productUrl = '../' + productUrl;
        }

        link.href = productUrl;
        link.className = 'search-result';

        const imageHtml = product.image
            ? `<img class="search-result-image" src="${escapeHtml(product.image)}" alt="" loading="lazy">`
            : `<div class="search-result-icon">⌕</div>`;

        link.innerHTML = `
            ${imageHtml}
            <div class="search-result-content">
                <div class="search-result-title">
                    ${highlightMatch(product.name, query)}
                </div>
                <div class="search-result-type">
                    ${escapeHtml(product.type)}
                </div>
            </div>
            <div class="search-result-arrow">→</div>
        `;

        // Якщо зовнішнє фото не завантажилось — прибираємо тільки фото,
        // а не всю картку результату.
        const image = link.querySelector('.search-result-image');
        if (image) {
            image.addEventListener('error', () => image.remove());
        }

        searchResults.appendChild(link);
    });
}

if (searchInput && searchBox) {
    searchInput.addEventListener('focus', () => {
        searchBox.classList.add('open');
        renderSearchResults(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.trim();
        searchBox.classList.add('open');
        searchBox.classList.toggle('has-text', value.length > 0);
        renderSearchResults(value);
    });
}

if (searchClear && searchInput && searchBox) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchBox.classList.remove('has-text');
        renderSearchResults('');
        searchInput.focus();
    });
}

// Закриття пошуку при кліку поза ним.
document.addEventListener('click', event => {
    if (searchBox && !searchBox.contains(event.target)) {
        searchBox.classList.remove('open');
    }
});

// Escape — закрити пошук.
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && searchBox) {
        searchBox.classList.remove('open');
        if (searchInput) searchInput.blur();
    }
});

document.addEventListener(
    "click",
    function (event) {

        if (
            searchBox &&
            !searchBox.contains(event.target)
        ) {

            searchBox.classList.remove(
                "open"
            );

        }

    }
);


// =====================================================
// 4. КОШИК
// =====================================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("userCart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "userCart",
        JSON.stringify(cart)
    );

    updateCartCounter();

}


// =====================================================
// ДОДАТИ ТОВАР У КОШИК
// =====================================================

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("userCart") || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("userCart", JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const counter = document.getElementById("cart-counter");
    if (!counter) return;
    const total = getCart().reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    counter.textContent = total;
}

function getPriceNumber(price) {
    if (!price) return 0;
    const n = parseFloat(String(price).replace(/\s/g, "").replace(",", ".").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
}

function formatMoney(number) {
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        maximumFractionDigits: 0
    }).format(number || 0);
}

function addToCart(name, price = "", image = "", color = "") {
    let cart = getCart();
    const cleanColor = String(color || "").trim();
    const key = `${name}|||${cleanColor}`;
    const existing = cart.find(item => (item.key || `${item.name}|||${item.color || ""}`) === key);

    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
        existing.price = price || existing.price || "";
        existing.image = image || existing.image || "";
        existing.color = cleanColor || existing.color || "";
        existing.key = key;
    } else {
        cart.push({
            key,
            name: String(name),
            price: String(price || ""),
            image: String(image || ""),
            color: cleanColor,
            quantity: 1
        });
    }

    saveCart(cart);
    return true;
}

/* Вибір кольору */
document.addEventListener("click", function(e) {
    const option = e.target.closest(".color-option");
    if (!option) return;

    const card = option.closest(".product-card");
    if (!card) return;

    card.querySelectorAll(".color-option").forEach(btn => btn.classList.remove("selected"));
    option.classList.add("selected");

    const image = card.querySelector(".product-image img");
    if (image && option.dataset.image) {
        image.src = option.dataset.image;
        image.alt = `${card.querySelector("h2,h3,.product-title")?.innerText.trim() || "Товар"} — ${option.dataset.color}`;
    }

    const description = card.querySelector("p");
    if (description && option.dataset.color) {
        description.dataset.originalText = description.dataset.originalText || description.innerText;
        description.innerText = `Оригінальна комплектуюча. Колір: ${option.dataset.color}.`;
    }
});

/* Кнопка "Купити" */
document.addEventListener("click", function(e) {
    const buyButton = e.target.closest(".buy-button");
    if (!buyButton) return;

    const card = buyButton.closest(".product-card, .card");
    if (!card) return;

    const titleElement = card.querySelector("h2,h3,.product-title");
    const priceElement = card.querySelector(".price,.product-price");
    const imageElement = card.querySelector(".product-image img");
    if (!titleElement) return;

    const name = titleElement.innerText.trim();
    const price = priceElement ? priceElement.innerText.trim() : "Ціну уточнюйте";
    const selected = card.querySelector(".color-option.selected");
    const color = selected ? selected.dataset.color : "";

    let image = imageElement ? imageElement.getAttribute("src") : "";
    if (image) {
        try { image = new URL(image, document.baseURI).href; } catch (_) {}
    }

    addToCart(name, price, image, color);

    buyButton.textContent = "✓ Додано";
    setTimeout(() => { buyButton.textContent = "Купити"; }, 900);
});

/* Перехід на детальну сторінку */
document.addEventListener("click", function(e) {
    const card = e.target.closest(".product-card, .card");
    if (!card || e.target.closest(".buy-button,.color-option")) return;

    const titleEl = card.querySelector("h2,h3,.product-title");
    if (!titleEl) return;

    const priceEl = card.querySelector(".price,.product-price");
    const imgEl = card.querySelector("img");
    const selected = card.querySelector(".color-option.selected");

    const params = new URLSearchParams({
        title: titleEl.innerText.trim(),
        price: priceEl ? priceEl.innerText.trim() : "",
        img: imgEl ? imgEl.getAttribute("src") : "",
        color: selected ? selected.dataset.color : ""
    });

    window.location.href = `../product.html?${params.toString()}`;
});

document.addEventListener("DOMContentLoaded", updateCartCounter);

// =====================================================
// ПЕРЕХІД НА PRODUCT.HTML
// =====================================================

document.addEventListener(
    "click",
    function (e) {

        const card =
            e.target.closest(
                ".product-card"
            ) ||
            e.target.closest(
                ".card"
            );


        if (
            card &&
            !e.target.classList.contains(
                "buy-button"
            )
        ) {

            const titleEl =
                card.querySelector("h2") ||
                card.querySelector("h3") ||
                card.querySelector(
                    ".product-title"
                );


            const priceEl =
                card.querySelector(".price") ||
                card.querySelector(
                    ".product-price"
                );


            const imgEl =
                card.querySelector("img");


            const title =
                titleEl
                    ? encodeURIComponent(
                        titleEl.innerText.trim()
                    )
                    : "";


            const price =
                priceEl
                    ? encodeURIComponent(
                        priceEl.innerText.trim()
                    )
                    : "Ціну уточнюйте";


            const img =
                imgEl
                    ? encodeURIComponent(
                        new URL(
                            imgEl.getAttribute("src"),
                            document.baseURI
                        ).href
                    )
                    : "";


            let redirectPath =
                "product.html";


            if (
                window.location.pathname.includes(
                    "/models/"
                )
            ) {

                redirectPath =
                    "../product.html";

            }


            window.location.href =
                `${redirectPath}?title=${title}&price=${price}&img=${img}`;

        }

    }
);


// =====================================================
// ВИДАЛИТИ
// =====================================================

function removeFromCart(name) {

    let cart = getCart();

    cart =
        cart.filter(
            item => item.name !== name
        );

    saveCart(cart);


    if (
        typeof displayCart === "function"
    ) {

        displayCart();

    }


    if (
        document.getElementById(
            "checkoutItemsList"
        )
    ) {

        renderCheckoutPage();

    }

}


// =====================================================
// ЗМІНИТИ КІЛЬКІСТЬ
// =====================================================

function updateQuantity(
    name,
    delta
) {

    let cart = getCart();

    let item =
        cart.find(
            i => i.name === name
        );


    if (item) {

        item.quantity =
            (item.quantity || 1) + delta;


        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    i => i.name !== name
                );

        }

    }


    saveCart(cart);


    if (
        typeof displayCart === "function"
    ) {

        displayCart();

    }


    if (
        document.getElementById(
            "checkoutItemsList"
        )
    ) {

        renderCheckoutPage();

    }

}


// =====================================================
// ОЧИСТИТИ КОШИК
// =====================================================

function clearCart() {

    localStorage.removeItem(
        "userCart"
    );

    updateCartCounter();


    if (
        typeof displayCart === "function"
    ) {

        displayCart();

    }


    if (
        document.getElementById(
            "checkoutItemsList"
        )
    ) {

        renderCheckoutPage();

    }

}


// =====================================================
// ЛІЧИЛЬНИК КОШИКА
// =====================================================

function updateCartCounter() {

    let cart =
        getCart();


    let totalItems =
        cart.reduce(
            (sum, item) =>
                sum + (item.quantity || 1),
            0
        );


    let counterElement =
        document.getElementById(
            "cart-counter"
        ) ||
        document.getElementById(
            "cartCount"
        );


    if (counterElement) {

        counterElement.innerText =
            totalItems;

        counterElement.style.display =
            totalItems > 0
                ? "inline-block"
                : "none";

    }

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    const container =
        document.getElementById(
            "cart-items"
        );


    if (!container) return;


    const cart =
        getCart();


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Ваш кошик порожній</p>";

        return;

    }


    container.innerHTML =
        cart.map(item => {

            const safeName =
                String(item.name)
                    .replace(
                        /'/g,
                        "\\'"
                    );


            return `

                <div
                    class="cart-item"
                    style="
                        display:flex;
                        align-items:center;
                        gap:15px;
                        margin-bottom:12px;
                        padding:10px;
                        border-bottom:1px solid #ccc;
                    "
                >


                    ${
                        item.image

                        ?

                        `
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            style="
                                width:80px;
                                height:80px;
                                object-fit:contain;
                                border-radius:10px;
                                background:#f7f7f7;
                                flex-shrink:0;
                            "
                            onerror="
                                this.style.display='none';
                            "
                        >
                        `

                        :

                        `
                        <div
                            style="
                                width:80px;
                                height:80px;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:#f5f5f5;
                                border-radius:10px;
                                color:#aaa;
                                font-size:12px;
                            "
                        >
                            Фото
                        </div>
                        `
                    }


                    <div style="flex:1;">

                        <strong>
                            ${item.name}
                        </strong>

                        ${
                            item.price
                                ? `<div>${item.price}</div>`
                                : ""
                        }

                        <div>
                            ${item.quantity || 1} шт.
                        </div>

                    </div>


                    <button
                        onclick="
                            removeFromCart('${safeName}')
                        "
                        style="
                            cursor:pointer;
                            padding:5px 10px;
                        "
                    >
                        Видалити
                    </button>

                </div>

            `;

        }).join("");

}


// =====================================================
// CHECKOUT
// =====================================================

function renderCheckoutPage() {

    const checkoutItemsList =
        document.getElementById(
            "checkoutItemsList"
        );


    const cartDataInput =
        document.getElementById(
            "cartDataInput"
        );


    const totalPriceElement =
        document.getElementById(
            "totalPrice"
        );


    if (!checkoutItemsList)
        return;


    const cart =
        getCart();


    checkoutItemsList.innerHTML =
        "";


    if (
        !cart ||
        cart.length === 0
    ) {

        checkoutItemsList.innerHTML =
            `<div class="empty-cart-msg">
                Ваш кошик порожній
            </div>`;


        if (cartDataInput) {

            cartDataInput.value =
                "Кошик порожній";

        }


        if (totalPriceElement) {

            totalPriceElement.textContent =
                "0 грн";

        }

        return;

    }


    let itemsForEmail = [];

    let grandTotal = 0;


    cart.forEach(
        (item, index) => {

            const name =
                item.name || "Товар";


            const qty =
                item.quantity || 1;


            const rawPrice =
                item.price
                    ? parseFloat(
                        item.price.replace(
                            /[^\d.]/g,
                            ""
                        )
                    )
                    : 0;


            const itemTotal =
                rawPrice * qty;


            grandTotal +=
                itemTotal;


            itemsForEmail.push(
                `${index + 1}. ${name} — ${qty} шт. ${
                    rawPrice > 0
                        ? "(по " + rawPrice + " грн)"
                        : ""
                }`
            );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "checkout-item-row";


            row.innerHTML = `

                <div class="checkout-item-info">

                    ${
                        item.image
                            ? `
                            <img
                                src="${item.image}"
                                style="
                                    width:60px;
                                    height:60px;
                                    object-fit:contain;
                                    border-radius:8px;
                                    margin-right:10px;
                                    vertical-align:middle;
                                "
                            >
                            `
                            : ""
                    }

                    <span class="checkout-item-name">
                        ${name}
                    </span>

                    <span class="checkout-item-price">
                        ${item.price || ""}
                    </span>

                </div>


                <div class="checkout-item-controls">

                    <button
                        type="button"
                        class="qty-btn"
                        onclick="
                            updateQuantity(
                                '${name.replace(/'/g, "\\'")}',
                                -1
                            )
                        "
                    >
                        -
                    </button>


                    <span class="checkout-item-qty">
                        ${qty} шт.
                    </span>


                    <button
                        type="button"
                        class="qty-btn"
                        onclick="
                            updateQuantity(
                                '${name.replace(/'/g, "\\'")}',
                                1
                            )
                        "
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-btn"
                        title="Видалити"
                        onclick="
                            removeFromCart(
                                '${name.replace(/'/g, "\\'")}'
                            )
                        "
                    >
                        &times;
                    </button>

                </div>

            `;


            checkoutItemsList.appendChild(
                row
            );

        }
    );


    if (cartDataInput) {

        cartDataInput.value =
            `СПИСОК ТОВАРІВ:\n${itemsForEmail.join("\n")}\n\nЗАГАЛЬНА СУМА: ${
                grandTotal > 0
                    ? grandTotal + " грн"
                    : "Уточнюйте у менеджера"
            }`;

    }


    if (totalPriceElement) {

        totalPriceElement.textContent =
            grandTotal > 0
                ? `${grandTotal} грн`
                : "Ціну уточнюйте";

    }

}


// =====================================================
// EMAILJS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCounter();

        displayCart();

        renderCheckoutPage();


        const orderForm =
            document.getElementById(
                "orderForm"
            );


        const phoneInput =
            document.getElementById(
                "phone"
            );


        const submitBtn =
            document.getElementById(
                "submitBtn"
            );


        const formStatus =
            document.getElementById(
                "formStatus"
            );


        if (phoneInput) {

            phoneInput.addEventListener(
                "focus",
                function () {

                    if (!phoneInput.value) {

                        phoneInput.value =
                            "+380";

                    }

                }
            );

        }


        if (orderForm) {

            orderForm.addEventListener(
                "submit",
                function (e) {

                    e.preventDefault();


                    const cart =
                        getCart();


                    if (
                        !cart ||
                        cart.length === 0
                    ) {

                        alert(
                            "Неможливо оформити замовлення: ваш кошик порожній!"
                        );

                        return;

                    }


                    if (submitBtn) {

                        submitBtn.disabled =
                            true;

                        submitBtn.innerText =
                            "Надсилання...";

                    }


                    let itemsText = "";

                    let total = 0;


                    cart.forEach(
                        (item, index) => {

                            const qty =
                                item.quantity || 1;


                            const priceNum =
                                item.price
                                    ? parseFloat(
                                        item.price.replace(
                                            /[^\d.]/g,
                                            ""
                                        )
                                    )
                                    : 0;


                            itemsText +=
                                `${index + 1}. ${item.name} x${qty} ${
                                    priceNum > 0
                                        ? "— " +
                                          (priceNum * qty) +
                                          " грн"
                                        : ""
                                }\n`;


                            total +=
                                priceNum * qty;

                        }
                    );


                    const templateParams = {

                        user_name:
                            document.getElementById(
                                "name"
                            )?.value || "",

                        user_phone:
                            document.getElementById(
                                "phone"
                            )?.value || "",

                        delivery_method:
                            document.getElementById(
                                "delivery"
                            )?.value || "",

                        delivery_address:
                            document.getElementById(
                                "address"
                            )?.value || "",

                        payment_method:
                            document.getElementById(
                                "payment"
                            )?.value || "",

                        user_comment:
                            document.getElementById(
                                "comment"
                            )?.value ||
                            "Немає",

                        order_items:
                            itemsText,

                        total_price:
                            total > 0
                                ? total + " грн"
                                : "Уточнюйте у менеджера"

                    };


                    if (
                        typeof emailjs ===
                        "undefined"
                    ) {

                        alert(
                            "EmailJS не підключений."
                        );

                        if (submitBtn) {

                            submitBtn.disabled =
                                false;

                            submitBtn.innerText =
                                "Підтвердити замовлення";

                        }

                        return;

                    }


                    emailjs
                        .send(
                            "service_l8o3wgg",
                            "template_s66coaa",
                            templateParams
                        )
                        .then(
                            function () {

                                if (formStatus) {

                                    formStatus.style.color =
                                        "green";

                                    formStatus.innerText =
                                        "Дякуємо! Замовлення успішно відправлено.";

                                } else {

                                    alert(
                                        "Дякуємо! Замовлення успішно відправлено."
                                    );

                                }


                                clearCart();


                                orderForm.reset();

                            }
                        )
                        .catch(
                            function (error) {

                                if (formStatus) {

                                    formStatus.style.color =
                                        "red";

                                    formStatus.innerText =
                                        "Помилка при відправці. Спробуйте ще раз.";

                                } else {

                                    alert(
                                        "Помилка при відправці. Спробуйте ще раз."
                                    );

                                }


                                console.error(
                                    "EmailJS Error:",
                                    error
                                );

                            }
                        )
                        .finally(
                            function () {

                                if (submitBtn) {

                                    submitBtn.disabled =
                                        false;

                                    submitBtn.innerText =
                                        "Підтвердити замовлення";

                                }

                            }
                        );

                }
            );

        }

    }
);
function addBatteryToCartFromCard(button) {
    // 1. Знаходимо картку товару, в якій знаходиться кнопка
    const card = button.closest('.product-card') || button.closest('.card') || button.parentElement.parentElement;

    // 2. Зчитуємо вибрану ємність
    const selectedRadio = card.querySelector('input[name="battery_health"]:checked');
    const capacity = selectedRadio ? selectedRadio.value : '85-90%';

    // 3. Знаходимо назву, ціну та картинку в цій картці
    const titleElem = card.querySelector('h1, h2, h3, .product-title, .title');
    const priceElem = card.querySelector('.price, .product-price');
    const imgElem = card.querySelector('img');

    const title = titleElem ? titleElem.innerText.trim() : 'Акумулятор MacBook';
    const price = priceElem ? priceElem.innerText.trim() : 'Ціну уточнюйте';
    const imgSrc = imgElem ? imgElem.src : '';

    const finalTitle = `${title} (${capacity})`;

    // 4. Додаємо в кошик через вашу функцію addToCart
    if (typeof addToCart === 'function') {
        addToCart(finalTitle, price, imgSrc, '');
        alert(`Товар «${finalTitle}» додано в кошик!`);
    } else {
        alert('Помилка: функцію addToCart не знайдено!');
    }
}
// Автоматична ізоляція радіокнопок при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.color-selection-block').forEach((block, index) => {
        const uniqueName = `item_color_${index}`;
        block.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.name = uniqueName;
        });
    });
});

// 1. Функція зміни зображення тільки у відповідній картці
function changeCardColorImage(radioElem) {
    // Знаходимо саме ту картку, в якій клікнули на колір
    const card = radioElem.closest('.product-card') || radioElem.closest('article') || radioElem.closest('div[style*="background"]')?.parentElement;
    if (!card) return;

    const imgElem = card.querySelector('img');
    
    if (imgElem && imgElem.src) {
        const selectedColor = radioElem.value.toLowerCase().replace(/\s+/g, '');
        const currentSrc = imgElem.src;

        // Видаляємо старий колір з URL (якщо був) і додаємо новий (-spacegray, -silver і т.д.)
        const baseSrc = currentSrc.replace(/-(spacegray|silver|midnight|starlight)(\.[^.]+)$/i, '$2');
        const newSrc = baseSrc.replace(/(\.[^.]+)$/, `-${selectedColor}$1`);
        
        imgElem.src = newSrc;
    }
}

// 2. Функція додавання у кошик товару з вибраним кольором
function addColorProductToCart(button) {
    // Шукаємо батьківську картку
    const card = button.closest('.product-card') || button.closest('article') || button.parentElement.parentElement;
    if (!card) return;

    // Зчитуємо вибраний колір САМЕ в цій картці
    const selectedRadio = card.querySelector('input[type="radio"]:checked');
    const color = selectedRadio ? selectedRadio.value : 'Space Gray';

    // Зчитуємо дані товару
    const titleElem = card.querySelector('h1, h2, h3, .product-title, .title');
    const priceElem = card.querySelector('.price, .product-price');
    const imgElem = card.querySelector('img');

    const baseTitle = titleElem ? titleElem.innerText.trim() : 'Товар';
    const price = priceElem ? priceElem.innerText.trim() : 'Ціну уточнюйте';
    const imgSrc = imgElem ? imgElem.src : '';

    const finalTitle = `${baseTitle} (${color})`;

    if (typeof addToCart === 'function') {
        addToCart(finalTitle, price, imgSrc, '');
        alert(`Товар «${finalTitle}» успішно додано до кошика!`);
    } else {
        alert('Помилка: функцію addToCart() не знайдено в script.js');
    }
}