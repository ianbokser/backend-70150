import { faker } from "@faker-js/faker";
faker.locale = "es";

export const generatePet = () => {
    return {
        name: faker.person.firstName(),
        age: faker.date.birthdate({ mode: 'age', min: 1, max: 30 }),
        type: faker.animal.type(),
        image: faker.image.url(),
    };
};