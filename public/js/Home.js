document.addEventListener("DOMContentLoaded",()=>{
    loadTop5Users();
    loadSpecialPosts();
});
const loadTop5Users = ()=>{
    try {
        fetch("http://localhost:1000/top5Users")
        .then(response=>{
            return response.json();
        }).then(users=>{
            insertUsers(users);
        })
    } catch (error) {
        
    }
}
const loadSpecialPosts = ()=>{
    insertSpecialPosts(10);
}
const insertUsers = users=>{
    const list = document.querySelector(".usersList");
    let place = 1;
    users.forEach(user=>{
        const userItem = document.createElement("DIV");
        userItem.classList.add("userItemTop");
        userItem.id = user._id;
        userItem.innerHTML = `
            <div class="principalContentTop">
                <img src = "../img/${user.image}">
                <div class = "userItemTop_info">
                    <p>${user.userName}</p>
                    <img src = "../img/${user.rank}">
                </div>
            </div>
            <p>${place}</p>
        `;
        place++;
        list.appendChild(userItem);
    })
}
const insertSpecialPosts = number =>{
    const specialsSection = document.querySelector(".specialsSection");
    for (let i = 0; i < number; i++) {
        const itemPost =document.createElement("DIV");
        itemPost.classList.add("specialPost");
         itemPost.innerHTML = `
         <div class="specialPost__header">
            <img src="../img/userImage.svg">
            <p>Piter adam</p>
            <img src="../img/HackerSpecial.svg">   
         </div>
         <div class= "specialPost__info">
            <h3>This is the titel and this is the max length</h3>
            <div class= "specialPost__date">
                <img src="../img/DateBlue.svg">
                <p>12/12/2021</p>
            </div>
         </div>
         <div class = "specialPost__content">
         <p>
            This is the content of the special post, please give me design
            for my self jajajsjajasjjjjsaj it's a pranc bro <3 a caso siempre
            tenemos que hablar ingles amigios miosssss
            This is the content of the special post, please give me design
            for my self jajajsjajasjjjjsaj it's a pranc bro <3 a caso siempre
            tenemos que hablar ingles amigios miosssss
         </p>
         </div>

    `;
    specialsSection.appendChild(itemPost);
        
    }
}