
class Question {
    constructor(action,post){
       this.body = document.querySelector("body");
       this.action = action;
       this.post = post;

       this.editable = "";
       this.disabled = "";
       this.openOverlay();
       this.destroyForm();
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
            <button class = "${this.action}Button">
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
            console.log(option);
        })
    }

    destroyForm = ()=>{
        const cancel = document.querySelector(".CancelButton");
        cancel.addEventListener("click",()=>{
            const overlay = document.querySelector(".overlay");
            overlay.classList.remove("overlay");
            this.body.removeChild(overlay)
            this.body.classList.remove("hidden-body");
        });
       
    }

}