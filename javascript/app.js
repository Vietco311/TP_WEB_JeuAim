function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setConnectedMessage(message){
    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    const connectedElement = document.getElementById('connecte');
    connectedElement.appendChild(messageElement);
}

function setInputError(inputElement, message) {
    const errorElement = inputElement.parentElement.querySelector(".form__input-error-message");
    
    inputElement.classList.add("form__input--error");
    errorElement.textContent = message;
}

function clearInputError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector(".form__input-error-message");

    inputElement.classList.remove("form__input--error");
    errorElement.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#login');
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const formData = new FormData(loginForm);

        fetch("../php/connexion.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                setFormMessage(loginForm, "error", "");
                if (data != "echec") {
                    window.location.href = `../html/jeu.html?message=${encodeURIComponent(data)}`;
                    setConnectedMessage(connectedElement, data);
                } else {
                    setFormMessage(loginForm, "error", "Pseudo/Mot de passe invalide.");
                    
                }
            })
            .catch(error => {
                console.error("Erreur lors de la requête AJAX :", error);
            });

    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        const formData = new FormData(createAccountForm);

        fetch("../php/inscription.php", {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(data)
                setFormMessage(createAccountForm, "error", "");
                if (data === "Inscription réussie! Veuillez vous connecter!") {
                    setFormMessage(createAccountForm, "success", data);
                } else {
                    setFormMessage(createAccountForm, "error", data);
                    
                }
            })
            .catch(error => {
                console.error("Erreur lors de la requête AJAX :", error);
            });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 12) {
                setInputError(inputElement, "Le mot de passe doit contenir au moins 12 caractères");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
