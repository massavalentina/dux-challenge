
import { fetchUsersFromJsonServer } from './services';
import UserDataTable from './components/users/UsersTable';
import { Suspense } from 'react';


export default async function UsersPage() {

    const initialUsers = await fetchUsersFromJsonServer();

    return (
        <div>
            <Suspense fallback={<h1>Cargando...</h1>}>
                <UserDataTable initialUsers={initialUsers} />
            </Suspense>
        </div>
    );
}