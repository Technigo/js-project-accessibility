document.addEventListener('DOMContentLoaded', function () {

  const cards = document.querySelectorAll('.quiz-card')
  let currentIndex = 0 //First question

  //A function that loops through all the quiz cards and only shows the one that matches the target index, by adding the active class to it and hiding the rest
  const showCard = (targetIndex) => {
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === targetIndex)
    })
  }

  //Gets all nextbuttons and adds an action
  const nextButtons = document.querySelectorAll('.next-btn')
  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {

      const currentCard = cards[currentIndex]

      // Check if any radio button is selected
      const selected = currentCard.querySelector('input[type="radio"]:checked')

      // If no radio button is selected, show an alert and don't move to the next question
      if (!selected) {
        alert("Please select an answer before continuing.")
        return
      }

      if (currentIndex < cards.length - 1) {
        currentIndex++
        showCard(currentIndex)
      }
    })
  })

  //Gets all previous buttons and adds an action
  const previousButtons = document.querySelectorAll('.prev-btn')
  previousButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--
        showCard(currentIndex)
      }
    })
  })

  //Start by showing first card
  showCard(currentIndex)
})