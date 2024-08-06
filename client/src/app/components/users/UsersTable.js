'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import FiltersBar from './FiltersBar';
import Pagination from '../Pagination';
import UserModal from './UserModal';
import styles from '../../styles/filtersbar.module.scss';
import { fetchUsersFromJsonServer, deleteUserFromJsonServer } from '@/app/services';
import UserTableActions from './UserTableActions';


export default function UserDataTable({ initialUsers }) {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [users, setUsers] = useState(initialUsers);
    const [filteredUsers, setFilteredUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const usersUpload = async () => {
            const response = await fetchUsersFromJsonServer();
            setFilteredUsers(response);
            setUsers(response); 
        };
        usersUpload();
    }, []);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const handleSave = async () => {
        try {
            const updatedUsers = await fetchUsersFromJsonServer();
            setFilteredUsers(updatedUsers);
            setUsers(updatedUsers); 
        } catch (error) {
            console.error('Error fetching updated users:', error);
        }
    };

    const handleDelete = async (user) => {
        try {
            await deleteUserFromJsonServer(user.id);
            const updatedUsers = await fetchUsersFromJsonServer();
            setFilteredUsers(updatedUsers);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const showDeleteConfirmation = (user) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar el usuario ?',
            header: 'Eliminar Usuario',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Sí', 
            rejectLabel: 'Cancelar',
            accept: () => handleDelete(user),
            reject: () => {}
        });
    };

    const applyFilters = useCallback(({ searchTerm, selectedEstado }) => {
        const filtered = users.filter(user =>
            (user.usuario.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedEstado ? user.estado === selectedEstado : true)
        );
        setFilteredUsers(filtered);
    }, [users]);

    const pagedUsers = filteredUsers.slice(first, first + rows);

    return (
        <div className="card">
            <div className={styles.customFiltersBar}>
                <h1>Usuarios</h1>
                <Button label="Nuevo Usuario" className={styles.customButton} icon="pi pi-plus" onClick={() => { setModalMode('add'); setVisible(true); }} />
            </div>
            <FiltersBar data={users} onFiltersChange={applyFilters} />
            <UserModal 
                data={users}
                mode={modalMode}
                userToEdit={selectedUser}
                onSave={handleSave}
                visible={visible}
                setVisible={setVisible}
            />
            <DataTable value={pagedUsers} removableSort selectionMode="single" className={styles.customTable}>
                <Column field="id" header="Id" sortable style={{ width: '20%' }}></Column>
                <Column 
                    field="usuario" 
                    header="Nombre" 
                    sortable 
                    style={{ width: '25%' }} 
                ></Column>
                <Column field="estado" header="Estado" sortable style={{ width: '20%' }}></Column>
                <Column field="sector" header="Sector" sortable style={{ width: '15%' }}></Column>
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <UserTableActions onDelete={() => showDeleteConfirmation(rowData)} />
                    )}
                    style={{ width: '20%' }}
                ></Column>
            </DataTable>
            <Pagination data={filteredUsers} first={first} rows={rows} onPageChange={onPageChange} rowsPerPageOptions={[5, 10, 20]} />
            <ConfirmDialog />
        </div>
    );
}
