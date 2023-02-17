// styles
import './NewsfeedPosts.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDeletePost } from '../hooks/useDeletePost'


export default function NewsfeedPosts({ collection, query, orderBy }) {

    const { user } = useAuthContext()
    const { deletePost } = useDeletePost()
    const { documents, error } = useCollection(collection, query, orderBy)


  return (
    <>
        {/* {isPending && <p>isPending</p>} */}
        {error && <p>{error}</p>}
        {documents && documents.map((post) => (
            <div className="newsfeed-post-wrapper" key={post.id}>
                <div className="newsfeed-post-header">
                    <img src={post.posterAvatarUrl} alt="poster avatar"/>
                    <div className="newsfeed-post-header-text">
                        <h3>{post.posterName}</h3>
                        <span>{post.readableTimestamp}</span>
                        {user.userId === post.posterId ? <p className="delete" onClick={() => deletePost(post.id)}>X</p> : <></>}
                    </div>
                </div>
                <div className="newsfeed-post-content">
                    <p>{post.content}</p>
                </div>
            </div>
        ))}
        {documents && documents.length === 0 && <p>No posts to show</p>}
    </>
  )
}
