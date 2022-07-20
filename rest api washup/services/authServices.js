const User = require('../schemes/USER.js');
const Item = require('../schemes/ITEM.js')
const Comment = require('../schemes/COMMENT.js')
const newItem = require('../schemes/ITEM.js')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET } = require('../config/config.js');


async function createUser(data) {

    let { email, password } = data;

    let user = await User.findOne({ email: email })
    if (user) {
        throw "User Exist"
    }

    const hash = bcrypt.hashSync(password.trim(), SALT_ROUNDS);

    let pattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;

    if (!pattern.test(email)) {
        throw 'This email is incorect';
    }

    if (password.length < 2) {
        throw 'Incorect password';
    }

    const userObj = new User({
        email: email.trim(),
        password: hash,
    });

    userObj.save();


    if (userObj) {
        let inscriptionData = inscription(userObj);
        return inscriptionData;
    } else {
        throw 'Something is wrong'
    }
}
async function loginUser(data) {

    let { email, password } = data;
    let user = await User.findOne({ email });



    if (!user) {
        throw 'Incorect User';
    }
    itTrue = bcrypt.compareSync(data.password, user.password)

    if (!itTrue) {
        throw 'Incorect email or password'
    }

    // let token = jwt.sign({ 'email': email, 'id': user._id, }, JWT_SECRET);


    let inscriptionData = inscription(user, email)
    return inscriptionData
        // return { token, userId: user._id, email: user.email };
}

function inscription(user) {


    let token = jwt.sign({ 'email': user.email, 'id': user._id, }, JWT_SECRET);


    let reduceUserInfo = {
        token: token,
        email: user.email,
        userId: user._id,
    }

    return { reduceUserInfo }
}
async function addNewItem(data) {
    let { itemName, color, imageUrl, description, author } = data; // proverka


    if (itemName.length < 1) {
        throw 'All fields are required'
    }

    if (color.length < 1) {
        throw 'All fields are required'
    }

    if (imageUrl.length < 1) {
        throw 'All fields are required'
    }
    if (description.length < 1) {
        throw 'All fields are required'
    }
    if (author.length < 1) {
        throw 'All fields are required'
    }

    const newItemObj = new newItem(data);
    return newItemObj.save();

}
async function getAll() {


    let data = await Item.find({})

    return data
}
async function getOneById(id) {

    let data = await Item.findById(id)
    return data
}
async function delteItemById(id) {

    let data = await Item.deleteOne({ _id: id })
    console.log(data)
    return data
}
async function updateOneItem(id, updateItem) {

    let data = await Item.findOneAndUpdate({ _id: id }, updateItem)

    if (!data) {
        throw 'DATA IS UNDIFINED'
    }

    return data
}
async function createComment(data, userId, itemId, email) {

    let date = new Date()
    let finalObj = {
        content: data,
        email: email,
        author: userId,
        time: date,
        likeButton: false,
    }


    if (finalObj.email == null) {
        finalObj.email = 'Anonimus'
    }



    let newComent = new Comment(finalObj)

    addComment(itemId, newComent._id)

    return newComent.save()



}
async function addComment(itemID, commentID) {

    let [post] = await Promise.all([
        Item.findOne({ _id: itemID })
    ])

    post.comm.push(commentID)

    return Promise.all([
        Item.updateOne({ _id: itemID }, post)
    ])
}
async function getAllComment() {
    let data = await Comment.find({})
    return data
}
async function loadItemComment(itemId) {
    let result = await Item.findOne({ _id: itemId }).populate('comm')
    return result.comm
}
async function loadCommentData(itemId) {

    let result = await Comment.findOne({ _id: itemId })
    return result
}
async function editComment(objData) {

    let result = await Comment.updateOne({ _id: objData.id }, { content: objData.data })

    return result


}
async function deleteComment(commentID) {
    console.log(commentID)
    let data = await Comment.deleteOne({ _id: commentID })
    return data
}
async function liked(objData) {


    let data = await Comment.findById({ _id: objData.commentID })
    data.likes.likes.find((userID) => {
        if (userID == objData.userID) {
            throw 'You can`t like two times one comment'
        }
    })

    data.likes.likes.push(objData.userID)
    let result = await Promise.all([
        Comment.updateOne({ _id: objData.commentID }, data)
    ])
    return result

}
async function dislike(objData) {

    let data = await Comment.findById({ _id: objData.commentID })

    arrayLikes = data.likes.likes

    for (let i = 0; i < arrayLikes.length; i++) {
        if (arrayLikes[i] == objData.userID) {
            arrayLikes.splice(i, 1)
            break;
        }
    }
    let result = await Promise.all([
        Comment.updateOne({ _id: objData.commentID }, data)
    ])

    return result
}




module.exports = {

    createUser,
    loginUser,
    addNewItem,
    getAll,
    getOneById,
    updateOneItem,
    delteItemById,
    createComment,
    getAllComment,
    loadItemComment,
    loadCommentData,
    editComment,
    deleteComment,
    liked,
    dislike,
};