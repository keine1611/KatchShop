import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';
import api from '../../api';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);


const Revenue = ({ days }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        data: []
    })
    const [total, setTotal] = useState(0)

    useEffect(() => {
        api.orderApi.getChartRevenueData(days)
            .then(res => {
                setChartData(res.data)
            })
    }, [days])



    useEffect(() => {
        const totalTemp = chartData.data.reduce((retotal, value) => Number(retotal) + Number(value), 0)
        setTotal(totalTemp)
    }, [chartData])


    return (
        <Line className=''
            data={{
                labels: chartData.labels,
                datasets: [{
                    data: chartData.data,
                    borderWidth: 1,
                    backgroundColor: '#1976d2',
                    borderColor: '#3080d0',
                    fill: false,
                }]
            }}
            options={{
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function (event) {
                                return event.label;
                            },
                            label: function (context) {
                                let label = context.dataset.label || '';

                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Estimated revenue\n' + '$' + total.toLocaleString(),
                        position: 'top',

                    },
                },

            }}


        ></Line>

    )
}
const BestSale = ({ days }) => {
    const [watches, setWatches] = useState([])

    useEffect(() => {
        api.orderApi.getBestSale(days)
            .then((result) => {
                setWatches(result.data)
            })
    }, [days])

    return (
        <div className=' w-full px-10'>
            {watches.map((watch, index) => {
                return (
                    <div className=' flex flex-row items-center gap-5 mt-5'>
                        <span className=' text-white font-bold p-2 bg-black rounded-full '>{index + 1}</span>
                        <div className='flex-1 flex-row flex gap-5'>
                            <img className=' w-24 h-24 object-cover rounded-md' src={api.imageApi.watch + watch.image}/>
                            <div className=' flex-1'>
                                <p className=' text-black font-bold text-md'>{watch.name}</p>
                                <p className=' text-gray-700'>$ {watch.price.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className=' text-gray-700'>{watch.total_quantity_sold}</p>
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    )
}

const AudienceTarget = () => {
    return (
        <div>Audience Target</div>
    )
}

const tabList = [
    {
        value: 'revenue',
        label: 'Revenue',
        content: (days) => <Revenue days={days} />
    },
    {
        value: 'bestsaleproduct',
        label: 'Best Sale',
        content: (days) => <BestSale days={days} />
    },
    {
        value: 'audiencetarget',
        label: 'Audience Target',
        content: (days) => <AudienceTarget days={days} />
    }
]



const AdminStatistical = () => {
    const [tabIndex, setTabIndex] = useState('revenue')
    const [tabData, setTabData] = useState(tabList[0])
    const [days, setDays] = useState('7')
    const handleChange = (event, newValue) => {
        setTabIndex(newValue)

    }

    useEffect(() => {
        const selectedTab = tabList.find(tab => tab.value === tabIndex)
        setTabData(selectedTab)
    }, [tabIndex])

    return (
        <div className='w-full'>
            <div className=' flex flex-row '>
                <Tabs className=' flex-1' value={tabIndex} onChange={handleChange} centered

                >
                    {
                        tabList.map((tab) => {
                            return <Tab label={tab.label} value={tab.value}></Tab>
                        })
                    }
                </Tabs>
                <select value={days} onChange={(e) => { setDays(e.target.value) }} className="select max-w-xs">
                    <option value={'7'}>Last 7 days</option>
                    <option value={'28'}>Last 28 days</option>
                    <option value={'90'}>Last 90 days</option>
                    <option value={'365'}>Last 365 days</option>
                    <option value={'all'}>All the time</option>
                </select>
            </div>
            <div className=''>
                {tabData.content(days)}
            </div>
        </div>
    )
}




export default AdminStatistical