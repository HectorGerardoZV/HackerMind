class MyPosts {

    constructor (){
        this.url = "http://localhost:1000";
        this.postsSection = document.querySelector(".myPostsSection");
        this.titleInput = document.querySelector("#title");
        this.categoryInput = document.querySelector("#category");
        this.dateInput = document.querySelector("#date");
        this.postsList = [];
        this.postsListFilter = [];
        this.user={};

        this.loadUser()
        this.loadFilter()
    }

    loadUser = ()=>{
        try {
            fetch(this.url+"/myUser")
            .then(response=>{
                return response.json();
            }).then(user=>{
                this.user = user;
                this.loadPosts();
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadPosts = ()=>{
        try {
            fetch(this.url+`/myPosts/${this.user._id}`)
            .then(response=>{
                return response.json();
            }).then(posts=>{
                this.postsList = posts;
                const data = {
                    user:this.user,
                    posts
                }
                this.insertPosts(data);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    insertPosts = (data)=>{
        this.clearPostsSection();
        const {user,posts} = data;
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
            this.postsSection.appendChild(postHTML);
        })
    }

    loadFilter = ()=>{
        let data = {
            title: "",
            category: "",
            date: ""
        };
        this.titleInput.addEventListener("input",()=>{
           let title = this.titleInput.value;
           title = title.trim();
           title = title.toLowerCase();
           data.title = title;
           this.filterPosts(data);
        });
        this.categoryInput.addEventListener("change",()=>{
           let category = this.categoryInput.value;
           category = category.trim();
           category = category.toLowerCase();
           data.category = category;
           this.filterPosts(data);
        });
        this.dateInput.addEventListener("change",()=>{
           let date = this.dateInput.value;
           date = date.trim();
           date = date.toLowerCase();
           data.date = date;
           this.filterPosts(data);
        });
        
    }

    filterPosts = (data)=>{
        let {title,category,date} = data;
        this.postsListFilter = this.postsList.
        filter(post=>{
            const postTitle = post.title.toLowerCase();
            if(postTitle.indexOf(title)>-1){
                return post;
            }
        }).filter(post=>{
            const postCategory = post.idCategory.toLowerCase();
            if(postCategory.indexOf(category)>-1){
                return post;
            }
        }).filter(post=>{
            const postDate = post.date.toLowerCase();

            if(postDate.indexOf(date)>-1){
                return post;
            }
        });
        

        const dataFilter={
            user: this.user,
            posts: this.postsListFilter

        }

        this.insertPosts(dataFilter);
        

    }

    clearPostsSection = ()=>{
        this.postsSection.innerHTML = ``;
    }

}

class ActionPost {
    constructor(){
        this.url = "http://localhost:1000";
        this.postsSection = document.querySelector(".myPostsSection");
        this.clickAction();
    }
    clickAction = ()=>{
        this.postsSection.addEventListener("click",this.doAction);
    }
    doAction = (e)=>{
        let option = e.target;
        let id = "";
        let action = "";
        if(option.tagName==="IMG" || option.classList.contains("editPost")||option.classList.contains("deletePost")){
            if(option.tagName==="IMG"){
                if(option.src === this.url+"/img/Delete.svg" || option.src === this.url+"/img/Edit.svg"){
                    if(option.src === this.url+"/img/Delete.svg"){
                        action = "Delete";
                    }else{
                        action = "Edit";
                    }


                   option = option.parentElement;
                }
            }

            id = option.id;
            if(action===""){
                if(option.classList.contains("editPost")){
                    action = "Edit";
                }else{
                    action = "Delete";
                }
            }
            if(id!==""){
                try {
                   fetch(this.url+`/findPost/${id}`)
                   .then(response=>{
                       return response.json();
                   }).then(post=>{
                    const question = new Question(action,post);
                   }) 
                } catch (error) {
                    console.log(error);
                }
               
            }

        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const myPosts = new MyPosts();
    const actionPost = new ActionPost();
});