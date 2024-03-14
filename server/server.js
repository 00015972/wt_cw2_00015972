const express = require("express"); // importing express

const path = require("path"); // importing path

global.employees_db = path.join(__dirname, "../data/employees_db.json"); // creating employees_db as a global variable

const app = express();
app.set("view engine", "pug"); // set pug extension file as a view engine
app.set("views", path.join(__dirname, "../views/employee"));

app.use("/css", express.static("public/css")); // using css folder as a static
app.use("/javaScript", express.static("public/javaScript")); // using javaScript folder as a static
app.use("/images", express.static("public/images"));
app.use(express.json()); // express.json is used to automatically parse the request body for incoming requests
app.use(express.urlencoded({ extended: true }));

const api_route = require("../routes/api");
const web_route = require("../routes/web");
app.use("/api", api_route);
app.use("/", web_route);

// app.use((req, res) => {
//     res.redirect("/employee/employees-list");
// });

const PORT = 4000; // created a port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
