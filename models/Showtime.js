const mongoose = require('mongoose')

const showtimeSchema = new mongoose.Schema({
	theater: { type: mongoose.Schema.ObjectId, ref: 'Theater' },
	movie: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
	// showtime: Date,
	showtime: {
		type: Date, required: false
	},
	seats: [
		{
			row: { type: String, required: [true, 'Please add a seat row'] },
			number: { type: Number, required: [true, 'Please add a seat number'] },
			user: { type: mongoose.Schema.ObjectId, ref: 'User' }
		}
	],
	isRelease: Boolean
}) 

showtimeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	const showtimeId = this._id
	await this.model('User').updateMany(
		{ 'tickets.showtime': showtimeId },
		{ $pull: { tickets: { showtime: showtimeId } } }
	)
	next()
})

module.exports = mongoose.model('Showtime', showtimeSchema) 

// {
//     "movie": "67579be7de5c990a6ef083d0",
//     "showtime": "2024-12-16 18:30",
//     "theater": "675501d8765f8f1d6a7bb1d1",
//     "isRelease": true
// }