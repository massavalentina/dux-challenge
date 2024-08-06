import { Button } from 'primereact/button';

export default function UserTableActions({ onDelete }) {
    
    return(
        
    <Button 
        icon="pi pi-trash" 
        className="p-button-danger p-button-sm"
        style={{ padding: '0.03rem', margin: '0', width: '1.5rem' }}
        onClick={onDelete} 
    />
)
    
};