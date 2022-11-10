const axios = require('axios');
const headers = {
	"X-RapidAPI-Key": "372d7cc145msh41c6b2e31b70ea7p1dbeadjsnb961c1f07162",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
}
// const { Op } = require('sequelize');

class YoutubeController {
	static async findAll (req, res, next) {
		try {
			const {keyword} = req.query
			const { data } = await axios({
				method: 'GET',
				url: 'https://youtube138.p.rapidapi.com/search/',
				params: {q: keyword},
				headers
			})
			let videos = data.contents.map(el => {
				el.avatarUrl = el.video?.author?.avatar[0]?.url
				// el.canonicalBaseUrl = el.video?.author?.canonicalBaseUrl
				// el.channelId = el.video?.author?.channelId
				// el.badges = el.video?.author?.badges.type
				el.channel = el.video?.author?.title
				// el.description = el.video?.descriptionSnippet
				el.views = el.video?.stats?.views
				el.link = el.video?.thumbnails[0]?.url
				el.publishedDate = el.video?.publishedTimeText
				el.title = el.video?.title
				el.videoId = el.video?.videoId
				return el
			})
			res.status(200).json(videos)
		} catch (err) {
			next(err)
		}
	}
	static async findOne (req, res, next) {
		try {
			const id = req.params.id;
			const { data } = await axios({
				method: "GET",
				url: 'https://youtube138.p.rapidapi.com/video/details/',
  				params: {id},
				headers
			});
			let video = {
				avatarUrl: data.author?.avatar[0]?.url,
				// badges: data.author?.badges?.type,
				// channelId: data.author?.channelId,
				subscribers: data.author?.stats?.subscribersTex,
				channel: data.author?.title,
				// category: data.category,
				description: data.description,
				thumbnails: data.thumbnails[0]?.url,
				videoId: data.videoId,
				title: data.title,
				keywords: data.keywords,
				publishedDate: data.publishedDate,
				commentsCount: data.stats.comments,
				likesCount: data.stats.likes,
				viewsCount: data.stats.views,
			};
			res.status(200).json(video);
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	YoutubeController
};
