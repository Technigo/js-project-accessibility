/* -----------------------------
          ARTA - FORM
---------------------------------*/

const adoptionForm = document.getElementById("adoption-form");
const submissionForm = document.getElementById("submission-form");
const continueButton = document.getElementById("continue-button");
const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const submitButton = document.getElementById("submit-button");
const responseSection = document.getElementById("response");
const responseContent = document.getElementById("response-content");

const agreeRadios = document.querySelectorAll('input[name="agree"]');
const accommodationRadios = document.querySelectorAll(
  'input[name="accommodation"]'
);
const environmentRadios = document.querySelectorAll(
  'input[name="environment"]'
);
let userName = "";

/*---Accessibility helpers---*/
function createLiveRegion() {
  let live = document.getElementById("site-aria-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "site-aria-live";
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    document.body.appendChild(live);
  }
  return live;
}
const liveRegion = createLiveRegion();

function announcePolite(message) {
  liveRegion.textContent = "";
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
}

function toggleRequired(elements, required) {
  elements.forEach((element) => {
    if (required) {
      element.setAttribute("required", "");
      element.setAttribute("aria-required", "true");
      element.addEventListener("input", () =>
        element.removeAttribute("aria-invalid")
      );
    } else {
      element.removeAttribute("required");
      element.removeAttribute("aria-required");
      element.removeAttribute("aria-invalid");
    }
  });
}

/*Arrow key navigation for radio groups*/
function enableRadioArrowNavigation(radios) {
  if (!radios || radios.length === 0) return;
  radios.forEach((radio, idx) => {
    radio.addEventListener("keydown", (e) => {
      const key = e.key;
      let target = null;
      if (key === "ArrowLeft" || key === "ArrowUp")
        target = radios[(idx - 1 + radios.length) % radios.length];
      if (key === "ArrowRight" || key === "ArrowDown")
        target = radios[(idx + 1) % radios.length];
      if (target) {
        e.preventDefault();
        target.focus();
        target.checked = true;
        target.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggleRequired(agreeRadios, false);
  toggleRequired(accommodationRadios, false);
  toggleRequired(environmentRadios, false);

  if (responseSection) {
    responseSection.setAttribute("aria-live", "polite");
    responseSection.setAttribute("aria-atomic", "true");
  }

  enableRadioArrowNavigation(agreeRadios);
  enableRadioArrowNavigation(accommodationRadios);
  enableRadioArrowNavigation(environmentRadios);
});

continueButton.addEventListener("click", () => {
  questionOne.hidden = false;
  questionOne.setAttribute("aria-hidden", "false");
  toggleRequired(agreeRadios, true);
  if (agreeRadios[0]) agreeRadios[0].focus();
  submissionForm.scrollIntoView({ behavior: "smooth" });
  announcePolite("Question one revealed. Please select an option.");
});

agreeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    questionTwo.hidden = false;
    questionTwo.setAttribute("aria-hidden", "false");
    toggleRequired(accommodationRadios, true);
    if (accommodationRadios[0]) accommodationRadios[0].focus();
    submissionForm.scrollIntoView({ behavior: "smooth" });
    announcePolite(
      "Question two revealed. Please select an accommodation type."
    );
  });
});

accommodationRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    questionThree.hidden = false;
    questionThree.setAttribute("aria-hidden", "false");
    toggleRequired(environmentRadios, true);
    if (environmentRadios[0]) environmentRadios[0].focus();
    adoptionForm.scrollIntoView({ behavior: "smooth" });
    announcePolite("Question three revealed. Please select the environment.");
  });
});

environmentRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    submitButton.hidden = false;
    submitButton.setAttribute("aria-hidden", "false");
    if (submitButton) submitButton.focus();
    announcePolite("Submit button is available");
  });
});

function resetForm() {
  questionOne.hidden = true;
  questionOne.setAttribute("aria-hidden", "true");
  questionTwo.hidden = true;
  questionTwo.setAttribute("aria-hidden", "true");
  questionThree.hidden = true;
  questionThree.setAttribute("aria-hidden", "true");
  submitButton.hidden = true;
  submitButton.setAttribute("aria-hidden", "true");
  toggleRequired(agreeRadios, false);
  toggleRequired(accommodationRadios, false);
  toggleRequired(environmentRadios, false);
  announcePolite("Form reset");
}

submissionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("name").value || "").trim() || "there";

  responseSection.classList.remove("visually-hidden");
  responseSection.scrollIntoView({ behavior: "smooth" });

  responseContent.replaceChildren();
  const strong = document.createElement("strong");
  strong.textContent = name;
  responseContent.append(
    "Thank you for your interest ",
    strong,
    ". A member of our staff will contact you shortly."
  );

  responseContent.setAttribute("tabindex", "-1");
  responseContent.focus();

  responseSection.setAttribute("tabindex", "-1");
  responseSection.focus();

  announcePolite(
    `Form submitted successfully. Thank you, ${name}. A member of our staff will contact you shortly.`
  );
  submissionForm.reset();
  resetForm();
});
