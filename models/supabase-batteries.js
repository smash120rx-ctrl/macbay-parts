/* MACBAYPARTS — battery price sync for products_new
   Compatible with the current products_new schema:
   id, title, model, category, description, price, stock, image_url, search_text
*/
(function () {
  const SUPABASE_URL = 'https://ofkirctsgclaqdpdvjis.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ixT1HmrvcAyXdJJQ0pIYLg_Je15dQTV';

  function formatPrice(value) {
    if (value === null || value === undefined || String(value).trim() === '') return 'Ціну уточнюйте';
    const raw = String(value).trim();
    const n = Number(raw.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) && n > 0 ? `${n.toLocaleString('uk-UA')} грн` : raw;
  }

  async function loadBatteryPrice() {
    const fileName = window.location.pathname.split('/').pop();
    const match = fileName.match(/a\d+/i);
    if (!match) return;

    const model = match[0].toUpperCase();
    try {
      const url = `${SUPABASE_URL}/rest/v1/products_new?select=price,stock,title,model&category=eq.battery&model=eq.${encodeURIComponent(model)}&limit=1`;
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) throw new Error(`Supabase ${response.status}`);
      const rows = await response.json();
      const data = rows[0];
      if (!data) return;

      const price = formatPrice(data.price);
      document.querySelectorAll('input[name="battery_health"]').forEach(radio => {
        radio.dataset.price = price;
      });

      const priceDisplay = document.getElementById('item-price') || document.querySelector('.product-card .price');
      function updateSelectedPrice() {
        const checked = document.querySelector('input[name="battery_health"]:checked');
        if (checked && priceDisplay) priceDisplay.textContent = checked.dataset.price || price;
      }

      document.querySelectorAll('input[name="battery_health"]').forEach(radio => {
        radio.addEventListener('change', updateSelectedPrice);
      });
      updateSelectedPrice();

      const card = document.querySelector('.product-card');
      if (card) {
        card.dataset.productModel = data.model || model;
        card.dataset.productCategory = 'battery';
        card.dataset.productId = '';
        const stock = card.querySelector('.stock');
        const button = card.querySelector('button[onclick*="addBatteryToCartFromCard"]');
        if (data.stock === false) {
          if (stock) { stock.textContent = '● Немає в наявності — передзамовлення'; stock.classList.add('preorder'); }
          if (button) button.textContent = 'Передзамовлення';
        } else {
          if (stock) { stock.textContent = '● В наявності'; stock.classList.remove('preorder'); }
        }
      }
    } catch (error) {
      console.error('Battery Supabase sync:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadBatteryPrice);
})();
