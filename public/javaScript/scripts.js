document.addEventListener("DOMContentLoaded", function () {
    const registration_form = document.getElementById("registration_form");

    registration_form.addEventListener("submit", function (e) {
        console.log("sdf");
        e.preventDefault();
        const firstName = document.getElementById("firstName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password").value;
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
        if (!validatePassword(password)) {
            showError("Please enter another password", registration_form);
            password.style.border = "2px solid red";
            return;
        }
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
function validatePassword(password) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,12}$/;
    if (!regex.test(password)) {
        return false;
    }
    return true;
}
function showError(message, form) {
    console.log(message);
}
