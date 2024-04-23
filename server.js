const express = require("express")
const app = express();
const UserModel = require('./models').User;
const UserDetails = require('./models').UserDetails;
const PostModel = require("./models").Post;
const FriendsModel = require("./models").Friends;
// const UserGroupModel = require("./models").UserGroup;
// const GroupModel = require("./models")
const model = require('./models')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/createuser", (req, res) => {
    const { username, email, password, mobile, bio } = req.body
    let finalData = {}
    UserModel.create({
        userName: username,
        email
    }).then((data) => {
        const { dataValues } = data;
        finalData = { ...dataValues }
        return UserDetails.create({
            userId: dataValues.id,
            mobileNo: mobile,
            password,
            noOfPost: 0,
            bio
        })
    }).then((data) => {
        const { dataValues } = data
        finalData = { ...finalData, ...dataValues }
        res.status(200).json({ error: "0", data: finalData })
    }).catch(err => {
        res.send({ error: "1", errMsg: err.message })
    })
})

app.post("/createpost", (req, res) => {
    const { userId, title = "", likes = 0 } = req.body;
    PostModel.create({
        userId,
        title,
        likes
    }).then((data) => {
        return PostModel.findAll({})
    }).then((data) => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        res.status(200).json({ error: "1", data: [], errMsg: err.message })
    })
});

app.get("/getPost/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findOne({
        include: [model.User],
        where: {
            userId: id
        }
    }).then(data => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        res.status(200).json({ error: "1", data: [], errMsg: err.message })
    })
})

app.get("/getalluser",  (req, res) => {
    console.log("Iam coming inside the get all users 68 -->")
    UserModel.findAll({
        include: [model.UserDetails, model.Post, model.Friends, { model: model.Groups, through: { model: model.UserGroup } }]
    }).then(data => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        console.log(err, 'checking the error in the get All users 72 -->')
        res.status(200).json({ error: "1", data: [], errMsg: err.message })
    })
})

app.get("/getIndividualuser/:id", (req, res) => {
    UserModel.findAll({
        include: [model.UserDetails, model.Post, model.Friends, { model: model.Groups, through: { model: model.UserGroup } }],
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        console.log(err)
        res.status(200).json({ error: "1", data: [], errMsg: err.message })
    })
})

app.post("/createpost/:id", (req, res) => {
    PostModel.create({
        userId: req.params.id,
        title: req.body.title,
        likes: 0
    }).then(data => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        console.log(err);
        res.status(200).json({ error: "1", data: [], errMsh: err.message })
    })
})

app.post("/addfriend", (req, res) => {
    FriendsModel.create({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email
    }).then(data => {
        res.status(200).json({ error: "0", data })
    }).catch(err => {
        console.log(err);
        res.status(200).json({ error: "1", data: [], errMsg: err.message })
    })
})

app.get("/", (req, res) => {
    res.status(200).json({ msg: "multi DB Connection" })
})

app.listen(4002, () => {
    console.log("Server is running in the PORT " + 4002)
})