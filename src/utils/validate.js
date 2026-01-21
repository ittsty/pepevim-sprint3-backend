export const normalize = (str) => (typeof str === "string" ? str.trim() : "");

export const validateRegister = (data) => {
  const firstName = normalize(data.first_name);
  const lastName = normalize(data.last_name);
  const email = normalize(data.email).toLowerCase();
  const password = data.password || "";
  const confirmPassword = data.confirm_password || "";

  if (firstName.length < 2 || firstName.length > 50) {
    return "First name must be 2-50 characters";
  }

  if (lastName.length < 2 || lastName.length > 50) {
    return "Last name must be 2-50 characters";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }

  if (password.length < 8 || password.length > 64) {
    return "Password must be 8-64 characters";
  }

  if (password !== confirmPassword) {
    return "Password does not match";
  }

  return null; // ผ่าน validation
};


export const validateUpdateProfile = (data) => {
  if (data.first_name && (data.first_name.length < 2 || data.first_name.length > 50)) {
    return "First name must be 2-50 characters";
  }

  if (data.last_name && (data.last_name.length < 2 || data.last_name.length > 50)) {
    return "Last name must be 2-50 characters";
  }

  return null;
};
