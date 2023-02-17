import { projectFirestore } from "../config/config"


export const useDeletePost = (docId) => {
    const deletePost = (docId) => {
        projectFirestore.collection('newsfeedPosts').doc(docId).delete()
        .then(() => {
            console.log('successfully deleted document')
        }).catch((error) => {
            console.log('error removing document: ', error.message)
        })
    }

    return { deletePost }
}