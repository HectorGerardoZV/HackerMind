
const load =()=>{
    loadUser();
}


const loadUser = ()=>{
    try {
        fetch("http://localhost:1000/myUser")
        .then(response=>{
            return response.json();
        }).then(user=>{
            console.log(user);
            loadPosts(user);
        }).catch(error=>{
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

const loadPosts = (user)=>{
    try {
        fetch(`http://localhost:1000/myPosts/${user._id}`)
        .then(response=>{
            return response.json();
        }).then(posts=>{
            const data = {
                user,
                posts
            }
            insertPosts(data);
        }).catch(error=>{
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

const insertPosts = (data)=>{
    const postsList = document.querySelector(".myPostsSection");
    const {user,posts} = data;
    posts.forEach(post=>{
        const postHTML = document.createElement("DIV");
        postHTML.classList.add("normalPostCard");
        postHTML.innerHTML =`
        <div class="normalPostCard__TOP">
            <div class="normalPostCard__TOP-user">
                <img class="normalPostCard__imageUser" src="../userIMG/${user.image}">
                <p>${user.userName}</p>
                <img class="normalPostCard__rankUser" src="../img/${user.rank}">
            </div>

            <div class="normalPostCard__TOP-category">
                <h3>${post.idCategory}</h3>
            </div>
        </div>

        <div class="normalPostCard__HEADER">
            <div class="normalPostCard__HEADER-title">
                <p>${post.title}</p>
            </div>
            <div class="normalPostCard__HEADER-date">
                <img src="../img/DateBlue.svg">
                <p>${post.date}</p>
            </div>
            
        </div>

        <div class="normalPostCard__CONTENT">
            <p>${post.content}</p>
        </div>

        <div class="normalPostCard__COMMENT">
            <input type="text" id= "comment" placeholder= "Add Comment">
            <img src="../img/Send.svg">
        </div>
        <div class="normalPostCard__COMMENTS-button">
            <div class="optionsPost">
                <a class="editPost" id= "${post._id}">
                    <img src="../img/Edit.svg">
                </a>
                <a class="deletePost" id="${post._id}">
                    <img src="../img/Delete.svg">
                </a>
            </div>
            <button>
                View Comments
                <img src="../img/Close.svg">
            </button>
        </div>
        
        `;
        postsList.appendChild(postHTML);
    })
}




document.addEventListener("DOMContentLoaded",()=>{
    load();
});