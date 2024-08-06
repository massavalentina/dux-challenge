'use client'

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Image from 'next/image';
import duxLogo from '../../../../public/dux-logo.png'; 
import styles from '../../styles/menubar.module.scss'

export default function MenuBar() {

    const start = <Image alt="logo" src={duxLogo} height={40} width={40} className="mr-2" />;

    const end = (
        <div >
            <Button icon="pi pi-cog" className="p-button-text" />
        </div>
    );

    return (
        <div>
            <Menubar start={start} end={end} className={styles.customMenuBar}/>
        </div>
    );
};
     