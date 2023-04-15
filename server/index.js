const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');

const User = require('./models/User')

app.use(express.json())

mongoose.connect('mongodb+srv://qarshiboyev0212:b5JTR4CN0ge3AQm1@eduon.qobm9zq.mongodb.net/EduonData', {
    useNewUrlParser: true
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/addUser', async (req, res) => {
    const { phone, surname, name, password, accessToken } = req.body
    const user = new User({
        phone, surname, name, password, accessToken
    })
    try {
        console.log('Add User Data');
        await user.save()
        const user_id = await User.findOne({ accessToken })
        if (user_id) {
            res.json(user_id._id)
        }
    } catch (err) {
        console.log(err);
    }
})

app.get('/getUser/:data', async (req, res) => {
    let data = req.params.data.split(':')
    console.log(data)
    if (data[0] === 'phone' && data[2] === 'password') {
        const user = await User.findOne({ phone: data[1] })
        if (user) {
            bcrypt.compare(data[3], user.password, (err, result) => {
                if (err) {
                    console.log('2 hesh error', err);
                } else {
                    if (result) {
                        res.json({ accessToken: user.accessToken })
                    } else {
                        res.status(502).json({ errorCode: 502 });
                    }
                }
            })
        } else {
            res.status(501).json({ errorCode: 501 });
        }
    } else if (data[0] === 'phone') {
        const user = await User.findOne({ phone: data[1] })
        if (!user) {
            res.status(501).json({ errorCode: 501 });
        }
    } else if (data[0] === 'accessToken') {
        const user = await User.findOne({ accessToken: data[1] })
        if (!user) {
            res.status(501).json({ errorCode: 501 });
        } else {
            res.json(user)
        }
    }
    else if (data[0] === 'id') {
        const user = await User.findOne({ id: data[1] })
        console.log(user);
    }
})

app.listen(8000, () => {
    console.log('http://localhost:8000');
})