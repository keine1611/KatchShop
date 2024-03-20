const db = require('../model')



exports.findInfoCustomer = async (id)=>{
    const account = await db.account.findByPk(id,{include: db.customer})
    const customerInfo = {
        id_acc: id,
        avatar_acc: account.avatar_acc,
        name: account.customer.name_cus
    }
    return customerInfo
}