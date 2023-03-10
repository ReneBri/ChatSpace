// styles
import './NewsfeedPosts.css'

// hooks
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useDeletePost } from '../hooks/useDeletePost'
import { useFirestore } from '../hooks/useFirestore'
import { useGetDate } from '../hooks/useGetDate'
import { useNavigate } from 'react-router-dom'


export default function NewsfeedPosts({ collection, query, orderBy }) {

    const { user } = useAuthContext()
    const { deletePost } = useDeletePost()
    const { documents, error } = useCollection(collection, query, orderBy)
    const [newComment, setNewComment] = useState('')
    const { updateDocument, addComment } = useFirestore('newsfeedPosts')

    let dateForComment = useGetDate()

    const handleNewComment = (e, docId, prevComments) => {

        e.preventDefault()

        let newCommentArray = []

        let tempNewComment = {
            comment: newComment,
            commenterName: user.firstName + " " + user.lastName,
            dateAdded: dateForComment,
            commenterUrl: user.userProfileUrl
        }

        if(prevComments){
            newCommentArray = [ ...prevComments, tempNewComment ]
            console.log(newCommentArray)
        } else {
            newCommentArray = [ tempNewComment ]
            console.log(newCommentArray)
        }

        addComment(docId, newCommentArray)

        setNewComment('')

        e.target.reset()

    }


    // create links for each profile
    let navigate = useNavigate(); 
    const routeChange = (userProfileUrl) =>{ 
        let path = `/userProfile/${userProfileUrl}`; 
        navigate('/');
        navigate(path, { replace: true });
        
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
                        <h3 onClick={() => routeChange(post.posterUrl)}>{post.posterName}</h3>
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
                            <p onClick={() => {updateDocument(post.id, post.showComments, "showComments")}}>read comments {post.comments && post.comments.length > 0 ? "(" + post.comments.length + ")" : '(0)'}</p>
                            : <p onClick={() => {updateDocument(post.id, post.showComments, "showComments")}}>hide comments {post.comments && post.comments.length > 0 ? "(" + post.comments.length + ")" : '0'}</p>}
                        <p className="breakspace"> | </p>
                        {!post.showCommentBox ? <p onClick={() => {updateDocument(post.id, post.showCommentBox, "showCommentBox")}}>leave a comment </p>
                        : <p onClick={() => {updateDocument(post.id, post.showCommentBox, "showCommentBox")}}>hide comment box</p>}
                    </div>
                    {post.showComments && post.comments && post.comments.map((comment) => (
                        <div className="comment-content" key={Math.random()} >
                            <h3 onClick={() => routeChange(comment.commenterUrl)}>{comment.commenterName}</h3>
                            <span>{comment.dateAdded}</span>
                            <p>{comment.comment}</p>
                        </div>
                    ))}

                    {post.showCommentBox &&     
                    <div className="news-update-wrapper">
                        <form className="comment-form" onSubmit={(e) => {handleNewComment(e, post.id, post.comments)}}>
                            <textarea 
                                onChange={(e) => {setNewComment(e.target.value)}}
                                rows="3"
                                maxLength="400"
                                placeholder="What do you think about this?"
                                required
                            />
                            <button>Reply</button>
                        </form>
                    </div>}

                </div>
            </div>
        ))}
        {documents && documents.length === 0 && <p>No posts to show</p>}
    </>
  )
}
