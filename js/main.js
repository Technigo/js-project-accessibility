document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle")
  if (!toggle) {
    console.error("Toggle element not found!")
    return
  }
  const body = document.body

  // Ensure localStorage has a default value for highContrast
  if (localStorage.getItem("highContrast") === null) {
    localStorage.setItem("highContrast", "false")
  }

  // Restore the toggle state from localStorage so the state doesn't change on reloading the page
  const isHighContrast = localStorage.getItem("highContrast") === "true"
  if (isHighContrast) {
    console.log("Applying saved high-contrast mode")
    toggle.classList.add("active")
    body.classList.add("high-contrast")
  } else {
    console.log("Starting in default mode")
    toggle.classList.remove("active")
    body.classList.remove("high-contrast")
  }

  // Add event listener to the toggle element
  toggle.addEventListener("click", () => {
    toggleContrast() // Call the toggleContrast function when the button is clicked
  })
  submitAnswers()
})

const toggleContrast = () => {
  const body = document.body
  const toggle = document.getElementById("toggle")

  console.log("High contrast switch toggled")

  if (!toggle.classList.contains("active")) {
    console.log("Activating high contrast")
    toggle.classList.add("active")
    body.classList.add("high-contrast")
    localStorage.setItem("highContrast", "true") // Save preference to localStorage
  } else {
    console.log("Deactivating high contrast")
    toggle.classList.remove("active")
    body.classList.remove("high-contrast")
    localStorage.setItem("highContrast", "false") // Save preference to localStorage
  }
}
