import bcrypt from "bcrypt";

export async function createHash(password) {
  const hashPassword = await bcrypt.hash(password, bcrypt.hashSync(10));

  return hashPassword;
}

export async function comparePassword(password, hashPassword) {
  const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

  return isPasswordCorrect;
}