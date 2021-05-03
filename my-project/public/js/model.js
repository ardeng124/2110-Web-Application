export {Model};
import { Auth } from "./service.js";
/*
 *
 * Module: Model
 * Provides an interface for modifying the data from the database
 *
 * Student Name: Arden Gourlay
 * Student Number: 46447849
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/
import * as views from "./views.js"

const Model = {
    postsUrl: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    
    //this will hold the post data stored in the model
    data: {
        posts: []
    },
    
    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {
        fetch(this.postsUrl)
        .then(
            function(response){
                return response.json()
            } 
            )
        .then(
            (data) => {
                this.data.posts = data;
                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
    
            } 
        )
    },

    // getPosts - return an array of post objects
    getPosts: function() {
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function(postid) {
        let posts = this.getPosts();
        for(let i =0; i < posts.length; i++){
            if(posts[i].id === postid){
              // posts[i].published_at =  posts[i].published_at.substr(0,9);
              posts[i].published_at = new Date(posts[i].published_at);
                return posts[i];
            }
        }
    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
addPostxxx: function(postData) {
        fetch(this.postsUrl,{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(postData)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })

},
    addPost: function(postData,imageData) {
        fetch(this.uploadUrl,{
            method: 'POST',
            headers:{
                Authorization: `bearer ${Auth.getJWT()}`,
            },
            body:imageData
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        postData = {...postData, "p_image":data[0]}
        return fetch(this.postsUrl,{
            method: 'POST',
            headers: {
                Authorization: `bearer ${Auth.getJWT()}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(postData)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        this.data.posts.push(data)
        let event = new CustomEvent('postAdded')
        window.dispatchEvent(event);
    })
    })

    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {
        let posts = this.getPosts();
        let userPosts = [];
        let sortedPosts = posts.sort(function(a, b) {
            var dateA = new Date(a.published_at), dateB = new Date(b.published_at);
            return dateB - dateA;
        });
        for(let i=0; i<posts.length;i++){
            if(sortedPosts[i].p_author.id == userid){
                userPosts.push(sortedPosts[i]);
            }
        }
        console.log(userPosts,"ok");
        return userPosts;
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId) {
        let target = this.getPost(postId);
        console.log(target);
        let likes = Number(target.p_likes)+1;
        console.log(likes);
        let url = this.postsUrl + "/"+postId;
        target.p_likes = likes.toString();
        likes = likes.toString();
       // console.log(target)
       //our PUT Request to update the likes
        fetch(url,{
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({
                p_likes: likes
            })
        }).then((response) => {
            return response.json()
        }).then((data)=>{
            console.log(data);
            this.data.posts.push(data);
            let event = new CustomEvent('likeAdded')
            window.dispatchEvent(event);
        })
    },
    //// deletePost - we will delete a post and its associated comments with fetch requests
    // postID is a number which is the post id
    // when the request is resolved, creates an "postDeleted" event
    deletePost: function (postId) { 
        let url = this.postsUrl + "/"+postId;
        console.log(url)
        let post = this.getPost(postId);
       //our PUT Request to update the likes
       for(let i =0; i < post.p_comment.length;i++){
           let id = post.p_comment[i].id;
           console.log(post.p_comment[i])

           fetch(this.commentsUrl+"/"+id, {
            method: 'DELETE',
            headers:{
              Authorization: `bearer ${Auth.getJWT()}`,
            }
          })
       }
        fetch(url, {
          method: 'DELETE',
          headers:{
            Authorization: `bearer ${Auth.getJWT()}`,
          }
        })
        .then(response => {
            return response.json()

        });
        let event = new CustomEvent('postDeleted')
            window.dispatchEvent(event);
      },
    
    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {
        let url = this.postsUrl + "/"+commentData.c_post.id;
        //our nested fetch function to add the comment both to /comments and to /posts
        fetch(this.commentsUrl,{
            method: 'POST',
            headers: {
                Authorization: `bearer ${Auth.getJWT()}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(commentData)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            fetch(url,{
                method: 'PUT',
                headers: {
                    Authorization: `bearer ${Auth.getJWT()}`,
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    p_comment: data
                })
            })
        })
        let event = new CustomEvent('commentAdded')
            window.dispatchEvent(event);
    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(N){
        let posts = this.getPosts();
        let postsReturned = [];
        for(let i=0; i<N;i++){
            let randomValue = [Math.floor(Math.random() * posts.length)] //chooses a random value from the array?
            postsReturned.push(posts[randomValue]);
         //   postsReturned[i].published_at =  postsReturned[i].published_at.substr(0,9);

        }
        console.log(postsReturned);
        return postsReturned;
    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {
        let posts = this.getPosts();
        let recents = [];  
        let sortedPosts = posts;
        sortedPosts = sortedPosts.sort(function(a, b) {
            var dateA = new Date(a.published_at), dateB = new Date(b.published_at);
            return dateB - dateA;
        });
        for(let i = 0; i< N;i++){
            recents.push(sortedPosts[i]);
            //this just grabs a substring of the full date to improve readability
          //  recents[i].published_at =  recents[i].published_at.substr(0,10);

        };
        console.log(recents);  
        return recents;
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {
        let posts = this.getPosts();
        let populars = [];  
        let sortedPosts = posts;
        sortedPosts = sortedPosts.sort(function(a, b) {
            return b.p_likes - a.p_likes;
        });
        for(let i = 0; i< N;i++){
            populars.push(sortedPosts[i])
            //this just grabs a substring of the full date to improve readability
            //populars[i].published_at =  populars[i].published_at.substr(0,10);

        };
        console.log(populars);  
        return populars;
    },

}