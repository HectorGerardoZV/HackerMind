class Question {
    constructor(action,post,url){
       this.body = document.querySelector("body");
       this.action = action;
       this.post = post;
        this.url = url;
       this.editable = "";
       this.disabled = "";
       this.openOverlay();
       this.destroyFormClick();
       this.actionEvent();
    }
    openOverlay = ()=>{
        const overlay = document.createElement("DIV");
        overlay.classList.add("overlay");
        this.body.appendChild(overlay);
        this.body.classList.add("hidden-body");
        this.buildForm();

        
    }
    buildForm = ()=>{
        if(this.action==="Delete"){
            this.editable = "readonly";
            this.disabled = "disabled";
        }

        const overlay = document.querySelector(".overlay");
        const form  = document.createElement("DIV");
        form.classList.add("overlayForm");
        form.innerHTML = `
        <div class="overlayInput__top">
            <div class="overlayInput">
                <label>Title</label>
                <input  ${this.editable} id= "titleOverlay" value = "${this.post.title}">
            </div>
            <div  class="overlayInput">
                <label>Category</label>
                <select  ${this.disabled} id="categoryOverlay">
                    <option value = "AI">AI</option>
                    <option value = "SW">SW</option>
                    <option value = "GAME">GAME</option>
                    <option value = "TI">TI</option>
                </select>
            </div>
            
        </div>
        <div class = "overlayInput__mid">
            <label>content</label>
            <textarea ${this.editable} id="contentOverlay">${this.post.content}</textarea>
        </div>

        <div class = "overlayOptions">
            <button id= "actionButton" class = "${this.action}Button">
            ${this.action}
            <img src="../../img/${this.action}.svg">
            </button>
            <button class="CancelButton">
            Cancel
            <img src="../../img/Cancel.svg">
            </button>
        </div>
        
        `;
       
        overlay.appendChild(form);
        this.setSelect();

    }
    setSelect = ()=>{
        const select = document.querySelector("#categoryOverlay").options;
        const options = Array.from(select);
        options.forEach(option=>{
            if(option.value ===this.post.idCategory){
                option.selected= "selected";
            }
        })
    }
    destroyFormClick = ()=>{
        const cancel = document.querySelector(".CancelButton");
        cancel.addEventListener("click",()=>{
            const overlay = document.querySelector(".overlay");
            overlay.classList.remove("overlay");
            this.body.removeChild(overlay)
            this.body.classList.remove("hidden-body");
        });
       
    }
    destroyFormReq = ()=>{
        //Load the new posts
        const myPosts = new MyPosts();

        const overlay = document.querySelector(".overlay");
        overlay.classList.remove("overlay");
        this.body.removeChild(overlay)
        this.body.classList.remove("hidden-body");
    }
    waitResponseForm = ()=>{
        const overlay = document.querySelector(".overlay");
        overlay.innerHTML = ``;
    }
    actionEvent = ()=>{
        const actionButton =document.querySelector("#actionButton"); 
        let decision = "";
        actionButton.addEventListener("click",()=>{
           if(this.action === "Delete"){
            decision = "deletePost";
            const urlReq = this.url+"/"+decision+`/${this.post._id}`;

            try {
                fetch(urlReq)
                .then(response=>{
                    return response.json();
                }).then(res=>{
                    const {message} = res;
                    if(message==="YES"){
                     
                     this.waitResponseForm();
                     this.messageAction(this.action,"Good");
                    }else{
                     this.waitResponseForm();
                     this.messageAction(this.action,"Bad");
                    }
                   
                }).catch(error=>{
                 this.waitResponseForm();
                 this.messageAction(this.action,"error");
                })
               
            } catch (error) {
             this.waitResponseForm();
             this.messageAction(this.action,"error");
            }


           }else{
            decision = "editPost";
            const title = document.querySelector("#titleOverlay").value;
            const category = document.querySelector("#categoryOverlay").value;
            const content = document.querySelector("#contentOverlay").value;
            this.post.title = title;
            this.post.idCategory = category;
            this.post.content = content;
            const urlReq = this.url+"/"+decision;
            const data ={
                headers: {'Content-type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(this.post)
            }

            try {
                fetch(urlReq,data)
                .then(response=>{
                    return response.json();
                }).then(res=>{
                    const {message} = res;
                    if(message==="YES"){
                     
                     this.waitResponseForm();
                     this.messageAction(this.action,"Good");
                    }else{
                     this.waitResponseForm();
                     this.messageAction(this.action,"Bad");
                    }
                   
                }).catch(error=>{
                 this.waitResponseForm();
                 this.messageAction(this.action,"error");
                })
               
            } catch (error) {
             this.waitResponseForm();
             this.messageAction(this.action,"error");
            }


           }
           
           

        });
        
    }
    messageAction = (action,state)=>{

        let img = "";
        let message = "";
        if(action==="Delete"){
            message = "The post was deleted";
        }else{
            message = "The post was edited";
        }

        if(state==="Good"){
            img= "Success";
        }else{
            img= "Error";
            if(action==="Delete"){
                message = "Error: Post could not be deleted";
            }else{
                message = "Error: Post could not be edited";
            }
        }

        if(state==="error"){
            img= "Error";
            message = "Error: The operation could not be performed";
        }


        const overlay = document.querySelector(".overlay");
        const form  = document.createElement("DIV");
        form.classList.add("overlayForm");
        form.innerHTML = `
        <div class="overlayAction">
            <div class = "overlayImage">
                <img src="../../img/${img}.svg">
            </div>
            
            <p>${message}</p>

            <button class = "buttonOK"> OK </button>
        </div>
        
        `;
       
        overlay.appendChild(form);
        this.destoyMessageAction();
    }
    destoyMessageAction = ()=>{
        const button = document.querySelector(".buttonOK");
        button.addEventListener("click",this.destroyFormReq);
        
    }
}