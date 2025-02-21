import * as userService from "../services/user.services.js";
import * as petService from "../services/pet.services.js";

export const createData = async (req, res, next) => {
    try {
        const { cant } = req.query;
        const [userResponse, petResponse] = await Promise.all([
            userService.createUsersMock(cant),
            petService.createPetMock(cant)
        ]);
        res.status(200).json({
            users: userResponse,
            pets: petResponse
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};