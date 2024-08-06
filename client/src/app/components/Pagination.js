import React from 'react'
import { Paginator } from 'primereact/paginator'


export default function Pagination({data, first, rows, onPageChange, rowsPerPageOptions}) {
    
    return (
        <div>
          <Paginator
                first={first}
                rows={rows}
                totalRecords={data.length} 
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={onPageChange}
            />
        </div>
    )
}
