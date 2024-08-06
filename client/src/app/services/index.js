import { API_URL, JSON_SERVER_URL } from '../config'

//Servicio de vista de los usuarios de la API de personal de Dux
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

// Servicio de vista de los usuarios de la db.json
export async function fetchUsersFromJsonServer() {
  const response = await fetch(JSON_SERVER_URL);
  if (!response.ok) {
      throw new Error('Failed to fetch users from json-server');
  }
  return response.json();
}

// Servicio para el alta de usuarios
export async function postUsers(user) {
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

// Servicio para actualizar usuarios
export async function updateUsers(user) {
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

// Servicio par eliminar usarios a través de su id
export async function deleteUsers(userId) {
    await fetch(`${JSON_SERVER_URL}/${userId}`, {
        method: 'DELETE',
    });
}


// Extrae las opcines únicas de estados
export async function getUniqueEstados() {
    const users = await fetchUsersFromJsonServer();
    const uniqueEstados = [...new Set(users.map(user => user.estado))];
    return uniqueEstados;
}

