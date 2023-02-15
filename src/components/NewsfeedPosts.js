// styles
import './NewsfeedPosts.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'


export default function NewsfeedPosts() {

    const { user } = useAuthContext()
    const { documents, error } = useCollection('newsfeedPosts')


  return (
    <>
        {/* {isPending && <p>isPending</p>} */}
        {error && <p>Error</p>}
        {documents && documents.map((post) => (
            <div className="newsfeed-post-wrapper" key={post.id}>
                <div className="newsfeed-post-header">
                    <h3>{post.posterName}</h3>
                    <span>Date goes here</span>
                </div>
                <div className="newsfeed-post-content">
                    <p>{post.content}</p>
                </div>
            </div>
        ))}
    </>
  )
}
