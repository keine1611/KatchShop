import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { MyToast } from "../../admin/components/Toast";
import { useAuth } from "../../context/AuthContext";
import ReactDOMServer from 'react-dom/server';
import axios from "axios";
import ConfirmOrder from "../../admin/components/MailTemplate/ConfirmOrder";
import emailjs from '@emailjs/browser'


const PayPalComponent = ({ amount, orderItem }) => {

  const auth = useAuth()
  const initialOptions = {
    clientId: 'AQV8ebIT4jsmgjrQP5uG1uLIMNRUKOJviE6_UXCsWbH2SlkW5CA5vbO10l5xu4iuKZPBqLHcqS-S0M3h',
    currency: "USD",
    intent: "capture",
  };

  // const handleRefund = () => {
  //   const refundData = {
  //     invoice_id: 'ORIGINAL_TRANSACTION_ID',
  //     amount: {
  //       value: 'AMOUNT_TO_REFUND',
  //     },
  //   };

  //   axios.post('https://api.paypal.com/v2/payments/captures/CAPTURE_ID/refund', refundData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer YOUR_PAYPAL_API_TOKEN`,
  //     },
  //   })
  //     .then((response) => {
  //       // Handle the refund response.
  //       console.log('Refund Successful', response.data);
  //     })
  //     .catch((error) => {
  //       // Handle refund error.
  //       console.error('Refund Error', error);
  //     });
  // };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "USD" // Replace with your desired amount
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            const dataSend = {
              orderItem: orderItem,
              id_cus: auth.user.user.customer.id_cus,
              amount: amount
            }
            axios.post('/api/order/createorder', { data: dataSend })
              .then(res => {
                const content = ReactDOMServer.renderToString(<ConfirmOrder orderItem={orderItem}/>)
                emailjs.send('service_sj4dakg', 'template_r6v3et1', {
                  message: content,
                  to: 'anh7500@gmail.com',
                  subject: 'ORDER CONFIRM',
                },'yM9CDId3lgPi-yrBZ').then(
                  (response) => {
                    console.log(response)
                  },
                  (error) => {
                    console.log(error)
                  },
                );
                MyToast('success', 'Order successfully')
              })
              .catch((err) => {
                MyToast('error', 'Order failed')
              })
          });
        }}
        onCancel={(data, actions) => {
          MyToast('error', 'Payment canceled')
        }
        }
        onError={(data, actions) => {
          MyToast('error', 'Payment error')
        }}

      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;