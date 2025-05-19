// Criação do piano
async function createPiano() {
    await Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -8;

    // Cria teclas visuais
    const piano = document.getElementById('piano');
    piano.innerHTML = '';

    // Teclas brancas
    const whiteKeys = [
        { note: 'C4', label: 'C' },
        { note: 'D4', label: 'D' },
        { note: 'E4', label: 'E' },
        { note: 'F4', label: 'F' },
        { note: 'G4', label: 'G' },
        { note: 'A4', label: 'A' },
        { note: 'B4', label: 'B' }
    ];

    // Teclas pretas
    const blackKeys = [
        { note: 'C#4', label: 'C#', pos: 35 },
        { note: 'D#4', label: 'D#', pos: 85 },
        { note: 'F#4', label: 'F#', pos: 185 },
        { note: 'G#4', label: 'G#', pos: 235 },
        { note: 'A#4', label: 'A#', pos: 285 }
    ];

    // Adiciona teclas brancas
    whiteKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'piano-key white-key';
        keyElement.textContent = key.label;
        keyElement.dataset.note = key.note;
        piano.appendChild(keyElement);
    });

    // Adiciona teclas pretas
    blackKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'piano-key black-key';
        keyElement.textContent = key.label;
        keyElement.dataset.note = key.note;
        keyElement.style.left = `${key.pos}px`;
        piano.appendChild(keyElement);
    });

    return synth;
}

// Toca uma nota
function playNote(synth, note, element) {
    synth.triggerAttackRelease(note, "8n");
    element.classList.add('key-active');
    setTimeout(() => element.classList.remove('key-active'), 200);
}

// Exporta funções
window.createPiano = createPiano;
window.playNote = playNote;