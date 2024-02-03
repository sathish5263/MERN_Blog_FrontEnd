import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Loader from './Loader';
import PostItem from './PostItem';
// import { DUMMY_POSTS } from '../data';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
       const fetchPosts = async () => {
          setIsLoading(true)
          try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
            setPosts(response?.data)
          } catch (error) {
             console.log(error)
          }

          setIsLoading(false)
       }
       fetchPosts();
    },[])

    if(isLoading) {
       return <Loader />
    }

    return ( 
        <section className='posts'>
          {posts.length > 0 ? <div className="container posts__container">
           {
               posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt}) => 
               <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
               description={description} authorID={creator} createdAt={createdAt}/>)
            }
          </div> : <h2 className='center'>No posts found..</h2>
         }
        </section>
     );
}
 
export default Posts;