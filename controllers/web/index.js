const fs = require("fs"); // importing fs to work with empoyees_db.json file

const web_controller = {
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