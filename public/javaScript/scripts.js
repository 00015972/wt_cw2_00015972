document.addEventListener("DOMContentLoaded", function () {
    const registration_form = document.getElementById("registration_form");

    registration_form.addEventListener("submit", function (e) {
        console.log("sdf")
        e.preventDefault();
        const firstName = document.getElementById("firstName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password");
        const repeatPassword = document.getElementById("repeatPassword").value;
        const passwordRules = document
            .getElementById("passwordRules")
            .querySelectorAll("li");
        const errorElement = document.getElementById("error");
        if (errorElement) errorElement.textContent = "";

        if (!validateName(firstName)) {
            showError("Please enter your first name", registration_form);
            return;
        }
        if (!validateEmail(email)) {
            showError("Please enter a correct email", registration_form);
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            showError("Please enter corret phone number", registration_form);
            return;
        }
        if (repeatPassword !== password.value) {
            showError("Passwords are not matching", registration_form);
            return;
        }
        // if (!validatePassword(password)) {
        //     showError("Please enter a valid address", registration_form);
        //     return;
        // }
        password.addEventListener("input", function () {
            const passwordValue = password.value;
            passwordRules.forEach((rule) => {
                const ruleName = rule.dataset.rule;
                const isValid = validatePasswordRule(passwordValue, ruleName);
                if (isValid) {
                    rule.classList.add("valid");
                    rule.classList.remove("invalid");
                } else {
                    rule.classList.remove("valid");
                    rule.classList.add("invalid");
                }
            });
        });
        axios
            .post("/api/employee/register", {
                firstName,
                email,
                phoneNumber,
                password,
            })
            .then(function (response) {
                alert("A new employee is registered successfully");
            })
            .catch(function (error) {
                if (error.response && error.response.data) {
                    showError(
                        error.response.data.errors
                            .map((error) => error.msg)
                            .join(" "),
                        form
                    );
                } else {
                    showError("An error occurred. Please try again.", form);
                }
            });
    });
});
function validateName(firstName) {
    const regex = /^[A-Za-z -]+$/;
    if (firstName.trim() === "" || !regex.test(firstName)) {
        return false;
    }
    return true;
}
function validateEmail(email) {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.toString().toLocaleLowerCase().match(regex)) {
        return true;
    }
    return false;
}
function validatePhoneNumber(phoneNumber) {
    const regex = /^9989[012345789][0-9]{7}$/;
    if (!regex.test(phoneNumber)) {
        return false;
    }
    return true;
}
// function validatePassword(password) {
//     const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/;
//     if (!regex.test(password)) {
//         return false;
//     }
//     return true;
// }

function validatePasswordRule(password, rule) {
    switch (rule) {
        case "digit":
            return /[1-9]/.test(password);
        case "lowercase":
            return /[a-z]/.test(password);
        case "uppercase":
            return /[A-Z]/.test(password);
        case "special":
            return /\W/.test(password);
        case "length":
            return password.length >= 8 && password.length <= 12;
        default:
            return false;
    }
}
function showError(message, form) {
    console.log(message);
}
