/* MACBAYPARTS — UNIVERSAL SUPABASE AUTO LOADER
   Reads data-model / data-title / data-category from .product-card elements
   and fills image, price, stock and description from products_new.
*/
(() => {
  'use strict';

  const SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

  const normalize = v => String(v ?? '').toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/["'`«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const formatPrice = value => {
    if (value == null || String(value).trim() === '') return 'Ціну уточнюйте';
    const raw = String(value).trim();
    const n = Number(raw.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? `${n.toLocaleString('uk-UA')} грн` : raw;
  };

  const imageUrl = value => {
    const url = String(value ?? '').trim();
    if (!url) return '';
    if (/^(https?:|data:|blob:|\/)/i.test(url)) return url;
    return location.pathname.includes('/models/') ? `../${url}` : url;
  };

  function pageModel() {
    const m = location.pathname.match(/a(\d{3,4})/i);
    return m ? `A${m[1]}` : '';
  }

  function inferCategory(card) {
    if (card.dataset.category) return card.dataset.category;
    if (card.dataset.productCategory) return card.dataset.productCategory;
    const text = normalize(`${card.dataset.title || ''} ${card.textContent || ''}`);
    const map = [
      ['антен', 'Антена'], ['battery', 'Акумулятор'], ['акумулятор', 'Акумулятор'],
      ['cable', 'Шлейф'], ['шлейф', 'Шлейф'], ['cooler', 'Охолодження'], ['охолод', 'Охолодження'],
      ['display', 'Матриця'], ['матриц', 'Матриця'], ['io board', 'IO Board'],
      ['motherboard', 'Материнська плата'], ['материн', 'Материнська плата'],
      ['speaker', 'Динамік'], ['динамік', 'Динамік'], ['topcase', 'Топкейс'], ['топкейс', 'Топкейс'],
      ['trackpad', 'Тачпад'], ['touchpad', 'Тачпад'], ['тачпад', 'Тачпад'],
      ['keyboard', 'Клавіатура'], ['клавіатур', 'Клавіатура']
    ];
    const hit = map.find(([key]) => text.includes(key));
    return hit ? hit[1] : '';
  }

  function prepareCard(card) {
    const modelEl = card.querySelector('[data-model-value], .models');
    const titleEl = card.querySelector('[data-title-value], h1, h2, h3, .product-title');
    if (!card.dataset.model && modelEl) card.dataset.model = modelEl.textContent.trim();
    if (!card.dataset.title && titleEl) card.dataset.title = titleEl.textContent.trim();
    if (!card.dataset.category) card.dataset.category = inferCategory(card);
    if (!card.dataset.model) card.dataset.model = pageModel();
  }

  function findProduct(products, card) {
    prepareCard(card);
    const model = normalize(card.dataset.model);
    const category = normalize(card.dataset.category);
    const title = normalize(card.dataset.title);

    if (model && category) {
      const exact = products.find(p => normalize(p.model) === model && normalize(p.category) === category);
      if (exact) return exact;
    }
    if (title) {
      const exactTitle = products.find(p => normalize(p.title) === title);
      if (exactTitle) return exactTitle;
    }
    if (model) {
      const byModel = products.filter(p => normalize(p.model) === model);
      if (byModel.length === 1) return byModel[0];
      if (category) {
        const byCat = byModel.find(p => normalize(p.category) === category);
        if (byCat) return byCat;
      }
    }
    return null;
  }

  function apply(card, product) {
    if (!product) return;
    card.dataset.productId = product.id ?? '';
    card.dataset.productModel = product.model ?? '';
    card.dataset.productCategory = product.category ?? '';

    const title = card.querySelector('[data-title-value], h1, h2, h3, .product-title');
    if (title && product.title != null) title.textContent = product.title;

    const desc = card.querySelector('[data-description], .product-description, p:not(.models)');
    if (desc && product.description != null) desc.textContent = product.description;

    const price = card.querySelector('[data-price], .price');
    if (price) price.textContent = formatPrice(product.price);

    const hasVariantSelector = !!card.querySelector('.color-picker, .product-options');
    const stock = card.querySelector('[data-stock], .stock');
    if (stock && !hasVariantSelector) {
      const available = product.stock === true || product.stock === 1 || String(product.stock).toLowerCase() === 'true';
      stock.textContent = available ? '● В наявності' : '● Немає в наявності — передзамовлення';
      stock.classList.toggle('preorder', !available);
    }

    const img = card.querySelector('[data-image], .product-image img, .single-product-image img, img');
    if (img && product.image_url) {
      const src = imageUrl(product.image_url);
      if (src) {
        img.removeAttribute('onerror');
        img.onerror = null;
        img.src = src;
      }
      img.alt = product.title || img.alt || '';
    }

    const buy = card.querySelector('.buy-button');
    if (buy && !hasVariantSelector) {
      const available = product.stock === true || product.stock === 1 || String(product.stock).toLowerCase() === 'true';
      buy.textContent = available ? 'Купити' : 'Передзамовлення';
      buy.classList.toggle('preorder-button', !available);
    }
  }

  async function load() {
    const cards = [...document.querySelectorAll('.product-card, [data-product-card]')];
    if (!cards.length) return;

    // Remove the old inline image hiding handler everywhere on this page.
    document.querySelectorAll('img[onerror]').forEach(img => {
      img.removeAttribute('onerror');
      img.onerror = null;
    });

    try {
      const url = `${SUPABASE_URL}/rest/v1/products_new?select=id,title,model,category,description,price,stock,image_url,search_text&limit=1000`;
      const response = await fetch(url, {
        cache: 'no-store',
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
      const products = await response.json();
      window.MBP_PRODUCTS = products;

      cards.forEach(card => {
        const product = findProduct(products, card);
        apply(card, product);
      });
      console.log(`Supabase AUTO: ${products.length} товарів завантажено`);
    } catch (error) {
      console.error('Supabase AUTO loader:', error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load, { once: true });
  else load();
})();
