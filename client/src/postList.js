import React,{useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './commentList'
export default ()=> {
    const [posts,setPosts] = useState({}); 
    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4000/posts"); 
        // data stored in res in the data property 
        setPosts(res.data); 
    }

    useEffect(() => {
        fetchPosts(); 
    }, []);
    // the empty array tells the useEffect function to call fetchposts just once. 

    const renderedPosts = Object.values(posts).map(post => {
        return (<div 
            
            className="card" 
            style= {{width:"30%", marginBottom:"20px"}}
            key = {post.id}  
            >
                <div className = "card-body">
                    <h3>{post.title}</h3>
                    <CommentList postID = {post.id} />
                    <CommentCreate postID = {post.id}/>
                </div>
        </div>); 
    })
    
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}