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
    dogbg: "#ffa8a8",
    dogDescription: ["Friendly", "Playful"],
  },
  {
    dogID: 2,
    dogName: "Buddy",
    dogBreed: "Labrador Retriever",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "2.png",
    dogbg: "#ffe066",
    dogDescription: ["Loyal", "Energetic"],
  },
  {
    dogID: 3,
    dogName: "Bella",
    dogBreed: "German Shepherd",
    dogAge: 4,
    dogGender: "Female",
    dogIMG: "3.png",
    dogbg: "#099268",
    dogDescription: ["Protective", "Obedient"],
  },
  {
    dogID: 4,
    dogName: "Charlie",
    dogBreed: "Golden Retriever",
    dogAge: 2,
    dogGender: "Male",
    dogIMG: "4.png",
    dogbg: "#f59f00",
    dogDescription: ["Affectionate", "Playful"],
  },
  {
    dogID: 5,
    dogName: "Luna",
    dogBreed: "Poodle",
    dogAge: 1,
    dogGender: "Female",
    dogIMG: "5.png",
    dogbg: "#9775fa",
    dogDescription: ["Gentle", "Curious"],
  },
  {
    dogID: 6,
    dogName: "Rocky",
    dogBreed: "French Bulldog",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "6.png",
    dogbg: "#495057",
    dogDescription: ["Friendly", "Calm"],
  },
  {
    dogID: 7,
    dogName: "Daisy",
    dogBreed: "Beagle",
    dogAge: 2,
    dogGender: "Female",
    dogIMG: "7.png",
    dogbg: "#f76707",
    dogDescription: ["Playful", "Energetic"],
  },
  {
    dogID: 8,
    dogName: "Milo",
    dogBreed: "Siberian Husky",
    dogAge: 3,
    dogGender: "Male",
    dogIMG: "8.png",
    dogbg: "#1098ad",
    dogDescription: ["Curious", "Loyal"],
  },
  {
    dogID: 9,
    dogName: "Coco",
    dogBreed: "Yorkshire Terrier",
    dogAge: 1,
    dogGender: "Female",
    dogIMG: "9.png",
    dogbg: "#3bc9db",
    dogDescription: ["Affectionate", "Gentle"],
  },
  {
    dogID: 10,
    dogName: "Oscar",
    dogBreed: "Dachshund",
    dogAge: 4,
    dogGender: "Male",
    dogIMG: "10.png",
    dogbg: "#86502eff",
    dogDescription: ["Obedient", "Friendly"],
  },
  {
    dogID: 11,
    dogName: "Ruby",
    dogBreed: "Doberman",
    dogAge: 3,
    dogGender: "Female",
    dogIMG: "11.png",
    dogbg: "#495057",
    dogDescription: ["Protective", "Loyal"],
  },
  {
    dogID: 12,
    dogName: "Toby",
    dogBreed: "Border Collie",
    dogAge: 2,
    dogGender: "Male",
    dogIMG: "12.png",
    dogbg: "#22b8cf",
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
    <div class="dog-card">
          <div class="dog-card-img"> 
           <img src="img/dogs-cards/dog-${dog.dogIMG}" alt="${dog.dogBreed}" />
          </div>
          
          <div class="dog-card-flexbox">
          <h3 class="dog-card-title">${dog.dogName}</h3>
          <div class="tag tag-Friendly"hidden>Friendly</div>
          <div class="tag tag-Playful" hidden>Playful</div>
          <div class="tag tag-Loyal" hidden>Loyal</div>
          <div class="tag tag-Gentle" hidden>Gentle</div>
          <div class="tag tag-Calm" hidden>Calm</div>
          <div class="tag tag-Protective" hidden>Protective</div>
          <div class="tag tag-Energetic" hidden>Energetic</div>
          <div class="tag tag-Affectionate" hidden>Affectionate</div>
          <div class="tag tag-Obedient" hidden>Obedient</div>
          <div class="tag tag-Curious" hidden>Curious</div>
          </div>

          <div class="dog-card-flexbox">
            ${breedIcon}
            <p class="dog-card-text">
              <span class="dog-card-bold">Breed: </span>${dog.dogBreed}
            </p>
          </div>

          <div class="dog-card-flexbox">
            ${ageIcon}
            <p class="dog-card-text">
              <span class="dog-card-bold"> Age: </span>${dog.dogAge} years old
            </p>
          </div>

          <div class="dog-card-flexbox">
            ${genderIcon}
            <p class="dog-card-text">
              <span class="dog-card-bold"> Gender: </span>${dog.dogGender}
            </p>
          </div>
        </div>
    `;

    dogCardContainer.insertAdjacentHTML("beforeend", html);
  });

  const dogCardsEvents = dogCardContainer.querySelectorAll(".dog-card");

  dogCardsEvents.forEach(function (card, index) {
    const dog = dogs[index];
    let defaultColor = "white";

    card.style.backgroundColor = defaultColor;

    card.addEventListener("mouseenter", () => {
      card.style.backgroundColor = dog.dogbg;

      dog.dogDescription.forEach((desc) => {
        const tag = card.querySelector(`.tag-${desc}`);
        if (tag) tag.hidden = false;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.style.backgroundColor = defaultColor;

      dog.dogDescription.forEach((desc) => {
        const tag = card.querySelector(`.tag-${desc}`);
        if (tag) tag.hidden = true;
      });
    });
  });
};

container(dogsCards);

/* -----------------------------
          ARTA - FORM
---------------------------------*/

const adoptionForm = document.getElementById("adoption-form");
const responseSection = document.getElementById("response");
const responseContent = document.getElementById("response-content");
const submissionForm = document.getElementById("submission-form");
let userName = "";

document.addEventListener("DOMContentLoaded", () => {});

adoptionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  userName = document.getElementById("name").value;
  responseSection.hidden = false;
  responseSection.scrollIntoView({ behavior: "smooth" });
  let response = `Thank you for your interest <b>${userName}</b>. A member of our staff will contact you shortly.`;

  responseSection.hidden = false;
  responseContent.innerHTML = response;

  responseSection.setAttribute("tabindex", "-1");
  responseSection.focus();

  submissionForm.reset();
});
