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

// compile the template
//id: the target id of the funciton
// data: the data the function will be using to change the view
// templateID: the handlebars template to update


function randomThreePosts(id, data, templateID){
    let target = document.getElementById(id);
    let template = Handlebars.compile(document.getElementById(templateID).textContent)
    
   // $("#recents").html(template({ array: people }));
   let list = template({'data': data});
   target.innerHTML = list;
}

function mostRecentPosts(id, data, templateID){
    let target = document.getElementById(id);
    let template = Handlebars.compile(document.getElementById(templateID).textContent)
    
   // $("#recents").html(template({ array: people }));
   let list = template({'data': data});

   target.innerHTML = list;
};

function mostPopularPosts(id, data, templateID){
    let target = document.getElementById(id);
    let template = Handlebars.compile(document.getElementById(templateID).textContent)
    
   // $("#recents").html(template({ array: people }));
   let list = template({'data': data});
   target.innerHTML = list;
};
function singlePostView(id, data){
    let target = document.getElementById("main");
    let template = Handlebars.compile(document.getElementById(id).textContent)

   // $("#recents").html(template({ array: people }));
   let list = template(data);
   target.innerHTML = list;
}
