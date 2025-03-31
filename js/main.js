document.addEventListener("DOMContentLoaded", () => {
  submitAnswers()

  console.log("DOM fully loaded")
  // Get the toggle element inside the DOMContentLoaded event
  const toggle = document.getElementById("toggle")
  if (!toggle) {
    console.error("Toggle element not found!")
    return
  }
  console.log("Toggle element found")

  // Ensure the page starts in default mode (not high contrast)
  const body = document.body
  toggle.classList.remove("active")
  body.classList.remove("high-contrast")

  // Add event listener to the switch button
  toggle.addEventListener("click", (event) => {
    toggleContrast() // Call the toggleContrast function when the button is clicked
  })
})

const toggleContrast = () => {
  const body = document.body
  const toggle = document.getElementById("toggle")

  console.log("High contrast switch toggled")

  // Toggle high contrast if it's not already active
  if (!toggle.classList.contains("active")) {
    console.log("Activating high contrast")
    toggle.classList.add("active")
    // Toggle the high contrast class on the body element
    body.classList.add("high-contrast")
  } else {
    console.log("Deactivating high contrast")
    toggle.classList.remove("active")
    body.classList.remove("high-contrast") // Also remove high-contrast class
  }
}
