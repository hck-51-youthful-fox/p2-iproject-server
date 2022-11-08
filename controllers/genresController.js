const { Genre } = require(`../models`);

class Controller {
    static async fetchGenres(req,res,next) {
        try {
            let genres = await Genre.findAll()

            res.status(200).json({
                genres
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;