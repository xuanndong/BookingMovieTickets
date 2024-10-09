import db from '../db/query.js';
import 'dotenv/config';

// Chưa giải quyết được vấn đề về có 2 tài khoản trùng nhau về cả password và username
// Ý tưởng: Nếu username đã có trong database rồi thì cảnh báo người dùng tên này đã tồn tại

const loginAccount = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await db.getAccount(username, password);

        if (!user || user.length === 0) {
            const error = new Error("Account or password is incorrect!");
            Object.defineProperty(error, 'status', {
                value: 401,
            });
            error.name = "Incorrect";
            throw error;
        } else {
            return res.json(user[0]);
        }

    } catch (error) {
        next(error);
    }
};

export default {
    loginAccount,
};
