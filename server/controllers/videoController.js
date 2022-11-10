const { Video } = require('../models');

class VideoController {
	// static async findAll (req, res, next) {
	// 	try {
	// 		const data = await Video.findAll({
	// 			order: [['createdAt', 'DESC']]
	// 		})
	// 		res.status(201).json(data)
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// }
	static async findOrCreate (req, res, next) {
		try {
			const {videoId} = req.params
			const { title, link, channel, views, publishedDate, isVerified,  } = req.body
			let [video, created] = await Video.findOrCreate({
				where: { link },
				defaults: {
					title, link, channel, views, publishedDate, isVerified, videoId
				}
			})
			next(video)
		} catch (err) {
			next(err)
		}
	}
	// static async destroy (req, res, next) {
	// 	try {
	// 		const { id } = req.params
	// 		const foundLike = await Video.findByPk(id)
	// 		if (!foundLike) throw { name: 'DATA_NOT_FOUND', model: 'Video' }
	// 		const data = await Like.destroy({ 
	// 			where: {
	// 				id
	// 			} 
	// 		})
	// 		res.status(200).json({
	// 			message: 'Successfully delete video from database!'
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// }
}

module.exports = {
	VideoController
};

