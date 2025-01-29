document.addEventListener('DOMContentLoaded', () => {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'http://shift-intensive.ru/api/pizza/catalog';

    fetch(proxyUrl + encodeURIComponent(targetUrl))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.querySelector('.footer__container');
                data.catalog.forEach(pizza => {
                    const pizzaCard = document.createElement('div');
                    pizzaCard.classList.add('pizza-card');

                    // Обработка изображения: добавляем домен, если нужно
                    const pizzaImage = pizza.img ? `http://shift-intensive.ru/api${pizza.img}` : 'default-image.png';

                    pizzaCard.innerHTML = `
                        <img class="card-img" src="${pizzaImage}" alt="${pizza.name}">
                        <div class="card-title">${pizza.name}</div>
                        <div class="card-sub">${pizza.description}</div>
                        <div class="card-price">от ${pizza.sizes[0].price} ₽</div>
                        <button class="button">Выбрать</button>
                    `;

                    container.appendChild(pizzaCard);
                });
            } else {
                console.error('Ошибка при получении данных с сервера:', data.reason);
            }
        })
        .catch(error => console.error('Ошибка сети:', error));
});
