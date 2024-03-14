const fs = require("fs"); // importing fs to work with empoyees_db.json file
const service = require("../../services/service")
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
    register: async (req, res) => {
        try {
            res.render("register_page.pug"); //rendering a register_page.pug file
        } catch (error) {
            res.status(500).render("error.pug", { error: error.message }); // rendering error.pug file if an error occurs and sending and error message.
        }
    },
};

module.exports = web_controller; // exporting web_controllers