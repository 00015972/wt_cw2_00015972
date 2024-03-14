I created a simple web application for registering new employees. It consists of three main pages: ordering page, register page, employees list page and employees update page. Below are the details of the project:

Project Structure
Controllers: JavaScript files in the controllers folder handle rendering pug files for specific routes and manage actions for creating and updating orders.
Public: Contains CSS and JavaScript folders responsible for styling and handling form submission events. Image folder is used for icons
Routes: Manages proper routing of web pages and processes post requests for registering and updating employees.
Services: Contains logic for adding, updating, and rgetting employees from the dataset.
Views: Contains all pug files, which are rendered to HTML code in the controllers folder.
.gitignore: Ignores the node_modules folder when pushing the project to GitHub.
Data folder contains json file where employees data are stored in an array as objects.
server folder contains server.js fodler which manages the port and imports modules.
Package.json: Lists dependencies used for the project.
Running the Project
To run the project:

Install dependencies by running npm install in the terminal.
Please firstly install node_modules folder by writing "npm i" and write "npm run server" in terminal.

GitHub Repository
You can find the project code on GitHub: https://github.com/00015972/wt_cw2_00015972.git 