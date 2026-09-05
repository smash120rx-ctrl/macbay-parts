// Supabase price loader
const SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

function normalizeTitle(value) {
  return (value || '')
    .toLowerCase()
    .replace(/["'`«»]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadPrices() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=title,price`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) throw new Error(`Supabase: ${response.status} ${await response.text()}`);

    const products = await response.json();
    const prices = new Map(products.map(p => [normalizeTitle(p.title), p.price]));
    let updated = 0;

    document.querySelectorAll('.product-card').forEach(card => {
      const titleElement = card.querySelector('h1, h2, h3');
      const priceElement = card.querySelector('.price');
      if (!titleElement || !priceElement) return;

      const price = prices.get(normalizeTitle(titleElement.textContent));
      if (price !== undefined && price !== null) {
        priceElement.textContent = `${Number(price).toLocaleString('uk-UA')} грн`;
        updated++;
      }
    });

    console.log(`Supabase: оновлено цін: ${updated} із ${products.length} товарів у базі`);
  } catch (error) {
    console.error('Помилка завантаження цін із Supabase:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadPrices);
