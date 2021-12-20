class UserPosts {
    constructor(){
        this.url = "http://localhost:1000";
        this.section = document.querySelector(".postsUser");
        this.id = document.querySelector(".userCardBig").id;
        this.user ={};
        this.localUser = {};
        this.loadUser();
        this.loadLocalUser();
        this.listenerComment();
    }
    
    loadLocalUser = ()=>{
        try {
            fetch(this.url+"/myUser")
            .then(response=>{
                return response.json();
            }).then(user=>{
                this.localUser = user;
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
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
            fetch(this.url+"/myPosts/"+this.id)
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

            <div class="normalPostCard__COMMENT" id="${post._id}">
                <input type="text" id= "comment" placeholder= "Add Comment">
                <img src="../img/Send.svg">
            </div>
            <div class="normalPostCard__COMMENTS-button">
                <div class="optionsPost">
                </div>
                <button id="${post._id}" class = "view">
                    View Comments
                    <img src="../img/Close.svg">
                </button>
            </div>
            <div class = "commentsSection">
        </div>
            
            `;
            this.section.appendChild(postHTML);
        });
    }
    listenerComment = ()=>{
        this.section.addEventListener("click",this.addComment);
        this.section.addEventListener("click",this.loadComments);
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
                            idUser: this.localUser._id,
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
document.addEventListener("DOMContentLoaded",()=>{
    const userPosts = new UserPosts();
    userPosts.loadPosts();
});