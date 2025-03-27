// JavaScript File: script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const feedback = document.getElementById("feedback");
  const darkModeToggle = document.getElementById("darkModeToggle");



  // Keyboard Navigation for Radio Buttons
  const allRadios = document.querySelectorAll('input[type="radio"]');
  allRadios.forEach((radio) => {
    radio.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const next = radio.nextElementSibling?.nextElementSibling;
        if (next && next.type === "radio") next.focus();
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const previous = radio.previousElementSibling?.previousElementSibling;
        if (previous && previous.type === "radio") previous.focus();
      }
    });
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
