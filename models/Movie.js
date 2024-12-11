const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, 'Please add a movie name'],
            trim: true
        },
        length: {
            type: Number,
            required: [true, 'Please add a movie length']
        },
        img: {
            type: String,
            required: [true, 'Please add a movie img'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Please add a movie description']
        },
        director: {
            type: String,
            required: [true, 'Please add a movie director']
        },
        actors: {
            type: [String],
            required: [true, 'Please add movie actors']
        },
        genres: {
            type: [String],
            required: [true, 'Please add movie genres']
        }
    },
    { timestamps: true }
) 

movieSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	const movieId = this._id
	const showtimes = await this.model('Showtime').find({ movie: movieId })

	for (const showtime of showtimes) {
		await showtime.deleteOne()
	}
	next()
})

module.exports = mongoose.model('Movie', movieSchema)

// {
//     "movie": "67579be7de5c990a6ef083d0",
//     "showtime": "2024-12-29T14:00:00",
//     "theater": "6757eae44770f891cb862f12",
//     "isRelease": false
// }