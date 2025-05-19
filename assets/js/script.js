document.addEventListener('DOMContentLoaded', async () => {
    await Tone.start();
    
    // Cria o piano
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -8;
    
    // Cria as teclas visuais
    const piano = document.getElementById('piano');
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
    
    // Teclas brancas
    whiteKeys.forEach((key, i) => {
        const keyEl = document.createElement('div');
        keyEl.className = 'key white-key';
        keyEl.textContent = key;
        keyEl.dataset.note = `${key}4`;
        piano.appendChild(keyEl);
    });
    
    // Teclas pretas
    blackKeys.forEach((key, i) => {
        const keyEl = document.createElement('div');
        keyEl.className = 'key black-key';
        keyEl.textContent = key;
        keyEl.dataset.note = `${key}4`;
        keyEl.style.left = `${(i < 2 ? i * 50 + 35 : i * 50 + 85)}px`;
        piano.appendChild(keyEl);
    });
    
    // Tocar nota ao clicar
    piano.addEventListener('mousedown', e => {
        if (e.target.classList.contains('key')) {
            const note = e.target.dataset.note;
            playNote(note, e.target);
        }
    });
    
    // Botão para tocar automaticamente
    document.getElementById('playBtn').addEventListener('click', () => {
        playHappyBirthday(synth);
    });
    
    // Carta
    document.getElementById('envelope').addEventListener('click', function() {
        this.querySelector('.front').style.transform = 'translateY(-100%) rotateX(180deg)';
        this.querySelector('.letter').style.opacity = '1';
    });
});

function playNote(note, element) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
    
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 200);
}

function playHappyBirthday(synth) {
    const message = document.getElementById('message');
    message.style.animation = 'fadeIn 1s forwards';
    
    // Sequência de Happy Birthday
    const notes = [
        { time: 0, note: 'G4', duration: 0.3 },
        { time: 0.5, note: 'G4', duration: 0.3 },
        { time: 1, note: 'A4', duration: 0.6 },
        { time: 1.8, note: 'G4', duration: 0.3 },
        { time: 2.3, note: 'C5', duration: 0.3 },
        { time: 2.8, note: 'B4', duration: 0.6 },
        { time: 3.6, note: 'G4', duration: 0.3 },
        { time: 4.1, note: 'G4', duration: 0.3 },
        { time: 4.6, note: 'A4', duration: 0.6 },
        { time: 5.4, note: 'G4', duration: 0.3 },
        { time: 5.9, note: 'D5', duration: 0.3 },
        { time: 6.4, note: 'C5', duration: 0.6 },
        { time: 7.2, note: 'G4', duration: 0.3 },
        { time: 7.7, note: 'G4', duration: 0.3 },
        { time: 8.2, note: 'G5', duration: 0.6 },
        { time: 9, note: 'E5', duration: 0.3 },
        { time: 9.5, note: 'C5', duration: 0.3 },
        { time: 10, note: 'B4', duration: 0.6 },
        { time: 10.8, note: 'A4', duration: 0.3 },
        { time: 11.3, note: 'F5', duration: 0.6 },
        { time: 12.1, note: 'F5', duration: 0.3 },
        { time: 12.6, note: 'E5', duration: 0.3 },
        { time: 13.1, note: 'C5', duration: 0.6 },
        { time: 13.9, note: 'D5', duration: 0.6 },
        { time: 14.7, note: 'C5', duration: 1.2 }
    ];
    
    const now = Tone.now();
    notes.forEach(({ time, note, duration }) => {
        synth.triggerAttackRelease(note, duration, now + time);
        
        // Destacar tecla
        setTimeout(() => {
            const key = document.querySelector(`[data-note="${note}"]`);
            if (key) {
                key.classList.add('active');
                setTimeout(() => key.classList.remove('active'), 200);
            }
        }, time * 1000);
    });
    
    // Confetes
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 2000);
}