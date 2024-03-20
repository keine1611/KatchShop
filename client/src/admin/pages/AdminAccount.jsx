import { useEffect, useState } from 'react';
import React from 'react'
import { MyToast } from '../components/Toast';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme, Avatar } from '@mui/material'
import axios from 'axios'
import { avatar } from '@material-tailwind/react';

const CustomEditAvatar = ({ value, onChange }) => {
  const [avatar, setAvatar] = useState('/uploads/images/avatars/' + value)
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }

  }

  return (
    <div className='flex'>
      <Avatar src={avatar} style={{ width: '100px', height: '100px' }} />
      <input className=' my-auto mx-2 file-input file-input-bordered w-full max-w-xs' type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};

const AdminAccount = () => {
  const [data, setData] = React.useState([]);

  useEffect(function () {
    getData()
  }, [])
  const getData = () => {
    fetch('/api/account')
      .then(res => res.json())
      .then(data => setData(data))
  }

  const [columns, setColumns] = useState([
    {
      title: ' ', field: 'avatar_acc',
      editComponent: props => <CustomEditAvatar {...props} />,
      render: function (row) {
        return <Avatar sx={{ width: 64, height: 64}} src={'/uploads/images/avatars/' + row.avatar_acc} />
      }

    },
    {
      title: 'UserName', field: 'username_acc', cellStyle: { width: "20%" }, validate: rowData => {
        if (rowData.username_acc === undefined || rowData.username_acc === '')
          return "Required"
        else if (rowData.username_acc.length > 10)
          return 'Max length is 20 character'
        return true
      }
    },
    {
      title: 'Password', field: 'password_acc', initialEditValue: '', validate: rowData => {
        if (rowData.password_acc === undefined || rowData.password_acc === '')
          return "Required"
        else if (rowData.password_acc.length > 2000)
          return 'Max length is 20 character'
        return true
      }
    },
    {
      title: 'Role', field: 'role_acc', lookup: { admin: 'Admin', customer: 'Customer', staff: 'Staff' }, validate: rowData => {
        if (rowData.role_acc === undefined || rowData.role_acc === '')
          return "Required"
        return true
      }
    },

  ]);


  const defaultMaterialTheme = createTheme()
  return (
    <div className='pt-5 w-full'>
      <ThemeProvider theme={defaultMaterialTheme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Brand Table"
          columns={columns}
          data={data}
          options={{
            actionsColumnIndex: -1, addRowPosition: 'first',
            maxBodyHeight: "480px",
            pageSize: 10,
            tableLayout: "auto"
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                let account = new FormData()
                account.append('username_acc', newData.username_acc)
                account.append('password_acc', newData.password_acc)
                account.append('role_acc', newData.role_acc)
                account.append('avatar_acc', newData.avatar_acc)
                setTimeout(() => {
                  axios.post('/api/account/', account)
                    .then((res)=> {
                        MyToast('success', res.data.message)
                        const dataUpdate = [...data, res.data.data]
                        setData([...dataUpdate])
                    })
                    .catch(function (err) {
                      MyToast('error', err.response.data.message)
                    })
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                let account = new FormData()
                account.append('username_acc', newData.username_acc)
                account.append('password_acc', newData.password_acc)
                account.append('role_acc', newData.role_acc)
                account.append('avatar_acc', newData.avatar_acc)
                setTimeout(() => {
                  axios.put('/api/account/' + newData.id_acc, account)
                    .then( (res)=> {
                        MyToast('success', res.data.message)
                        const dataUpdate = [...data]
                        const index = oldData.tableData.id
                        dataUpdate[index] = res.data.data
                        setData([...dataUpdate])
                    })
                    .catch(function (err) {
                      MyToast('error', err.response.data.message)
                    })
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  fetch('/api/account/' + oldData.id_acc, {
                    method: 'delete'
                  })
                    .then(function (res) {
                      if (res.ok) {
                        MyToast('success', 'Delete success')
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setData([...dataDelete]);
                      }
                      else {
                        MyToast('error', 'Delete failed')
                      }
                    })
                    .catch(function (err) {
                      MyToast('error', 'Network error')
                    })
                  resolve()
                }, 1000)
              }),
          }}
        />
      </ThemeProvider>
    </div>

  )
}

export default AdminAccount