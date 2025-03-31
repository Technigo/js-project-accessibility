document.addEventListener("DOMContentLoaded", () => {
  submitAnswers()

  console.log("DOM fully loaded")
  const toggle = document.getElementById("toggle")
  if (!toggle) {
    console.error("Toggle element not found!")
    return
  }
  console.log("Toggle element found")

  const body = document.body

  // Restore the toggle state from localStorage so the state doesn't change on reloading the page
  const isHighContrast = localStorage.getItem("highContrast") === "true"
  if (isHighContrast) {
    toggle.classList.add("active")
    body.classList.add("high-contrast")
  } else {
    toggle.classList.remove("active")
    body.classList.remove("high-contrast")
  }

  // Add event listener to the switch button
  toggle.addEventListener("click", () => {
    toggleContrast()
  })
})

const toggleContrast = () => {
  const body = document.body
  const toggle = document.getElementById("toggle")

  console.log("High contrast switch toggled")

  if (!toggle.classList.contains("active")) {
    console.log("Activating high contrast")
    toggle.classList.add("active")
    body.classList.add("high-contrast")
    localStorage.setItem("highContrast", "true") // Save state
  } else {
    console.log("Deactivating high contrast")
    toggle.classList.remove("active")
    body.classList.remove("high-contrast")
    localStorage.setItem("highContrast", "false") // Save state
  }
}
