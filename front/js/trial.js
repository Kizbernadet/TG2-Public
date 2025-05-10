function loadCategorie(objects) {
    for (const item of objects) {
        const container = document.createElement("div");
        container.classList.add("categorie-card");
        container.id = item.id;

        const content = document.createElement("ul"); // <ul> pour une liste claire
        content.classList.add("content");

        // Liste des propriétés à afficher (modifiable facilement)
        const fields = {
            nom: "Nom",
            nombre_agents: "Agents",
            bonus: "Bonus",
            seuil: "Seuil"
        };

        for (const key in fields) {
            const li = document.createElement("li");
            if (key === "bonus") {
                li.textContent = `${fields[key]} : ${item[key]} %`;
            } else {
                li.textContent = `${fields[key]} : ${item[key]}`;
            }
            content.appendChild(li);
        }

        container.appendChild(content);

        const button = document.createElement("div");
        button.classList.add("view-button");

        const link = document.createElement("a");
        link.setAttribute('href', 'categorie_table.html');
        link.textContent = "Voir les agents";
        button.appendChild(link);

        container.appendChild(button);

        categorie_grid.appendChild(container);
    }
}
