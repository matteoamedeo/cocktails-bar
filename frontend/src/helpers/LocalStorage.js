function setLocalStorageItem(key, payload) {
  localStorage.setItem(key, payload);
}

function checkAuthFromStorage() {
  const check = localStorage.getItem("isAuthenticated");
  return check ? true : false;
}

function checkTokenFromStorage() {
  const token = localStorage.getItem("authToken");
  return token;
}

function getUserFromStorage() {
  const user = localStorage.getItem("user");
  return user;
}

function deleteTokenFromStorage() {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  setLocalStorageItem,
  checkAuthFromStorage,
  checkTokenFromStorage,
  getUserFromStorage,
  deleteTokenFromStorage,
};
