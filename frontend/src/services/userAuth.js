const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const getErrorMessage = (data, status) => {
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors.map((error) => error.msg).filter(Boolean).join(" ");
  }

  const message = data?.message || data?.error;
  if (message) {
    if (/duplicate|already exists|already registered|11000/i.test(message)) {
      return "An account with this email already exists. Try logging in instead.";
    }
    return message;
  }

  if (status >= 500) return "We couldn’t complete that request. Please try again shortly.";
  if (status === 401) return "The email or password you entered is incorrect.";
  return "Please check your details and try again.";
};

const submitUserAuth = async (endpoint, payload) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/users/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to reach Drivio. Check your connection and try again.");
  }

  let data;
  try {
    const body = await response.text();
    try {
      data = JSON.parse(body);
    } catch {
      data = body;
    }
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (typeof data === "string" && /duplicate key|E11000/i.test(data)) {
      throw new Error("An account with this email already exists. Try logging in instead.");
    }
    throw new Error(getErrorMessage(data, response.status));
  }

  if (!data?.token) {
    throw new Error("Your account request succeeded, but we couldn’t start your session. Please try logging in.");
  }

  return data;
};

export const loginUser = (credentials) => submitUserAuth("login", credentials);

export const registerUser = ({ firstname, lastname, email, password }) =>
  submitUserAuth("register", {
    fullname: { firstname, lastname },
    email,
    password,
  });

export const saveUserSession = (token, remember = true) => {
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  otherStorage.removeItem("token");
  storage.setItem("token", token);
};
