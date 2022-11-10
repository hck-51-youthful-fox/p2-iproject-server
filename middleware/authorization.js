const {Note} = require('../models')

const authorization = async(req, res, next) => {
    try {
        let { id } = req.params
        let userId = req.user.id

        let dataNote = await Note.findOne({
            where: {
                id
            }
        })

        if (!dataNote) {
            throw { name: `Data Not Found`}
        }

        if (dataNote.userId !== userId) {
            throw { name: `FORBIDDEN` }
        } else {
            next()
        }
    } catch (error) {
        next(error);
    }
}
  
module.exports = authorization
