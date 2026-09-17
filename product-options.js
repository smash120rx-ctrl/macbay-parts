
/* =========================================================
   MACBAYPARTS PRODUCT OPTIONS
   Colors, stock, battery capacity and preorder
========================================================= */

const MBP_SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
const MBP_SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

const MBP_EMAILJS_PUBLIC_KEY = 'OlxFyi8xILVI7jL2O';
const MBP_EMAILJS_SERVICE_ID = 'service_l8o3wgg';
const MBP_EMAILJS_ADMIN_TEMPLATE = 'template_h9dzd7s';

function mbpEscape(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function mbpNumber(value) {
    const n = Number(String(value ?? '').replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, ''));
    return Number.isFinite(n) ? n : 0;
}

function mbpFormatMoney(value) {
    const n = mbpNumber(value);
    return n ? `${n.toLocaleString('uk-UA')} грн` : 'Ціну уточнюйте';
}

function mbpNormalize(value) {
    return String(value ?? '').toLowerCase()
        .replace(/["'`«»]/g, '')
        .replace(/[–—]/g, '-')
        .replace(/\s+/g, ' ')
        .trim();
}

function mbpGetCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function mbpSaveCart(cart) {
    localStorage.setItem('userCart', JSON.stringify(cart));
    if (typeof updateCartCounter === 'function') updateCartCounter();
}

function mbpAddToCart(card, variant = {}) {
    const title = card.querySelector('h1, h2, h3')?.textContent.trim() || 'Товар';
    const image = card.querySelector('.product-image img')?.getAttribute('src') || '';
    const basePrice = card.querySelector('.price')?.textContent.trim() || 'Ціну уточнюйте';
    const price = variant.price ?? basePrice;
    const variantName = variant.name ? ` — ${variant.name}` : '';
    const name = `${title}${variantName}`;

    const cart = mbpGetCart();
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
        cart.push({
            name,
            price: typeof price === 'number' ? `${price} грн` : price,
            image,
            quantity: 1
        });
    }
    mbpSaveCart(cart);
    alert('Товар додано до кошика.');
}

function mbpEnsureModal() {
    if (document.getElementById('mbpProductDetailModal')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div class="product-detail-modal" id="mbpProductDetailModal" aria-hidden="true">
            <div class="product-detail-dialog">
                <button class="product-detail-close" type="button" aria-label="Закрити">×</button>
                <img id="mbpDetailImage" src="" alt="">
                <h3 id="mbpDetailTitle"></h3>
                <div class="detail-meta" id="mbpDetailColor"></div>
                <div class="detail-meta" id="mbpDetailModel"></div>
                <div class="detail-meta" id="mbpDetailPrice"></div>
                <div class="detail-meta" id="mbpDetailStock"></div>
            </div>
        </div>
    `);

    const modal = document.getElementById('mbpProductDetailModal');
    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.closest('.product-detail-close')) {
            modal.classList.remove('open');
        }
    });
}

function mbpOpenColorModal(card, color) {
    mbpEnsureModal();

    const modal = document.getElementById('mbpProductDetailModal');
    const img = document.getElementById('mbpDetailImage');
    const title = card.querySelector('h1, h2, h3')?.textContent.trim() || 'Запчастина';
    const baseImage = card.querySelector('.product-image img')?.src || '';
    const image = color.image_url || color.image || baseImage;
    const model = color.model || color.compatibility || card.querySelector('.models')?.textContent.trim() || 'Сумісність уточнюється';
    const stock = color.stock !== false && color.available !== false;

    img.src = image;
    img.alt = `${title} — ${color.name || 'колір'}`;
    document.getElementById('mbpDetailTitle').textContent = title;
    document.getElementById('mbpDetailColor').textContent = `Колір: ${color.name || 'Не вказано'}`;
    document.getElementById('mbpDetailModel').textContent = `Для MacBook: ${model}`;
    document.getElementById('mbpDetailPrice').textContent = `Ціна: ${mbpFormatMoney(color.price ?? card.dataset.basePrice)}`;
    document.getElementById('mbpDetailStock').textContent = stock ? 'Статус: в наявності' : 'Статус: передзамовлення';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function mbpParseJSON(value, fallback = []) {
    if (!value) return fallback;
    if (Array.isArray(value) || typeof value === 'object') return value;
    try {
        const parsed = JSON.parse(value);
        return parsed ?? fallback;
    } catch {
        return fallback;
    }
}

async function mbpLoadProducts() {
    try {
        if (window.MBP_PRODUCTS_PROMISE) {
            return await window.MBP_PRODUCTS_PROMISE;
        }
        const response = await fetch(`${MBP_SUPABASE_URL}/rest/v1/products_new?select=*&limit=1000&_=${Date.now()}`, {
            cache: 'no-store',
            headers: {
                apikey: MBP_SUPABASE_KEY,
                Authorization: `Bearer ${MBP_SUPABASE_KEY}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Supabase products:', error);
        return [];
    }
}

function mbpProductMatches(card, product) {
    const path = window.location.pathname.toLowerCase();
    const modelMatch = path.match(/a(\d{3,4})/i);
    const pageModel = modelMatch ? `a${modelMatch[1]}` : '';
    const categoryMatch = path.match(/-(antennas|battery|cables|cooler|display|io-board|motherboard|speakers|topcase|trackpad|keyboard|accessories|daughterboard)\.html/i);
    const pageCategory = categoryMatch ? categoryMatch[1] : '';

    const cardModel = card.dataset.productModel || pageModel;
    const cardCategory = card.dataset.productCategory || pageCategory;

    if (cardModel && cardCategory &&
        mbpNormalize(product.model) === mbpNormalize(cardModel) &&
        mbpNormalize(product.category) === mbpNormalize(cardCategory)) return true;

    if (cardModel && mbpNormalize(product.model) === mbpNormalize(cardModel)) return true;

    const title = card.querySelector('h1, h2, h3')?.textContent || '';
    const pTitle = product.title ?? product.name ?? '';
    return mbpNormalize(title) === mbpNormalize(pTitle);
}

function mbpBuildColorList(product) {
    let colors = product?.color_variants ?? product?.colors ?? product?.color_options ?? [];
    colors = mbpParseJSON(colors, []);
    if (!Array.isArray(colors)) colors = [];

    return colors.map((item, index) => {
        if (typeof item === 'string') {
            return { name: item, image_url: '', model: '', price: product?.price, stock: product?.stock !== false };
        }
        return {
            name: item.name ?? item.color ?? `Колір ${index + 1}`,
            image_url: item.image_url ?? item.image ?? '',
            model: item.model ?? item.compatibility ?? '',
            price: item.price ?? product?.price,
            stock: item.stock ?? item.available ?? product?.stock !== false
        };
    });
}

function mbpBuildBatteryList(product) {
    let variants = product?.battery_variants ?? product?.battery_prices ?? [];
    variants = mbpParseJSON(variants, []);
    if (!Array.isArray(variants)) {
        variants = Object.entries(variants).map(([name, price]) => ({ name, price }));
    }
    return variants;
}

function mbpIsBatteryCard(card) {
    const text = `${location.pathname} ${card.textContent}`.toLowerCase();
    return /battery|акум|акумулятор/.test(text);
}

function mbpIsColorCard(card) {
    const text = `${location.pathname} ${card.textContent}`.toLowerCase();
    return /trackpad|touchpad|topcase|display|матриц|тачпад|топкейс/.test(text);
}

function mbpAddOptions(card, product) {
    const old = card.querySelector('.product-options');
    if (old) old.remove();

    const isBattery = mbpIsBatteryCard(card);
    const isColor = mbpIsColorCard(card);
    const colors = mbpBuildColorList(product);
    const batteries = mbpBuildBatteryList(product);

    const options = document.createElement('div');
    options.className = 'product-options';

    if (isColor && colors.length) {
        options.innerHTML += `
            <div class="product-options-title">Оберіть колір</div>
            <div class="color-options">
                ${colors.slice(0, 4).map((c, i) => `
                    <button type="button" class="color-option ${i === 0 ? 'active' : ''}" data-color-index="${i}">
                        <span class="color-dot"></span>${mbpEscape(c.name)}
                    </button>
                `).join('')}
            </div>
        `;
    }

    if (isBattery && batteries.length) {
        options.innerHTML += `
            <div class="product-options-title">Оберіть ємність</div>
            <div class="battery-options">
                ${batteries.map((v, i) => `
                    <button type="button" class="battery-option ${i === 0 ? 'active' : ''}" data-battery-index="${i}">
                        ${mbpEscape(v.name ?? v.capacity ?? '')}
                    </button>
                `).join('')}
            </div>
        `;
    }

    if (!options.innerHTML) return;

    const button = card.querySelector('.buy-button');
    if (button) card.insertBefore(options, button);

    card.dataset.basePrice = product?.price ?? '';

    const selected = { color: colors[0] ?? null, battery: batteries[0] ?? null };

    options.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => {
            options.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selected.color = colors[Number(btn.dataset.colorIndex)];
            mbpOpenColorModal(card, selected.color);
        });
    });

    options.querySelectorAll('.battery-option').forEach(btn => {
        btn.addEventListener('click', () => {
            options.querySelectorAll('.battery-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selected.battery = batteries[Number(btn.dataset.batteryIndex)];
            const priceEl = card.querySelector('.price');
            if (priceEl && selected.battery?.price != null) {
                priceEl.textContent = mbpFormatMoney(selected.battery.price);
            }
        });
    });

    if (button) {
        button.addEventListener('click', event => {
            event.preventDefault();
            event.stopImmediatePropagation();

            const stock = product?.stock !== false;
            const variant = selected.battery || selected.color || {};
            if (!stock) {
                mbpOpenPreorder(card, variant);
                return;
            }
            mbpAddToCart(card, variant);
        }, true);
    }
}

function mbpOpenPreorder(card, variant = {}) {
    mbpEnsurePreorderModal();

    const title = card.querySelector('h1, h2, h3')?.textContent.trim() || 'Запчастина';
    const model = card.querySelector('.models')?.textContent.trim() || '';
    const variantName = variant.name || '';
    const modal = document.getElementById('mbpPreorderModal');

    modal.querySelector('[name="product"]').value = title;
    modal.querySelector('[name="variant"]').value = variantName;
    modal.querySelector('[name="model"]').value = model;
    modal.classList.add('open');
}

function mbpEnsurePreorderModal() {
    if (document.getElementById('mbpPreorderModal')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div class="preorder-modal" id="mbpPreorderModal">
            <div class="preorder-dialog">
                <button class="preorder-close" type="button" aria-label="Закрити">×</button>
                <h3>Передзамовлення</h3>
                <p>Залиште ім'я та номер телефону — ми зв'яжемося з вами.</p>
                <form class="preorder-form" id="mbpPreorderForm">
                    <input name="product" type="hidden">
                    <input name="variant" type="hidden">
                    <input name="model" type="hidden">
                    <input name="name" type="text" placeholder="Ваше ім'я" required>
                    <input name="phone" type="tel" placeholder="+380..." required>
                    <button class="preorder-submit" type="submit">Надіслати заявку</button>
                    <div class="preorder-status" aria-live="polite"></div>
                </form>
            </div>
        </div>
    `);

    const modal = document.getElementById('mbpPreorderModal');
    const form = document.getElementById('mbpPreorderForm');

    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.closest('.preorder-close')) {
            modal.classList.remove('open');
        }
    });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const status = form.querySelector('.preorder-status');
        const submit = form.querySelector('.preorder-submit');
        status.textContent = 'Надсилаємо заявку...';
        submit.disabled = true;

        try {
            if (typeof emailjs === 'undefined') throw new Error('EmailJS не завантажився');

            await emailjs.send(
                MBP_EMAILJS_SERVICE_ID,
                MBP_EMAILJS_ADMIN_TEMPLATE,
                {
                    user_name: form.elements.name.value.trim(),
                    user_phone: form.elements.phone.value.trim(),
                    user_email: '',
                    order_items: `${form.elements.product.value}${form.elements.variant.value ? ` — ${form.elements.variant.value}` : ''}`,
                    total_price: 'Передзамовлення',
                    user_comment: `Модель: ${form.elements.model.value}`
                }
            );

            status.textContent = '✓ Заявку надіслано. Ми зв’яжемося з вами.';
            form.reset();
        } catch (error) {
            console.error(error);
            status.textContent = '✕ Не вдалося надіслати заявку. Спробуйте ще раз.';
        } finally {
            submit.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof emailjs !== 'undefined' && emailjs.init) {
        emailjs.init(MBP_EMAILJS_PUBLIC_KEY);
    }

    const cards = [...document.querySelectorAll('.product-card')];
    if (!cards.length) return;

    const products = await mbpLoadProducts();

    cards.forEach(card => {
        const product = products.find(p => mbpProductMatches(card, p)) || {};
        const isBattery = mbpIsBatteryCard(card);
        const isColor = mbpIsColorCard(card);

        if (isBattery || isColor) {
            mbpAddOptions(card, product);
        } else {
            const button = card.querySelector('.buy-button');
            if (button) {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    const stock = product?.stock !== false;
                    if (!stock) mbpOpenPreorder(card);
                    else mbpAddToCart(card);
                }, true);
            }
        }

        if (product?.stock === false) {
            const stockEl = card.querySelector('.stock');
            if (stockEl) {
                stockEl.textContent = '● Немає в наявності — передзамовлення';
                stockEl.classList.add('preorder');
            }
            const button = card.querySelector('.buy-button');
            if (button) {
                button.textContent = 'Передзамовлення';
                button.classList.add('preorder-button');
            }
        }
    });
});
