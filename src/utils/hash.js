import bcrypt from "bcrypt";

export async function createHash(password) {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  return hashPassword;
}

export async function comparePassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
