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
    const UserInfoInput = document.getElementById('user-info-form');
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
        if(!nameInput.value.trim()){
            showError(nameInput,nameError,'Please enter your name.');
            isValid = false;
            nameInput.focus();
        }else{
            clearError(nameInput,nameError);
        }


        if(!emailInput.value.trim()){
            showError(emailInput,emailError,'Please enter your email address.');
            isValid = false;
            if(!nameError.textContent){
                emailInput.focus(); 
            }
            
        }else if(!isValidEmail(emailInput.value.trim())){
            showError(emailInput,emailError,'Please enter a valid email address.');
            isValid = false;
            if(!nameError.textContent){
                emailInput.focus(); 
            }
        }
        else{
            clearError(emailInput,emailError);
        }

        if (isValid) {
            userName = nameInput.value.trim();
            userInnfoSection.hidden = true;
            const welcomeMessage = `we move to feedback section, ${userName}!`;
            announcer.textContent = welcomeMessage;
            document.getElementById('welcome').textContent = welcomeMessage;
            document.getElementById('continue').focus();
        }

    });

});