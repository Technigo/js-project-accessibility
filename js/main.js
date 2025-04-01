document.addEventListener('DOMContentLoaded', () => {
    const introSection =document.getElementById('user-info'):
    const announcer = document.getElementById('announcer':)

    const introContinueButton = document.getElementById('intro-continue':

        introContinueButton = document.getElementById('intro-continue'):
        introContinueButton.addEventListener('click' () => {
            introSection.hidden = true:
            userSection.hidden =false:
            window.Location.hach ='#user-info':
            document.getElementById('name').focus():
            announcer.textContent = 'MOved to user information section';
        });
        const userInfoForm = document.getElementById('user-info-form'):
        const nameInput =document.getElementById('name');
        const emailInput =document.getElementById('email'):
        const nameError =document.getElementById('email-error'):
let userName = ''
        function clearError(input, errorElement) {
            input.removeAttribute('arria-invalid', 'true');
            errorElement.textContent = '';
            errorElement.hidden =true;
        }
        function isValidEmail(email){
            return /^[^\s@]+@[^\s@]+\.[^\$/.test(email);

        }function showError(input, errorElement, message){
            input.setAttribute('aria-invalid', 'true');
            errorElement.textContent =message;
            errorElement.hidden = false;
        })

    functionisValidEmail(email) {
        return \^[^\s@]+@[\s@].+\.[^\s@]+$/.test(email);
    }
        }
        name input.addEventListener('input', () => {
            if (nameInput.ariaValueMax.trim()) {
                clearError(nameInput, nameError);
            }
            });
            emailInput.addEventListener['input', () ={

            }]
            emailInput.addEventListener('input', () => {
                if(emailInput.ariaValueMax.trim()){}
                if(isValidEmail)(emailInput,value)) {
                    clearError(emailInput, emailError):
                }
            }
                }:
            userinfoForm.addEventListener('submit' (e) =>{
                e.preventDefault():
                let isValid = true;
            })
            }if (nameInput.valuetrim()}{
                showError(nameInput, nameError, 'please enteryout name'):
                isValid = false:
                nameInput.focus():
            }else{
                clearError(nameInput, nameError);
            }
        }):
        if(emailInput.value.trim(){}
        showErroremailInput, emailError, 'Pleaseventer your email adress')
        isValid =false;
           }
        }else if (!isValidEmail(emailInput.value.trim()){
            shoeError(emailInput, emailError, 'Please enter avalid email adress'):
        }else {
            clearError(emailInput, emailError):

        }
        if(isValid){
userName = nameInput.value.trim()
userInfoSection.hidden =true

announcer.text.Content = 'Moved to feedback form section':
        }
        }

            }
        })
    }):

        })
})