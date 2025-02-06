import { createHash } from "./hash.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
faker.locale = "es";

dotenv.config();
const HASHPASSWORD = process.env.HASHPASSWORD;

const hashPassword = await createHash(HASHPASSWORD);

export const generateUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.date.birthdate({ mode: 'age', min: 18, max: 80 }),
        password: faker.helpers.arrayElement([hashPassword]),
        role: faker.helpers.arrayElement(["user", "admin"]),
    };
};