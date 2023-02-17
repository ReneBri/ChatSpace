// styles
import './NewsfeedPosts.css'

// config
import { projectFirestore } from '../config/config'

// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDeletePost } from '../hooks/useDeletePost'
import { useFirestore } from '../hooks/useFirestore'


export default function NewsfeedPosts({ collection, query, orderBy }) {

    const { user } = useAuthContext()
    const { deletePost } = useDeletePost()
    const { documents, error } = useCollection(collection, query, orderBy)
    const [newComment, setNewComment] = useState('')
    const { updateDocument } = useFirestore('newsfeedPosts')

    const handleNewComment = (e) => {
        e.preventDefault()

    }


  return (
    <>
        {/* {isPending && <p>isPending</p>} */}
        {error && <p>{error}</p>}
        {documents && documents.map((post) => (
            <div className="newsfeed-post-wrapper" key={post.id}>
                <div className="newsfeed-post-header">
                    <img src={post.posterAvatarUrl} alt="poster avatar"/>
                    <div className="newsfeed-post-header-text">
                        <a href={"/userProfile/" + post.posterUrl}><h3>{post.posterName}</h3></a>
                        <span>{post.readableTimestamp}</span>
                        {user.userId === post.posterId ? <p className="delete" onClick={() => deletePost(post.id)}>X</p> : <></>}
                    </div>
                </div>
                <div className="newsfeed-post-content">
                    <p>{post.content}</p>
                </div>
                <div className="comment-wrapper">
                    <div className="comment-header">
                        {!post.showComments ? 
                            <p onClick={() => {updateDocument(post.id, post.showComments, "showComments")}}>read comments</p>
                            : <p onClick={() => {updateDocument(post.id, post.showComments, "showComments")}}>hide comments</p>}
                        <p className="breakspace"> | </p>
                        {!post.showCommentBox ? <p onClick={() => {updateDocument(post.id, post.showCommentBox, "showCommentbox")}}>leave a comment</p>
                        : <p onClick={() => {updateDocument(post.id, post.showCommentBox, "showCommentBox")}}>hide comment box</p>}
                    </div>
                    {post.showComments && post.comments && post.comments.map((comment) => (
                        <div className="comment-content" key={Math.random()} >
                            <h3>{comment.commenterName}</h3>
                            <span>{comment.dateAdded}</span>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    {post.showCommentBox &&     
                    <div className="news-update-wrapper">
                        <form>
                            <textarea 
                                onChange={(e) => {setNewComment(e.target.value)}}
                                value={newComment}
                                rows="6"
                                placeholder="What's on your mind?"
                                required
                            />
                            <button>Submit</button>
                        </form>
                    </div>}
                </div>
            </div>
        ))}
        {documents && documents.length === 0 && <p>No posts to show</p>}
    </>
  )
}
