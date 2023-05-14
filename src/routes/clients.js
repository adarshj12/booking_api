const express = require('express');
const { register, login } = require('../controllers/clientController');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body);
        if(user.invalidCredentials) return res.status(404).json('invalid credentials');
        if (user.userExist) return res.status(404).json('user already registered');
        res.status(201).json(`user registration successful ${user}`)
    } catch (error) {
        res.status(500).json(`error occurded due to ${error.message}`)
    }
});
router.post('/login', async (req, res) => {
    try {
        if(!req.body.email||!req.body.password||req.body.email==''||req.body.password=='') return res.status(400).json('invalid credentials');
        const user = await login(req.body);
        if (user.notExist) return res.status(404).json('user does not exist');
        if (user.notMatch) return res.status(401).json('invalid email or password');
        if (user.blocked) return res.status(202).json({ blocked: true });
        return res.status(202).json({ message: 'login successful', token:user.token });
    } catch (error) {
        res.status(500).json(`error occurded due to ${error.message}`)
    }
})

module.exports = router;