let cardsData = [];

function fetchCardsBySet() {
    const setNameOrCode = document.getElementById("setCode").value;
    const matchingOption = document.querySelector(`#setNames option[value='${setNameOrCode}']`);
    const setCode = matchingOption ? matchingOption.dataset.setCode : setNameOrCode;

    if (setCode) {
        searchCardsBySet(setCode);
    }
}


async function searchCardsBySet(setCode) {
    console.log(setCode);
    try {
        cardsData = []; // Réinitialiser les données des cartes

        let hasMore = true;
        let url = `https://api.scryfall.com/cards/search?order=color&q=set:${setCode}`;

        while (hasMore) {
            const response = await fetch(url);
            if (response.status !== 200) {
                console.log("Error fetching cards:", await response.json());
                return; // Quitte la fonction si le statut n'est pas 200
            }
            const data = await response.json();
            

            const filteredData = data.data.filter(card => card.rarity !== 'special' && card.rarity !== 'bonus' && card.arena_id);
            cardsData = cardsData.concat(filteredData);

            if (!data.has_more) {
                hasMore = false;
            } else {
                url = data.next_page;
            }
        }

        console.log(cardsData);

        populateCards(cardsData);
    } catch (error) {
        console.error("Error fetching cards:", error);
    }
}

function populateCards(cards) {
    const sortedCards = {
        white: [],
        black: [],
        blue: [],
        red: [],
        green: [],
        multicolor: [], // catégorie pour les cartes multicolores
        land: [],
        artifact: []
    };

    for (let card of cards) {
        let colorIdentity;

        // Check for double-faced cards and use the first face's details.
        if (card.card_faces && card.card_faces.length > 1 && card.card_faces[0].colors ) {
            colorIdentity = card.card_faces[0].colors;
            console.log("là")
        } else {
            console.log("ici")

            colorIdentity = card.colors;
        }

        if (colorIdentity.length > 1) {
            sortedCards.multicolor.push(card);
            continue; 
        }

        if (colorIdentity.includes("W")) sortedCards.white.push(card);
        else if (colorIdentity.includes("B")) sortedCards.black.push(card);
        else if (colorIdentity.includes("U")) sortedCards.blue.push(card);
        else if (colorIdentity.includes("R")) sortedCards.red.push(card);
        else if (colorIdentity.includes("G")) sortedCards.green.push(card);
        else if (card.type_line.includes("Land")) sortedCards.land.push(card);
        else if (card.type_line.includes("Artifact")) sortedCards.artifact.push(card);
    }

    const rarityOrder = ['uncommon', 'uncommon', 'rare', 'mythic'];
    for (let color in sortedCards) {
        const container = document.getElementById(`${color}-cards`);
        container.innerHTML ="";
        sortedCards[color].sort((a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity)); // Tri par rareté

        for (let card of sortedCards[color]) {
            let imageUrl; 
            if (card.card_faces && card.card_faces.length > 1 && card.card_faces[0].image_uris) {
                imageUrl = card.card_faces[0].image_uris.normal;
            } else {
                imageUrl = card.image_uris.normal;
            }
            
            const listItem = document.createElement("div");
            listItem.innerHTML = `
                <img src="${imageUrl}" alt="${card.name}" title='${card.oracle_text ? card.oracle_text : ""}'>
            `;
            container.appendChild(listItem);
        }
    }
}


async function fetchSetNames() {
    try {
        const response = await fetch("https://api.scryfall.com/sets");
        const data = await response.json();
        const sets = data.data;

        const setNamesList = document.getElementById("setNames");
        sets.forEach(set => {
            const option = document.createElement("option");
            option.value = set.name;
            option.dataset.setCode = set.code; // stocker le code de l'extension pour une utilisation ultérieure
            setNamesList.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des noms des extensions:", error);
    }
}

window.onload = () => {
    fetchSetNames();
};