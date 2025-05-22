// Variables utilisées 
const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#loginBtn");
const loginRoute = "http://localhost:3000/login";

// Fonctions utilisées 
function showOrHidePop() {
  document.querySelector("#result-popover").classList.toggle("show");
}

function displayValidPop(target, status) {
  const popover = document.querySelector('#result-popover');

  // Supprime le contenu précédent
  while (popover.firstChild) {
    popover.removeChild(popover.firstChild);
  }
    const title = document.querySelector('h3')
    title.classList.add("title")
  if (status === "accepted") {
    title.textContent = "Connexion Réussie"
    popover.appendChild(title);

    const icon = document.querySelector('i');
    icon.classList.add("fa-solid");
    icon.classList.add("fa-square-check");
    popover.appendChild(icon);

    const button = document.createElement('button')
    button.classList.add('redirectionBtn');
    button.textContent = "Aller à la la page des agents"
    popover.appendChild(button)
    }
     else {
  }
}

async function toAuthentificate(matriculeUser, passwordUser){

    console.log(matriculeUser, passwordUser)
    try {
        const response = await fetch(loginRoute, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                matricule: matriculeUser, 
                password: passwordUser
            })
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Réponse du serveur :", data.statut);

        // ➕ Redirection possible si besoin
        if (data.status === "accepted") {
            target = "../html/categories.html"
            window.location.href = target;
        } else {
            // displayValidPop(none, none); 
            console.error("Connexion Echouée")

        }

    } catch (error) {
        console.log("Erreur lors de l'authentification :", error);
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Se connecter";
    }
}

// ➕ Lier la fonction au bouton
loginBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    loginBtn.disabled = true;
    loginBtn.textContent = "En cours...";

    const matriculeUser = loginForm.querySelector("#matricule").value.trim();
    const passwordUser = loginForm.querySelector("#password").value.trim();

    loginForm.querySelector("#matricule").value = "";
    loginForm.querySelector("#password").value = "";

    // Appel de la fonction d'authentification
    toAuthentificate(matriculeUser, passwordUser);
});


