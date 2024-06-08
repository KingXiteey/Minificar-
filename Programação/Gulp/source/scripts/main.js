document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.getElementById('originalImage');
        img.src = e.target.result;
        img.onload = function() {
            document.getElementById('compressBtn').disabled = false;
        };
    };

    reader.readAsDataURL(file);
});

document.getElementById('compressBtn').addEventListener('click', function() {
    const img = document.getElementById('originalImage');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;  // Corrigido 'heinght' para 'height'
    ctx.drawImage(img, 0, 0);
    const quality = 0.7;
    const compressDataUrl = canvas.toDataURL('image/jpeg', quality);
    const compressImg = document.getElementById('compressedImage');
    compressImg.src = compressDataUrl;
    const link = document.createElement('a');
    link.href = compressDataUrl;
    link.download = 'image_comprimida.jpg';  // Adicionada a aspa dupla de fechamento
    link.click();
});
