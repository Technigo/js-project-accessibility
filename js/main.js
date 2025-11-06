/* -----------------------------
          ARTA - FORM
---------------------------------*/
const submissionForm = document.getElementById("submission-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

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

let liveRegion = createLiveRegion();

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

function isValidName(v) {
  return /^[a-zA-Z\s'-]+$/.test(v);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, errorElement, message) {
  input.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function clearError(input, errorElement) {
  input.removeAttribute("aria-invalid");
  errorElement.textContent = "";
  errorElement.hidden = true;
}

function announcePolite(message) {
  liveRegion.textContent = "";
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 50);
}

function handleRadioKeydown(e, radios) {
  const key = e.key;
  const currentIndex = Array.from(radios).indexOf(e.target);
  let targetIndex = currentIndex;

  switch (key) {
    case "ArrowUp":
    case "ArrowLeft":
      targetIndex = (currentIndex - 1 + radios.length) % radios.length;
      break;
    case "ArrowDown":
    case "ArrowRight":
      targetIndex = (currentIndex + 1) % radios.length;
      break;
    default:
      return;
  }

  e.preventDefault();
  radios[targetIndex].focus();
  radios[targetIndex].checked = true;
}

function enableRadioArrowNavigation(radios) {
  if (!radios || radios.length === 0) return;
  radios.forEach((radio) => {
    radio.addEventListener("keydown", (e) => handleRadioKeydown(e, radios));
  });
}

function resetForm() {
  questionOne.hidden = true;
  questionTwo.hidden = true;
  questionThree.hidden = true;
  submitButton.hidden = true;
  [agreeRadios, accommodationRadios, environmentRadios].forEach((set) => {
    set.forEach((r) => {
      r.removeAttribute("required");
      r.removeAttribute("aria-invalid");
    });
  });
  announcePolite("Form reset");
}

// Event Listeners
nameInput.addEventListener("input", () => {
  if (nameInput.value.trim() && isValidName(nameInput.value)) {
    clearError(nameInput, nameError);
  }
});

emailInput.addEventListener("input", () => {
  const v = emailInput.value.trim();
  if (v && isValidEmail(v)) {
    clearError(emailInput, emailError);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  [agreeRadios, accommodationRadios, environmentRadios].forEach((set) => {
    set.forEach((r) => r.removeAttribute("required"));
  });
  enableRadioArrowNavigation(agreeRadios);
  enableRadioArrowNavigation(accommodationRadios);
  enableRadioArrowNavigation(environmentRadios);

  // Add Tab event listener to show next question
  questionOne.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      const selectedAgree = Array.from(agreeRadios).find((r) => r.checked);
      if (selectedAgree) {
        questionTwo.hidden = false;
        accommodationRadios.forEach((a) => a.setAttribute("required", ""));
        announcePolite(
          "Question two revealed. Please select an accommodation type."
        );
      }
    }
  });

  questionTwo.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      const selectedAccommodation = Array.from(accommodationRadios).find(
        (r) => r.checked
      );
      if (selectedAccommodation) {
        questionThree.hidden = false;
        environmentRadios.forEach((e) => e.setAttribute("required", ""));
        announcePolite(
          "Question three revealed. Please select the environment."
        );
      }
    }
  });

  questionThree.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      const selectedEnvironment = Array.from(environmentRadios).find(
        (r) => r.checked
      );
      if (selectedEnvironment) {
        submitButton.hidden = false;
        announcePolite("Submit button is available");
      }
    }
  });
});

continueButton.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let ok = true;

  const nameVal = nameInput.value.trim();
  if (!nameVal) {
    showError(nameInput, nameError, "Please enter your name");
    ok = false;
  } else if (!isValidName(nameVal)) {
    showError(nameInput, nameError, "Please enter a valid name");
    ok = false;
  } else {
    clearError(nameInput, nameError);
  }

  const emailVal = emailInput.value.trim();
  if (!emailVal) {
    showError(emailInput, emailError, "Please enter your email address");
    ok = false;
  } else if (!isValidEmail(emailVal)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    ok = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!ok) {
    (nameError.textContent ? nameInput : emailInput).focus();
    return;
  }

  // Show questions
  questionOne.hidden = false;
  agreeRadios.forEach((r) => r.setAttribute("required", ""));
  agreeRadios[0]?.focus();
  announcePolite("Question one revealed. Please select an option.");
});

agreeRadios.forEach((radio) =>
  radio.addEventListener("change", () => {
    questionTwo.hidden = false;
    accommodationRadios.forEach((a) => a.setAttribute("required", ""));
    accommodationRadios[0]?.focus();
    announcePolite(
      "Question two revealed. Please select an accommodation type."
    );
  })
);

accommodationRadios.forEach((radio) =>
  radio.addEventListener("change", () => {
    questionThree.hidden = false;
    environmentRadios.forEach((e) => e.setAttribute("required", ""));
    environmentRadios[0]?.focus();
    announcePolite("Question three revealed. Please select the environment.");
  })
);

environmentRadios.forEach((radio) =>
  radio.addEventListener("change", () => {
    submitButton.hidden = false;
    submitButton.focus();
    announcePolite("Submit button is available");
  })
);

submissionForm.addEventListener("submit", (e) => {
  if (e.key === "Enter" && e.target.type !== "submit") {
    e.preventDefault();

    // If we're on the initial form section, trigger the continue button
    if (questionOne.hidden) {
      continueButton.click();
      return;
    }

    // Only allow Enter to submit when all questions are answered
    if (!areAllQuestionsAnswered()) {
      e.preventDefault();
      announcePolite("Please answer all questions before submitting");
    }
  }
  e.preventDefault();
  let ok = true;

  const nameVal = nameInput.value.trim();
  if (!nameVal) {
    showError(nameInput, nameError, "Please enter your name");
    ok = false;
  } else if (!isValidName(nameVal)) {
    showError(nameInput, nameError, "Please enter a valid name");
    ok = false;
  } else {
    clearError(nameInput, nameError);
  }

  const emailVal = emailInput.value.trim();
  if (!emailVal) {
    showError(emailInput, emailError, "Please enter your email address");
    ok = false;
  } else if (!isValidEmail(emailVal)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    ok = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!ok) {
    (nameError.textContent ? nameInput : emailInput).focus();
    return;
  }

  if (!areAllQuestionsAnswered()) {
    announcePolite("Please answer all questions before submitting");
    return;
  }

  const name = nameVal || "there";
  responseSection.hidden = false;
  responseSection.classList.remove("visually-hidden");
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
  announcePolite(
    `Form submitted successfully. Thank you, ${name}. A member of our staff will contact you shortly.`
  );

  submissionForm.reset();
  resetForm();
});

function areAllQuestionsAnswered() {
  const hasAgreeAnswer = Array.from(agreeRadios).some((r) => r.checked);
  const hasAccommodationAnswer = Array.from(accommodationRadios).some(
    (r) => r.checked
  );
  const hasEnvironmentAnswer = Array.from(environmentRadios).some(
    (r) => r.checked
  );
  return hasAgreeAnswer && hasAccommodationAnswer && hasEnvironmentAnswer;
}
