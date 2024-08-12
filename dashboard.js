document.addEventListener('DOMContentLoaded', () => {
    const anamnezData = JSON.parse(localStorage.getItem('anamnezData')) || [];
    const dataTable = document.querySelector('#anamnez-data');

    

    function renderTable() {
        dataTable.innerHTML = '';
        anamnezData.forEach((data, index) => {
            const row = dataTable.insertRow();
            row.insertCell(0).textContent = data.date;
            row.insertCell(1).textContent = `${data['first-name']} ${data['last-name']}`;
            row.insertCell(2).textContent = data.gender;
            row.insertCell(3).textContent = data.age;
            row.insertCell(4).textContent = data.complaint;
            row.insertCell(5).textContent = data.diseases.join(', ');
            row.insertCell(6).textContent = data.medications;
            row.insertCell(7).textContent = data.treatment;
            row.insertCell(8).textContent = data['treatment-description'];

            const actionsCell = row.insertCell(9);
            const editButton = document.createElement('button');
            editButton.textContent = 'Düzenle';
            editButton.addEventListener('click', () => editData(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Sil';
            deleteButton.addEventListener('click', () => deleteData(index));
            actionsCell.appendChild(deleteButton);
        });
        updateCharts();
    }


    function applyFilter() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filteredData = anamnezData.filter(data => {
            return Object.values(data).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            );
        });
        renderTable(filteredData);
    }

    function updateCharts() {
        // Cinsiyet dağılımı
        const genderCounts = anamnezData.reduce((acc, data) => {
            acc[data.gender] = (acc[data.gender] || 0) + 1;
            return acc;
        }, {});

        new Chart(document.getElementById('genderChart'), {
            type: 'pie',
            data: {
                labels: Object.keys(genderCounts),
                datasets: [{
                    data: Object.values(genderCounts),
                    backgroundColor: ['#FF914D', '#E45D56']
                }]
            }
        });

        // Yaş dağılımı
        const ageCounts = anamnezData.reduce((acc, data) => {
            const ageRange = `${Math.floor(data.age / 10) * 10}-${Math.floor(data.age / 10) * 10 + 9}`;
            acc[ageRange] = (acc[ageRange] || 0) + 1;
            return acc;
        }, {});

        new Chart(document.getElementById('ageChart'), {
            type: 'line',
            data: {
                labels: Object.keys(ageCounts),
                datasets: [{
                    data: Object.values(ageCounts),
                    backgroundColor: '#87095E'
                }]
            }
        });

        // Tedavi dağılımı
        const treatmentCounts = anamnezData.reduce((acc, data) => {
            acc[data.treatment] = (acc[data.treatment] || 0) + 1;
            return acc;
        }, {});

        new Chart(document.getElementById('treatmentChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(treatmentCounts),
                datasets: [{
                    data: Object.values(treatmentCounts),
                    backgroundColor: ['#FF914D', '#E45D56', '#87095E', '#4B0056', '#373050','#B7B7B7','#000']
                }]
            }
        });

        // Şikayet dağılımı
        const complaintCounts = anamnezData.reduce((acc, data) => {
            acc[data.complaint] = (acc[data.complaint] || 0) + 1;
            return acc;
        }, {});

        new Chart(document.getElementById('complaintChart'), {
            type: 'pie',
            data: {
                labels: Object.keys(complaintCounts),
                datasets: [{
                    data: Object.values(complaintCounts),
                    backgroundColor: ['#FF914D', '#E45D56', '#87095E', '#4B0056', '#373050','#B7B7B7','#000']
                }]
            }
        });

        // İlaçlar dağılımı
        const medicationsCounts = anamnezData.reduce((acc, data) => {
            const medications = data.medications.split(', ');
            medications.forEach(med => {
                acc[med] = (acc[med] || 0) + 1;
            });
            return acc;
        }, {});

        new Chart(document.getElementById('medicationsChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(medicationsCounts),
                datasets: [{
                    data: Object.values(medicationsCounts),
                    backgroundColor: ['#FE382D','#FE655D','#F9817A','#FEA19C','#F5E6E6']
                }]
            }
        });

        // Sistemik hastalıklar dağılımı
        const diseasesCounts = anamnezData.reduce((acc, data) => {
            data.diseases.forEach(disease => {
                acc[disease] = (acc[disease] || 0) + 1;
            });
            return acc;
        }, {});

        new Chart(document.getElementById('diseasesChart'), {
            type: 'bar',
            data: {
                labels: Object.keys(diseasesCounts),
                datasets: [{
                    data: Object.values(diseasesCounts),
                    backgroundColor:['#4F0E69','#8723BF','#C43CB2','#7B6CA1',''] 
                }]
            }
        });

        

        // En çok yapılan tedaviler
        const mostCommonTreatments = Object.entries(treatmentCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        document.getElementById('most-common-treatments').textContent = mostCommonTreatments.map(([treatment, count]) => `${treatment}: ${count}`).join(', ');

        // En sık görülen şikayetler
        const mostCommonComplaints = Object.entries(complaintCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        document.getElementById('most-common-complaints').textContent = mostCommonComplaints.map(([complaint, count]) => `${complaint}: ${count}`).join(', ');

        // En sık görülen hastalıklar
        const mostCommonDiseases = Object.entries(diseasesCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        document.getElementById('most-common-diseases').textContent = mostCommonDiseases.map(([disease, count]) => `${disease}: ${count}`).join(', ');
    }

    function editData(index) {
        // Düzenleme işlemleri için kod
    }

    function deleteData(index) {
        anamnezData.splice(index, 1);
        localStorage.setItem('anamnezData', JSON.stringify(anamnezData));
        renderTable();
    }

    document.getElementById('add-new').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    renderTable();
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});


