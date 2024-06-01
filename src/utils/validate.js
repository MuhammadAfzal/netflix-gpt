const isEmailValid = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isPasswordValid = (password) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
const isFullNameValid = (fullName) =>
  /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(fullName);

export const validateLoginFormData = (email, password) => {
  if (!isEmailValid(email) || !isPasswordValid(password)) {
    return "Email or password is invalid!";
  }
  return null;
};

export const validateSignInFormData = (email, password, fullName) => {
  if (!isFullNameValid(fullName)) {
    return "Full name is invalid!";
  }

  if (!isEmailValid(email) || !isPasswordValid(password)) {
    return "Email or password is invalid!";
  }
  return null;
};
