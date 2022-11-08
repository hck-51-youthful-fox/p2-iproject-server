const axios = require('axios');
const { Video } = require('../models');
const headers = {
	"X-RapidAPI-Key": "372d7cc145msh41c6b2e31b70ea7p1dbeadjsnb961c1f07162",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
}
// const { Op } = require('sequelize');

class VideoController {
	static async findAll (req, res, next) {
		try {
			const { data } = await axios.get({
				method: 'GET',
				url: 'https://youtube138.p.rapidapi.com/search?q=blackpink',
				headers
			})
			let videos = data.contents.map(el => {
				el.avatarUrl = el.video?.author?.avatar[0]?.url
				el.type = el.type
				el.canonicalBaseUrl = el.video?.author?.canonicalBaseUrl
				el.channelId = el.video?.author?.channelId
				el.titleChannel = el.video?.author?.title
				el.description = el.video?.descriptionSnippet
				el.thumbnailUrl = el.video?.thumbnails[0]?.url
				el.views = el.video?.stats?.views
				el.videoId = el.video?.videoId
				el.titleVideo = el.video?.title
			})
			res.status(200).json(data)
		} catch (err) {
			next(err)
		}
	}
	static async findOne (req, res, next) {
		const id = req.params.id
		try {
			const Video = await Video.findByPk(id, {
				include: {
					model: Category
				}
			})
			const { data:qrcode } = await axios.get(`https://api.happi.dev/v1/qrcode?data=https://ikea-client-facing.web.app/Videos/${id}&apikey=${process.env.HAPPI_API_KEY}`)
			if (!Video) {
				throw { name: 'DATA_NOT_FOUND', id, model: 'Video'}
			}
			res.status(200).json({
				Video, qrcode
			})
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	VideoController
};
