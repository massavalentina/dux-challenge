const API_URL = 'https://staging.duxsoftware.com.ar/api/personal';
const JSON_SERVER_URL = 'http://localhost:3001/users';

export async function fetchUsersFromAPI(sector= 1000, limit = 10, page = 1) {
  const url = new URL(API_URL);
  if (sector) url.searchParams.append('sector', sector);
  url.searchParams.append('_limit', limit);
  url.searchParams.append('_page', page);
  const response = await fetch(url.toString());
  if (!response.ok) {
      throw new Error('Failed to fetch users data');
  }
  return response.json();
}


export async function saveUserToJsonServer(user) {
    const response = await fetch(JSON_SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to save user to json-server: ${errorData}`);
    }

    return response.json();
}


export async function getAndSaveUsers(sector, limit, page) {
    const usersFromAPI = await fetchUsersFromAPI(sector, limit, page);
    const savedUsers = await Promise.all(usersFromAPI.map(user => saveUserToJsonServer(user)));
    return savedUsers;
}

export async function fetchUsersFromJsonServer() {
  const response = await fetch(JSON_SERVER_URL);
  
  if (!response.ok) {
      throw new Error('Failed to fetch users from json-server');
  }
  
  return response.json();
}

export async function updateUserInJsonServer(user) {
    const response = await fetch(`${JSON_SERVER_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update user in json-server: ${errorData}`);
    }
    return response.json();
}

export async function deleteUserFromJsonServer(userId) {
    await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
    });
}


export async function getUniqueEstados() {
    const users = await fetchUsersFromJsonServer();
    const uniqueEstados = [...new Set(users.map(user => user.estado))];
    return uniqueEstados;
}

