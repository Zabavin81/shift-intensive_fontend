document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.footer__container');
    const popup = document.querySelector('.pop_up');
    const popupImg = document.querySelector('.popup-img');
    const popupTitle = document.querySelector('.popup-title');
    const popupDesc = document.querySelector('.popup-desc');
    const popupToppings = document.querySelector('.toppings');
    const popupSizeButtons = document.querySelectorAll('.size-btn');

    fetch('https://api.allorigins.win/raw?url=http://shift-intensive.ru/api/pizza/catalog')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.catalog.forEach(pizza => {
                    const pizzaCard = document.createElement('div');
                    pizzaCard.classList.add('pizza-card');

                    const pizzaImage = pizza.img ? `http://shift-intensive.ru/api${pizza.img}` : 'default-image.png';

                    pizzaCard.innerHTML = `
                        <img class="card-img" src="${pizzaImage}" alt="${pizza.name}">
                        <div class="card-title">${pizza.name}</div>
                        <div class="card-sub">${pizza.description}</div>
                        <div class="card-price">от ${pizza.sizes[0].price} ₽</div>
                        <button class="button" data-name="${pizza.name}" data-img="${pizzaImage}" data-desc="${pizza.description}" data-toppings='${JSON.stringify(pizza.toppings)}'>Выбрать</button>
                    `;

                    container.appendChild(pizzaCard);
                });
            } else {
                console.error('Ошибка:', data.reason);
            }
        })
        .catch(error => console.error('Ошибка сети:', error));

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('button')) {
            const name = event.target.getAttribute('data-name');
            const img = event.target.getAttribute('data-img');
            const desc = event.target.getAttribute('data-desc');
            const toppings = JSON.parse(event.target.getAttribute('data-toppings'));

            popupImg.src = img;
            popupTitle.textContent = name;
            popupDesc.textContent = desc;

            popupToppings.innerHTML = toppings.map(topping => `
                <div class="topping">
                    <img src="http://shift-intensive.ru/api${topping.img}" alt="${topping.name}">
                    <p>${topping.name}</p>
                    <strong>${topping.cost} ₽</strong>
                </div>
            `).join('');

            popup.classList.add('active');
        }
    });

    document.querySelector('.close').addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('active');
        }
    });

    popupSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            popupSizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
