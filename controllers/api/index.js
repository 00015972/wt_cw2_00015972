let service = require("../../services/service")
let api_controller = {
    register: async (req, res) => {
        try {
            const employee = await service.create(req.body);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const employee = await service.update(req.params.id, req.body);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
module.exports = api_controller