function filter(type) {
 localStorage.clear();
    fetch("../backend/filter.php?type=" + type)
        .then(r => r.json())
        .then(data => {

            document.getElementById("filter-table").style.display = "table";

            const tbody = document.getElementById("result-filter");
            tbody.innerHTML = "";

            data.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.gender}</td>
                        <td>${student["race/ethnicity"]}</td>
                        <td>${student["parental level of education"]}</td>
                        <td>${student.lunch}</td>
                        <td>${student["test preparation course"]}</td>
                        <td>${student["math score"]}</td>
                        <td>${student["reading score"]}</td>
                        <td>${student["writing score"]}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}

function resetFilterUI() {
    // vider le localStorage
    localStorage.clear();

    // cacher le tableau
    document.getElementById("filter-table").style.display = "none";

    // vider les résultats
    document.getElementById("result-filter").innerHTML = "";

    // message optionnel
    console.log("LocalStorage vidé et tableau réinitialisé.");
}
