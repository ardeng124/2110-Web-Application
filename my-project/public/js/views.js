/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name: Arden Gourlay
 * Student Number: 46447849
 *
 */
export {randomThreePosts};
export {mostRecentPosts};
export {mostPopularPosts};
export {singlePostView};
export {loginView};
export {loginView2};
export {allPostsView};

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
function singlePostView(id, data){
    let target = document.getElementById("main");
    let template = Handlebars.compile(document.getElementById(id).textContent)

   // $("#recents").html(template({ array: people }));
   let list = template(data);
   target.innerHTML = list;
}
function loginView(targetid,data){
    applyTemplate(targetid, 'login-template', {"data":data});
}
function loginView2(targetid,data){
    applyTemplate(targetid, 'login-template2', {"data":data});
}
function allPostsView(id, data){
    let target = document.getElementById("main");
    let template = Handlebars.compile(document.getElementById(id).textContent)

   // $("#recents").html(template({ array: people }));
   let list = template({"data":data});
   target.innerHTML = list;
}