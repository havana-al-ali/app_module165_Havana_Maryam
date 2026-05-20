function sortData(field) {
 localStorage.clear();
    fetch("../backend/sort.php?field=" + field)
        .then(r => r.json())
        .then(s => {
            document.getElementById("result-sort").innerHTML = `
                <strong>Meilleur élève :</strong><br><br>
                Genre : ${s.gender}<br>
                Race : ${s["race/ethnicity"]}<br>
                Éducation : ${s["parental level of education"]}<br>
                Lunch : ${s.lunch}<br>
                Préparation : ${s["test preparation course"]}<br><br>
                Math : ${s["math score"]}<br>
                Lecture : ${s["reading score"]}<br>
                Écriture : ${s["writing score"]}<br><br>
                <strong>Moyenne : ${s.average}</strong>
            `;
        });
}

function resetSortUI() {
    // vider le localStorage
    localStorage.clear();

    // vider les résultats
    document.getElementById("result-sort").innerHTML = "";

    // message optionnel
    console.log("Tri réinitialisé.");
}