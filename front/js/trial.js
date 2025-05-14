document.addEventListener("DOMContentLoaded", async () => {
  const categoryId = localStorage.getItem("selectedCategoryId");

  if (!categoryId) {
    // document.body.innerHTML = "<p>Catégorie non sélectionnée.</p>";
    // return;
    console.log("error")
  }

  try {
    const response = await fetch(`http://localhost:3000/api/agents/by-category/${categoryId}`);
    const agents = await response.json();

    // Ici tu affiches les agents dynamiquement
    console.log(agents);
    // → tu peux maintenant créer un tableau ou des cartes selon ton design
  } catch (error) {
    console.error("Erreur lors de la récupération des agents :", error);
  }
});
