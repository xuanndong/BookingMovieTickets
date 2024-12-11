const User = require('../models/User');

// @desc    Register user
// @route   POST /auth/register
// @access  Public --- checked

exports.register = async(req, res, next) => {
    try {
        const { username, email, password, role = 'user' } = req.body;
        
		const existingUser = await User.findOne({
			$or: [{username}, {email}],
		});

		if (existingUser) {
			let message;
			if (existingUser.username === username && existingUser.email === email) {
			  	message = 'Username and email already exist.';
			} else if (existingUser.username === username) {
			  	message = 'Username already exists.';
			} else {
			  	message = 'Email already exists.';
			}
			return res.status(400).json({ success: false, message });
		}

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            role
        })

        sendTokenResponse(user, 200, res)
    }catch (err) {
        // res.status(400).json({ success: false, message: err });
		let errorMessages = '';

		// Handle Mongoose validation errors
		if (err.name === 'ValidationError') {
		  	for (const field in err.errors) {
				errorMessages += `${err.errors[field].message}\n`;
		  	}
		} else {
		  	// Handle other errors (e.g., duplicate key errors)
		  	errorMessages = err.message;
		}
	
		res.status(400).json({ success: false, message: errorMessages });
    }
}

//@desc		Login user
//@route	POST /auth/login
//@access	Public --- checked

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body

		//Validate email & password
		if (!username || !password) {
			return res.status(400).json('Please provide an username and password')
		}

		//Check for user
		const user = await User.findOne({ username }).select('+password')

		if (!user) {
			return res.status(400).json('Invalid credentials')
		}

		//Check if password matches
		const isMatch = await user.matchPassword(password)

		if (!isMatch) {
			return res.status(401).json('Invalid credentials')
		}

		sendTokenResponse(user, 200, res)
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	//Create token
	const token = user.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}
	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token
	})
}

//@desc		Get current Logged in user
//@route 	GET /auth/me
//@access	Private --- checked
exports.getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id)
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc		Get user's tickets
//@route 	GET /auth/tickets
//@access	Private --- checked
exports.getTickets = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id, { tickets: 1 }).populate({
			path: 'tickets.showtime',
			populate: [
				'movie',
				{ path: 'theater', populate: { path: 'cinema', select: 'name' }, select: 'cinema number' }
			],
			select: 'theater movie showtime isRelease'
		})

		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc		Log user out / clear cookie
//@route 	GET /auth/logout
//@access	Private --- checked
exports.logout = async (req, res, next) => {
	try {
		res.cookie('token', 'none', {
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true
		})

		res.status(200).json({
			success: true
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc		Get All user
//@route 	GET /auth/user
//@access	Private Admin --- checked
exports.getAll = async (req, res, next) => {
	try {
		const user = await User.find().populate({
			path: 'tickets.showtime',
			populate: [
				'movie',
				{ path: 'theater', populate: { path: 'cinema', select: 'name' }, select: 'cinema number' }
			],
			select: 'theater movie showtime isRelease'
		})

		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc		Delete user
//@route 	DELETE /auth/user/:id
//@access	Private Admin --- checked
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if (!user) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Update user
//@route    PUT /auth/user/:id
//@access   Private --- checked
exports.updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!user) {
			return res.status(400).json({ success: false, message: `User not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: user })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}