// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')
let username = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let url = `http://localhost:3000/users`;
// Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                axios.get(url)
                    .then(response => {
                        // Access the response data
                        if (response.status === 200) {
                            const responseData = response.data;
                            const inputUsername = username.value;
                            for (let i = 0; i < responseData.length; i++) {
                                if (responseData[i].username === inputUsername) {
                                    var result = responseData[i];
                                }
                            }
                            if (username.value == result.username && password.value == result.password) {
                                window.open("../product.html" , "_blank")
                            }
                            else if (username.value != result.username || password.value != result.password) {
                                let p = document.createElement("p");
                                p.textContent = "Incorrect password or username"
                                document.getElementById("invalidData").append(p);
                            }
                        }
                    })
            }
            form.classList.add('was-validated');
        }, false)
    })
    // set username value to sessionstorage
    username.oninput = () => {
        sessionStorage.setItem("username", username.value);
    }
    username.value = sessionStorage.getItem("username");
})()

// import data to page 
// let btn = document.querySelector("button");
// btn.addEventListener("click", (e) => {
//     axios.get(url)
//     .then(response => {
//         // Access the response data
//         if (response.status === 200) {
//             const responseData = response.data;
//             const inputUsername = username.value;
//                 for (let i = 0; i < responseData.length; i++) {
//                     if (responseData[i].username === inputUsername) {
//                         var result = responseData[i];
//                     }
//                 }
//                 if (username.value == result.username && password.value == result.password) {
//                     location.href = "../product.html";
//                 }
//                 else if (username.value != result.username || password.value != result.password) {
//                     let p = document.createElement("p");
//                     p.textContent = "Incorrect password or username"
//                     document.getElementById("invalidData").append(p);
//                 }
//             }
//         })
        
//     })
