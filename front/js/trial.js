if (event.target.matches("#generate")) {
  const confirmation = window.confirm("⚠️ Voulez-vous vraiment générer les fiches de paie pour cette catégorie ?");

  if (!confirmation) return; // L'utilisateur a annulé

  const categoryData = JSON.parse(localStorage.getItem("selectedCategory"));
  const categoryId = categoryData.id;

  if (!categoryId) {
    alert("Catégorie non trouvée.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/paie/generate/category/${categoryId}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Erreur réseau");

    const result = await response.json();
    alert("✅ Fiches de paie générées avec succès !");
    console.log(result); // Pour voir la réponse dans la console

  } catch (error) {
    console.error("Erreur de génération :", error);
    alert("❌ Une erreur est survenue lors de la génération des fiches.");
  }
}