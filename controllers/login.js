import db from '../db/query.js';
import 'dotenv/config';

// Chưa giải quyết được vấn đề về có 2 tài khoản trùng nhau về cả password và username
// Ý tưởng: Nếu username đã có trong database rồi thì cảnh báo người dùng tên này đã tồn tại

async function loginAccount(req, res){
    const account = await db.getAccount(req.body);

    // const customer = account.map(i => Object.values(i));
    res.render('index', {
        username: account[0].username,
    })
    // const a = account.filter(i => Object.)
    // let user = '';
    // for(const entry of account) {
    //     const [key, value] = entry;
    //     user = key;
    // };

    // let accc = '';
    // for (const i of account) {
    //     accc += i.username +" ";
    // }

    // res.send(accc);
}

export default {
    loginAccount,
};