const db = require("../model");
const Message = db.message
const Op = db.Sequelize.Op
const {getReceiverSocketId} = require('../../socket/socketMessage');
const { resolve } = require("path");


exports.getHistoryMessages = async (req, res) => {
    try {
        let id_receive = req.query.id_receive
        let id_send = req.query.id_send
        let messages
        if(id_receive !== undefined && id_send !== undefined){
           messages =  await Message.findAll({
                where: {
                    [Op.or]: [
                        { id_acc_send: id_send, id_acc_receive: id_receive }, { id_acc_send: id_receive, id_acc_receive: id_send }]
                }
            })
        }
        else{
            messages = await Message.findAll()
        }
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getHistoryMessagesUser = async (req, res) => {
    const id = req.params.id
    Message.findAll({
        where:{
            [Op.or]:[{id_send: id}, {id_receive: id}]
        }
    })
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
   
}

exports.create = async (req, res)=>{
    const promise = new Promise(async (resolve, reject)=>{
        let conversation = await db.conversation.findOne({
            where:{
                [Op.or]:[
                    {[Op.and]:[{id_acc1: req.body.id_send},{id_acc2: req.body.id_receive}]},
                    {[Op.and]:[{id_acc2: req.body.id_send},{id_acc1: req.body.id_receive}]}
                ]
            }
        })

        try {
            if(conversation){
                resolve(conversation.id)
            }
            else{
                const newConver = await db.conversation.create({id_acc1: req.body.id_receive, id_acc2: req.body.id_send})
                resolve(newConver.id)
            }
        } catch (error) {
            reject(error)
        }
       
    })
    const id_conversation = await promise
    const message = {
        content: req.body.content,
        id_receive: req.body.id_send,
        id_send: req.body.id_receive,
        id_conversation: id_conversation
    }

    db.message.create(message)
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send('Server error')
    });
}

