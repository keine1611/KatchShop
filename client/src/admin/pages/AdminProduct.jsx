import React from 'react'
import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { Hidden, ThemeProvider, createTheme, Avatar } from '@mui/material'
import { Textarea } from '@material-tailwind/react'
import { MyToast } from '../components/Toast'



const brand = {}
fetch('/api/brand')
    .then(res => res.json())
    .then(function (data) {
        data.forEach(element => {
            Object.assign(brand, { [Number(element.id_brand)]: element.name_brand })
        });
    })
const AdminProduct = () => {
    const [data, setData] = React.useState([]);
    useEffect(function () {
        getData()
    }, [])
    const getData = () => {
        fetch('/api/product')
            .then(res => res.json())
            .then(data => setData(data))
    }




    const [columns, setColumns] = useState([
        {
            title: ' ', field: 'main_img_prd', editable: false, render: function (row) {
                var img = process.env.PUBLIC_URL + '/image/watch/' + row.main_img_prd
                return <Avatar sx={{ width: 60, height: 60 }} src={img}></Avatar>
            },
        },
        {
            title: 'Name', field: 'name_prd', validate: rowData => {
                if (rowData.name_prd === undefined || rowData.name_prd === '')
                    return "Required"
                else if (rowData.name_prd.length > 50)
                    return 'Max length is 20 character'
                return true
            }
        },
        {
            title: 'Price', field: 'price_prd', type: 'numeric', initialEditValue: '', validate: rowData => {
                if (rowData.price_prd === undefined || rowData.price_prd === '')
                    return "Required"
                else if (rowData.price_prd === 0)
                    return 'Price must be higher 0'
                return true
            }
        },
        {
            title: 'Size', field: 'size_prd', type: 'numeric', initialEditValue: '', validate: rowData => {
                if (rowData.size_prd === undefined || rowData.size_prd === '')
                    return "Required"
                else if (rowData.size <= 0)
                    return 'Size must be higher 0'
                else if (rowData.size_prd > 50)
                    return 'Max size is 50'
                return true
            }
        },
        {
            title: 'Quantity', field: 'quantity_prd', type: 'numeric', validate: rowData => {
                if (rowData.quantity_prd === undefined || rowData.quantity_prd === '')
                    return "Required"
                return true
            }
        },
        {
            title: 'Gender', field: 'gender_prd', lookup: { 0: 'Male', 1: 'Female', 2: 'All' }, validate: rowData => {
                if (rowData.gender_prd === undefined || rowData.ge === '')
                    return "Required"
                return true
            }
        },
        {
            title: 'Description', field: 'description_prd', render: (row) => <Textarea variant="soft" rows={2} disabled>{row.description_prd}</Textarea>, validate: rowData => {
                if (rowData.description_prd === undefined || rowData.description_prd === '')
                    return "Required"
                else if (rowData.description_prd.length > 2000)
                    return 'Max length is 2000 character'
                return true
            }
        },
        {
            title: 'Brand', field: 'id_brand', lookup: brand, validate: rowData => {
                if (rowData.id_brand === undefined || rowData.id_brand === '')
                    return "Required"
                return true
            }
        },
    ]);


    const defaultMaterialTheme = createTheme()
    return (
        <div className='pt-5'>
            <ThemeProvider theme={defaultMaterialTheme}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <MaterialTable className='pr-5 pl-5'
                    title="Product Table"
                    columns={columns}
                    data={data}
                    options={{
                        actionsColumnIndex: -1, addRowPosition: 'first',
                        maxBodyHeight: "480px",
                        pageSize: 10,
                        rowStyle: {
                            height: "50px",
                            padding: 0
                        },
                        padding: 5
                    }
                    }
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    fetch('/api/product/', {
                                        method: 'post',
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(newData)
                                    })
                                        .then(function (res) {
                                            if (res.ok) {
                                                MyToast('success', 'Add success')
                                                getData()
                                            }
                                            else {
                                                MyToast('error', 'Add failed')
                                            }
                                        })
                                        .catch(function (err) {
                                            MyToast('error', 'Network error')
                                        })
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                function getPrd({ brand, id_prd, main_img_prd, ...rest }) {
                                    return rest
                                }
                                var product = getPrd(newData)
                                setTimeout(() => {
                                    fetch('/api/product/' + newData.id_prd, {
                                        method: 'put',
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(product)
                                    })
                                        .then(function (res) {
                                            if (res.ok) {
                                                MyToast('success', 'Update success')
                                                const dataUpdate = [...data]
                                                const index = oldData.tableData.id
                                                dataUpdate[index] = newData
                                                setData([...dataUpdate])
                                            }
                                            else {
                                                MyToast('error', 'No have change to update')
                                            }
                                        })
                                        .catch(function (err) {
                                            MyToast('error', 'Network error')
                                        })
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    fetch('/api/product/' + oldData.id_prd, {
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

export default AdminProduct