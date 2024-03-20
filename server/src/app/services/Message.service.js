const db = require('../model')
const Op = db.Sequelize.Op

exports.saveMessage = async ({id_send, id_receive , content }) =>{
    const promise = new Promise(async (resolve, reject)=>{
        let conversation = await db.conversation.findOne({
            where:{
                [Op.or]:[
                    {[Op.and]:[{id_acc1: id_send},{id_acc2: id_receive}]},
                    {[Op.and]:[{id_acc2: id_send},{id_acc1: id_receive}]}
                ]
            }
        })

        try {
            if(conversation){
                resolve(conversation.id)
            }
            else{
                const newConver = await db.conversation.create({id_acc1: id_send, id_acc2: id_receive})
                resolve(newConver.id)
            }
        } catch (error) {
            reject(error)
        }
       
    })
    const id_conversation = await promise
    const message = {
        content: content,
        id_receive: id_receive,
        id_send: id_send,
        id_conversation: id_conversation
    }

    const messageResult = await db.message.create(message)
    return messageResult
}