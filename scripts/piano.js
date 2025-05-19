async function createPiano() {
    await Tone.start();
    const piano = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 0.1
        }
    }).toDestination();
    piano.volume.value = -10;

    // Cria teclas visuais
    const pianoContainer = document.getElementById('piano');
    pianoContainer.innerHTML = '';
    
    // Teclas brancas
    const whiteKeys = [
        { note: 'C4', label: 'C' },
        { note: 'D4', label: 'D' },
        { note: 'E4', label: 'E' },
        { note: 'F4', label: 'F' },
        { note: 'G4', label: 'G' },
        { note: 'A4', label: 'A' },
        { note: 'B4', label: 'B' },
        { note: 'C5', label: 'C' }
    ];
    
    // Teclas pretas
    const blackKeys = [
        { note: 'C#4', label: 'C#' },
        { note: 'D#4', label: 'D#' },
        { note: 'F#4', label: 'F#' },
        { note: 'G#4', label: 'G#' },
        { note: 'A#4', label: 'A#' }
    ];
    
    // Cria teclas brancas
    whiteKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'white-key piano-key';
        keyElement.dataset.note = key.note;
        keyElement.textContent = key.label;
        pianoContainer.appendChild(keyElement);
    });
    
    // Cria teclas pretas
    blackKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'black-key piano-key';
        keyElement.dataset.note = key.note;
        keyElement.textContent = key.label.replace('#', '♯');
        pianoContainer.appendChild(keyElement);
    });
    
    // Posiciona teclas pretas
    document.querySelector('[data-note="C#4"]').style.left = '35px';
    document.querySelector('[data-note="D#4"]').style.left = '85px';
    document.querySelector('[data-note="F#4"]').style.left = '185px';
    document.querySelector('[data-note="G#4"]').style.left = '235px';
    document.querySelector('[data-note="A#4"]').style.left = '285px';
    
    // Eventos de teclado
    const keyMap = {
        'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
        'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
        'u': 'A#4', 'j': 'B4', 'k': 'C5'
    };
    
    document.addEventListener('keydown', (e) => {
        if (keyMap[e.key]) {
            playNote(piano, keyMap[e.key]);
        }
    });
    
    // Eventos de mouse
    pianoContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('piano-key')) {
            playNote(piano, e.target.dataset.note);
        }
    });
    
    return piano;
}

function playNote(piano, note) {
    piano.triggerAttackRelease(note, "8n");
    highlightKey(note);
}

function highlightKey(note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (!key) return;
    
    key.classList.add('key-active');
    
    setTimeout(() => {
        key.classList.remove('key-active');
    }, 200);
}

// Exporta para uso em main.js
window.createPiano = createPiano;
window.highlightKey = highlightKey;