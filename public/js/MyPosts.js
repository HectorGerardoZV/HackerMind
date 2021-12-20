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

        this.loadUser();
        this.loadFilter();

        this.listenerComment();
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

            <div class="normalPostCard__COMMENT"  id="${post._id}">
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
                <button id="${post._id}" class = "view">
                    View Comments
                    <img src="../img/Close.svg">
                </button>
            </div>
            
            <div class = "commentsSection">
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
        while(this.postsSection.firstChild){
            this.postsSection.removeChild(this.postsSection.firstChild);
        }
    }
    
    listenerComment = ()=>{
        this.postsSection.addEventListener("click",this.addComment);
        this.postsSection.addEventListener("click",this.loadComments);
    }
    addComment = e=>{
        let element = e.target;
        if(element.tagName==="IMG"){
            if(element.src===this.url+"/img/Send.svg"){
                element = element.parentElement;
                let input = element.querySelector("#comment");
                let content = input.value.trim();
                if(content!=""){
                    try {
                        const dateOBJ = new Date();
                         const date = dateOBJ.getFullYear()+"-"+(dateOBJ.getMonth()+1)+"-"+dateOBJ.getDate();
                        const comment = {
                            content,
                            idUser: this.user._id,
                            idPost: element.id,
                            date
                        }

                        const data ={
                            headers: {'Content-type': 'application/json'},
                            method: 'POST',
                            body: JSON.stringify(comment)
                        }
                        fetch(this.url+"/addComment",data)
                        .then(response=>{
                            return response.json();
                        }).then(res =>{
                            const {message}=  res;
                            if(message==="YES"){
                                input.value = "";
                                input.style.borderColor = "#60FF70";
                                setTimeout(() => {
                                    input.style.borderColor = "transparent";
                                }, 2000);
                            }else{
                                input.style.borderColor = "#FF6161";
                                setTimeout(() => {
                                    input.style.borderColor = "transparent";
                                }, 2000);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }else{
                    input.style.borderColor = "#FF6161";
                    setTimeout(() => {
                        input.style.borderColor = "transparent";
                    }, 2000);
                }
            }
        }
    }
    loadComments = e=>{
        if(e.target.tagName==="BUTTON"){
            if(e.target.classList.contains("view")){
                let element = e.target;
                element.classList.remove("view");
                element.querySelector("img").src="../img/Show.svg";
                element.classList.add("mb-3");

                let card = e.target.parentElement.parentElement;
                const section = card.querySelector(".commentsSection");
                section.classList.add("commentsSection__scroll");


                try {
                fetch(this.url+"/findComments/"+element.id)
                .then(response=>{
                    return response.json();
                }).then(comments=>{
                    this.buildComments(comments,element);
                }).catch(error=>{
                    console.log(error);
                })
                } catch (error) {
                    console.log(error);
                }
            }else{
                let element = e.target;
                let card = e.target.parentElement.parentElement;
                const section = card.querySelector(".commentsSection");
                section.classList.remove("commentsSection__scroll");
                while (section.firstChild) {
                    section.removeChild(section.firstChild);
                }
                element.classList.add("view");
                element.querySelector("img").src="../img/Close.svg"
                element.classList.remove("mb-3");
            }
        }
    }
    buildComments = (comments,element)=>{
        comments.forEach(comment=>{
            this.buildComment(comment,element);
        })
    }
    buildComment = (comment,element)=>{
        try {
            fetch(this.url+"/findUser/"+comment.idUser)
            .then(response=>{
                return response.json();
            }).then(user=>{
                let userComment = user;
                this.insertComment(comment,userComment,element);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            
        }
    }
    insertComment = (comment, user,element)=>{
       const card = (element.parentElement.parentElement);
       const section = card.querySelector(".commentsSection");

       let date = comment.date;
       let datePoints = date.split("-");
       let start =datePoints[0];
       let end =datePoints[2];
       datePoints[0] = end;
       datePoints[2] = start;

       date = datePoints[0]+"/"+datePoints[1]+"/"+datePoints[2];

       
        const commentHTML = document.createElement("DIV");
        commentHTML.classList.add("commentCard");
        commentHTML.innerHTML =`
        <div class = "commentCard__top">
            <div class="commentCard__top-info">
                <img src="../userIMG/${user.image}">
                <div class= "commentCard__top-user">
                    <p>${user.userName}</p>
                    <img src="../img/${user.rank}">
                </div>
            </div>
            <div class="commentCard__top-date">
                <img src = "../img/DateBlue.svg">
                <p>${date}</p>
            </div>
        </div>
        <div class = "commentCard__main">
            <p>${comment.content}</p>
        </div>
        
        `;
        section.appendChild(commentHTML);
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
                    const question = new Question(action,post,this.url);
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