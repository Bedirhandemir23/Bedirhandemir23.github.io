document.addEventListener("DOMContentLoaded", () => {
    // Daha önceki kodlar buraya taşındı

    // Anamnez formunu işle ve localStorage'a ekle
    const anamnezForm = document.getElementById('anamnez-form');
    anamnezForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(anamnezForm);
        const anamnezData = {
            date: formData.get('date'),
            name: formData.get('name'),
            gender: formData.get('gender'),
            age: formData.get('age'),
            complaint: formData.get('complaint'),
            diseases: formData.get('diseases').split(','),
            medications: formData.get('medications'),
            treatment: formData.get('treatment'),
            treatmentDescription: formData.get('treatment-description')
        };

        // Eğer localStorage'da anamnez verileri yoksa, boş bir dizi oluştur
        let existingAnamnezData = JSON.parse(localStorage.getItem('anamnezData')) || [];
        // Yeni veriyi ekleyerek localStorage'a kaydet
        existingAnamnezData.push(anamnezData);
        localStorage.setItem('anamnezData', JSON.stringify(existingAnamnezData));

        // Formu sıfırla
        anamnezForm.reset();

        // Kullanıcıya verinin başarıyla eklendiğine dair bir mesaj gösterilebilir
        alert('Anamnez verisi başarıyla eklendi!');
        
    });

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

