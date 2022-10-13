const express = require('express')
const ensureLogin = require('connect-ensure-login')

const upload = require('../middlewares/upload')
const Fish = require('../models/fish')
const Catches = require('../models/catch')
const Users = require('../models/users')
const { render } = require('ejs')
const router = express.Router()


//Index route

router.get('/fish', async (req, res) => {
    const fish = await Fish.find()
    console.log(req.session)
    res.render('index.ejs', {
        fish: fish,
        tabTitle: 'Home'
    })
})


router.use(ensureLogin.ensureLoggedIn())


//New route

router.get('/fish/new', (req, res) => {
    res.render('new.ejs')
})


//Create route

router.post('/fish', upload.single('img'), async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.file)
        req.body.img = req.file.path
        await Fish.create(req.body)
        req.flash('success', 'Fish added')
        res.redirect('/fish')
    }
    catch (error) {
        console.log(error)
        req.flash('error', 'this cannot be added')
        res.redirect('/fish/new')
    }
})



//Edit route

router.get('/fish/:id/edit', async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id)
        if (!fish) {
            throw new Error('Not found')
        }
        res.render('edit.ejs', {
            fish: fish,
            tabTitle: `Update: ${fish.name}`
        })
    } catch {
        next()
    }
})


//Update route

router.put('/fish/:id', async (req, res) => {
    const fish = await Fish.findByIdAndUpdate(req.params.id, req.body,
        { new: true }
    )
    console.log('updated fish', fish)
    req.flash(`${fish} updated`)
    res.redirect('/fish')
})



//Confirm-delete route

router.get('/fish/:id/delete', (req, res) => {
    const id = req.params.id
    res.render('delete.ejs', {
        id: id,
        tabTitle: 'delete',
        route: 'delete'
    })
    req.flash(`Fish successfully removed`)
})


//Delete route

router.delete('/fish/:id', async (req, res) => {
    const fish = await Fish.findByIdAndRemove(req.params.id)
    console.log('Deleted fish', fish)
    res.redirect('/fish')
})


//Community routes


//user route/ + user delete-----------------------------------------------------------
router.delete('/community/:username/:catch', async (req, res) => {
    const katch = await Catches.findByIdAndRemove(req.params.catch)
    console.log('Deleted catch', katch)
    res.redirect(`/community/${req.user.username}`)
})

router.get('/community/:username/:catch/delete', (req, res) => {
    const user = req.user
    const katch = req.params.catch
    res.render('catch-delete.ejs', {
        user,
        katch,
        tabTitle: 'delete catch'
 })
})



router.get('/community/:username/:catch', async (req, res) => {
    const catches = await Catches.findById(req.params.catch)
    const user = req.user._id.toString()
    console.log(user)
    const dbUser = await Users.findById(user)
    res.render('catch.ejs', {
        catches,
        dbUser
        // tabTitle: `${user.username} catch`
    })
})

// -----------------------------------------------------

router.get('/uploadcatch', (req, res) => {
    res.render("upload.ejs")
})

router.get('/community', async (req, res) => {
    console.log(req.user)
    const catches = await Catches.find()
    res.render("community.ejs", {
        catches
    })
})

router.get('/community/:username', async (req, res) => {
    const users = await Users.findOne({
       username: req.params.username
    }) .populate("catches")
    console.log('userprofile', users)
    res.render("userprofile.ejs", {
    users
    })
})


router.post('/community', upload.single("img"), async (req, res) => {
    req.body.imgURL = req.file.path
    console.log(req.body, req.user.save)
    req.body.author = req.user.username
    const fishCatches = await Catches.create(req.body)
    req.user.catches.push(fishCatches)
    await req.user.save()
    res.redirect('/community')
} )


//Show route

router.get('/fish/:id', async (req, res, next) => {
    try {
        const fish = await Fish.findById(req.params.id)
        if (fish) {
            res.render('show.ejs', {
                fish: fish,
                tabTitle: fish.name
            })
        } else {
            throw new Error('Fish not found')
        }
    } catch (error) {
        next()
    }
})



module.exports = router






router.get('/seed', async (req, res) => {
    const newFish = [
        {
            name: 'Snapper',
            img: 'https://ilovefishing.com.au/wp-content/uploads/2016/03/Snapper-under-water-shot.jpg',
            bait: ['Soft-plastics', 'Pilchards', 'Squid', 'Prawn', 'Worms', 'Chicken', 'Pipis'],
            locality: ['State-wide'],
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Flathead',
            img: 'https://bassanglermag.com/wp-content/uploads/how-to-fish-for-flathead-fish.png',
            bait: ['Soft-plastics', 'Prawn', 'Squid', 'Pilchards'],
            locality: ['State-wide'],
            minimumSize: '30cm',
            bagLimit: '5'
        },
        {
            name: 'King George Whiting',
            img: 'https://www.southernoceanexpress.com.au/wp-content/uploads/2019/03/king-george.jpg',
            bait: ['Squid', 'Prawn', 'Pipis'],
            locality: ['South-east Peninsula', 'Greater Geelong Area', 'Westernport'],
            minimumSize: '27cm',
            bagLimit: '20'
        },
        {
            name: 'Bream',
            img: 'https://media.australian.museum/media/dd/images/Acanthopagrus_australis.width-800.bef3724.jpg',
            bait: ['Soft-plastics', 'Bread', 'Chicken'],
            locality: ['State-wide'],
            minimumSize: '28cm',
            bagLimit: '10'
        },
        {
            name: 'Garfish',
            img: 'https://fishesofaustralia.net.au/images/image/HyporhamphAustralJohnSear.jpg',
            bait: ['Maggots', 'Silverfish', 'Prawn'],
            locality: ['South-East Peninsula', 'Port Melbourne', 'Greater Geelong Area'],
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Squid',
            img: 'https://content.api.news/v3/images/bin/80c4a67d948fbfcb26cdab3608fdc37f',
            bait: ['Squid-jig', 'Silver-whiting'],
            locality: ['South-East Peninsula', 'Mount Martha rocks', 'Greater Geelong Area', 'Westernport'],
            minimumSize: 'No minimum size',
            bagLimit: '10'
        },
        {
            name: 'Gummy-shark',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPlFhFNvtQDEUouHOIVld11oP_cB1JIrAVw&usqp=CAU',
            bait: ['Salmon', 'Squid', 'Pilchard'],
            locality: ['State-wide'],
            minimumSize: '45cm body',
            bagLimit: '12'
        },
        {
            name: 'Mackerel',
            img: 'https://fishesofaustralia.net.au/images/image/GrammatorcynBicarinatRobinLawsWall.jpg',
            bait: ['Silverfish', 'Baitfish', 'Sabiki'],
            locality: ['SE-Peninsula'],
            minimumSize: 'No minimum size',
            bagLimit: '40'
        },
        {
            name: 'Cuttlefish',
            img: 'https://portphillipmarinelife.net.au/images/species/species_389903.jpeg',
            bait: ['Squid-jig', 'Silver-whiting'],
            locality: ['SE-Peninsula', 'Westernport'],
            minimumSize: 'No minimum size',
            bagLimit: '10'
        },
        {
            name: 'Leatherjacket',
            img: 'https://portphillipmarinelife.net.au/images/species/speciesHero_417890.jpeg',
            bait: 'Bait',
            locality: ['SE-Peninsula', 'Greater Geelong Area'],
            minimumSize: 'No minimum size',
            bagLimit: '20'
        },
        {
            name: 'Australian Salmon',
            img: 'https://portphillipmarinelife.net.au/images/species/speciesHero_519731.jpeg',
            bait: ['Metal lures', 'Soft-plastics', 'Pilchards', 'Squid', 'Prawn'],
            locality: ['Statewide'],
            minimumSize: '21cm',
            bagLimit: '20'
        },


    ]


    Fish
        .create(newFish)
        .then(() => {
            res.send('fish added')
        })
})


module.exports = router

