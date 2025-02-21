import * as userService from "../services/user.services.js";

export const createUser = async (req, res, next) => {
    try {
        const { cant } = req.query;
        const response = await userService.createUsersMock(cant);
        res.status(200).json(response);        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const response = await userService.getUsers();
        console.log("response: ", response)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}