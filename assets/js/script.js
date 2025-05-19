document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa o piano
    const synth = await createPiano();
    
    // Configura interação com o piano
    document.getElementById('piano').addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('piano-key')) {
            playNote(synth, e.target.dataset.note, e.target);
        }
    });
    
    // Botão para tocar automaticamente
    document.getElementById('play-button').addEventListener('click', () => {
        playHappyBirthday(synth);
    });
    
    // Configura carta
    document.getElementById('envelope').addEventListener('click', function() {
        this.querySelector('.envelope-front').style.transform = 'translateY(-50%) rotateX(180deg)';
        this.querySelector('.envelope-front').style.opacity = '0';
        this.querySelector('.letter').style.opacity = '1';
        this.querySelector('.letter').style.transform = 'translateY(-50%)';
    });
});

// Toca Happy Birthday
async function playHappyBirthday(synth) {
    const message = document.getElementById('birthday-message');
    message.style.opacity = '1';
    
    // Sequência de notas
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
    
    // Toca as notas
    const now = Tone.now();
    notes.forEach(({ time, note, duration }) => {
        synth.triggerAttackRelease(note, duration, now + time);
        
        // Destaca a tecla
        setTimeout(() => {
            const key = document.querySelector(`[data-note="${note}"]`);
            if (key) {
                key.classList.add('key-active');
                setTimeout(() => key.classList.remove('key-active'), 200);
            }
        }, time * 1000);
    });
    
    // Confetes
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e91e63', '#ffeb3b', '#4caf50', '#2196f3']
        });
    }, 2000);
    
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
        message.style.opacity = '0';
    }, 5000);
}