const { Like, Video } = require('../models');
const { VideoController } = require('./videoController');

class LikeController {
	static async findOrCreate (req, res, next) {
		try {
			const userId = req.user.id
			const videoYtbId = req.params.videoId //videoYtbId diganti dari videoId tadinya, diganti biar ga ketuker sm FK
			const { title, link, avatarUrl, channel, views, publishedDate, isVerified } = req.body
			let [video, createdVid] = await Video.findOrCreate({
				where: { videoYtbId }, // identifier 
				defaults: {
					title, link, avatarUrl, channel, views, publishedDate, isVerified, videoYtbId
				}
			})
			let [like, createdLike] = await Like.findOrCreate({
				 where: { userId, videoId: video.id },
					defaults: {
						userId, videoId: video.id
					}
			})
			res.status(201).json({
				// video,
				message: "Video has been added to your list!"
			})
		} catch (err) {
			next(err)
		}
	}
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
	// static async destroy (req, res, next) {
	// 	try {
	// 		const { id } = req.params // dpt idnya like
	// 		const userId = req.user.id

	// 		const foundLike = await Like.findByPk(id)
	// 		if (!foundLike) throw { name: 'DATA_NOT_FOUND', model: 'Video' }
	// 		const data = await Like.destroy({ 
	// 			where: {
	// 				id
	// 				// [Op.and]: [{ userId }, { videoId }],
	// 				// userId, videoId
	// 			} 
	// 		})
	// 		res.status(200).json({
	// 			message: 'Successfully remove video from your list!'
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// }
}

module.exports = {
	LikeController
};

