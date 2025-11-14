// Dummy data per sektor
const sektorData = {
  "Media": [
    { no: 1, prospek: "TV Lokal", nama: "Arkara TV", cp: "Budi", hp: "081234567890", dok: "Ada", progress: "90%" },
    { no: 2, prospek: "Radio", nama: "Suara Arkara", cp: "Sinta", hp: "081223344556", dok: "Belum", progress: "60%" }
  ],
  "Event Organizer": [
    { no: 1, prospek: "Festival", nama: "Arkara Fest", cp: "Rina", hp: "082134567890", dok: "Ada", progress: "80%" }
  ],
  "Food & Beverages": [],
  "Hospitality": [],
  "Property": [],
  "Plantation": [],
  "Mining": [],
  "Uncategorized": []
};

function showTable(sektor) {
  document.getElementById("data-table-section").classList.remove("hidden");
  document.getElementById("table-title").textContent = `Tabel Sektor ${sektor}`;
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  const data = sektorData[sektor] || [];
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">Belum ada data untuk sektor ${sektor}</td></tr>`;
    return;
  }

  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.no}</td>
        <td>${item.prospek}</td>
        <td>${item.nama}</td>
        <td>${item.cp}</td>
        <td>${item.hp}</td>
        <td>${item.dok}</td>
        <td>${item.progress}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}
