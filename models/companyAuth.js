require('dotenv').config()

const jwtAuth = require('../common/jwtAuth');
const User = require('../schema/user')

const userAuth = (data) => {
    return User.findOne({userId: data.attributes.id})
        .then((currentUser) => {
            if (currentUser) {
                const currentUserData = {
                    userId: currentUser.userId,
                    userName: currentUser.userName
                }
                return jwtAuth.genearteJWT(currentUserData)
                    .then((token) => {
                        return { "access_token": token }
                    })
            } else {
            return new User({
                userId: data.attributes.id,
                userName: data.attributes.name,
                typeOfLogin: data.attributes.typeOfLogin,
                accessToken: data.attributes.accessToken,
                profileImageUrl: data.attributes.imageUrl
                })
                .save()
                .then((newUser) => {
                    const newUserData = {
                        userId: newUser.userId,
                        userName: newUser.userName
                    }
                    return jwtAuth.genearteJWT(newUserData).then((token) => {
                        return { "access_token": token }
                    })
                })
            }
        })
}

module.exports.userAuth = userAuth