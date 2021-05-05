/*
 *
 * Module: main.js
 * The main function of the web application, will call other functions and modules to work
 *
 * Student Name: Arden Gourlay
 * Student Number: 46447849
 *
 */
import * as views from './views.js';
import {Model} from "./model.js";
import {splitHash} from "./util.js";
import {Auth} from './service.js';
 // compile the template
 window.addEventListener("modelUpdated", function(e){
    let data = Model.data.posts;
    console.log(data);
    checkHash();
    //views.randomThreePosts("flowtow-grid-container",Model.getRandomPosts(3));
    //views.mostRecentPosts("recent-posts-container",Model.getRecentPosts(10));
   // views.mostRecentPosts("popular-posts-container",Model.getPopularPosts(10));
    views.loginView('login', Auth.getUser());
    bindings();
});
//event listeners to update the model when certain actions are done 
window.addEventListener("likeAdded", function(e){
    //DO SOMETHING TO UPDATE 
    Model.updatePosts();
})
window.addEventListener("postAdded", function(e){
    //DO SOMETHING TO UPDATE 
    Model.updatePosts();
})
window.addEventListener("postDeleted", function(e){
    //DO SOMETHING TO UPDATE 
    Model.updatePosts();
})
window.addEventListener("commentAdded", function(e){
    //DO SOMETHING TO UPDATE 
    Model.updatePosts();
})
window.addEventListener("hashchange", function(a){
    //redraw();
    //checkHash();
    Model.updatePosts();
    bindings();
})
window.addEventListener('userLogin', function(e){
    console.log("login event ")
    views.loginView2('login', Auth.getUser());
})
//Function name: checkHash
//Purpose: This function is designed to check the current hash of the page and respond accordingly
function checkHash(){
    let hash = splitHash(window.location.hash)
    console.log(hash);
    if(window.location.hash === ""){
        reDoEverything();
        //console.log('ho')
        views.randomThreePosts("flowtow-grid-container",Model.getRandomPosts(3));
        views.mostRecentPosts("recent-posts-container",Model.getRecentPosts(10));
        views.mostPopularPosts("popular-posts-container",Model.getPopularPosts(10));
        //Model.updatePosts();
    }
    if(window.location.hash == "whatis"){
        let About = document.getElementById("whatis")
        About.scrollIntoView();
    } 
    if(hash.path == "posts"){
        let id = hash.id
        let post = Model.getPost(Number(id))
         // a little check to see if the user is logged in
        if(Auth.getUser() !=null){
            views.singlePostView("views-template2",post)
        } else{
        views.singlePostView("views-template",post)
        }
    }
    if(hash.path == "all-posts"){
        let user = Auth.getUser();
         // a little check to see if the user is logged in
        if(user!=null){
        console.log("ok")
        views.allPostsView("all-posts-template",Model.getPosts())
        } else{
            views.allPostsView("all-posts-template",null)
        }
    }
    if(hash.path == "my-posts"){
        let user = Auth.getUser();
        // a little check to see if the user is logged in
        if(user!=null){
            let user = Auth.getUser().id;
            console.log("ok")
            views.allPostsView("my-posts-template",Model.getUserPosts(user))
        } else{
            //views.allPostsView("my-posts-template",null)
            let target = document.getElementById('main');
            target.innerHTML = "<div id = 'all-table'> <h2> My posts </h2> <p> You have to login first</p></div>";
            }
    }
    
}
// no idea what this is for
  function redraw() { 
    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/#'>Three Posts</a></li>";
    content += "<li><a href='/#'>Recent Posts</a></li>";
    content += "<li><a href='/#'>Popular Posts</a></li>";
    content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
}
//Function name: postClickHandler
//Purpose: Sets the hash to the clicked image
function postClickHandler(){
    let id = this.dataset.id
    let post = Model.getPost(Number(id))
    console.log(post);
    location.hash = this.dataset.hash;
    //views.singlePostView("views-template",post)
}
//Function name: loginFormHandler
//Purpose: retrieves data from the login form and sends it to the service.js file to test for login
function loginFormHandler (event) {
    event.preventDefault();
    console.log('the login form is'+ this);
    const username = this.elements['username'].value
    const password = this.elements['password'].value
   // console.log(username+password)
    Auth.login(username, password);
    //send 
}
//Function name: postFormHandler
//Purpose: retrieves data from the post image form and prepares it for the addpost function in model.js
function postFormHandler (event) {
    event.preventDefault();
    console.log('the post data is'+ this);
    let picture = this.elements['p_image'].files[0]
    let postData = {
        'p_url':this.elements['p_url'].value,
        'p_caption':this.elements['p_caption'].value,
        'p_author': Auth.getUser(),
        'p_likes': 0
    }

    let imageData = new FormData()
    imageData.append("files",picture)
   // console.log(username+password)
    this.reset();
    Model.addPost(postData, imageData);
    //send 
}

//Function name: postDeleteHandler
//purpose: handles deleting of posts
function postDeleteHandler (event) {
    event.preventDefault();
    //console.log('the post data is'+ this);
    let id = this.dataset.id
    Model.deletePost(Number(id))
}
//Function name: commentFormHandler
//Purpose: retrieves comment data from the form and prepares it for the addComment function in model.js
function commentFormHandler (event) {
    event.preventDefault();
    let hash = splitHash(window.location.hash)
    let id = hash.id
    let commentData = {
        'c_content':this.elements['c_content'].value,
        'c_author': Auth.getUser(),
        'c_post': Model.getPost(Number(id))
    }
   // console.log(username+password)
   //console.log(this);
   Model.addComment(commentData);
    this.reset();
    Model.updatePosts();
    //send 
}
//Function name: bindings  
//Purpose: Applies actions to all the forms and buttons in the page
function bindings(){
    let postItems = document.getElementsByClassName('post');
    for(let i =0; i<postItems.length; i++){
        postItems[i].onclick = postClickHandler;
    }
    let likeBtn = document.getElementsByClassName('like');
    for(let i =0; i<likeBtn.length; i++){
        likeBtn[i].onclick = postLikeHandler;
    }
    let deleteBtn = document.getElementsByClassName('delete');
    for(let i =0; i<deleteBtn.length; i++){
        deleteBtn[i].onclick = postDeleteHandler;
    }
    let loginForm = document.getElementById('login-form')
    if(loginForm !=null){
    loginForm.onsubmit = loginFormHandler
    }
    let postForm = document.getElementById('postform')
    if(postForm !=null){
        postForm.onsubmit = postFormHandler
    }
    let commentForm = document.getElementById('commentform')
    if(commentForm !=null){
        commentForm.onsubmit = commentFormHandler
    }
}
//Function name: postLikeHandler
//Purpose: retrieves the post id and sends it to the addlike function in model.js
function postLikeHandler(){
   // event.preventDefault();
    //let hash = splitHash(window.location.hash);
    let id = this.dataset.id
    //console.log(id)
    Model.addLike(Number(id))
}
//Function name: reDoEverything
//Purpose: this function is designed to place all the divs back on the main page after they get replaced by single post, all post, and my post views
function reDoEverything(){
    let target = document.getElementById('main');
    let content = "<div id='flowtow-grid-container'></div>" 

    content+="<div id = 'table-posts-container'>"
    content+= "<div id = 'recent-posts-container'></div>"
    content+="<div id = 'popular-posts-container'> </div></div>"
    target.innerHTML = content;
}
/*
window.onhashchange = function(){
    let hash = splitHash(window.location.hash)
    console.log(hash);
    if(hash.path == "whatis"){
        let About = document.getElementById("whatis")
        About.scrollIntoView();
    }
}*/
window.onload = function() {
    Model.updatePosts();
    //redraw();
    //window.onhashchange = redraw();
    views.loginView('login', Auth.getUser)
}
