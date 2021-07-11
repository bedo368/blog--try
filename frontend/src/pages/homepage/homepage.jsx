import React from 'react'
import Post from '../../components/post/post'
import PostCollection from '../../components/postcollection/postcollection'
import "./homepage.scss"
function HomePage() {
    return (
        <div className="homepage">
            <div className="container">
                <h2>blog posts</h2>
             
                <PostCollection />
            </div>
            
        </div>
    )
}

export default HomePage
