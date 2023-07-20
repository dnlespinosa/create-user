const jsonschema = require('jsonschema')
const express = require('express')
const { BadRequestError } = require('../expressError')
const User = require('../models/user')
const { createToken } = require('../helpers/token')
const userNewSchema = require('../schemas/userNew.json')
const userAuthSchema = require('../schemas/userAuth.json')
const userRegisterSchema = require('../schemas/userRegister.json')
const userUpdateSchema = require('../schemas/userUpdate.json')

const router = express.Router()


router.post('/token', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e > e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token })
    } catch (e) {
        return next(e)
    }
})

router.post('/register', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ...req.body});
        const token = createToken(newUser);
        return res.status(201).json({ token })
    } catch (e) {
        return next(e)
    }
})

router.get('/:username', async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user })
    } catch (e) {
        return next(e)
    }
})

router.patch('/:username', async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e =>  e.stack);
            throw new BadRequestError(errs)
        }

        const user = await User.update(re.params.username, req.body)
        return res.json({ user })

    } catch (e) {
        return next(e)
    }
})

router.delete('/:username', async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username })
    } catch (e) {
        return next(e)
    }
})