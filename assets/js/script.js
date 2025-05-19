// Piano garantido - versão simplificada e testada
function createPiano() {
    const piano = document.getElementById('piano');
    piano.innerHTML = '';
    
    // Teclas brancas
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    whiteKeys.forEach((key, i) => {
        const keyEl = document.createElement('div');
        keyEl.className = 'key white-key';
        keyEl.textContent = key;
        keyEl.dataset.note = key + '4';
        piano.appendChild(keyEl);
    });
    
    // Teclas pretas
    const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
    blackKeys.forEach((key, i) => {
        const keyEl = document.createElement('div');
        keyEl.className = 'key black-key';
        keyEl.textContent = key;
        keyEl.dataset.note = key + '4';
        piano.appendChild(keyEl);
    });
}

// Inicialização garantida
document.addEventListener('DOMContentLoaded', () => {
    createPiano();
    
    // Teste visual - todas teclas devem ficar azuis por 2 segundos
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.style.backgroundColor = 'lightblue';
    });
    setTimeout(() => {
        keys.forEach(key => {
            key.style.backgroundColor = '';
        });
    }, 2000);
});