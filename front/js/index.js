/* Script Code */
const burger_button = document.querySelector(".menu_button")
const navbar = document.querySelector(".navbar") 

// Detection du click
burger_button.addEventListener("click", () =>{
    burger_button.classList.toggle("active")
    navbar.classList.toggle("active")
})