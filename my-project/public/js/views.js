/*
 *
 * Module: Views
 * This model implements view functions
 *
 * Student Name: Arden Gourlay
 * Student Number: 46447849
 *
 */
export {randomThreePosts,mostRecentPosts,mostPopularPosts,singlePostView,loginView,loginView2,allPostsView};

// compile the template
//id: the target id of the funciton
// data: the data the function will be using to change the view
// templateID: the handlebars template to update
function applyTemplate(targetid,templateid,data){
    let target = document.getElementById(targetid);
    let template = Handlebars.compile(document.getElementById(templateid).textContent)
   // $("#recents").html(template({ array: people }));
    target.innerHTML = template(data);
}
//randomThreePosts - generates a view of 3 random people
//this applies the template to the three random posts
function randomThreePosts(targetid,data){
    applyTemplate(targetid,"three-posts-template",({'data': data}))
}
//this applies the template to most recent posts
function mostRecentPosts(targetid,data){
    applyTemplate(targetid,"recent-posts-template",({'data': data}))
};
//this applies the template to most popular posts
function mostPopularPosts(targetid,data){
    applyTemplate(targetid,"popular-posts-template",({'data': data}))
};
//this sets up a single post view
function singlePostView(id, data){
    let target = document.getElementById("main");
    let template = Handlebars.compile(document.getElementById(id).textContent)

   // $("#recents").html(template({ array: people }));
   let list = template(data);
   target.innerHTML = list;
}
//this sets up a login view if the user hasnt made a login attempt yet
function loginView(targetid,data){
    applyTemplate(targetid, 'login-template', {"data":data});
}
//this sets up a login view if the user has made an incorrect login attempt 
function loginView2(targetid,data){
    applyTemplate(targetid, 'login-template2', {"data":data});
}
//this sets up the all posts view
function allPostsView(id, data){
    let target = document.getElementById("main");
    let template = Handlebars.compile(document.getElementById(id).textContent)

   // $("#recents").html(template({ array: people }));
   let list = template({"data":data});
   target.innerHTML = list;
}