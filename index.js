const query = document.querySelector("#query");
const alpha = document.querySelector("#alpha");
const results = document.querySelector("#results");
const searchForm = document.querySelector("#search-form");

searchForm.addEventListener('submit', function (e) {
	e.preventDefault()
});

async function search() {
	results.innerHTML = "";
	const q = query.value;
	const a = alpha.value;
	const res = await fetch("https://vsm-ir.herokuapp.com/", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: q, alpha: parseFloat(a)
		})
	});

	const data = await res.json();
	console.log(data)
	const docHeading = document.createElement("h1");
	docHeading.className = "flow-text";
	docHeading.style.fontWeight = "bold";
	docHeading.textContent = "Document(s): "
	results.appendChild(docHeading);
	const resultTable = document.createElement("table");
	resultTable.className = "striped highlight responsive-table";
	const thead = document.createElement("thead");
	const row = document.createElement("tr");
	const n = document.createElement("th");
	n.textContent = "#";
	const id = document.createElement("th");
	id.textContent = "Doc ID";
	const sim = document.createElement("th");
	sim.className = "valign-wrapper";
	sim.textContent = "Similarity (α > " + (a || String(0.005)) + ")";
	const arrowIcon = document.createElement("i");
	arrowIcon.className = "material-icons";
	arrowIcon.textContent = "arrow_drop_down";
	sim.appendChild(arrowIcon);
	row.appendChild(n);
	row.appendChild(id);
	row.appendChild(sim);
	thead.appendChild(row);
	resultTable.appendChild(thead);
	const sortedData = data.sort((a, b) => b[1] - a[1]);
	const tbody = document.createElement("tbody");
	sortedData.forEach((d, i) => {
		const row = document.createElement("tr");
		const n = document.createElement("td");
		n.textContent = String(i + 1);
		const id = document.createElement("td");
		id.textContent = String(d[0]);
		const sim = document.createElement("td");
		sim.textContent = String(d[1].toFixed(3));
		row.appendChild(n);
		row.appendChild(id);
		row.appendChild(sim);
		tbody.appendChild(row);
	});
	
	resultTable.appendChild(tbody);
	results.appendChild(resultTable);
}