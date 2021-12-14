document.addEventListener("DOMContentLoaded",()=>{
    formListener();
});
const formListener = ()=>{
    const form = document.querySelector(".signUpForm");
    form.addEventListener("submit",login);
}
const login=e=>{
    e.preventDefault();
    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password").value;
    const errors = validateInputs(userName, password);

    if(errors[0].error==false && errors[1].error==false){
        const user ={
            userName,
            password,
        }
        sendUser(user);
    }else{
        errorMessage(errors);
    }

    

}
const validateInputs = (userName, password)=>{
    userName = userName.trim();
    password = password.trim();
    const errors = [{error: false,message: ""},{error: false,message: ""}];
    if(userName==""){
        errors[0].error = true;
        errors[0].message = "UserName is required";
    }else if(userName.length<3 || userName.length>20){
        errors[0].error = true;
        errors[0].message = "Length of username is invalid";
    }

    if(password==""){
        errors[1].error = true;
        errors[1].message = "Password is required";
    }else if(password.length<8){
        errors[1].error = true;
        errors[1].message = "Very short password";
    }
    return errors;
}
const errorMessage = (error)=>{
    const userNameArea = document.querySelector("#userNameErrorDIV");
    const userNameError = document.querySelector("#userNameError");
    const passwordArea = document.querySelector("#passwordErrorDIV");
    const passwordError = document.querySelector("#passwordError");
    if(error[0].error==true){
        if(!userNameArea.classList.contains("errorBack")){
            userNameArea.classList.add("errorBack");
        }
        userNameError.textContent = error[0].message;

    }
    if(error[1].error==true){
        if(!passwordArea.classList.contains("errorBack")){
            passwordArea.classList.add("errorBack");
        }
        passwordError.textContent = error[1].message;
    }

    setTimeout(() => {
        if(userNameArea.classList.contains("errorBack")){
            userNameArea.classList.remove("errorBack");
            userNameError.textContent = "";
        }
        if(passwordArea.classList.contains("errorBack")){
            passwordArea.classList.remove("errorBack");
        }
        passwordError.textContent = "";

    }, 5000);
}
const errorBDD = (error)=>{
    const errorArea = document.querySelector("#errorBddDIV");
    const errorBdd = document.querySelector("#errorBdd");
    if(!errorArea.classList.contains("errorBack")){
        errorArea.classList.add("errorBack");
    }
    errorBdd.textContent = error;

    setTimeout(() => {
        errorArea.classList.remove("errorBack");
        errorBdd.textContent = "";
    }, 5000);



}
const sendUser = (user)=>{
    const data ={
        headers: {'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(user)
    }
    try {
        fetch("http://localhost:1000/login",data)
        .then(response=>{
            return response.json();
        }).then(data=>{
           const {message} = data;
           if(message==="YES"){
            window.location.href= "/";
            errorBDD("Invalid credentials");
           }
           
        }).catch(error=>{
            errorBDD("Error in the aplication");
        })
    } catch (error) {
        console.log("Este es el error: "+error);
    }
}

