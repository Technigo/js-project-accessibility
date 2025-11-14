/* -----------------------------
          KAUSAR - CARDS
---------------------------------*/

const dogCardContainer = document.querySelector(".dogs-card-container");

const dogsCards = [
  {
    dogID: 1,
    dogName: "Jack",
    dogBreed: "Dalmatian",
    dogAge: 2,
    dogGender: "Male",
    dogIMG: "1.png",
    dogbg: "#ffd6d6",
    dogDescription: ["Friendly", "Playful"],
  },
  {
    dogID: 2,
    dogName: "Buddy",
    dogBreed: "Labrador Retriever",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "2.png",
    dogbg: "#fff3b0",
    dogDescription: ["Loyal", "Energetic"],
  },
  {
    dogID: 3,
    dogName: "Bella",
    dogBreed: "German Shepherd",
    dogAge: 4,
    dogGender: "Female",
    dogIMG: "3.png",
    dogbg: "#9ee6c0",
    dogDescription: ["Protective", "Obedient"],
  },
  {
    dogID: 4,
    dogName: "Charlie",
    dogBreed: "Golden Retriever",
    dogAge: 2,
    dogGender: "Male",
    dogIMG: "4.png",
    dogbg: "#ffd580",
    dogDescription: ["Affectionate", "Playful"],
  },
  {
    dogID: 5,
    dogName: "Luna",
    dogBreed: "Poodle",
    dogAge: 1,
    dogGender: "Female",
    dogIMG: "5.png",
    dogbg: "#d6c8ff",
    dogDescription: ["Gentle", "Curious"],
  },
  {
    dogID: 6,
    dogName: "Rocky",
    dogBreed: "French Bulldog",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "6.png",
    dogbg: "#bfc4c7",
    dogDescription: ["Friendly", "Calm"],
  },
  {
    dogID: 7,
    dogName: "Daisy",
    dogBreed: "Beagle",
    dogAge: 2,
    dogGender: "Female",
    dogIMG: "7.png",
    dogbg: "#ffb88a",
    dogDescription: ["Playful", "Energetic"],
  },
  {
    dogID: 8,
    dogName: "Milo",
    dogBreed: "Siberian Husky",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "8.png",
    dogbg: "#8fd5e0",
    dogDescription: ["Loyal", "Curious"],
  },
  {
    dogID: 9,
    dogName: "Coco",
    dogBreed: "Yorkshire Terrier",
    dogAge: 1,
    dogGender: "Female",
    dogIMG: "9.png",
    dogbg: "#a7ecd7ff",
    dogDescription: ["Affectionate", "Gentle"],
  },
  {
    dogID: 10,
    dogName: "Oscar",
    dogBreed: "Dachshund",
    dogAge: 4,
    dogGender: "Male",
    dogIMG: "10.png",
    dogbg: "#d8b8aa",
    dogDescription: ["Friendly", "Obedient"],
  },
  {
    dogID: 11,
    dogName: "Ruby",
    dogBreed: "Doberman",
    dogAge: 3,
    dogGender: "Female",
    dogIMG: "11.png",
    dogbg: "#bfc4c7",
    dogDescription: ["Loyal", "Protective"],
  },
  {
    dogID: 12,
    dogName: "Toby",
    dogBreed: "Border Collie",
    dogAge: 2,
    dogGender: "Male",
    dogIMG: "12.png",
    dogbg: "#b5c5ecff",
    dogDescription: ["Energetic", "Curious"],
  },
];

const container = function (dogs) {
  dogCardContainer.innerHTML = "";

  dogs.forEach(function (dog) {
    const breedIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dog-card-icon"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>';
    const ageIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dog-card-icon"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>';
    const maleIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dog-card-icon"><path d="M16 3h5v5"/><path d="m21 3-6.75 6.75"/><circle cx="10" cy="14" r="6"/></svg>';

    const femaleIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dog-card-icon"><path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/></svg>';

    const genderIcon = dog.dogGender === "Male" ? maleIcon : femaleIcon;

    const html = `
    <div
          class="dog-card"
          role="region"
          aria-labelledby="dog-${dog.dogName}-title"
          tabindex="0"
        >
          <div class="dog-card-img">
            <img
              src="img/dogs-cards/dog-${dog.dogIMG}"
              alt="This is a photo of a ${dog.dogBreed} dog"
            />
          </div>

          <div class="dog-card-flexbox">
            <h3 id="dog-${dog.dogName}-title" class="dog-card-title">
              ${dog.dogName}
            </h3>
            <div class="tag tag-Friendly" hidden aria-hidden="true">
              Friendly
            </div>
            <div class="tag tag-Playful" hidden aria-hidden="true">Playful</div>
            <div class="tag tag-Loyal" hidden aria-hidden="true">Loyal</div>
            <div class="tag tag-Gentle" hidden aria-hidden="true">Gentle</div>
            <div class="tag tag-Calm" hidden aria-hidden="true">Calm</div>
            <div class="tag tag-Protective" hidden aria-hidden="true">
              Protective
            </div>
            <div class="tag tag-Energetic" hidden aria-hidden="true">
              Energetic
            </div>
            <div class="tag tag-Affectionate" hidden aria-hidden="true">
              Affectionate
            </div>
            <div class="tag tag-Obedient" hidden aria-hidden="true">
              Obedient
            </div>
            <div class="tag tag-Curious" hidden aria-hidden="true">Curious</div>
          </div>

          <div
            class="dog-card-flexbox"
            role="group"
            aria-label="Breed information"
          >
            ${breedIcon}
            <p class="dog-card-text dog-breed">
              <span class="dog-card-bold">Breed: </span>${dog.dogBreed}
            </p>
          </div>

          <div
            class="dog-card-flexbox"
            role="group"
            aria-label="Age information"
          >
            ${ageIcon}
            <p class="dog-card-text dog-age">
              <span class="dog-card-bold">Age: </span>${dog.dogAge} years old
            </p>
          </div>

          <div
            class="dog-card-flexbox"
            role="group"
            aria-label="Gender information"
          >
            ${genderIcon}
            <p class="dog-card-text dog-gender">
              <span class="dog-card-bold">Gender: </span>${dog.dogGender}
            </p>
          </div>
        </div>
    `;

    dogCardContainer.insertAdjacentHTML("beforeend", html);
  });

  const dogIMGs = document.querySelectorAll(".dog-card-img img");

  dogIMGs.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.5}s`; // задержка
  });

  const dogCardsEvents = dogCardContainer.querySelectorAll(".dog-card");

  dogCardsEvents.forEach(function (card, index) {
    const dog = dogs[index];
    let defaultColor = "white";

    // Сброс фона по умолчанию
    card.style.backgroundColor = defaultColor;

    // Hover
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("active-card")) {
        // если не активная
        card.style.backgroundColor = dog.dogbg;
        dog.dogDescription.forEach((desc) => {
          const tag = card.querySelector(`.tag-${desc}`);
          if (tag) tag.hidden = false;
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("active-card")) {
        // если не активная
        card.style.backgroundColor = defaultColor;
        dog.dogDescription.forEach((desc) => {
          const tag = card.querySelector(`.tag-${desc}`);
          if (tag) tag.hidden = true;
        });
      }
    });

    // Click → делает карточку активной
    card.addEventListener("click", () => {
      currentCardIndex = index;
      currentFieldIndex = 0;
      card.focus();
      readCurrentField();

      // Сброс активной карточки и тэгов у всех
      dogCardsEvents.forEach((c, i) => {
        c.classList.remove("active-card");
        c.style.backgroundColor = defaultColor;
        dogs[i].dogDescription.forEach((desc) => {
          const tag = c.querySelector(`.tag-${desc}`);
          if (tag) tag.hidden = true;
        });
      });

      // Активная карточка
      card.classList.add("active-card");
      card.style.backgroundColor = dog.dogbg;
      dog.dogDescription.forEach((desc) => {
        const tag = card.querySelector(`.tag-${desc}`);
        if (tag) tag.hidden = false;
      });
    });
  });
};

container(dogsCards);

/* -----------------------------
      KAUSAR - SCREEN REDER
---------------------------------*/

let currentCardIndex = 0;
let currentFieldIndex = 0;

const dogCards = document.querySelectorAll(".dog-card");
const fields = ["img", "name", "breed", "age", "gender"];

// Функция для озвучивания текста
let speakTimeout;

function speak(text) {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  clearTimeout(speakTimeout);
  speakTimeout = setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice =
      voices.find((v) => v.name.toLowerCase().includes("male")) || voices[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }, 50);
}

// Функция для смены визуала карточки + тэгов
function activateCardVisuals(index) {
  dogCards.forEach((card, i) => {
    const dog = dogsCards[i];
    if (i === index) {
      card.style.backgroundColor = dog.dogbg;
      dog.dogDescription.forEach((desc) => {
        const tag = card.querySelector(`.tag-${desc}`);
        if (tag) tag.hidden = false;
      });
    } else {
      card.style.backgroundColor = "white";
      dog.dogDescription.forEach((desc) => {
        const tag = card.querySelector(`.tag-${desc}`);
        if (tag) tag.hidden = true;
      });
    }
  });
}

function focusFieldVisual() {
  // Сначала убираем рамку со всех полей всех карточек
  dogCards.forEach((card) => {
    card
      .querySelectorAll(
        ".dog-card-img img, .dog-card-title, .dog-breed, .dog-age, .dog-gender"
      )
      .forEach((el) => {
        el.classList.remove("focused-field");
      });
  });

  // Затем добавляем рамку только к текущему полю текущей карточки
  const currentCard = dogCards[currentCardIndex];
  let fieldEl;

  switch (fields[currentFieldIndex]) {
    case "img":
      fieldEl = currentCard.querySelector(".dog-card-img img");
      break;
    case "name":
      fieldEl = currentCard.querySelector(".dog-card-title");
      break;
    case "breed":
      fieldEl = currentCard.querySelector(".dog-breed");
      break;
    case "age":
      fieldEl = currentCard.querySelector(".dog-age");
      break;
    case "gender":
      fieldEl = currentCard.querySelector(".dog-gender");
      break;
  }

  if (fieldEl) fieldEl.classList.add("focused-field");
}

// Функция для чтения текущего поля
function readCurrentField() {
  const dog = dogsCards[currentCardIndex];
  focusFieldVisual();
  activateCardVisuals(currentCardIndex); // фон + тэги
  const genderHeShe = dog.dogGender === "Male" ? "He" : "She";
  const genderHisHer = dog.dogGender === "Male" ? "His" : "Her";

  switch (fields[currentFieldIndex]) {
    case "img":
      speak(`Photo of ${dog.dogName}, a ${dog.dogBreed} dog`);
      break;
    case "name":
      if (dog.dogDescription.length > 0) {
        speak(
          `${genderHisHer} name is ${
            dog.dogName
          } and ${genderHeShe} is ${dog.dogDescription.join(" and ")}`
        );
      } else {
        speak(`${genderHisHer} name is ${dog.dogName}`);
      }
      break;
    case "breed":
      speak(`${genderHeShe} is a ${dog.dogBreed} dog`);
      break;
    case "age":
      speak(`${genderHeShe} is ${dog.dogAge} years old`);
      break;
    case "gender":
      speak(`${genderHeShe} is ${dog.dogGender}`);
      break;
  }
}

// Вешаем обработчики на каждую карточку
dogCards.forEach((card, index) => {
  card.setAttribute("tabindex", 0); // фокусируемая карточка

  // Стрелки ↑ ↓ ← →
  card.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); // отключаем прокрутку
        currentFieldIndex++;
        if (currentFieldIndex >= fields.length) {
          currentCardIndex = (currentCardIndex + 1) % dogCards.length;
          currentFieldIndex = 0;
          dogCards[currentCardIndex].focus();
        }
        readCurrentField();
        break;

      case "ArrowUp":
        event.preventDefault();
        currentFieldIndex--;
        if (currentFieldIndex < 0) {
          currentCardIndex =
            (currentCardIndex - 1 + dogCards.length) % dogCards.length;
          currentFieldIndex = 0;
          dogCards[currentCardIndex].focus();
        }
        readCurrentField();
        break;

      case "ArrowRight":
        event.preventDefault();
        currentCardIndex = (currentCardIndex + 1) % dogCards.length;
        currentFieldIndex = 0;
        dogCards[currentCardIndex].focus();
        readCurrentField();
        break;

      case "ArrowLeft":
        event.preventDefault();
        currentCardIndex =
          (currentCardIndex - 1 + dogCards.length) % dogCards.length;
        currentFieldIndex = 0;
        dogCards[currentCardIndex].focus();
        readCurrentField();
        break;
    }
  });
});
