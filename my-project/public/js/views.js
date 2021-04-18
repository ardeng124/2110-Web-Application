/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */
export {randomThreePosts};
export {mostRecentPosts};

// compile the template
//id: the target id of the funciton
// data: the data the function will be using to change the view
// templateID: the handlebars template to update
function randomThreePosts(id, data, templateID){
    let randomValue = [Math.floor(Math.random() * data.length)]
    let target = document.getElementById(id);
  
    let template = Handlebars.compile(document.getElementById(templateID).textContent)
    let list =  template(
        {
        img: data[randomValue].p_url,
        caption: data[randomValue].p_caption,
        likes: data[randomValue].p_likes,
        author: data[randomValue].p_author.username
    })
    /*
   var list = '<ul>';
   list+= '<li>' + "<img src="+data[randomValue].p_url+">"+"</li>"
   list+= '<li>' + data[randomValue].p_caption+"</li>"
   list+= '<li>' +"By: " + data[randomValue].p_author.username+"</li>"
   list+= '<li>'+"Likes : " + data[randomValue].p_likes+"</li>"
list+="</ul>";
*/
    target.innerHTML = list;
}

function mostRecentPosts(id, data, templateID){
    let target = document.getElementById(id);
    let template = Handlebars.compile(document.getElementById(templateID).textContent)
    $("#recents").html(template({ array: people }));


    let list = template({'data':data})
    console.log(list);
    //target.innerHTML = list;
}

function topTenPosts(id, data){
    
}
