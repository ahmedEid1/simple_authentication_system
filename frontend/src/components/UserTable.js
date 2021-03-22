import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

function UserTable(props) {
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 100
        },
        {
            field: 'username', headerName: 'User Name', width: 200
        },
        {
            field: 'email', headerName: 'Email', width: 300
        },
        {
            field: 'actions',
            headerName: 'actions',
            sortable: false,
            width: 200,
            renderCell: (user) => (
                <div>
                    <EditForm editUser={props.editUser} user={user.row}
                              error={props.error} removeError={props.removeError}
                    />
                    <DeleteForm deleteUser={props.deleteUser} username={user.row.username}
                                error={props.error} removeError={props.removeError}
                    />
                </div>
            )
        },
    ];

    return (
        <div style={{ height: "100%", width: '100%' }}>
            <DataGrid rows={props.rows} columns={columns} pageSize={10} />
        </div>
    );
}

export default UserTable;