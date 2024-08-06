
'use client'
import React, { useState, useEffect } from 'react';
import { InputText, Dropdown } from 'primereact';
import styles from '../../styles/filtersbar.module.scss';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';


export default function FiltersBar({ data, onFiltersChange }) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEstado, setSelectedEstado] = useState(null);
    const [estadoOptions, setEstadoOptions] = useState([]);

    useEffect(() => {
        const uniqueEstados = [...new Set(data.map(user => user.estado))];
        setEstadoOptions(uniqueEstados.map(estado => ({ label: estado, value: estado })));
    }, [data]);

    useEffect(() => {
        onFiltersChange({ searchTerm, selectedEstado });
    }, [searchTerm, selectedEstado, onFiltersChange]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEstadoChange = (event) => {
        setSelectedEstado(event.value);
    };

    return (
        <div className={styles.customFiltersBar}>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar"
                    className="p-inputtext p-component p-w-full"
                />
            </IconField>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-filter" />
                <Dropdown
                    value={selectedEstado}
                    options={estadoOptions}
                    onChange={handleEstadoChange}
                    placeholder="Filtrar por estado"
                    className="p-dropdown p-component"
                />
            </IconField>
        </div>
    );
}
