const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id : ID!
        email : String!
        password : String
        date : String!
        displayName : String!
        createdPost : [Post]!
        photo : String!
        createdComments : [Comment]!

    }
    type Post {
        _id : ID!
        title : String!
        content : String!
        date : String!
        postCreator : User!
        relatedComment : [Comment]!

    }

    type Comment {
        _id :ID!
        date : String!
        commentContent : String!
        commentCreator : User!
        relatedPost : Post!

    }
    type AuthData { 
        userId : ID!
        email: String!
        token : String!
        tokenExpriration : Int!
        displayName : String!
    }
    


    type rootQuery  { 
        getAllPosts : [Post]!
        getUserById(userId : String) : User!
        login(email: String! password: String! ) : AuthData!

    }

    type rootMutation {
        createPost (title: String content: String! date: String  ) : Post!
        createUser ( email: String!  password: String! displayName: String! photo: String! date: String ) : User!
        addComment (commentContent: String! relatedPost: String! date: String  ): Comment! 
    }


    schema  {
        query : rootQuery
        mutation : rootMutation
        
    }

`);
