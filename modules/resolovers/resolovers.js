
const userResolver =  require("./user.resolover")
const postResolver = require("./posts.resolvers")
const commentResolver = require("./comment.resolvers")


module.exports = { 

    ...userResolver,
    ...postResolver,
    ...commentResolver
    
}