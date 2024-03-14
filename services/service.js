const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const employees_db = require(global.employees_db);

const service = {
    get_employees(req, res) {
        return employees_db;
    },
    create(req, res) {
        const employee_id = uuidv4();
        const body = req.body;
        console.log(body);

        const employee = {
            firstName: body.firstName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: body.password,
        };
        employees_db.unshift({
            id: employee_id,
            employee: employee,
        });
        writeToFile(employees_db);

        return {
            id: employee_id,
            employee: employee,
        };
    },
};
let writeToFile = async (employees_db) => {
    await fs.writeFileSync(
        global.employees_db,
        JSON.stringify(employees_db, null, 4),
        "utf8"
    );
};

module.exports = service;
