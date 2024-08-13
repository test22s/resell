

document.addEventListener('DOMContentLoaded', () => {
    const addCardButton = document.getElementById('addCard');
    const cardsContainer = document.getElementById('cardsContainer');

    let cards = JSON.parse(localStorage.getItem('cards')) || [];

    function renderCards() {
        cardsContainer.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <h2 class="h2e" >#${index + 1}</h2>
               Product: <input type="text" placeholder="Produkt"  value="  ${card.product}">
               Retail-Price: <input type="text" placeholder="Retail Preis" value="   ${card.retailPrice}$">
              Resell-Price:  <input type="text" placeholder="Resell Preis" value="   ${card.resellPrice}$">
              Selling-Site:  <input type="text" placeholder="Verkaufsseite" value="   ${card.sellingSite}">
              Buying-Site:  <input type="text" placeholder="Kaufsseite" value="  ${card.buyingSite}">
                <div class="card-status">
                    <select class="status">
                        <option value="pending" ${card.status === 'pending' ? 'selected' : ''}>planned ✎ </option>
                        <option value="sold" ${card.status === 'sold' ? 'selected' : ''}>open ✉ </option>
                        <option value="not-sold" class="confirmed" ${card.status === 'not-sold' ? 'selected' : ''}>confirmed ✅ </option>
                    </select>
                    <span class="delete-card">🗑</span>
                </div>
                <button class="save-button">Speichern</button>
            `;
            
            cardsContainer.appendChild(cardElement);

            cardElement.querySelector('.delete-card').addEventListener('click', () => {
                cards.splice(index, 1);
                saveAndRenderCards();
            });

            cardElement.querySelector('.save-button').addEventListener('click', () => {
                cards[index].product = cardElement.querySelector('input[placeholder="Produkt"]').value;
                cards[index].retailPrice = cardElement.querySelector('input[placeholder="Retail Preis"]').value;
                cards[index].resellPrice = cardElement.querySelector('input[placeholder="Resell Preis"]').value;
                cards[index].sellingSite = cardElement.querySelector('input[placeholder="Verkaufsseite"]').value;
                cards[index].buyingSite = cardElement.querySelector('input[placeholder="Kaufsseite"]').value;
                cards[index].status = cardElement.querySelector('.status').value;
                saveAndRenderCards();
            });
        });
    }

    function saveAndRenderCards() {
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards();
    }

    addCardButton.addEventListener('click', () => {
        cards.push({
            product: '',
            retailPrice: '',
            resellPrice: '',
            sellingSite: '',
            buyingSite: '',
            status: 'pending'
        });
        saveAndRenderCards();
    });

    renderCards();


});
