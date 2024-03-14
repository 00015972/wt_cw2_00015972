const fs = require("fs");
const employees_db = require(global.employees_db);

const service = {
    get_employees(req, res) {
        return employees_db;
    },
    create(body) {
        const employee_id = generate_Id();
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
    update(employee_id, new_employee_data) {
        const employee_index = employees_db.findIndex(
            (employee) => employee.id == employee_id
        );
        if (employee_index !== -1) {
            employees_db[employee_index].employee = {
                ...employees_db[employee_index].employee,
                ...new_employee_data,
            };
            writeToFile(employees_db);
            return employees_db[employee_index];
        }
        return null;
    },
};
let writeToFile = async (employees_db) => {
    await fs.writeFileSync(
        global.employees_db,
        JSON.stringify(employees_db, null, 4),
        "utf8"
    );
};

function generate_Id() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5); 
    const uniqueId = timestamp + randomString;
    return uniqueId;
}

module.exports = service;
