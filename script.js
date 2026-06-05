const slider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

slider.addEventListener("input", () => {
    lengthValue.textContent = slider.value;
});





function generatePassword(){

    const name =
        document.getElementById("name").value;

    const color =
        document.getElementById("color").value;

    const animal =
        document.getElementById("animal").value;

    if(!name || !color || !animal){
        alert("Please fill all fields");
        return;
    }

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    const length = Number(slider.value);

    // rest of code...


    let seed =
        name.slice(0,2) +
        color.slice(0,2) +
        animal.slice(0,2);

    let password = "";

    for(let i=0;i<length;i++){

        const randomIndex =
            Math.floor(Math.random()*chars.length);

        password += chars[randomIndex];
    }

    password =
        seed +
        password;

    password =
        password.slice(0,length);

    document.getElementById("password").value =
        password;

    checkStrength(password);

    saveHistory(password);
}


function togglePassword() {

    const password =
        document.getElementById("password");

    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}

function toggleTheme(){

    document.body.classList.toggle("light-mode");

    const btn =
        document.getElementById("themeBtn");

    if(document.body.classList.contains("light-mode")){
        btn.innerHTML = "☀️";
    }
    else{
        btn.innerHTML = "🌙";
    }
}

function checkStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.match(/[A-Z]/)) score++;
    if(password.match(/[a-z]/)) score++;
    if(password.match(/[0-9]/)) score++;
    if(password.match(/[!@#$%^&*()_+]/)) score++;

    const text =
        document.getElementById("strengthText");

    const bar =
    document.getElementById("bar");


    if(score <= 2){

    text.textContent = "Weak";
    text.style.color = "#ef4444";

    bar.style.width = "30%";
    bar.style.background = "#ef4444";
}
else if(score <= 4){

    text.textContent = "Strong";
    text.style.color = "#f59e0b";

    bar.style.width = "70%";
    bar.style.background = "#f59e0b";
}
else{

    text.textContent = "Very Strong";
    text.style.color = "#22c55e";

    bar.style.width = "100%";
    bar.style.background = "#22c55e";
}
}

function copyPassword(){

    const password =
        document.getElementById("password");

    navigator.clipboard.writeText(
        password.value
    );

    alert("Password copied!");
}

function saveHistory(password){

    let history =
        JSON.parse(localStorage.getItem("history"))
        || [];

    history.unshift(password);

    history = history.slice(0,5);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    displayHistory();
}

function displayHistory(){

    const history =
        JSON.parse(localStorage.getItem("history"))
        || [];

    const list =
        document.getElementById("history");

    list.innerHTML = "";

    history.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent = item;

        list.appendChild(li);
    });
}

displayHistory();