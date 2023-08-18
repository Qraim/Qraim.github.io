const basicLands = [
  {
    name: "Swamp",
    image:
      "https://cards.scryfall.io/normal/front/e/e/ee68f2cb-851b-4196-ac58-844d72628e6a.jpg?1690543320",
  },
  {
    name: "Island",
    image:
      "https://cards.scryfall.io/normal/front/b/d/bd4b4da4-83f6-4280-880b-b6033308f2a2.jpg?1690543315",
  },
  {
    name: "Plains",
    image:
      "https://cards.scryfall.io/normal/front/c/9/c9cd4d57-8c51-4fcf-8a9f-5d6a61c33e3d.jpg?1690543317",
  },
  {
    name: "Mountain",
    image:
      "https://cards.scryfall.io/normal/front/8/8/8822db23-34dc-452a-92bc-a3ceee4db375.jpg?1690543322",
  },
  {
    name: "Forest",
    image:
      "https://cards.scryfall.io/normal/front/e/c/ecd6d8fb-780c-446c-a8bf-93386b22fe95.jpg?1690543325",
  },
];

let selectedCommander = null;
const deck = [];

async function searchCard() {
  const searchTerm = document.getElementById("searchTerm").value;
  const colorFilter = selectedCommander
    ? `&color=${selectedCommander.color_identity.join("")}`
    : "";
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${searchTerm}${colorFilter}`
  );
  const data = await response.json();
  populateCardList(data.data);
}

function populateCardList(cards) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  for (let card of cards) {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
            ${card.name} 
            <button onclick="addToDeck('${card.id}')">Ajouter au Deck</button>
            ${
              card.type_line.includes("Legendary Creature") ||
              card.type_line.includes("Planeswalker")
                ? `<button onclick="selectAsCommander('${card.id}')">Choisir comme Commander</button>`
                : ""
            }
            <img src="${
              card.image_uris.small
            }" class="card-hover-preview" alt="${card.name}">
        `;

    results.appendChild(listItem);
  }
}

function addBasicLands() {
  const swamps = parseInt(document.getElementById("swamps").value);
  const islands = parseInt(document.getElementById("islands").value);
  const plains = parseInt(document.getElementById("plains").value);
  const mountains = parseInt(document.getElementById("mountains").value);
  const forests = parseInt(document.getElementById("forests").value);

  if (!isNaN(swamps) && swamps > 0) {
    addBasicLand("Swamp", swamps);
  }
  if (!isNaN(islands) && islands > 0) {
    addBasicLand("Island", islands);
  }
  if (!isNaN(plains) && plains > 0) {
    addBasicLand("Plains", plains);
  }
  if (!isNaN(mountains) && mountains > 0) {
    addBasicLand("Mountain", mountains);
  }
  if (!isNaN(forests) && forests > 0) {
    addBasicLand("Forest", forests);
  }

  displayDeck();
}

function addBasicLand(landType, quantity) {
  const landCard = basicLands.find((land) => land.name === landType);

  if (landCard) {
    landCard.quantity = quantity;
  } else {
    console.error("Terrain de base non trouvé.");
  }
}

function selectAsCommander(cardId) {
  let card = deck.find((c) => c.id === cardId);

  // Si la carte n'est pas encore dans le deck, l'ajouter d'abord
  if (!card) {
    fetch(`https://api.scryfall.com/cards/${cardId}`)
      .then((response) => response.json())
      .then((cardData) => {
        deck.push(cardData);
        displayDeck();
        setCommander(cardData);
      });
  } else {
    setCommander(card);
  }
}

function setCommander(card) {
  selectedCommander = card;
  const commanderDiv = document.getElementById("selectedCommander");
  commanderDiv.innerHTML = `
            <h2>Commander:</h2>
            <img src="${card.image_uris.normal}" alt="${card.name}">
            <p>${card.name}</p>
        `;
}

function isCardColorValid(card) {
  if (!selectedCommander) return true; // Si aucun commandant n'est sélectionné, n'importe quelle carte est valide.

  if (card.color_identity.length == 0) {
    return true;
  }

  for (const color of card.color_identity) {
    if (selectedCommander.color_identity.includes(color)) {
      return true; // Si au moins une couleur de la carte correspond à une couleur du commandant.
    }
  }
  return false; // Aucune couleur ne correspond.
}

function addToDeck(cardId) {
  if (deck.some((card) => card.id === cardId)) return;

  fetch(`https://api.scryfall.com/cards/${cardId}`)
    .then((response) => response.json())
    .then((cardData) => {
      if (!isCardColorValid(cardData)) {
        console.log(cardData);
        alert("La carte ne correspond pas aux couleurs du commandant.");
        return;
      }

      if (
        !selectedCommander &&
        (cardData.type_line.includes("Legendary Creature") ||
          cardData.type_line.includes("Planeswalker"))
      ) {
        selectAsCommander(cardId);
      }

      deck.push(cardData);
      displayDeck();
    });
}

function displayDeck() {
  const deckList = document.getElementById("deckList");
  deckList.innerHTML = "";

  let columnIndex = 0;
  let rowIndex = 0;

  for (let card of deck) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("deck-card");

    cardDiv.style.gridColumn = columnIndex + 1;
    cardDiv.style.gridRow = rowIndex + 1;

    cardDiv.innerHTML = `
            <img src="${card.image_uris.normal}" alt="${card.name}">
            <p>${card.name}${card.quantity > 1 ? " x" + card.quantity : ""}</p>
        `;

    deckList.appendChild(cardDiv);

    columnIndex++;
    if (columnIndex >= 10) {
      columnIndex = 0;
      rowIndex++;
    }
  }

  // Afficher les terrains de base dans la dernière ligne
  // Afficher les terrains de base dans la dernière ligne
  for (let land of basicLands) {
    if (land.quantity > 0) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("deck-card");

      cardDiv.style.gridColumn = columnIndex + 1;
      cardDiv.style.gridRow = rowIndex + 1;

      cardDiv.innerHTML = `
                <img src="${land.image}" alt="${land.name}" onclick="addLand('${
        land.name
      }')" oncontextmenu="removeLand('${land.name}'); return false;">
                <p>${land.name}${
        land.quantity > 1 ? " x" + land.quantity : ""
      }</p>
            `;

      deckList.appendChild(cardDiv);

      columnIndex++;
      if (columnIndex >= 10) {
        columnIndex = 0;
        rowIndex++;
      }
    }
  }
}

function removeLand(landName) {
  const land = basicLands.find((land) => land.name === landName);
  if (land && land.quantity > 0) {
    land.quantity--;
    displayDeck();
  }
}

function addLand(landName) {
  const land = basicLands.find((land) => land.name === landName);
  if (land) {
    land.quantity++;
    displayDeck();
  }
}
