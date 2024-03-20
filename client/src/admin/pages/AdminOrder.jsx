import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MyToast } from '../components/Toast'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme, Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { input } from '@material-tailwind/react'

const AdminOrder = () => {
  const [data, setData] = useState([])


  const getData = () => {
    axios.get('/api/order')
      .then((result) => {
        setData(result.data)
      }).catch((err) => {
        setData([])
      });
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  const [columns, setColumns] = useState([
    {
      title: 'Name', editable: false, field: 'name_cus', cellStyle: { width: "20%" }, render: (row) => row.customer.name_cus
    },
    {
      title: 'Address', editable: false, cellStyle: { width: "20%" }, render: (row) => row.customer.address_cus
    },
    {
      title: 'Date create', editable: false, cellStyle: { width: "20%" }, render: (row) => { const date = new Date(row.created_at).toDateString(); return date }
    },
    {
      title: 'Date update', editable: false, cellStyle: { width: "20%" }, render: (row) => { const date = new Date(row.updated_at).toDateString(); return date }
    },
    {
      title: 'State', field: 'state_order', cellStyle: { width: "20%" }, lookup: { 'WAITING FOR CONFIRM': <div><AccessTimeIcon sx={{ color: '#8AA116' }} /> Waitting</div>, 'CONFIRMED': <div><CheckIcon sx={{ color: '#24DC8C' }} /> Confirmed</div>, 'SHIPPING': <div><LocalShippingIcon sx={{ color: '#0868F7' }} /> Shipping</div> }, validate: rowData => {
        if (rowData.state_order === undefined)
          return "Required"
        return true
      }
    }, {
      title: 'Amount', field: 'total_order', editable: false, cellStyle: { width: "20%" }, render: (row) => { const money = row.total_order; return '$' + money.toLocaleString() }
    }
  ])

  const defaultMaterialTheme = createTheme()
  return (
    <div className='pt-5 w-full'>
      <ThemeProvider theme={defaultMaterialTheme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Order"
          columns={columns}
          data={data}
          options={{
            actionsColumnIndex: -1, addRowPosition: 'first',
            maxBodyHeight: "480px",
            pageSize: 10,
            tableLayout: "auto",
            rowStyle: {
              fontSize: 14,
            }

          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                var order = {
                  state_order: newData.state_order
                }
                setTimeout(() => {
                  fetch('/api/order/' + newData.id_order, {
                    method: 'put',
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order)
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
                  fetch('/api/order/' + oldData.id_order, {
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
          detailPanel={rowData => {
            return (
              <div className=' bg-blue-gray-50 w-full'>
                <table className='w-2/4 mr-auto mx-10'>
                  <tbody>
                    {rowData.order_details.map((item) => {
                      return (
                        <tr>
                          <td><Avatar sx={{ width: 50, height: 50, objectFit: 'contain' }} src={process.env.PUBLIC_URL + '/image/watch/' + item.product.main_img_prd}></Avatar></td>
                          <td>{item.product.name_prd}</td>
                          <td>x{item.quantity_oddt}</td>
                          <td>${item.product.price_prd.toLocaleString()}</td>
                        </tr>)
                    })
                    }

                  </tbody>
                </table>
              </div>

            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </ThemeProvider>
    </div>
  )

}

export default AdminOrder