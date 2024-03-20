import React from 'react'
import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme, Avatar  } from '@mui/material'
import { MyToast } from '../components/Toast'
import axios from 'axios'

const CustomEditAvatar = ({ value, onChange }) => {
  const [avatar, setAvatar] = useState('/uploads/images/brands/' + value)
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
      <Avatar src={avatar} style={{ width: '100px', height: '100px' }} variant="rounded"/>
      <input className=' my-auto mx-2 file-input file-input-bordered w-full max-w-xs' type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};

const AdminBrand = () => {
  const [data, setData] = React.useState([]);
  
  useEffect(function () {
    getData()
  }, [])
  const getData = () => {
    fetch('/api/brand')
      .then(res => res.json())
      .then(data => setData(data))
  }

  const [columns, setColumns] = useState([
    {
      title: ' ', field: 'logo_brand', cellStyle: { width: "10%"},
      editComponent: props => <CustomEditAvatar {...props} />,
      render: function(row) {
          var img = '/uploads/images/brands/' + row.logo_brand
          return <Avatar sx={{ width: 100, height: 100, objectFit: 'contain'}} variant="rounded" src={img}></Avatar>
      },
  },
    { title: 'Name', field: 'name_brand', cellStyle: { width: "20%", fontWeight: 'bold' }, validate: rowData =>{
        if(rowData.name_brand === undefined || rowData.name_brand === '')
          return "Required"
        else if(rowData.name_brand.length > 20)
          return 'Max length is 20 character'
        return true
      } 
    },
    { title: 'Description', field: 'description_brand', initialEditValue: '',validate: rowData =>{
      if(rowData.description_brand === undefined || rowData.description_brand === '')
        return "Required"
      else if(rowData.description_brand.length > 2000)
        return 'Max length is 2000 character'
      return true
    }  },
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
                let brand = new FormData()
                brand.append('name_brand', newData.name_brand)
                brand.append('description_brand', newData.description_brand)
                brand.append('logo_brand', newData.logo_brand)
                setTimeout(() => {
                  axios.post('/api/brand/', brand)
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
                let brand = new FormData()
                brand.append('name_brand', newData.name_brand)
                brand.append('description_brand', newData.description_brand)
                brand.append('logo_brand', newData.logo_brand)
                setTimeout(() => {
                  axios.put('/api/brand/' + newData.id_brand, brand)
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
                  fetch('/api/brand/' + oldData.id_brand, {
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

export default AdminBrand