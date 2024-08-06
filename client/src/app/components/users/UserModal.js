'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import styles from '../../styles/buttons.module.scss';
import 'primeflex/primeflex.css';
import { saveUserToJsonServer, updateUserInJsonServer, fetchUsersFromJsonServer, getUniqueEstados } from '@/app/services';

export default function UserModal({ data, mode, userToEdit, onSave, visible, setVisible }) {
    const [filteredEstado, setFilteredEstado] = useState([]);
    const [estadoOptions, setEstadoOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [formValues, setFormValues] = useState({
        id: '',
        usuario: '',
        estado: '',
        sector: 1000,
    });

    useEffect(() => {
        if (mode === 'edit' && userToEdit) {
            setFormValues({
                id: userToEdit.id,
                usuario: userToEdit.usuario,
                estado: userToEdit.estado,
                sector: userToEdit.sector,
            });
        } else {
            setFormValues({
                id: '',
                usuario: '',
                estado: '',
                sector: 1000,
            });
        }
    }, [mode, userToEdit]);

    useEffect(() => {
        async function fetchData() {
            const uniqueEstado = await getUniqueEstados();
            setEstadoOptions(uniqueEstado);
        }
        fetchData();
    }, []);

    const searchEstado = (event) => {
        setFilteredEstado(estadoOptions.filter(option => option.toLowerCase().includes(event.query.toLowerCase())));
    };


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleEstadoChange = (e) => {
        setFormValues((prev) => ({ ...prev, estado: e.value }));
    };

    const handleSectorChange = (e) => {
        setFormValues((prev) => ({ ...prev, sector: e.value }));
    };

    const handleSaveUser = async () => {
        try {
            const users = await fetchUsersFromJsonServer();
            const idExists = users.some(user => user.id === formValues.id);

            if (idExists) {
                setErrorMessage('El ID ya existe. Por favor, elija otro ID.');
                return;
            }

            setErrorMessage(''); 

            if (mode === 'edit') {
                await updateUserInJsonServer(formValues);
            } else {
                await saveUserToJsonServer(formValues);
            }
            await onSave();
            setVisible(false);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const footerContent = (
        <div className={styles.modalFooter}>
            <Button label="Guardar" className={styles.customButton} icon="pi pi-check" onClick={handleSaveUser} />
            <Button label="Cancelar" className={styles.customButtonFilled} icon="pi pi-times" onClick={() => setVisible(false)} />
        </div>
    );

    return (
        <Dialog visible={visible} modal header={mode === 'edit' ? 'Editar Usuario' : 'Nuevo Usuario'} footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
            <div className="m-0">
                <form>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6 mb-3">
                            <label htmlFor="id">Id</label>
                            <InputNumber id="id" value={formValues.id} placeholder="Ingrese el Id del usuario" onValueChange={(e) => setFormValues((prev) => ({ ...prev, id: e.value }))} readOnly={mode === 'edit'} useGrouping={false} />
                            {errorMessage && <small className="p-error">{errorMessage}</small>}
                        </div>
                        <div className="p-field p-col-12 p-md-6 mb-3">
                            <label htmlFor="usuario">Nombre</label>
                            <InputText keyfilter="alpha" id="usuario" value={formValues.usuario} placeholder="Ingrese el nombre del usuario" onChange={handleInputChange} />
                        </div>
                        <div className="p-field p-col-12 p-md-6 mb-3">
                            <label htmlFor="estado">Estado</label>
                            <AutoComplete id="estado" suggestions={filteredEstado} completeMethod={searchEstado} dropdown forceSelection value={formValues.estado} onChange={handleEstadoChange} />
                        </div>
                        <div className="p-field p-col-12 p-md-6 mb-3">
                            <label htmlFor="sector">Sector</label>
                            <InputNumber id="sector" forceSelection value={formValues.sector} onChange={handleSectorChange} useGrouping={false} />
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
