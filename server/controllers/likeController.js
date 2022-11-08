const { Like, Video } = require('../models');

class LikeController {
	static async findAll (req, res, next) {
		try {
			const userId = req.user.id
			let data = await Like.findAll({
				where: {
					userId
				},
				include: Video,
				order: [['createdAt', 'DESC']]
			})
			res.status(201).json(data)
		} catch (err) {
			next(err)
		}
	}
	static async findOrCreate (req, res, next) {
		try {
			const userId = req.user.id
			const {videoId} = req.params
			let [like, created] = await Like.findOrCreate({
				 where: { userId, videoId },
					defaults: {
						userId, videoId
					}
			})
			res.status(201).json({
				message: "Video has been added to your list!"
			})
		} catch (err) {
			next(err)
		}
	}
	static async destroy (req, res, next) {
		try {
			const { id } = req.params // dpt idnya like
			const userId = req.user.id

			const foundLike = await Like.findByPk(id)
			if (!foundLike) throw { name: 'DATA_NOT_FOUND', model: 'Video' }
			const data = await Like.destroy({ 
				where: {
					id
					// [Op.and]: [{ userId }, { videoId }],
					// userId, videoId
				} 
			})
			res.status(200).json({
				message: 'Successfully remove video from your list!'
			})
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	LikeController
};

