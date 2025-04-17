document.addEventListener('DOMContentLoaded', () => {
    const introsection = document.getElementById('introduction');
    const userInnfoSection = document.getElementById('user-info');
    const announcer = document.getElementById('announcer');
    const intronContinueButton = document.getElementById('intro-continue');
    const UserInfoForm = document.getElementById('user-info-form');

    intronContinueButton.addEventListener('click', () => {

        introsection.hidden = true;
        userInnfoSection.hidden = false;
        window.location.hash = '#user-info';
        document - getElementById('name').focus();
        announcer.textContent = 'Please enter your name and email address.';

    });

    const emailInput = document.getElementById('email');

    const nameInput = document.getElementById('name');
    const emailError = document.getElementById('email-error');
    const nameError = document.getElementById('name-error');
    let userName = '';

    function clearError(input, errorElement) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        errorElement.textContent = '';
        errorElement.hidden = true;
    }


    function showError(input, errorElement, message) {
        input.setAttribute('aria-invalid', 'true');
        // input.setAttribute('aria-describedby', errorElement.id);
        errorElement.textContent = message;
        errorElement.hidden = false;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    nameInput.addEventListener('input', () => {
        if (nameInput.valid.trim()) {
            clearError(nameInput, nameError);

        } else {
            showError(nameInput, nameError, 'Please enter your name.');
        }
    });
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim()) {

            if (isValidEmail(emailInput.value)) {
                clearError(emailInput, emailError);
            }
        }

        /* } else {
            showError(emailInput, emailError, 'Please enter a valid email address.');
        } */
    });


    UserInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Please enter your name.');
            isValid = false;
            nameInput.focus();
        } else {
            clearError(nameInput, nameError);
        }


        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Please enter your email address.');
            isValid = false;
            if (!nameError.textContent) {
                emailInput.focus();
            }

        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
            if (!nameError.textContent) {
                emailInput.focus();
            }
        }
        else {
            clearError(emailInput, emailError);
        }

        if (isValid) {
            userName = nameInput.value.trim();
            userInnfoSection.hidden = true;


            feedbackSection.hidden = false;
            feedbackSection.scrollIntoView({ behavior: 'smooth' });

            document.querySelector('#feedback-form input[type="radio"]').focus();
            const welcomeMessage = `we move to feedback section, ${userName}!`;
            announcer.textContent = welcomeMessage;
            document.getElementById('welcome').textContent = welcomeMessage;
            document.getElementById('continue').focus();
        }

    });




    const feedbackSection = document.getElementById('feedback');
    const resultsection = document.getElementById('results');

    const feedbackForm = document.getElementById('feedback-form');
    const resultContent = document.getElementById('results-content');
    const feedbackDetails = document.querySelector('.feedback-details');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const answeredQuestions = new Set();


    function updateProgress() {
        const totalQuestions = 2;

        const answeredCount = answeredQuestions.size;
        const percentage = (answeredCount / totalQuestions) * 100;


        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${answeredCount} out of ${totalQuestions} questions answered`;
        announcer.textContent = `${answeredCount} out of ${totalQuestions} questions answered`;
    }

    feedbackForm.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            const questionname = radio.name;
            answeredQuestions.add(questionname);
            updateProgress();
        });
    });
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const formData = new FormData(feedbackForm);
        const userAnswer = Object.fromEntries(formData);
        const loadingIndicator = document.getElementById('loading-indicator');

        // Show loading message
loadingIndicator.classList.add('active');
feedbackSection.setAttribute('aria-busy', 'true');

        if (!userAnswer.navigation) {
            isValid = false;
            alert('Please select an option for Navigation.');
        }
    
        if (!userAnswer.readerbility) {
            isValid = false;
            alert('Please select an option for Content Readability.');
        }
    
        if (!isValid) {
            return;
        }

        let feedback = `Thank you for your feedback, ${userName}!`;

        const detailedFeedback = [];

        if (userAnswer.navigation === 'easy') {


            detailedFeedback.push('Navigation:you find that site easy to navigate Easy');
        } else if (userAnswer.navigation === 'difficult') {
            detailedFeedback.push('Navigation:you fond that site difficult to navigate Difficult');
        }




        if (userAnswer.readerbility === 'clear') {

            detailedFeedback.push('readerbility:you fond that site easy to navigate clear');

        } else if (userAnswer.readerbility === 'unclear') {

            detailedFeedback.push('readerbility:you fond that site difficult to navigate unclear');

        }



        const positiveAnswers = ['easy', 'clear'];
        const userAnswerValues = Object.values(userAnswer);
        let positiveResposes = 0;

        for (const answer of userAnswerValues) {
            if (positiveAnswers.includes(answer)) {
                positiveResposes += 1;
            }
        }


        const totaResposes = Object.keys(userAnswer).length;
        const satisfactionPercentage = Math.round((positiveResposes / totaResposes) * 100);

        const satisfactionMessage = `Your satisfaction level is ${satisfactionPercentage}%`;
        feedback += ` ${satisfactionMessage}`;

        feedback += positiveResposes >= totaResposes / 2 ? 'Great! We are glad you are satisfied!' : 'We are sorry to hear that you are not satisfied.';
        setTimeout(() => {
            // Process feedback
            feedbackSection.setAttribute('aria-busy', 'false');
            loadingIndicator.classList.remove('active');
          
            feedbackSection.hidden = true;
            resultsection.hidden = false;
            resultContent.textContent = feedback;
            feedbackDetails.innerHTML = detailedFeedback.map((text) => `<p>${text}</p>`).join('');
          
            resultsection.setAttribute('tabindex', '-1');
            resultsection.focus();
            announcer.textContent = 'Feedback submitted successfully!';
          }, 1500); // Simulate 1.5 second loading
    });



});

document.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.addEventListener('keydown', (event) => {
        const radios = Array.from(fieldset.querySelectorAll('input[type="radio"]'));
        const currentIndex = radios.findIndex(radio => radio === document.activeElement);

        if (currentIndex === -1) return; // No radio is focused

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % radios.length;
            radios[nextIndex].focus();
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
            radios[prevIndex].focus();
        }
    });
});