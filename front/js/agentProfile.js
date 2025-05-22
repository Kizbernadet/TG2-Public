// Variables Utilisées 
const container = document.querySelector(".agentProfil");
const profil_box = document.querySelector(".profile-info");

const icons = {
    nom: "fa-user", 
    prenom: "fa-user", 
    date_recrutement: "fa-calendar-alt", 
    salaire_base: "fa-money-bill-wave", 
    statut: "fa-circle", 
    categorie: "fa-briefcase", 
    bonus: "fa-gift", 
    seuil: "fa-chart-line",
    matricule : "fa-barcode"
}


// Ajouter les infos dynamiquement dans le dom
function loadAgentData(data){
    // Ajouter un id sur le container principal 
    container.id = data.id
    const keys = Object.keys(data);
    keys.splice(0, 1);
    console.log(keys)

    // Ajouter dynamiquement les éléments dans le profil_box
    for (const key of keys){
        const li = document.createElement("li");

        const icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add(`${icons[key]}`);
        li.appendChild(icon); 

        const span = document.createElement("span");
        if(key === "date_recrutement"){
            span.textContent = `recrutement : ${data[key]}`;
        }
        else if(key === "salaire_base"){
            span.textContent = `Salaire de base : ${data[key]}`;
        }

        else if(key === "bonus"){
            let value = parseFloat(data[key]) * 100;
            span.textContent = `${key} : ${value} %`;
        }

        else if(key === "statut"){
            if (!data[key]){
                icon.classList.add("passive_status")
                span.textContent = `${key} : Passif`;
            }
            else{
                icon.classList.add("active_status")
                span.textContent = `${key} : Actif`;
            }
        }
        else{
            span.textContent = `${key} : ${data[key]}`;
        }
        li.appendChild(span);

        profil_box.appendChild(li);
    }
}


// Récupérer les infos de l'agent 
// Execute cette ligne dès le chargement de la page 
document.addEventListener("DOMContentLoaded", async() => {
    let agentId = JSON.parse(localStorage.getItem("selectedAgentId"));
    agentId = agentId.id;

    if (!agentId){
        console.error("Agent non sélectionnée");
        return;
    }

    try{
        const response = await fetch(`http://localhost:3000/api/agents/profile/${agentId}`);
        const data = await response.json();
        console.log(data);
        loadAgentData(data);

    }catch(error){
        console.error("Erreur lors de la récupération des informations de l'agent", error);
    }
});