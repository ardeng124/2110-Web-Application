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
    views.randomThreePosts("flowtow-grid-container",Model.getRandomPosts(3));
    views.mostRecentPosts("recent-posts-container",Model.getRecentPosts(10));
    views.mostRecentPosts("popular-posts-container",Model.getPopularPosts(10));
    views.loginView('login', Auth.getUser());

    bindings();
});
window.addEventListener("likeAdded", function(e){
    //DO SOMETHING TO UPDATE 
    Model.updatePosts();
})
window.addEventListener("hashchange", function(a){
    //redraw();
    let hash = splitHash(window.location.hash)
    console.log(hash);
    if(window.location.hash === ""){
        reDoEverything();

        console.log('ho')
        Model.updatePosts();
    }
    if(window.location.hash == "whatis"){
        let About = document.getElementById("whatis")
        About.scrollIntoView();
    } 
    if(hash.path == "posts"){
        let id = hash.id
        let post = Model.getPost(Number(id))
        views.singlePostView("views-template",post)
    }
    if(hash.path == "all-posts"){
        let user = Auth.getUser();
        if(user!=null){
        console.log("ok")
        views.allPostsView("all-posts-template",Model.getPosts())

        } else{
            views.allPostsView("all-posts-template",null)

        }
    }
    if(hash.path == "my-posts"){
        let user = Auth.getUser();
        if(user!=null){
            let user = Auth.getUser().id;
            console.log("ok")
            views.allPostsView("my-posts-template",Model.getUserPosts(user))
        } else{
            views.allPostsView("my-posts-template",null)

            }
    }
    
    bindings();
})
window.addEventListener('userLogin', function(e){
    console.log("login event ")
    views.loginView2('login', Auth.getUser());
    
})

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
function postClickHandler(){
    let id = this.dataset.id
    let post = Model.getPost(Number(id))
    console.log(post);
    location.hash = this.dataset.hash;
    //views.singlePostView("views-template",post)
}

function login_form_handler (event) {
    event.preventDefault();
    console.log('the login form is'+ this);
    const username = this.elements['username'].value
    const password = this.elements['password'].value
   // console.log(username+password)
    Auth.login(username, password);
    //send 
}

function bindings(){
    let postItems = document.getElementsByClassName('post');
    for(let i =0; i<postItems.length; i++){
        postItems[i].onclick = postClickHandler;
    }
    let likeBtn = document.getElementsByClassName('like');
    for(let i =0; i<likeBtn.length; i++){
        likeBtn[i].onclick = post_like_handler;
    
    }
    let loginForm = document.getElementById('login-form')
    if(loginForm !=null){
    loginForm.onsubmit = login_form_handler
    }
}
function post_like_handler(){
   // event.preventDefault();
    //let hash = splitHash(window.location.hash);
    let id = this.dataset.id
    console.log(id)
    Model.addLike(Number(id))
}

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
