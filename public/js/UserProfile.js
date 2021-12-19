class UserPosts {
    constructor(){
        this.url = "http://localhost:1000";
        this.section = document.querySelector(".postsUser");
        this.id = document.querySelector(".userCardBig").id;
        this.user ={};
        this.loadUser();
    }
    loadUser = ()=>{
        try {
            fetch(this.url+"/findUser/"+this.id)
            .then(response=>{
                return response.json();
            }).then(user=>{
                this.user = user;
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadPosts  = ()=>{
        try {
            fetch(this.url="/myPosts/"+this.id)
            .then(response=>{
                return response.json();
            }).then(posts=>{
                this.insertPosts(posts);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    insertPosts = (posts)=>{
        posts.forEach(post=>{
            let date = post.date;
            let datePoints = date.split("-");
            let start =datePoints[0];
            let end =datePoints[2];
            datePoints[0] = end;
            datePoints[2] = start;
    
            date = datePoints[0]+"/"+datePoints[1]+"/"+datePoints[2];
            const postHTML = document.createElement("DIV");
            postHTML.classList.add("normalPostCard");
            postHTML.innerHTML =`
            <div class="normalPostCard__TOP">
                <div class="normalPostCard__TOP-user">
                    <img class="normalPostCard__imageUser" src="../userIMG/${this.user.image}">
                    <p>${this.user.userName}</p>
                    <img class="normalPostCard__rankUser" src="../img/${this.user.rank}">
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
                    <p>${date}</p>
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
                </div>
                <button>
                    View Comments
                    <img src="../img/Close.svg">
                </button>
            </div>
            
            `;
            this.section.appendChild(postHTML);
        });
    }


    
}

document.addEventListener("DOMContentLoaded",()=>{
    const userPosts = new UserPosts();
    userPosts.loadPosts();
});