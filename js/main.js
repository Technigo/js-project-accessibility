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
    toggle.classList.add("active")
    toggle.checked = true
    body.classList.add("high-contrast")
  } else {
    toggle.classList.remove("active")
    toggle.checked = false // To make the toggle visually reflect the state
    body.classList.remove("high-contrast")
  }

  // Add event listener to the toggle element
  toggle.addEventListener("click", () => {
    toggleContrast() // Call the toggleContrast function when the button is clicked
  })
})

const toggleContrast = () => {
  const body = document.body
  const toggle = document.getElementById("toggle")

  if (!toggle.classList.contains("active")) {
    toggle.classList.add("active")
    body.classList.add("high-contrast")
    localStorage.setItem("highContrast", "true") // Save preference to localStorage
  } else {
    toggle.classList.remove("active")
    body.classList.remove("high-contrast")
    localStorage.setItem("highContrast", "false") // Save preference to localStorage
  }
}
