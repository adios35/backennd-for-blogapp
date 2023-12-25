import bcrypt from "bcrypt";

// Define a function to hash a password
const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
export default hashPassword;
