import React from 'react'
import Post from '../../components/post/post'
import "./homepage.scss"
function HomePage() {
    return (
        <div className="homepage">
            <div className="container">
                <h2>blog posts</h2>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                
            </div>
            
        </div>
    )
}

export default HomePage
