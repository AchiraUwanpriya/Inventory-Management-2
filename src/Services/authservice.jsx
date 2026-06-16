import Base_url from "../config";
export const authService = {
  login,
  logout,
  getCurrentUser,
  isAdminAuthenticated
};

async function login(username, password) {
  // This is now handled in authActions with your database credentials
  return { StatusCode: 200, Result: 'authenticated' };
}

function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  console.log('✅ User logged out');
}

function getCurrentUser() {
  const userStr = localStorage.getItem('adminUser');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

function isAdminAuthenticated() {
  const token = localStorage.getItem('adminToken');
  return !!token;
}