document.addEventListener("DOMContentLoaded", () => {

    const macbookModels = [

        /* =========================
           MACBOOK AIR
        ========================= */

        {
            id: "a3113",
            name: 'MacBook Air 13" A3113',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcsBbqay2XAue_9Cbr3Q-_2bfxI5opufLYPrqjIH-kA&s"
        },

        {
            id: "a3114",
            name: 'MacBook Air 15" A3114',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b_lWc8Ny86pcdDEKhf99qbH57HGDZUB4atDq0iA_BQ&s"
        },

        {
            id: "a2941",
            name: 'MacBook Air 15" A2941',
            category: "air",
            img: "https://compbest.com.ua/content/images/39/20004563568837_small11.jpg"
        },

        {
            id: "a2681",
            name: 'MacBook Air 13" A2681',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ywRJKLV0wZjrIAVLhGgRNeh5L0SwZtVreyAQfBtyTg&s"
        },

        {
            id: "a2337",
            name: 'MacBook Air 13" A2337',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvdJcA6DArxZ1AolyTEh0VT9VYDYY8AhBbtNo8eqv-7A&s=10"
        },

        {
            id: "a2179",
            name: 'MacBook Air 13" A2179 (2020)',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEFhJoXK7oWpJEzMTK77o8vFHtk2ZRPA8tPeBxD36GVQ&s"
        },

        {
            id: "a1932",
            name: 'MacBook Air 13" A1932 (2018-2019)',
            category: "air",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkP3L8FcthlnQKvjM8Po3x1XPmiTbr9rKVrZFt9nHVg&s=10"
        },


        /* =========================
           MACBOOK PRO
        ========================= */

        {
            id: "a2918",
            name: "MacBook Pro A2918/A2992 M3",
            category: "pro",
            img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQJsibFc_QKjkSls6vcujAzdaak2zMHwmmW4lsqtviAcM7KkMCLxAku7agPvLLDvFB9yV3qWs-X_4XUki6ez1031DRmnxLM02nUoCNu9W6tlNnSsGeyYznh3xdSkSsBBkqsz31as3W2tPE&usqp=CAc"
        },

        {
            id: "a2991",
            name: "MacBook Pro A2991",
            category: "pro",
            img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRFsycZ2i_Ba6HUEkmM8AVLMG9-P5romKjJXn5VAd8SQ7l9Y2brwPmnI6LsHmnLfKTPZ0B5y5jq85DPCJU0RR8aSQ6U-pEsZxeF1OMlg8lSRAap5kWwKOwi0Ws_Uzu1E0uW8_FmMGdRkqk&usqp=CAc"
        },

        {
            id: "a2780",
            name: "MacBook Pro A2780 M2",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdH-y8_lODvqYTXZpKEMt65aECq9cWV5wuO5KUJZ1_XkjLbmIbnTqyxU&s=10"
        },

        {
            id: "a2779",
            name: "MacBook Pro A2779 M2",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5Ltpfj1Fo9108oRQKS-XY-koGyZuLUZyuODq2fWc8g&s"
        },

        {
            id: "a2485",
            name: "MacBook Pro A2485",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUv6D24--vJpliczD6tGlSMsa2fWSZoBY0TTgQYZVMnw&s=10"
        },

        {
            id: "a2442",
            name: "MacBook Pro A2442",
            category: "pro",
            img: "https://click.ua/content/shop/products/64994/apple-a2442-macbook-pro-tb-14-2-retina-space-grey-mkgp3ua-a-800x800-9b7f-prod-500x500-b216.jpg"
        },

        {
            id: "a2338",
            name: "MacBook Pro A2338 M2",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhz1JBaBUarFXWO2mfxi4c6mWCPE0Akmi_OnjcpqvdCA&s"
        },

        {
            id: "a2338m1",
            name: "MacBook Pro A2338 M1",
            category: "pro",
            img: "https://img.mta.ua/image/cache/data/foto/z307/307085/photos/Apple-A2338-MacBook-Pro-TB-133-Retina-Space-Grey-Z11B000Q8-Gray-02-600x600.jpg"
        },

        {
            id: "a2251",
            name: "MacBook Pro A2251",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFpKAzanjqUMisIc94oGznFV9yxU2yklzxyrq8H7caA&s=10"
        },

        {
            id: "a2289",
            name: "MacBook Pro A2289",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFpKAzanjqUMisIc94oGznFV9yxU2yklzxyrq8H7caA&s=10"
        },

        {
            id: "a2141",
            name: "MacBook Pro A2141",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDC_mDA_2EdLjfiP6erLTIGCl-aw1vWaY-IPdMPyM7Sw&s=10"
        },

        {
            id: "a2159",
            name: "MacBook Pro A2159",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEeVa3tv0IwRJti3dmjyvf7dyUbkaRi-NHjImlAZ1Wg&s=10"
        },

        {
            id: "a1990",
            name: "MacBook Pro A1990",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IL37ld7ErGYh0dA8XnrWDB8yPCryvU37iTE2REajyA&s=10"
        },

        {
            id: "a1989",
            name: "MacBook Pro A1989",
            category: "pro",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRxqepDidmrXgIQRIcTRLFA-So_PFrm39ico8RrUKWog&s=10"
        },

    ];


    /* =========================
       ПОСЛУГИ
    ========================= */

    const macbookServices = [
        {
            name: "Діагностика в разі відмови від ремонту / акт технічного стану",
            price: 600
        },
        {
            name: "Відновлення MacOS",
            price: 1200
        },
        {
            name: "Чистка з заміною термопасти",
            price: 1500
        },
        {
            name: "Заміна акумулятора",
            price: "уточнюйте"
        },
        {
            name: "Заміна клавіатури",
            price: "уточнюйте"
        },
        {
            name: "Заміна трекпаду",
            price: "уточнюйте"
        },
        {
            name: "Заміна топкейсу",
            price: "уточнюйте"
        },
        {
            name: "Заміна дисплею",
            price: "уточнюйте"
        }
    ];


    const gridContainer = document.getElementById("fix-grid");
    const modal = document.getElementById("services-modal");
    const modalTitle = document.getElementById("modal-title");
    const servicesList = document.getElementById("services-list");
    const closeBtn = document.querySelector(".close-btn");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const searchInput = document.getElementById("model-search");

    let currentCategory = "all";


    /* =========================
       SERVICES
    ========================= */

    function renderServices() {

        servicesList.innerHTML = "";

        macbookServices.forEach(service => {

            const li = document.createElement("li");

            const price =
                typeof service.price === "number"
                    ? `${service.price} грн.`
                    : service.price;

            li.innerHTML = `
                <span class="service-name">
                    ${service.name}
                </span>

                <span class="price">
                    ${price}
                </span>
            `;

            servicesList.appendChild(li);
        });
    }


    /* =========================
       CARDS
    ========================= */

    function renderCards(models) {

        gridContainer.innerHTML = "";

        if (!models.length) {

            gridContainer.innerHTML = `
                <p class="no-results">
                    Модель не знайдено
                </p>
            `;

            return;
        }


        models.forEach(model => {

            const card = document.createElement("div");

            card.className = "fix-card";

            card.dataset.category = model.category;


            card.innerHTML = `

                <div class="fix-card-image">

                    <img
                        src="${model.img}"
                        alt="${model.name}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >

                </div>

                <span class="fix-card-title">
                    ${model.name}
                </span>

            `;


            card.addEventListener("click", () => {

                document
                    .querySelectorAll(".fix-card")
                    .forEach(c => c.classList.remove("active"));

                card.classList.add("active");


                modalTitle.innerText =
                    `ПОСЛУГИ ДЛЯ ${model.name.toUpperCase()}`;


                renderServices();

                modal.classList.remove("hidden");

            });


            gridContainer.appendChild(card);

        });

    }


    /* =========================
       FILTER
    ========================= */

    function filterModels() {

        const query =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";


        const filtered = macbookModels.filter(model => {

            const categoryMatch =
                currentCategory === "all" ||
                model.category === currentCategory;


            const searchMatch =
                model.name.toLowerCase().includes(query) ||
                model.id.toLowerCase().includes(query);


            return categoryMatch && searchMatch;

        });


        renderCards(filtered);

    }


    /* =========================
       TABS
    ========================= */

    tabBtns.forEach(button => {

        button.addEventListener("click", () => {

            tabBtns.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            filterModels();

        });

    });


    /* =========================
       SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterModels
        );

    }


    /* =========================
       CLOSE MODAL
    ========================= */

    closeBtn?.addEventListener("click", () => {

        modal.classList.add("hidden");

    });


    modal?.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.add("hidden");

        }

    });


    /* =========================
       START
    ========================= */

    renderCards(macbookModels);

});