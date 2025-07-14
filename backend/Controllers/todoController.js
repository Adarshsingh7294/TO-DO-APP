

const todoModel = require("../Models/todoModel.js");

class todoController {
    static getAllTodos = async (req, res) => {
        try {
            const fetchAllTodos = await todoModel.find({});
            return res.status(200).json(fetchAllTodos);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }    
    };

    static addNewTodo = async (req, res) => {
        try {
            const { title } = req.body;
            let { isCompleted } = req.body;

            // Ensure isCompleted is boolean (handle "true"/"false" string from frontend)
            isCompleted = isCompleted === true || isCompleted === "true";

            if (title) {
                const addTodo = new todoModel({ title, isCompleted });
                await addTodo.save();
                return res.status(200).json({ message: "Todo Created" });
            } else {
                return res.status(400).json({ message: "Title is required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    static getSingleData = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const fetchSingleData = await todoModel.findById(id);
                return res.status(200).json(fetchSingleData);
            } else {
                return res.status(400).json({ message: "Invalid URL" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    static updateTodo = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                await todoModel.findByIdAndUpdate(id, req.body, { new: true });
                return res.status(200).json({ message: "Todo Updated" });
            } else {
                return res.status(400).json({ message: "Invalid ID" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    static deleteTodo = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                await todoModel.findByIdAndDelete(id);
                return res.status(200).json({ message: "Todo Deleted" });
            } else {
                return res.status(400).json({ message: "Invalid ID" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
}

module.exports = todoController;
