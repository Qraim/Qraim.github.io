const basicLandTypes = ["Swamp", "Island", "Plains", "Mountain", "Forest"];
const basicLands = [];

async function fetchBasicLands() {
  for (let landType of basicLandTypes) {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=${landType}+type:basic+set:m21` // J'utilise le set m21 comme exemple
    );
    const data = await response.json();
    if (data.data && data.data.length) {
      basicLands.push(data.data[0]); // On ajoute la première carte trouvée (ce qui devrait être le terrain de base)
    }
  }
  // Utilisez basicLands comme vous le souhaitez
  console.log(basicLands);
}

fetchBasicLands();


let selectedCommander = null;
deck = [];

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
      listItem.classList.add("card-preview");

      const cardDetails = document.createElement("div");
      cardDetails.classList.add("card-details");

      listItem.innerHTML = `
          <img src="${card.image_uris.small}" alt="${card.name}" title='${card.oracle_text}'>
          <div class="card-details">
              ${card.name}
              <button onclick="addToDeck('${card.id}')">Ajouter au Deck</button>
              ${card.type_line.includes("Legendary Creature") || card.type_line.includes("Planeswalker")
                  ? `<button onclick="selectAsCommander('${card.id}')">Choisir comme Commander</button>`
                  : ""}
          </div>
      `;

      results.appendChild(listItem);
  }

  // Ouvrir la modal après avoir rempli les résultats
  openModal();
}



function closeModal() {
  document.getElementById("searchModal").style.display = "none";
}


function addBasicLandsCommander(card) {
  const value = 1;

  if (card.color_identity.includes("W")) {
    addBasicLand("Plains", 1);
  }

  if (card.color_identity.includes("U")) {
    addBasicLand("Island", 1);
  }
  if (card.color_identity.includes("R")) {
    addBasicLand("Mountain", 1);
  }
  if (card.color_identity.includes("B")) {
    addBasicLand("Swamp", 1);
  }
  if (card.color_identity.includes("G")) {
    addBasicLand("Forest", 1);
  }

  displayDeck();
}

function addBasicLand(landType, quantity) {
  const landCard = basicLands.find((land) => land.name === landType);

  if (landCard) {
    for (let i = 0; i < quantity; i++) {
      const landToAdd = { ...landCard, id: landCard.name + Math.random() };  // Ajout d'un id aléatoire pour différencier les multiples instances du même terrain
      deck.push(landToAdd);
    }
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

  addBasicLandsCommander(card);

  const commanderDiv = document.getElementById("selectedCommander");
  commanderDiv.innerHTML = `
            <h2>Commander:</h2>
            <img src="${card.image_uris.normal}" alt="${card.name}">
        `;
}

function isCardColorValid(card) {
  if (!selectedCommander) return true; // Si aucun commandant n'est sélectionné, n'importe quelle carte est valide.

  if (card.color_identity.length == 0) {
    return true;
  }

  for (const color of card.color_identity) {
    if (!selectedCommander.color_identity.includes(color)) {
      return false;
    }
  }
  return true; // Aucune couleur ne correspond.
}

function addToDeck(cardId) {
  if (deck.some((card) => card.id === cardId)) return;

  fetch(`https://api.scryfall.com/cards/${cardId}`)
    .then((response) => response.json())
    .then((cardData) => {
      if (!isCardColorValid(cardData)) {
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

  const basicLandOrder = ["Plaine", "Île", "Marais", "Montagne", "Forêt"];

  // Séparez les cartes en terrains et non-terrains
  let lands = deck.filter(card => basicLandTypes.includes(card.name));
  let nonLands = deck.filter(card => !basicLandTypes.includes(card.name));
  
  // Triez les non-terrains par nom
  nonLands.sort((a, b) => a.name.localeCompare(b.name));
  
  // Triez les terrains par l'ordre prédéfini
  lands.sort((a, b) => basicLandOrder.indexOf(a.name) - basicLandOrder.indexOf(b.name));
  
  // Fusionnez les deux listes
  deck = [...nonLands, ...lands];
  



  const deckList = document.getElementById("deckList");
  deckList.innerHTML = "";

  const cardCounts = {};
  for (let card of deck) {
      cardCounts[card.name] = (cardCounts[card.name] || 0) + 1;
  }



  let columnIndex = 0;
  let rowIndex = 0;

  for (let cardName in cardCounts) {
      const card = deck.find(c => c.name === cardName);

      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("id", "card-" + card.id + "-" + (columnIndex + rowIndex * 7)); // Unique ID

      cardDiv.setAttribute("draggable", "true");
      cardDiv.setAttribute("ondragstart", "drag(event)");
      cardDiv.setAttribute("ondrop", "drop(event)");
      cardDiv.setAttribute("ondragover", "allowDrop(event)");
      cardDiv.setAttribute("ondragleave", "dragLeave(event)"); // Added dragLeave

      cardDiv.classList.add("deck-card");

      cardDiv.style.gridColumn = columnIndex + 1;
      cardDiv.style.gridRow = rowIndex + 1;

      cardDiv.innerHTML = `
          <img src="${card.image_uris.normal}" alt="${card.name}">
          <p>${card.name} x${cardCounts[card.name]}</p>
      `;

      const cardImg = cardDiv.querySelector("img");
      if (basicLandTypes.includes(card.name)) {
          cardImg.addEventListener('click', function(event) {
              if (event.button === 0) {
                  addLand(card.name);
              }
          });

          cardImg.addEventListener('contextmenu', function(event) {
              event.preventDefault();
              if (event.button === 2) {
                  removeLand(card.name);
              }
          });
      }

      deckList.appendChild(cardDiv);

      columnIndex++;
      if (columnIndex >= 7) {
          columnIndex = 0;
          rowIndex++;
      }
  }

  document.getElementById("totalCardCount").textContent = deck.length;
}

function drag(event) {
  const draggableParent = event.target.closest(".deck-card");
  if (draggableParent) {
      event.dataTransfer.setData("text", draggableParent.id);
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  const draggedCardId = event.dataTransfer.getData("text");
  const dropTarget = event.target.closest(".deck-card");

  if (dropTarget && draggedCardId) {
      // Extraire les index des ID pour identifier la position des cartes
      const draggedCardIndex = deck.findIndex(card => `card-${card.id}` === draggedCardId);
      const dropTargetIndex = deck.findIndex(card => `card-${card.id}` === dropTarget.id);

      if (draggedCardIndex !== -1 && dropTargetIndex !== -1) {
          // Échanger les cartes dans le tableau deck
          const temp = deck[draggedCardIndex];
          deck[draggedCardIndex] = deck[dropTargetIndex];
          deck[dropTargetIndex] = temp;

          // Rafficher le deck
          displayDeck();
      }
  }
}


function dragLeave(event) {
  event.target.closest(".deck-card").classList.remove("drag-over");
}




function removeLand(landName) {
  const landIndex = deck.findIndex((card) => card.name === landName);
  if (landIndex !== -1) {
    deck.splice(landIndex, 1);
    displayDeck();
  }
}


function addLand(landName) {
  const landCard = basicLands.find((land) => land.name === landName);
  if (landCard) {
    deck.push({ ...landCard, id: landCard.name + Math.random() });
    displayDeck();
  }
}


function getRandomUniqueIntegers(min, max, count, excluded = []) {
  const arr = [];
  while (arr.length < count) {
      const r = Math.floor(Math.random() * (max - min + 1)) + min;
      if (arr.indexOf(r) === -1 && !excluded.includes(r)) {
          arr.push(r);
      }
  }
  return arr;
}


function muligan() {
  const commanderIndex = deck.findIndex(card => card === selectedCommander);

  const minRange = 1;
  const maxRange = deck.length - 1;
  const numberOfRandomInts = 7;

  const randomUniqueIntegers = getRandomUniqueIntegers(
    minRange,
    maxRange,
    numberOfRandomInts,
    [commanderIndex]
);


  console.log(randomUniqueIntegers);

  const main = document.getElementById("main");
  main.innerHTML = "";

  let columnIndex = 0;
  let rowIndex = 0;

  for (let nb of randomUniqueIntegers) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("deck-card");

    cardDiv.style.gridColumn = columnIndex + 1;
    cardDiv.style.gridRow = rowIndex + 1;

    cardDiv.innerHTML = `
            <img src="${deck[nb].image_uris.normal}" alt="${deck[nb].name}">
            <p>${deck[nb].name}${
      deck[nb].quantity > 1 ? " x" + deck[nb].quantity : ""
    }</p>
        `;

    main.appendChild(cardDiv);

    columnIndex++;
    if (columnIndex >= 10) {
      columnIndex = 0;
      rowIndex++;
    }
    totalCardCount += 1;
  }
}


