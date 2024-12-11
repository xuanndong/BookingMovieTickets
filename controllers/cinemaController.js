const Cinema = require('../models/Cinema')

//@desc     GET all cinemas
//@route    GET /cinema
//@access   Public --- checked
exports.getCinemas = async (req, res, next) => {
	try {
		const cinemas = await Cinema.find()
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.collation({ locale: 'en', strength: 2 })
			.sort({ name: 1 })
			.then((cinemas) => {
				cinemas.forEach((cinema) => {
					cinema.theaters.forEach((theater) => {
						theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
					})
				})
				return cinemas
			})

		res.status(200).json({ success: true, count: cinemas.length, data: cinemas })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET all cinemas with all unreleased showtime
//@route    GET /cinema/unreleased
//@access   Private admin --- checked
exports.getUnreleasedCinemas = async (req, res, next) => {
	try {
		const cinemas = await Cinema.find()
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.collation({ locale: 'en', strength: 2 })
			.sort({ name: 1 })

		res.status(200).json({ success: true, count: cinemas.length, data: cinemas })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single cinema
//@route    GET /cinema/:id 
//@access   Public --- checked
exports.getCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findById(req.params.id)
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.then((cinema) => {
				// cinemas.forEach((cinema) => {
				// 	cinema.theaters.forEach((theater) => {
				// 		theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
				// 	})
				// })
				// return cinemas
				cinema.theaters.forEach((theater) => {
					theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
				})

				return cinema;
			})

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}

//@desc     Create cinema
//@route    POST /cinema
//@access   Private --- checked
exports.createCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.create(req.body);
		res.status(201).json({
			success: true,
			data: cinema
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}

//@desc     Update cinemas
//@route    PUT /cinema/:id
//@access   Private Admin --- checked
exports.updateCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete single cinema
//@route    DELETE /cinema/:id
//@access   Private Admin --- checked
exports.deleteCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findById(req.params.id)

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}

		const result = await cinema.deleteOne();
		if (result.deletedCount === 0) {
			return res.status(400).json({ success: false, message: `Failed to delete cinema with id of ${req.params.id}` });
		}
		return res.status(200).json({ success: true, message: cinema});
	} catch (err) {
		console.error(err)
		res.status(400).json({ success: false, message: err.message })
	}

}