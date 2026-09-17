document.addEventListener("DOMContentLoaded", function () {
  // Перевіряємо, чи це сторінка акумулятора (за URL або назвою)
  const isBatteryPage = window.location.href.includes("battery") || document.title.toLowerCase().includes("акумулятор");

  if (isBatteryPage) {
    // Шукаємо блок із ціною на сторінці
    const priceElement = document.querySelector(".price, .product-price, [class*='price']");

    if (priceElement) {
      // Створюємо контейнер для кнопок вибору ємності
      const selectorContainer = document.createElement("div");
      selectorContainer.className = "battery-capacity-selector";
      selectorContainer.style.cssText = "margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 8px;";

      selectorContainer.innerHTML = `
        <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #333;">Оберіть ємність акумулятора:</label>
        <div style="display: flex; gap: 10px;">
          <label style="cursor: pointer; padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
            <input type="radio" name="battery_health" value="85-90%" checked> 85-90%
          </label>
          <label style="cursor: pointer; padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
            <input type="radio" name="battery_health" value="90-95%"> 90-95%
          </label>
          <label style="cursor: pointer; padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #fff;">
            <input type="radio" name="battery_health" value="95-100%"> 95-100%
          </label>
        </div>
      `;

      // Вставляємо блок перед ціною
      priceElement.parentNode.insertBefore(selectorContainer, priceElement);
    }
  }
});