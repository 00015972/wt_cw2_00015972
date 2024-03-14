document.addEventListener("DOMContentLoaded", function () {
    const update_form = document.getElementById("update_form");
    const employee_id = update_form.getAttribute("employee_id")
    console.log(employee_id);
    update_form.addEventListener("submit", function (e) {
        console.log("sdf");
        e.preventDefault();
        const firstName = document.getElementById("firstName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password").value;
        
        if (!validateName(firstName)) {
            showError("Please enter your first name", update_form);
            return;
        }
        if (!validateEmail(email)) {
            showError("Please enter a correct email", update_form);
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            showError("Please enter corret phone number", update_form);
            return;
        }
        if (!validatePassword(password)) {
            showError("Please enter another password", update_form);
            password.style.border = "2px solid red";
            return;
        }
        axios
            .post(`/api/employee/update-employee/${employee_id}`, {
                firstName,
                email,
                phoneNumber,
                password,
            })
            .then(function (response) {
                alert("A new data is added successfully");
                location.href = "/employees-list";
            })
            .catch(function (error) {
                if (error.response && error.response.data) {
                    showError(
                        error.response.data.errors
                            .map((error) => error.msg)
                            .join(" "),
                        update_form
                    );
                } else {
                    showError(
                        "An error occurred. Please try again.",
                        update_form
                    );
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
    alert(message);
}
