import React from 'react'; 
import { MegaMenu } from 'primereact/megamenu';
import styles from '../../styles/sidebar.module.scss';

export default function Sidebar() {
    const items = [
        {
           
            icon: 'pi pi-box'
        },
        {
           
            icon: 'pi pi-box'
        },
        {
           
            icon: 'pi pi-box'
        },
        {
           
            icon: 'pi pi-box'
        },
        {
           
            icon: 'pi pi-box'
        },
        {
           
            icon: 'pi pi-box'
        }
    ];

    return (
        <div>
            <MegaMenu model={items} orientation="vertical" breakpoint="960px" className={styles.customSideBar} />
        </div>
    )
}