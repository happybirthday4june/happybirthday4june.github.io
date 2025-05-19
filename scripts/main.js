// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const startButton = document.getElementById('startButton');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const letterEnvelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    
    // Partitura de Happy Birthday em formato ABC
    const happyBirthdayABC = `
        X:1
        T:Happy Birthday
        M:3/4
        L:1/8
        Q:120
        K:C
        |: G2 G A | G2 c B | G2 G A | G2 d c | 
          G2 G g | e2 c B | A2 F F | E2 c d :|
    `;
    
    // Conteúdo da carta
    const letterText = `
        <h2>Querida Dasha,</h2>
        <p>Neste dia especial, quero celebrar você e toda a alegria que traz ao mundo através da música.</p>
        
        <p>Sua paixão pelo piano e dedicação ao ensino inspiram todos ao seu redor.</p>
        
        <p>Que este novo ano de vida seja repleto de:</p>
        <ul>
            <li>Harmonias perfeitas</li>
            <li>Melodias inesquecíveis</li>
            <li>Momentos de muita alegria</li>
        </ul>
        
        <p>Continue compartilhando seu dom com o mundo!</p>
        
        <p class="signature">Com todo carinho,<br>[Seu Nome]</p>
        
        <style>
            .signature {
                margin-top: 30px;
                font-family: 'Dancing Script', cursive;
                font-size: 1.4em;
                text-align: right;
                color: #e91e63;
            }
            ul {
                margin: 15px 0 15px 30px;
            }
            h2 {
                color: #e91e63;
                margin-bottom: 15px;
            }
        </style>
    `;
    
    // Inicializa a carta
    letterContent.innerHTML = letterText;
    
    // Configura o piano
    setupPiano();
    
    // Evento do botão Iniciar
    startButton.addEventListener('click', playBirthdaySurprise);
    
    // Evento da carta
    letterEnvelope.addEventListener('click', toggleLetter);
});

// Configura o piano virtual
async function setupPiano() {
    await Tone.start();
    
    const piano = new Tone.Piano({
        velocities: 3,
        release: 0.4
    }).toDestination();
    
    // Teclas do piano
    const keys = [
        { note: 'C4', key: 'a', type: 'white' },
        { note: 'C#4', key: 'w', type: 'black' },
        { note: 'D4', key: 's', type: 'white' },
        { note: 'D#4', key: 'e', type: 'black' },
        { note: 'E4', key: 'd', type: 'white' },
        { note: 'F4', key: 'f', type: 'white' },
        { note: 'F#4', key: 't', type: 'black' },
        { note: 'G4', key: 'g', type: 'white' },
        { note: 'G#4', key: 'y', type: 'black' },
        { note: 'A4', key: 'h', type: 'white' },
        { note: 'A#4', key: 'u', type: 'black' },
        { note: 'B4', key: 'j', type: 'white' },
        { note: 'C5', key: 'k', type: 'white' }
    ];
    
    // Cria teclas visuais
    const pianoContainer = document.getElementById('piano');
    pianoContainer.innerHTML = '';
    pianoContainer.style.display = 'flex';
    pianoContainer.style.position = 'relative';
    pianoContainer.style.height = '200px';
    
    keys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = `piano-key ${key.type}-key`;
        keyElement.dataset.note = key.note;
        
        if (key.type === 'white') {
            keyElement.style.width = '50px';
            keyElement.style.height = '100%';
            keyElement.style.zIndex = '1';
        } else {
            keyElement.style.width = '30px';
            keyElement.style.height = '60%';
            keyElement.style.position = 'absolute';
            keyElement.style.zIndex = '2';
            keyElement.style.marginLeft = '-15px';
        }
        
        pianoContainer.appendChild(keyElement);
    });
    
    // Mapeia teclas do teclado
    document.addEventListener('keydown', (e) => {
        const keyObj = keys.find(k => k.key === e.key);
        if (keyObj) {
            piano.triggerAttackRelease(keyObj.note, "8n");
            highlightKey(keyObj.note);
        }
    });
    
    // Mapeia clicks do mouse
    pianoContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('piano-key')) {
            const note = e.target.dataset.note;
            piano.triggerAttackRelease(note, "8n");
            highlightKey(note);
        }
    });
}

// Destaca tecla ao ser tocada
function highlightKey(note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (!key) return;
    
    key.style.transform = 'scale(0.95)';
    key.style.backgroundColor = key.classList.contains('white-key') ? '#f0f0f0' : '#333';
    
    setTimeout(() => {
        key.style.transform = 'scale(1)';
        key.style.backgroundColor = key.classList.contains('white-key') ? '#fff' : '#000';
    }, 200);
}

// Toca a surpresa de aniversário
async function playBirthdaySurprise() {
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = 'Preparando...';
    
    try {
        // Mostra mensagem
        const birthdayMessage = document.getElementById('birthdayMessage');
        birthdayMessage.style.animation = 'fadeInOut 4s forwards';
        
        // Confetes
        fireConfetti();
        
        // Toca a música
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synth.volume.value = -8;
        
        const notes = [
            { time: "0:0", note: "G4", duration: "8n" },
            { time: "0:1", note: "G4", duration: "8n" },
            { time: "0:2", note: "A4", duration: "4n" },
            { time: "1:0", note: "G4", duration: "8n" },
            { time: "1:1", note: "C5", duration: "8n" },
            { time: "1:2", note: "B4", duration: "4n" },
            { time: "2:0", note: "G4", duration: "8n" },
            { time: "2:1", note: "G4", duration: "8n" },
            { time: "2:2", note: "A4", duration: "4n" },
            { time: "3:0", note: "G4", duration: "8n" },
            { time: "3:1", note: "D5", duration: "8n" },
            { time: "3:2", note: "C5", duration: "4n" },
            { time: "4:0", note: "G4", duration: "8n" },
            { time: "4:1", note: "G4", duration: "8n" },
            { time: "4:2", note: "G5", duration: "4n" },
            { time: "5:0", note: "E5", duration: "8n" },
            { time: "5:1", note: "C5", duration: "8n" },
            { time: "5:2", note: "B4", duration: "4n" },
            { time: "6:0", note: "A4", duration: "8n" },
            { time: "6:1", note: "F5", duration: "8n" },
            { time: "6:2", note: "F5", duration: "4n" },
            { time: "7:0", note: "E5", duration: "8n" },
            { time: "7:1", note: "C5", duration: "8n" },
            { time: "7:2", note: "D5", duration: "4n" },
            { time: "8:0", note: "C5", duration: "2n" }
        ];
        
        const part = new Tone.Part((time, value) => {
            synth.triggerAttackRelease(value.note, value.duration, time);
            highlightKey(value.note);
        }, notes).start(0);
        
        part.loop = false;
        part.loopEnd = "8:0";
        
        Tone.Transport.bpm.value = 120;
        Tone.Transport.start();
        
        startButton.textContent = 'Tocando...';
        
        // Quando terminar
        setTimeout(() => {
            startButton.disabled = false;
            startButton.textContent = 'Tocar Novamente';
        }, 8000);
        
    } catch (error) {
        console.error("Erro:", error);
        startButton.disabled = false;
        startButton.textContent = 'Tentar Novamente';
    }
}

// Efeito de confete
function fireConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e91e63', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0']
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 70,
            origin: { x: 0.3, y: 0.7 },
            colors: ['#e91e63', '#ffeb3b']
        });
        
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 70,
            origin: { x: 0.7, y: 0.7 },
            colors: ['#4caf50', '#2196f3']
        });
    }, 300);
}

// Abre/fecha a carta
function toggleLetter() {
    const letterEnvelope = document.getElementById('letterEnvelope');
    letterEnvelope.classList.toggle('open');
    
    if (letterEnvelope.classList.contains('open')) {
        const letterContent = document.getElementById('letterContent');
        letterContent.style.animation = 'none';
        setTimeout(() => {
            letterContent.style.animation = 'fadeIn 0.5s forwards';
        }, 10);
    }
}