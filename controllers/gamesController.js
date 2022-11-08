const { Games } = require(`../models`);

const rawgUrl = "https://api.rawg.io/api/games"

class Controller {
    static async fetchGames(req,res,next) {
        try {
            let  { genre } = req.params

            let where = {

            }

            let games = Games.findAll(where)

            res.status(200).json({
                games
            })
        } catch (error) {
            next(error)
        }
    }

    static async exploreGames() {
        try {
            let {data} = axios.get(`${rawgUrl}/`,{})
        } catch (error) {
            next(error)
        }
    }

    static postGameFromExplore() {

    }
}

module.exports = Controller;