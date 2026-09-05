/* =========================================================
   MACBAYPARTS CHECKOUT
   EMAILJS
   ========================================================= */


/* =========================================================
   EMAILJS CONFIG
   ========================================================= */

const EMAILJS_PUBLIC_KEY =
    "OlxFyi8xILVI7jL2O";

const EMAILJS_SERVICE_ID =
    "service_l8o3wgg";

const EMAILJS_ADMIN_TEMPLATE =
    "template_h9dzd7s";

const EMAILJS_CLIENT_TEMPLATE =
    "template_s66coaa";


/* =========================================================
   INITIALIZE EMAILJS
   ========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init(
        EMAILJS_PUBLIC_KEY
    );

} else {

    console.error(
        "EmailJS не завантажився."
    );

}


/* =========================================================
   CART
   ========================================================= */

function getCart() {

    try {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    "userCart"
                )
            );

        return Array.isArray(cart)
            ? cart
            : [];

    } catch (error) {

        console.error(
            "Помилка читання кошика:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "userCart",
        JSON.stringify(cart)
    );

    updateCartCounter();

}


/* =========================================================
   UPDATE CART COUNTER
   ========================================================= */

function updateCartCounter() {

    const cart =
        getCart();

    const counter =
        document.getElementById(
            "cart-counter"
        );

    if (!counter) {
        return;
    }

    const totalItems =
        cart.reduce(
            function (sum, item) {

                return sum +
                    Number(
                        item.quantity || 1
                    );

            },
            0
        );

    counter.textContent =
        totalItems;

}


/* =========================================================
   PRICE PARSER
   ========================================================= */

function getPriceNumber(price) {

    if (!price) {
        return 0;
    }

    const cleaned =
        String(price)
            .replace(/\s/g, "")
            .replace(",", ".")
            .replace(/[^\d.]/g, "");

    const number =
        parseFloat(cleaned);

    return isNaN(number)
        ? 0
        : number;

}


/* =========================================================
   CALCULATE TOTAL
   ========================================================= */

function calculateTotal(cart) {

    return cart.reduce(
        function (total, item) {

            const price =
                getPriceNumber(
                    item.price
                );

            const quantity =
                Number(
                    item.quantity || 1
                );

            return total +
                price * quantity;

        },
        0
    );

}


/* =========================================================
   FORMAT MONEY
   ========================================================= */

function formatMoney(number) {

    return new Intl.NumberFormat(
        "uk-UA"
    ).format(number) + " грн";

}


/* =========================================================
   REMOVE ITEM
   ========================================================= */

function removeFromCart(name) {

    let cart =
        getCart();

    cart =
        cart.filter(
            function (item) {

                return item.name !== name;

            }
        );

    saveCart(cart);

    renderCheckoutPage();

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function updateQuantity(
    name,
    delta
) {

    let cart =
        getCart();

    const item =
        cart.find(
            function (item) {

                return item.name === name;

            }
        );

    if (!item) {
        return;
    }

    item.quantity =
        Number(
            item.quantity || 1
        ) + delta;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (item) {

                    return item.name !== name;

                }
            );

    }


    saveCart(cart);

    renderCheckoutPage();

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function clearCart() {

    localStorage.removeItem(
        "userCart"
    );

    updateCartCounter();

}


/* =========================================================
   CREATE EMAIL ITEMS
   ========================================================= */

function createItemsText(cart) {

    if (
        !cart ||
        cart.length === 0
    ) {

        return "Кошик порожній";

    }


    let text = "";


    cart.forEach(
        function (item, index) {

            const name =
                item.name ||
                "Товар";

            const quantity =
                Number(
                    item.quantity || 1
                );

            const price =
                getPriceNumber(
                    item.price
                );


            text +=
                `${index + 1}. ${name}\n`;

            text +=
                `Кількість: ${quantity} шт.\n`;


            if (price > 0) {

                text +=
                    `Ціна за 1 шт.: ${formatMoney(price)}\n`;

                text +=
                    `Сума: ${formatMoney(price * quantity)}\n`;

            } else {

                text +=
                    `Ціна: уточнюється\n`;

            }


            text +=
                `\n`;

        }
    );


    return text;

}


/* =========================================================
   RENDER CHECKOUT
   ========================================================= */

function renderCheckoutPage() {

    const list =
        document.getElementById(
            "checkoutItemsList"
        );

    const totalElement =
        document.getElementById(
            "totalPrice"
        );


    if (!list) {
        return;
    }


    const cart =
        getCart();


    list.innerHTML = "";


    if (
        cart.length === 0
    ) {

        list.innerHTML = `

            <div class="empty-cart-msg">

                Ваш кошик порожній

            </div>

        `;


        if (totalElement) {

            totalElement.textContent =
                "0 грн";

        }

        return;

    }


    cart.forEach(
        function (item) {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "checkout-item-row";


            const name =
                item.name ||
                "Товар";


            const quantity =
                Number(
                    item.quantity || 1
                );


            const price =
                item.price ||
                "Ціну уточнюйте";


            let imageHTML = "";


            if (item.image) {

                imageHTML = `

                    <img

                        class="checkout-item-image"

                        src="${item.image}"

                        alt="${escapeHTML(name)}"

                        onerror="
                            this.style.display='none';
                        "

                    >

                `;

            }


            row.innerHTML = `

                <div class="checkout-item-info">

                    ${imageHTML}

                    <div class="checkout-item-details">

                        <span
                            class="checkout-item-name"
                        >
                            ${escapeHTML(name)}
                        </span>

                        <span
                            class="checkout-item-price"
                        >
                            ${escapeHTML(price)}
                        </span>

                    </div>

                </div>


                <div class="checkout-item-controls">

                    <button
                        type="button"
                        class="qty-btn"
                        data-action="minus"
                    >
                        −
                    </button>


                    <span
                        class="checkout-item-qty"
                    >
                        ${quantity} шт.
                    </span>


                    <button
                        type="button"
                        class="qty-btn"
                        data-action="plus"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-btn"
                        title="Видалити"
                        data-action="remove"
                    >
                        ×
                    </button>

                </div>

            `;


            const buttons =
                row.querySelectorAll(
                    "button"
                );


            buttons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const action =
                                button.dataset.action;


                            if (
                                action ===
                                "minus"
                            ) {

                                updateQuantity(
                                    name,
                                    -1
                                );

                            }


                            if (
                                action ===
                                "plus"
                            ) {

                                updateQuantity(
                                    name,
                                    1
                                );

                            }


                            if (
                                action ===
                                "remove"
                            ) {

                                removeFromCart(
                                    name
                                );

                            }

                        }
                    );

                }
            );


            list.appendChild(row);

        }
    );


    const total =
        calculateTotal(cart);


    if (totalElement) {

        if (total > 0) {

            totalElement.textContent =
                formatMoney(total);

        } else {

            totalElement.textContent =
                "Ціну уточнюйте";

        }

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   GET FORM VALUE
   ========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   SEND TWO EMAILS
   ========================================================= */

async function sendOrderEmails(
    templateParams
) {

    if (
        typeof emailjs ===
        "undefined"
    ) {

        throw new Error(
            "EmailJS не завантажився."
        );

    }


    /*
       ПЕРШИЙ ЛИСТ:
       ТОБІ
    */

    const adminEmail =
        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_ADMIN_TEMPLATE,
            templateParams
        );


    /*
       ДРУГИЙ ЛИСТ:
       КЛІЄНТУ
    */

    const clientEmail =
        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_CLIENT_TEMPLATE,
            templateParams
        );


    /*
       ЧЕКАЄМО ОБИДВА ЛИСТИ
    */

    const results =
        await Promise.all([
            adminEmail,
            clientEmail
        ]);


    return results;

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        updateCartCounter();

        renderCheckoutPage();


        const form =
            document.getElementById(
                "orderForm"
            );


        const submitButton =
            document.getElementById(
                "submitBtn"
            );


        const status =
            document.getElementById(
                "formStatus"
            );


        const phoneInput =
            document.getElementById(
                "phone"
            );


        /*
           PHONE
        */

        if (phoneInput) {

            phoneInput.addEventListener(
                "focus",
                function () {

                    if (
                        phoneInput.value === ""
                    ) {

                        phoneInput.value =
                            "+380";

                    }

                }
            );

        }


        /*
           FORM
        */

        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /*
                   ОЧИЩАЄМО СТАТУС
                */

                if (status) {

                    status.textContent =
                        "";

                    status.style.color =
                        "";

                }


                /*
                   ОТРИМУЄМО КОШИК
                */

                const cart =
                    getCart();


                if (
                    cart.length === 0
                ) {

                    if (status) {

                        status.style.color =
                            "#e53e3e";

                        status.textContent =
                            "Кошик порожній.";

                    }

                    return;

                }


                /*
                   ОТРИМУЄМО ДАНІ
                */

                const userName =
                    getValue(
                        "name"
                    );

                const userEmail =
                    getValue(
                        "email"
                    );

                const userPhone =
                    getValue(
                        "phone"
                    );

                const deliveryMethod =
                    getValue(
                        "delivery"
                    );

                const deliveryAddress =
                    getValue(
                        "address"
                    );

                const paymentMethod =
                    getValue(
                        "payment"
                    );

                const userComment =
                    getValue(
                        "comment"
                    ) ||
                    "Немає";


                /*
                   ПЕРЕВІРКА EMAIL
                */

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailRegex.test(
                        userEmail
                    )
                ) {

                    if (status) {

                        status.style.color =
                            "#e53e3e";

                        status.textContent =
                            "Введіть правильний Email.";

                    }

                    document
                        .getElementById(
                            "email"
                        )
                        ?.focus();

                    return;

                }


                /*
                   ТОВАРИ
                */

                const orderItems =
                    createItemsText(
                        cart
                    );


                /*
                   ЗАГАЛЬНА СУМА
                */

                const total =
                    calculateTotal(
                        cart
                    );


                const totalPrice =
                    total > 0
                        ? formatMoney(total)
                        : "Уточнюйте у менеджера";


                /*
                   ВСІ ПАРАМЕТРИ
                   
                   ВАЖЛИВО:
                   Назви повинні
                   співпадати з
                   {{...}} у EmailJS
                */

                const templateParams = {

                    user_name:
                        userName,

                    user_email:
                        userEmail,

                    user_phone:
                        userPhone,

                    delivery_method:
                        deliveryMethod,

                    delivery_address:
                        deliveryAddress,

                    payment_method:
                        paymentMethod,

                    order_items:
                        orderItems,

                    total_price:
                        totalPrice,

                    user_comment:
                        userComment

                };


                /*
                   BUTTON
                */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Надсилання замовлення...";

                }


                if (status) {

                    status.style.color =
                        "#3182ce";

                    status.textContent =
                        "Надсилаємо замовлення...";

                }


                try {


                    /*
                       ВІДПРАВЛЯЄМО
                       ДВА ЛИСТИ
                    */

                    await sendOrderEmails(
                        templateParams
                    );


                    /*
                       УСПІХ
                    */

                    if (status) {

                        status.style.color =
                            "#38a169";

                        status.textContent =
                            "✓ Замовлення успішно оформлено! Підтвердження надіслано на вашу пошту.";

                    }


                    /*
                       ОЧИЩАЄМО КОШИК
                    */

                    clearCart();

                    renderCheckoutPage();


                    /*
                       ОЧИЩАЄМО ФОРМУ
                    */

                    form.reset();


                    /*
                       PHONE
                    */

                    if (phoneInput) {

                        phoneInput.value =
                            "";

                    }


                } catch (error) {


                    /*
                       ПОМИЛКА
                    */

                    console.error(
                        "EmailJS ERROR:",
                        error
                    );


                    if (status) {

                        status.style.color =
                            "#e53e3e";

                        status.innerHTML =

                            "✕ Не вдалося відправити замовлення.<br>" +

                            "Перевірте налаштування EmailJS.";

                    }

                } finally {


                    /*
                       BUTTON
                    */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Підтвердити замовлення";

                    }

                }

            }
        );

    }
);