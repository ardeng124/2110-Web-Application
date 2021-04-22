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
 // compile the template


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
    //location.hash = this.dataset.hash;
    views.singlePostView("views-template",post)
}

function bindings(){
    let postItems = document.getElementsByClassName('post');
    for(let i =0; i<postItems.length; i++){
        postItems[i].onclick = postClickHandler;
    }
}
window.addEventListener("modelUpdated", function(e){
    let data = Model.data.posts;
    console.log(data);
    views.randomThreePosts("flowtow-grid-container",Model.getRandomPosts(3),"three-posts-template");
    views.mostRecentPosts("recent-posts-container",Model.getRecentPosts(10),"recent-posts-template");
    views.mostRecentPosts("popular-posts-container",Model.getPopularPosts(10),"popular-posts-template");
    bindings();
});
window.addEventListener("hashchange", function(e){

});
/*
window.addEventListener("hashchange", function(a){
    //redraw();
    let hash = splitHash(window.location.hash)
    console.log(hash);
    if(hash.path == "whatis"){
        let About = document.getElementById("whatis")
        About.scrollIntoView();
    }else if(hash.path = "posts"){
        let id = hash.id
        let post = Model.getPost(Number(id))
        views.singlePostView("views-template",post)
    }
   
})*/

window.onhashchange = function(){
    let hash = splitHash(window.location.hash)
    console.log(hash);
    if(hash.path == "whatis"){
        let About = document.getElementById("whatis")
        About.scrollIntoView();
    }
}
window.onload = function() {
    Model.updatePosts();
    redraw();
    var template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");
    // execute the compiled template and print the output to the console
    console.log(template({ doesWhat: "rocks!" }));
    window.onhashchange = redraw();

}
