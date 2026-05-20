function aggregate(type) {
 localStorage.clear();
    fetch("../backend/aggregate.php?type=" + type)
        .then(r => r.json())
        .then(data => {

            const container = document.getElementById("aggregate-container");
            container.innerHTML = "";

            // Moyenne par genre → tableau
            if (type === "avgByGender") {

                let html = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Genre</th>
                                <th>Nombre</th>
                                <th>Moy. Math</th>
                                <th>Moy. Lecture</th>
                                <th>Moy. Écriture</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.forEach(row => {
                    html += `
                        <tr>
                            <td>${row._id}</td>
                            <td>${row.count}</td>
                            <td>${row.avg_math.toFixed(1)}</td>
                            <td>${row.avg_reading.toFixed(1)}</td>
                            <td>${row.avg_writing.toFixed(1)}</td>
                        </tr>
                    `;
                });

                html += "</tbody></table>";
                container.innerHTML = html;
            }

            // Meilleur élève (moyenne) → carte
            if (type === "topStudent") {
                const s = data;
                container.innerHTML = `
                    <div class="student-card">
                        <strong>Meilleur élève (moyenne) :</strong><br><br>
                        Genre : ${s.gender}<br>
                        Race : ${s["race/ethnicity"]}<br>
                        Éducation : ${s["parental level of education"]}<br>
                        Lunch : ${s.lunch}<br>
                        Préparation : ${s["test preparation course"]}<br><br>
                        Math : ${s["math score"]}<br>
                        Lecture : ${s["reading score"]}<br>
                        Écriture : ${s["writing score"]}<br><br>
                        <strong>Moyenne : ${s.average.toFixed(1)}</strong>
                    </div>
                `;
            }
        });
}

function resetAggregateUI() {
    // vider le localStorage
    localStorage.clear();

    // vider les résultats
    document.getElementById("aggregate-container").innerHTML = "";

    // message optionnel
    console.log("LocalStorage vidé et tableau réinitialisé.");
}