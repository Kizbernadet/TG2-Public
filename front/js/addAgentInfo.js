// Variables utilisées 
const profil_container = document.querySelector("profile-info");

const agent = {
    id: 1,
    nom: "Adama Traoré",
    categorie: "Senior",
    dateEntree: "2022-03-01",
    salaireBase: 500000,
    chiffreAffairesMensuel: 1250000,
    bonusPourcent: 10,
    statut: "Actif"
  };

const keys = agent.keys();

  
function loadInfo(){
    keys.forEach(key => {
        let li = document.createElement("li");

        let icon = document.createElement("i");
        icon.classList.add("fa fa-user");
        li.appendChild(icon);

        let span = document.createElement("span");
        span.textContent = ""

        li.appendChild(span);

        // let icon = document.createElement(i);
        // icon.classList.add("fa fa-user");
        // li.appendChild(icon);

        profil_container.appendChild(li);

    })
}