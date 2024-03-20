import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { MyToast } from "../../admin/components/Toast";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

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
              .then(res => MyToast('success', 'Order successfully'))
              .catch((err)=>{
                MyToast('error', 'Order failed')
              })
          });
        }}
        onCancel={(data, actions)=>{
          MyToast('error', 'Payment canceled')
          }
        }
        onError={(data, actions)=>{
          MyToast('error', 'Payment error')
        }}
        
      />
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;