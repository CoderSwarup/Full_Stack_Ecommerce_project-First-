import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(password, saltRounds);
    return hashpass;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPass) => {
  try {
    return bcrypt.compare(password, hashedPass);
  } catch (error) {
    console.log(error);
  }
};
