const db = require("../model");
const Op = db.Sequelize.Op;


exports.findConversationForAdmin = async (req, res) => {
    const id = req.params.id
    try {
        const conversations = await db.conversation.findAll({
            where: {
                [Op.or]: [{ id_acc1: id }, { id_acc2: id }]
            },
            include: [
                { model: db.account, as: 'account1' },
                { model: db.account, as: 'account2' }
            ]
        })
        async function getConverstationWithAccountInfo(conversations) {
            const conversationsWithAccountInfo = await Promise.all(conversations.map(async (conversation) => {
                let otherAccount;
                if (conversation.id_acc1 === id) {
                    otherAccount = conversation.account2;
                } else {
                    otherAccount = conversation.account1;
                }
                let customer = await db.customer.findOne({ where: { id_acc: otherAccount.id_acc } })
                otherAccount = {
                    id_acc: otherAccount.id_acc,
                    avatar_acc: otherAccount.avatar_acc,
                    name: customer ? customer.name_cus : "Unknown"
                }
                return {
                    id: conversation.id,
                    otherAccount
                }
            }))
            return conversationsWithAccountInfo
        }
        const conversationsWithAccountInfo = await getConverstationWithAccountInfo(conversations)
        res.status(200).send(conversationsWithAccountInfo)
    } catch (error) {
        res.status(200).send('Get error')
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id
    db.conversation.findByPk(id, { include: [db.message, { model: db.account, as: 'account1', include: [db.customer] }] })
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send('Server error')
        });
}

exports.getConversationForAdmin = async (req, res) => {
    try {
        const { id, id_admin } = req.query
        const conver =  await db.conversation.findByPk(id, { include: [db.message, { model: db.account, as: 'account1' },{ model: db.account, as: 'account2' }] })
        let otherAccount
        if(conver.account1.id_acc !== id_admin){
            otherAccount = conver.account1
        }
        else{
            otherAccount = conver.account2
        }
    
        const customer = await db.customer.findOne({where:{id_acc: otherAccount.id_acc}})
    
        res.status(200).send({messages: conver.messages, customer: {avatar_acc: otherAccount.avatar_acc, ...customer.dataValues}})
    } catch (error) {
        res.status(500).send('Server errors')
    }
  

}