
class Users {
    constructor(){
        this.url = "http://localhost:1000";
        this.section = document.querySelector(".usersSection");
        this.userNameInput = document.querySelector("#userName");
        this.users =[];
        this.usersFilter = [];
        this.loadUsers();
        this.viewProfile();
    }
    loadUsers = ()=>{
        try {
            fetch(this.url+"/allUsers")
            .then(response=>{
                return response.json();
            }).then(users=>{
                this.users = users;
                this.insertUsersHTML(this.users)
            })
        } catch (error) {
            
        }
    }
    listenInput = ()=>{
        this.userNameInput.addEventListener("input",this.filterUsers);
    }
    filterUsers = e=>{
        const userName = e.target.value.trim();
        if(userName===""){
            this.insertUsersHTML(this.users);
        }else{
            this.usersFilter = this.users.filter(user=>{
                if(user.userName.indexOf(userName)>-1){
                    return user;
                }
            });
            this.insertUsersHTML(this.usersFilter);
        }
    }
    insertUsersHTML = (users)=>{
        while(this.section.firstChild){
            this.section.removeChild(this.section.firstChild);
        }

        users.forEach(user=>{
            const userCard = document.createElement("DIV");
            userCard.classList.add("userCardSmall");
            userCard.innerHTML = `
            <div class = "userCardSmall__info">
                <img src = "../userIMG/${user.image}">
                <p>${user.userName}</p>
                <img src = "../img/${user.rank}">
            </div>
            
            <button class = "viewProfile" id= ${user._id}> View Profile</button>
            `;
            this.section.appendChild(userCard);
        });
    }
    viewProfile = ()=>{
        this.section.addEventListener("click",e=>{
            const element = e.target;
            if(element.tagName==="BUTTON"){
                const id = element.id;
                window.location.href = this.url+"/viewProfile/"+id;
            }
        });
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const users = new Users();
    users.listenInput();

})