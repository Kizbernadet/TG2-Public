async function generatePayroll() {
  const generateButton = document.getElementById("generate-button");
  generateButton.disabled = true;
  generateButton.textContent = "Génération en cours...";

  try {
    const response = await fetch("/api/paies/generate", { method: "POST" });
    if (!response.ok) throw new Error("Échec de génération");

    const data = await response.json();
    const { generatedCount, existingCount } = data;

    showPopup(
      `Génération terminée : ${generatedCount} fiche(s) générée(s), ${existingCount} fiche(s) déjà existante(s).`
    );
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la génération des fiches.");
  } finally {
    generateButton.disabled = false;
    generateButton.textContent = "Générer les fiches de paie";
  }
}
