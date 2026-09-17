document.addEventListener("DOMContentLoaded", async function () {
    // 1. Автоматично визначаємо модель із назви файлу (наприклад, з "a1932-battery.html" беремо "a1932")
    const fileName = window.location.pathname.split("/").pop();
    const modelMatch = fileName.match(/a\d+/i);
    
    if (!modelMatch) return;
    const modelCode = modelMatch[0].toLowerCase(); // Наприклад: "a1932"

    // 2. Запит до Supabase (використовуємо ваш існуючий client Supabase)
    if (typeof supabase === 'undefined') return;

    const { data, error } = await supabase
        .from('products_new') // Вкажіть назву вашої таблиці в Supabase
        .select('price,stock,title,model').eq('category','battery')
        .ilike('model', `%${modelCode}%`)
        .single();

    if (error || !data) {
        console.log("Ціни для цієї моделі не знайдено в БД");
        return;
    }

    // 3. Знаходимо елементи на сторінці та оновлюємо значення
    const radio85 = document.querySelector('input[value="85-90%"]');
    const radio90 = document.querySelector('input[value="90-95%"]');
    const radio95 = document.querySelector('input[value="95-100%"]');
    const priceDisplay = document.getElementById('item-price') || document.querySelector('.price');

    if (radio85) radio85.setAttribute('data-price', data.price || 'Ціну уточнюйте');
    if (radio90) radio90.setAttribute('data-price', data.price || 'Ціну уточнюйте');
    if (radio95) radio95.setAttribute('data-price', data.price || 'Ціну уточнюйте');

    // Функція оновлення ціни при виборі
    function updateSelectedPrice() {
        const checked = document.querySelector('input[name="battery_health"]:checked');
        if (checked && priceDisplay) {
            priceDisplay.innerText = checked.getAttribute('data-price') || 'Ціну уточнюйте';
        }
    }

    // Вішаємо події кліку на кнопки ємності
    document.querySelectorAll('input[name="battery_health"]').forEach(radio => {
        radio.addEventListener('change', updateSelectedPrice);
    });

    // Оновлюємо ціну одразу при завантаженні
    updateSelectedPrice();
});