/* MACBAYPARTS — LIVE SUPABASE SYNC
   Reads products_new and updates the visible product card.
   Stable match: URL model + category first, title only as fallback.
*/
const SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

function mbpNormalize(value) {
  return String(value ?? '').toLowerCase()
    .replace(/["'`«»]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function mbpPageInfo() {
  const path = window.location.pathname.toLowerCase();
  const modelMatch = path.match(/a(\d{3,4})/i);
  const model = modelMatch ? `A${modelMatch[1]}` : '';

  const categories = [
    'antennas','battery','cables','cooler','display',
    'io-board','motherboard','speakers','topcase','trackpad',
    'keyboard','accessories','daughterboard'
  ];
  const category = categories.find(c => path.includes(`-${c}.html`)) || '';
  return { model, category };
}

function mbpImageUrl(value) {
  const url = String(value ?? '').trim();
  if (!url) return '';
  if (/^(https?:|data:|blob:|\/)/i.test(url)) return url;
  return window.location.pathname.includes('/models/') ? `../${url}` : url;
}

function mbpFormatPrice(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return 'Ціну уточнюйте';
  }
  const raw = String(value).trim();
  const number = Number(raw.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
  if (Number.isFinite(number) && raw !== '') {
    return `${number.toLocaleString('uk-UA')} грн`;
  }
  return raw;
}

function mbpGetProductForCard(products, card) {
  const page = mbpPageInfo();
  const dataModel = card.dataset.productModel || '';
  const dataCategory = card.dataset.productCategory || '';
  const model = dataModel || page.model;
  const category = dataCategory || page.category;

  if (model && category) {
    const exact = products.find(p =>
      mbpNormalize(p.model) === mbpNormalize(model) &&
      mbpNormalize(p.category) === mbpNormalize(category)
    );
    if (exact) return exact;
  }

  if (model) {
    const byModel = products.find(p =>
      mbpNormalize(p.model) === mbpNormalize(model)
    );
    if (byModel && (!category || mbpNormalize(byModel.category) === mbpNormalize(category))) return byModel;
  }

  const title = card.querySelector('h1,h2,h3,.product-title')?.textContent || '';
  if (title) {
    const normalized = mbpNormalize(title);
    const exactTitle = products.find(p => mbpNormalize(p.title) === normalized);
    if (exactTitle) return exactTitle;

    // Fallback for old cards: model code + recognizable category text.
    const categoryByText = products.find(p => {
      const sameModel = !model || mbpNormalize(p.model) === mbpNormalize(model);
      const sameTitlePart = normalized.includes(mbpNormalize(p.category));
      return sameModel && sameTitlePart;
    });
    if (categoryByText) return categoryByText;
  }
  return null;
}

function mbpApplyProduct(card, product) {
  if (!product) return;

  card.dataset.productId = product.id ?? '';
  card.dataset.productModel = product.model ?? '';
  card.dataset.productCategory = product.category ?? '';
  card.dataset.basePrice = product.price ?? '';

  const title = card.querySelector('h1,h2,h3,.product-title');
  if (title && product.title != null) title.textContent = product.title;

  const description = card.querySelector('.product-description, p:not(.models)');
  if (description && product.description != null) description.textContent = product.description;

  const price = card.querySelector('.price');
  if (price) price.textContent = mbpFormatPrice(product.price);

  const stock = card.querySelector('.stock');
  if (stock) {
    if (product.stock === false) {
      stock.textContent = '● Немає в наявності — передзамовлення';
      stock.classList.add('preorder');
    } else {
      stock.textContent = '● В наявності';
      stock.classList.remove('preorder');
    }
  }

  const image = card.querySelector('.product-image img, .single-product-image img');
  if (image && product.image_url) {
    const src = mbpImageUrl(product.image_url);
    if (src) {
      image.src = src;
      image.onerror = null;
    }
    image.alt = product.title || image.alt || '';
  }

  const buy = card.querySelector('.buy-button');
  if (buy) {
    buy.textContent = product.stock === false ? 'Передзамовлення' : 'Купити';
    buy.classList.toggle('preorder-button', product.stock === false);
  }
}

async function mbpFetchProducts() {
  const url = `${SUPABASE_URL}/rest/v1/products_new?select=id,title,model,category,description,price,stock,image_url,battery_variants,color_variants&limit=1000&_=${Date.now()}`;
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase ${response.status}: ${body}`);
  }
  return response.json();
}

// One shared request for the whole page.
window.MBP_PRODUCTS_PROMISE = mbpFetchProducts();

async function loadPrices() {
  try {
    const products = await window.MBP_PRODUCTS_PROMISE;
    window.MBP_PRODUCTS = products;

    document.querySelectorAll('.product-card').forEach(card => {
      const product = mbpGetProductForCard(products, card);
      mbpApplyProduct(card, product);
    });

    console.log(`Supabase LIVE: ${products.length} товарів завантажено`);
  } catch (error) {
    console.error('Supabase LIVE sync:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadPrices);

// When the page becomes visible again, refresh from Supabase.
window.addEventListener('pageshow', () => {
  if (document.readyState !== 'loading') {
    window.MBP_PRODUCTS_PROMISE = mbpFetchProducts();
    loadPrices();
  }
});
