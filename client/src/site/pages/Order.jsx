import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Accordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreLoading from '../component/PreLoading'

const Order = () => {
    const Auth = useAuth()
    const [order, setOrder] = useState([])
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        document.title = 'Order'
    },[])

    const handleChange = (panel) => (event, isExpanded) => {
        console.log(isExpanded)
        console.log(panel)
        setExpanded(isExpanded ? panel : false);

    };

    useEffect(() => {
        axios.get('/api/order/' + Auth.user.user.customer.id_cus)
            .then(async (result) => {
                await new Promise((resolve)=> setTimeout(resolve, 2000))
                setOrder(result.data)
                setLoading(false)
            })
    }, [])

    return (
        <>
            {loading ? <PreLoading/> : 
            <div className=' w-full mt-60'>
            <div className='w-4/5 mx-auto   '>
                {order.map((item, index) => {
                    return (
                        <div className='mt-4'  key={index}>
                            <Accordion expanded={expanded === ("panel" + index)} onChange={handleChange("panel" + index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={"panel" + index + "bh-header"}
                                    id={"panel" + index + "bh-header"}
                                >
                                    <Typography sx={{ width: '10%', flexShrink: 0 }}>
                                        <img className='h-20 w-20 rounded-full' src={process.env.PUBLIC_URL + '/icon/custom-order-numbers-e1438361586475.png'}></img>
                                    </Typography>
                                    <Typography sx={{ width: '90%' }}>
                                        <table className='w-full h-fit text-center table-fixed'>
                                            <thead className=' font-medium'>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>Date order</td>
                                                    <td>Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{item.state_order}</td>
                                                    <td>{new Date(item.created_at).toDateString()}</td>
                                                    <td>${item.total_order.toLocaleString()}</td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ width: '100%' }}>
                                       <div className='w-full'>
                                            {item.order_details.map((orderdetail, index)=>{
                                               return <div key={index} className='grid grid-cols-4 w-full gap-2 justify-between mt-2'>
                                                    <img className=' h-10 object-contain rounded-full' src={process.env.PUBLIC_URL+'/image/watch/'+orderdetail.product.main_img_prd}></img>
                                                    <p>{orderdetail.product.name_prd}</p>
                                                    <p>x{orderdetail.quantity_oddt}</p>
                                                    <p>${orderdetail.product.price_prd.toLocaleString()}</p>
                                                </div>
                                            })}
                                       </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                })}
            </div>
        </div>
        }
        </>
        
    )
}

export default Order