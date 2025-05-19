document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const startButton = document.getElementById('startButton');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const letterEnvelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    
    // Configuração do piano
    let piano;
    const notesPlaying = new Set();
    
    // Conteúdo da carta
    const letterText = `
        <h2>Querida Dasha,</h2>
        <p>Neste dia especial, quero celebrar a maravilhosa professora e musicista que você é!</p>
        
        <p>Sua paixão pelo piano e dedicação ao ensino transformam vidas todos os dias.</p>
        
        <p>Que seu aniversário seja repleto de:</p>
        <ul>
            <li>Harmonias perfeitas</li>
            <li>Melodias inesquecíveis</li>
            <li>Momentos de muita alegria</li>
        </ul>
        
        <p>Continue inspirando todos com seu talento e amor pela música!</p>
        
        <p class="signature">Com todo carinho,<br>[Seu Nome]</p>
        
        <style>
            .signature {
                margin-top: 25px;
                font-family: 'Dancing Script', cursive;
                font-size: 1.3em;
                text-align: right;
                color: #e91e63;
            }
            h2 {
                color: #e91e63;
                margin-bottom: 10px;
            }
            ul {
                margin: 10px 0 10px 20px;
            }
            p {
                margin-bottom: 8px;
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
    
    // Configura o piano virtual
    async function setupPiano() {
        await Tone.start();
        
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
            { note: 'C#4', label: 'C#', pos: 0.7 },
            { note: 'D#4', label: 'D#', pos: 1.7 },
            { note: 'F#4', label: 'F#', pos: 3.7 },
            { note: 'G#4', label: 'G#', pos: 4.7 },
            { note: 'A#4', label: 'A#', pos: 5.7 }
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
            keyElement.textContent = key.label;
            keyElement.style.left = `${key.pos * 45}px`;
            pianoContainer.appendChild(keyElement);
        });
        
        // Inicializa o piano sintetizado
        piano = new Tone.PolySynth(Tone.Synth, {
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
        
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            const keyMap = {
                'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 
                'd': 'E4', 'f': 'F4', 't': 'F#4', 'g': 'G4', 
                'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4', 
                'k': 'C5'
            };
            
            if (keyMap[e.key]) {
                playNote(keyMap[e.key]);
            }
        });
        
        // Eventos de mouse
        pianoContainer.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('piano-key')) {
                playNote(e.target.dataset.note);
            }
        });
    }
    
    // Toca uma nota individual
    function playNote(note) {
        if (notesPlaying.has(note)) return;
        
        notesPlaying.add(note);
        piano.triggerAttackRelease(note, "8n");
        highlightKey(note);
        
        setTimeout(() => {
            notesPlaying.delete(note);
        }, 200);
    }
    
    // Destaca tecla ao ser tocada
    function highlightKey(note) {
        const key = document.querySelector(`[data-note="${note}"]`);
        if (!key) return;
        
        key.classList.add('key-active');
        
        setTimeout(() => {
            key.classList.remove('key-active');
        }, 200);
    }
    
    // Toca a surpresa de aniversário
    async function playBirthdaySurprise() {
        startButton.disabled = true;
        startButton.textContent = 'Preparando...';
        
        try {
            // Mostra mensagem
            birthdayMessage.style.animation = 'fadeInOut 4s forwards';
            
            // Confetes
            fireConfetti();
            
            // Sequência de Happy Birthday
            const melody = [
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
            
            // Toca a melodia
            const now = Tone.now();
            melody.forEach(({ time, note, duration }) => {
                piano.triggerAttackRelease(note, duration, now + time);
                setTimeout(() => highlightKey(note), time * 1000);
            });
            
            startButton.textContent = 'Tocando...';
            
            // Restaura o botão
            setTimeout(() => {
                startButton.disabled = false;
                startButton.textContent = 'Tocar Novamente';
            }, 16000);
            
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
            colors: ['#e91e63', '#ffeb3b', '#4caf50', '#2196f3']
        });
    }
    
    // Abre/fecha a carta
    function toggleLetter() {
        letterEnvelope.classList.toggle('open');
        
        if (letterEnvelope.classList.contains('open')) {
            letterContent.style.animation = 'none';
            setTimeout(() => {
                letterContent.style.animation = 'fadeIn 0.5s forwards';
            }, 10);
        }
    }
});