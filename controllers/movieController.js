const Movie = require('../models/Movie')
const Showtime = require('../models/Showtime')
const moment = require("moment-timezone")

//@desc     GET all movies
//@route    GET /movie
//@access   Public --- checked
exports.getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find().sort({ createdAt: -1 })
		res.status(200).json({ success: true, count: movies.length, data: movies })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET showing movies
//@route    GET /movie/showing
//@access   Public --- checked
exports.getShowingMovies = async (req, res, next) => {
	try {

		const hanoiTime = moment.utc().tz('Asia/Ho_Chi_Minh').toDate();

		const showingShowtime = await Showtime.aggregate([
			// lọc các suất chiếu đang diễn ra và đã được phát hành			
			{
				
				$match: {
					showtime: { $gte: hanoiTime },
					isRelease: true
				}
			},

			// kết hợp với thông tin phim
			{
				$lookup: {
					from: 'movies', // Replace "movies" with the actual collection name of your movies
					localField: 'movie',
					foreignField: '_id',
					as: 'movie'
				}
			},

			// nhóm theo phim và đếm số lượng suất chiếu
			{
				$group: {
					_id: '$movie',
					count: { $sum: 1 }
				}
			},

			// mở rộng dữ liệu và kết hợp
			{
				$unwind: '$_id'
			},
			{
				$replaceRoot: {
					newRoot: {
						$mergeObjects: ['$$ROOT', '$_id']
					}
				}
			},

			// sắp xếp theo số lượng suất chiếu giảm dần
			{
				$sort: { count: -1 }
			}
		])

		res.status(200).json({ success: true, data: showingShowtime })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err.message })
	}
}

//@desc     GET showing movies with all unreleased showtime
//@route    GET /movie/unreleased/showing
//@access   Private admin --- checked
exports.getUnreleasedShowingMovies = async (req, res, next) => {
	try {

		const hanoiTime = moment.utc().tz('Asia/Ho_Chi_Minh').toDate();

		const showingShowtime = await Showtime.aggregate([

			{ $match: { showtime: { $gte: hanoiTime }, isRelease: false } },
			
			{
				$lookup: {
					from: 'movies', // Replace "movies" with the actual collection name of your movies
					localField: 'movie',
					foreignField: '_id',
					as: 'movie'
				}
			},
			{
				$group: {
					_id: '$movie',
					count: { $sum: 1 }
				}
			},
			{
				$unwind: '$_id'
			},
			{
				$replaceRoot: {
					newRoot: {
						$mergeObjects: ['$$ROOT', '$_id']
					}
				}
			},
			{
				$sort: { count: -1, updatedAt: -1 }
			}
		])

		res.status(200).json({ success: true, data: showingShowtime })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single movie
//@route    GET /movie/:id
//@access   Public --- checked
exports.getMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findById(req.params.id)

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: movie })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Create movie
//@route    POST /movie
//@access   Private  --- checked
exports.createMovie = async (req, res, next) => {
	try {
		const { actors, genres, ...rest} = req.body;
		// Chuyển đổi chuỗi actors và genres thành mảng
		const actorsArray = actors ? actors.split(",").map(actor => actor.trim()) : [];
		const genresArray = genres ? genres.split(",").map(genre => genre.trim()) : [];

		const movieData = {
			...rest,
			actors: actorsArray,
			genres: genresArray,
		};
		const movie = await Movie.create(movieData)
		res.status(201).json({
			success: true,
			data: movie
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}

//@desc     Update movies
//@route    PUT /movie/:id
//@access   Private Admin --- checked
exports.updateMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: movie })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete single movies
//@route    DELETE /movie/:id
//@access   Private Admin --- checked
exports.deleteMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findById(req.params.id)

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}

		await movie.deleteOne()
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}