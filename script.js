document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const feedback = document.getElementById("feedback");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Dark Mode Toggle
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkModeToggle.textContent = "Switch to Light Mode";
    } else {
      darkModeToggle.textContent = "Switch to Dark Mode";
    }
  });

  // Enhanced Keyboard Navigation for Radio Buttons
  const allFieldsets = document.querySelectorAll("fieldset");

  allFieldsets.forEach((fieldset) => {
    const radios = fieldset.querySelectorAll('input[type="radio"]');

    radios.forEach((radio, index) => {
      radio.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          const nextIndex = (index + 1) % radios.length;
          radios[nextIndex].focus();
          radios[nextIndex].checked = true; // Markera som vald
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          const prevIndex = (index - 1 + radios.length) % radios.length;
          radios[prevIndex].focus();
          radios[prevIndex].checked = true; // Markera som vald
        }
      });
    });
  });

  // Form Submission Handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.innerHTML = "<strong>Processing...</strong>";
    feedback.style.backgroundColor = "#fffbcc";
    feedback.style.color = "#b38f00";

    setTimeout(() => {
      let correctAnswers = 0;
      const questions = ["q1", "q2", "q3"];
      let feedbackMessages = [];

      questions.forEach((question) => {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption) {
          if (selectedOption.value === "correct") {
            correctAnswers++;
            feedbackMessages.push(`✅ ${question.toUpperCase()} - Correct!`);
          } else {
            feedbackMessages.push(`❌ ${question.toUpperCase()} - Incorrect. Try again.`);
          }
        } else {
          feedbackMessages.push(`⚠️ ${question.toUpperCase()} - No answer selected.`);
        }
      });

      const totalQuestions = questions.length;
      const resultMessage =
        correctAnswers === totalQuestions
          ? `🎉 Great job! You got all ${totalQuestions} correct!`
          : `💡 You got ${correctAnswers} out of ${totalQuestions} correct. Try again to improve!`;
      feedbackMessages.push("<hr>" + resultMessage);

      feedback.innerHTML = feedbackMessages.join("<br>");
      feedback.style.backgroundColor = correctAnswers === totalQuestions ? "#e0ffe0" : "#ffe0e0";
      feedback.style.color = correctAnswers === totalQuestions ? "#00b300" : "#b30000";
    }, 1000); // 1 second delay
  });
});
