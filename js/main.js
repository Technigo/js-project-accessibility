const adoptionForm = document.getElementById('adoption-form');
const responseSection = document.getElementById('response');
const responseContent = document.getElementById('response-content');
let userName = '';

document.addEventListener('DOMContentLoaded', () => {
  const submissionForm = document.getElementById('submission-form');
})

adoptionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  userName = document.getElementById('name').value;
  responseSection.hidden = false;
  responseSection.scrollIntoView({ behavior: 'smooth' });
  let response =
    `Thank you for your interest <b>${userName}</b>. A member of our staff will contact you shortly.`;
  
  responseSection.hidden = false;
  responseContent.innerHTML = response;

  responseSection.setAttribute('tabindex', '-1');
  responseSection.focus();
});



