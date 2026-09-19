/*
 * MACBAYPARTS — dynamic listings for Display / Topcase / Cable pages
 * Every row in Supabase products becomes its own product card.
 * Duplicate titles are intentionally NOT merged.
 */

(() => {
    const URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
    const KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

    const path = location.pathname.toLowerCase();
    const match = path.match(/\/models\/([a-z0-9]+)-(display|topcase|cables)\.html$/);
    if (!match) return;

    const MODEL = match[1].toUpperCase();
    const TYPE = match[2];

    const CATEGORY_WORDS = TYPE === 'display'
        ? ['display', 'матриц', 'екран', 'screen', 'lcd', 'дисплей']
        : TYPE === 'cables'
            ? ['cable', 'cables', 'шлейф', 'шлейфи', 'flex', 'стрічка']
            : ['topcase', 'топкейс', 'top case', 'верхня панель', 'верхняя панель'];

    const COLOR_NAMES = [
        'Midnight', 'Міднайт', 'Midnight Blue', 'MidnightBlue',
        'Silver', 'Сільвер', 'Space Gray', 'Space Grey', 'Спейс Грей',
        'Starlight', 'Старлайт', 'Black', 'Чорний', 'Blue', 'Синій',
        'Green', 'Зелений', 'Gold', 'Золотий', 'Rose Gold', 'Product Red', 'Red', 'Червоний'
    ];

    function normalize(v) {
        return String(v ?? '').toLowerCase()
            .replace(/[–—]/g, '-')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Назва деталі у білій картці завжди без слова «Заміна».
    // Очищаємо також назви, які приходять із Supabase.
    function cleanPartTitle(value) {
        let s = String(value ?? '').trim();
        s = s.replace(/\bЗаміна\s+топкейсу\b/gi, 'Топкейс');
        s = s.replace(/\bЗаміна\s+матриці\b/gi, 'Матриця');
        s = s.replace(/\s{2,}/g, ' ').trim();
        return s;
    }

    function parseJSON(v, fallback = null) {
        if (v == null || v === '') return fallback;
        if (typeof v === 'object') return v;
        try { return JSON.parse(v); } catch { return fallback; }
    }

    function first(obj, keys, fallback = '') {
        for (const key of keys) {
            if (obj && obj[key] != null && obj[key] !== '') return obj[key];
        }
        return fallback;
    }

    function textOfProduct(p) {
        return normalize([
            p.title, p.name, p.product_name,
            p.category, p.type, p.product_type, p.part_type,
            p.model, p.model_number, p.compatibility, p.compatible_models,
            p.description
        ].filter(Boolean).join(' '));
    }

    function matchesModel(p) {
        const modelFields = [p.model, p.model_number, p.model_name, p.compatibility, p.compatible_models, p.macbook_model]
            .filter(Boolean).map(normalize).join(' ');
        if (modelFields.includes(normalize(MODEL))) return true;
        return textOfProduct(p).includes(normalize(MODEL));
    }

    function matchesCategory(p) {
        const categoryFields = [p.category, p.type, p.product_type, p.part_type, p.subcategory, p.title, p.name]
            .filter(Boolean).map(normalize).join(' ');
        return CATEGORY_WORDS.some(word => categoryFields.includes(normalize(word)));
    }

    function imageFrom(p, fallback = '') {
        let value = first(p, ['image_url', 'image', 'photo_url', 'photo', 'main_image', 'thumbnail', 'img', 'picture'], '');
        value = parseJSON(value, value);
        if (Array.isArray(value)) value = value[0] || '';
        if (typeof value === 'object' && value) value = first(value, ['url', 'image_url', 'src'], '');
        return String(value || fallback || '');
    }

    function colorFrom(p) {
        const direct = first(p, ['color', 'color_name', 'colour', 'variant_color', 'case_color', 'display_color'], '');
        if (direct) return String(direct);
        const title = `${p.title || ''} ${p.name || ''}`;
        const found = COLOR_NAMES.find(c => normalize(title).includes(normalize(c)));
        return found || '';
    }

    function stockValue(p) {
        const value = first(p, ['stock', 'available', 'in_stock', 'is_available'], undefined);
        if (value === undefined) return true;
        if (typeof value === 'string') return !['false', '0', 'no', 'немає', 'немає в наявності', 'out'].includes(normalize(value));
        return value !== false && Number(value) !== 0;
    }

    function priceValue(p) {
        const v = first(p, ['price', 'sale_price', 'cost'], '');
        const n = Number(String(v).replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, ''));
        return Number.isFinite(n) && n > 0 ? `${n.toLocaleString('uk-UA')} грн` : 'Ціну уточнюйте';
    }

    function colorClass(color) {
        const c = normalize(color);
        if (c.includes('silver') || c.includes('сільвер')) return 'silver';
        if (c.includes('space gray') || c.includes('space grey') || c.includes('спейс')) return 'space-gray';
        if (c.includes('starlight') || c.includes('старлайт')) return 'starlight';
        if (c.includes('midnight') || c.includes('міднайт')) return 'midnight';
        if (c.includes('blue') || c.includes('син')) return 'blue';
        if (c.includes('green') || c.includes('зел')) return 'green';
        if (c.includes('gold') || c.includes('золот')) return 'gold';
        if (c.includes('red') || c.includes('черв')) return 'red';
        return '';
    }

    function esc(v) {
        return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function expandVariants(product, fallbackImage) {
        const raw = first(product, ['variants', 'color_variants', 'colors', 'color_options'], null);
        const variants = parseJSON(raw, null);
        if (!Array.isArray(variants) || !variants.length) return [{ product, variant: null }];

        return variants.map((variant, index) => ({
            product,
            variant: typeof variant === 'string'
                ? { name: variant }
                : { ...variant, _index: index, _fallbackImage: fallbackImage }
        }));
    }

    function getVariantData(product, variant, fallbackImage) {
        const v = variant || {};
        const merged = { ...product, ...v };
        return {
            title: cleanPartTitle(first(v, ['title', 'name', 'product_name'], first(product, ['title', 'name', 'product_name'], TYPE === 'display' ? 'Матриця' : (TYPE === 'cables' ? 'Шлейф' : 'Топкейс')))),
            description: cleanPartTitle(first(v, ['description'], first(product, ['description'], `${TYPE === 'display' ? 'Матриця' : (TYPE === 'cables' ? 'Шлейф' : 'Топкейс')} для MacBook ${MODEL}.`))),
            color: first(v, ['color', 'color_name', 'colour', 'name'], colorFrom(product)),
            model: first(v, ['model', 'model_number', 'compatibility'], first(product, ['model', 'model_number', 'compatibility'], MODEL)),
            price: first(v, ['price', 'sale_price', 'cost'], first(product, ['price', 'sale_price', 'cost'], '')),
            image: imageFrom(merged, fallbackImage),
            stock: v.stock !== undefined || v.available !== undefined ? stockValue(v) : stockValue(product),
            id: first(v, ['id'], first(product, ['id'], ''))
        };
    }

    function renderCard(data) {
        const color = data.color ? `<div class="listing-color"><span class="listing-color-dot ${colorClass(data.color)}"></span>${esc(data.color)}</div>` : '';
        const inStock = data.stock;
        const title = data.color && !normalize(data.title).includes(normalize(data.color))
            ? `${data.title} — ${data.color}` : data.title;

        const card = document.createElement('article');
        card.className = 'product-card dynamic-listing-card';
        card.dataset.productId = data.id || '';
        card.dataset.stock = inStock ? 'true' : 'false';
        card.innerHTML = `
            <div class="product-image">
                ${data.image ? `<img src="${esc(data.image)}" alt="${esc(title)}" loading="lazy">` : '<div class="listing-no-image">Фото товару</div>'}
            </div>
            <div class="stock ${inStock ? '' : 'preorder'}">● ${inStock ? 'В наявності' : 'Немає в наявності'}</div>
            <h2>${esc(title)}</h2>
            <p>${esc(data.description)}</p>
            <div class="models">${esc(data.model || MODEL)}</div>
            ${color}
            <div class="price">${priceValue(data)}</div>
            <button class="buy-button ${inStock ? '' : 'preorder-button'}" type="button">${inStock ? 'Купити' : 'Передзамовлення'}</button>
        `;

        const button = card.querySelector('.buy-button');
        button.addEventListener('click', () => {
            const variant = { name: data.color, price: Number(String(data.price).replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '')) || undefined };
            if (data.stock && typeof mbpAddToCart === 'function') {
                mbpAddToCart(card, variant);
            } else if (!data.stock && typeof mbpOpenPreorder === 'function') {
                mbpOpenPreorder(card, variant);
            } else {
                // Fallback keeps the card functional even if product-options.js is changed.
                const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                const name = data.color ? `${data.title} — ${data.color}` : data.title;
                const existing = cart.find(item => item.name === name);
                if (existing) existing.quantity = Number(existing.quantity || 1) + 1;
                else cart.push({ name, price: priceValue(data), image: data.image, quantity: 1 });
                localStorage.setItem('userCart', JSON.stringify(cart));
                if (typeof updateCartCounter === 'function') updateCartCounter();
                if (data.stock) alert('Товар додано до кошика.');
            }
        });
        return card;
    }

    async function load() {
        const container = document.querySelector('.single-product .products');
        if (!container) return;
        const fallbackImage = container.querySelector('.product-card img')?.getAttribute('src') || '';
        container.classList.add('dynamic-listings-grid');

        try {
            const response = await fetch(`${URL}/rest/v1/products_new?select=*`, {
                headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }
            });
            if (!response.ok) throw new Error(`Supabase ${response.status}`);
            const products = await response.json();
            const filtered = products.filter(p => matchesModel(p) && matchesCategory(p));

            const expanded = filtered.flatMap(p => expandVariants(p, fallbackImage));
            if (!expanded.length) {
                container.innerHTML = `<div class="listing-empty">Поки що немає оголошень для ${esc(MODEL)}.</div>`;
                return;
            }

            container.innerHTML = '';
            expanded.forEach(({ product, variant }) => {
                container.appendChild(renderCard(getVariantData(product, variant, fallbackImage)));
            });
        } catch (error) {
            console.error('Помилка завантаження оголошень:', error);
            // Keep the original static card as a safe offline fallback.
        }
    }

    document.addEventListener('DOMContentLoaded', load);
})();
