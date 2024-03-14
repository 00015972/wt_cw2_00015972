const fs = require("fs"); // importing fs to work with empoyees_db.json file
const service = require("../../services/service");
const web_controller = {
    get_employees: async (req, res) => {
        try {
            const employees = service.get_employees();
            res.render("employees_list.pug", { employees }); //rendering employees_list.pug file and sending employees data to the pug file
        } catch (error) {
            console.error("Error occured", error);
            res.status(500).render("error.pug", { error: error.message }); // rendering error.pug file if an error occurs and sending and error message.
        }
    },
    // register method is used to render a register page
    register_employee: async (req, res) => {
        try {
            res.render("register_page.pug"); //rendering a register_page.pug file
        } catch (error) {
            res.status(500).render("error.pug", { error: error.message }); // rendering error.pug file if an error occurs and sending and error message.
        }
    },
    update_employee: async (req, res) => {
        try {
            const employees = service.get_employees();
            const employee = employees.find(
                (employee) => employee.id === req.params.id
            );
            console.log(employee);
            if (!employee) {
                return res.status(404).send("Employee is not found");
            }
            res.render("update_employee.pug", { employee });
        } catch (error) {
            console.error("Error getting employees:", error);
            res.status(500);
        }
    },
    delete_employee: async (req, res) => {
        const employees = service.get_employees();
        try {
            const employee_index = employees.findIndex(
                (employee) => employee.id === req.params.id
            );
            if (employee_index !== -1) {
                employees.splice(employee_index, 1);
                fs.writeFile(
                    "../data/employees_db.json",
                    JSON.stringify(employees, null, 4),
                    (err) => {
                        if (err) {
                            return res.status(500);
                        } else {
                            res.redirect("/employees-list");
                        }
                    }
                );
            } else {
                res.status(404);
            }
        } catch (parseError) {
            console.error(parseError);
            res.status(500);
        }
    },
};

module.exports = web_controller; // exporting web_controllers
