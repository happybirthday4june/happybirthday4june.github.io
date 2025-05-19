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
    
    // Conteúdo da carta (personalize como desejar)
    const letterText = `
        <h2>Querida Dasha,</h2>
        <p>Hoje é um dia especial para celebrar você e toda a luz que traz ao mundo através da música!</p>
        
        <p>Em cada nota que toca, em cada acorde que ensina, você demonstra não apenas 
        seu talento excepcional, mas também sua generosidade em compartilhar esse dom.</p>
        
        <p>Que este novo ano de vida seja repleto de:</p>
        <ul>
            <li>Harmonias perfeitas</li>
            <li>Melodias inesquecíveis</li>
            <li>Muitas alegrias e conquistas</li>
        </ul>
        
        <p>Que continue inspirando seus alunos e todos ao seu redor com sua paixão pelo piano e pela música.</p>
        
        <p>Com todo carinho e admiração,</p>
        <p class="signature">[Seu Nome]</p>
        
        <style>
            .signature {
                font-style: italic;
                margin-top: 30px;
                text-align: right;
                font-family: 'Dancing Script', cursive;
                font-size: 1.3em;
            }
            ul {
                margin: 15px 0 15px 30px;
            }
        </style>
    `;
    
    // Inicializa a carta
    letterContent.innerHTML = letterText;
    
    // Configura o piano e a partitura
    setupPianoAndSheetMusic(happyBirthdayABC);
    
    // Evento do botão Iniciar
    startButton.addEventListener('click', playBirthdaySurprise);
    
    // Evento da carta
    letterEnvelope.addEventListener('click', toggleLetter);
});

// Configura o piano e exibe a partitura
function setupPianoAndSheetMusic(abcNotation) {
    // Renderiza a partitura
    ABCJS.renderAbc("sheetMusic", abcNotation, {
        responsive: "resize",
        staffwidth: 500,
        paddingtop: 20,
        paddingbottom: 20,
        paddingright: 20,
        paddingleft: 20
    });
    
    // Cria teclas de piano interativas
    const pianoContainer = document.getElementById('piano');
    const notes = [
        { note: 'C', display: 'C', type: 'white' },
        { note: 'D', display: 'D', type: 'white' },
        { note: 'E', display: 'E', type: 'white' },
        { note: 'F', display: 'F', type: 'white' },
        { note: 'G', display: 'G', type: 'white' },
        { note: 'A', display: 'A', type: 'white' },
        { note: 'B', display: 'B', type: 'white' },
        { note: 'C5', display: 'C²', type: 'white' }
    ];
    
    pianoContainer.innerHTML = '';
    pianoContainer.style.display = 'flex';
    pianoContainer.style.justifyContent = 'center';
    pianoContainer.style.position = 'relative';
    
    // Cria teclas brancas
    notes.forEach(key => {
        if (key.type === 'white') {
            const keyElement = createPianoKey(key, pianoContainer);
            pianoContainer.appendChild(keyElement);
        }
    });
    
    // Cria teclas pretas (para um piano mais completo)
    const blackKeys = [
        { note: 'C#', display: 'C#', type: 'black', position: 0.7 },
        { note: 'D#', display: 'D#', type: 'black', position: 1.7 },
        { note: 'F#', display: 'F#', type: 'black', position: 3.7 },
        { note: 'G#', display: 'G#', type: 'black', position: 4.7 },
        { note: 'A#', display: 'A#', type: 'black', position: 5.7 }
    ];
    
    blackKeys.forEach(key => {
        const keyElement = createPianoKey(key, pianoContainer);
        keyElement.style.position = 'absolute';
        keyElement.style.left = `${key.position * 50}px`;
        keyElement.style.zIndex = '2';
        pianoContainer.appendChild(keyElement);
    });
}

// Cria uma tecla de piano
function createPianoKey(key, container) {
    const keyElement = document.createElement('div');
    keyElement.className = `piano-key ${key.type}-key`;
    keyElement.textContent = key.display;
    keyElement.dataset.note = key.note;
    
    // Estilo base
    keyElement.style.width = key.type === 'black' ? '30px' : '50px';
    keyElement.style.height = key.type === 'black' ? '120px' : '200px';
    keyElement.style.backgroundColor = key.type === 'black' ? '#000' : '#fff';
    keyElement.style.color = key.type === 'black' ? '#fff' : '#000';
    keyElement.style.border = '1px solid #000';
    keyElement.style.borderRadius = key.type === 'black' ? '0 0 3px 3px' : '0 0 8px 8px';
    keyElement.style.display = 'flex';
    keyElement.style.justifyContent = 'center';
    keyElement.style.alignItems = 'flex-end';
    keyElement.style.paddingBottom = '10px';
    keyElement.style.cursor = 'pointer';
    keyElement.style.transition = 'all 0.1s';
    keyElement.style.userSelect = 'none';
    
    // Efeitos de interação
    keyElement.addEventListener('mousedown', () => {
        playNote(key.note, keyElement);
        keyElement.style.transform = 'scale(0.95)';
        keyElement.style.boxShadow = key.type === 'black' 
            ? 'inset -3px -3px 5px rgba(255,255,255,0.1)' 
            : 'inset -5px -5px 10px rgba(0,0,0,0.1)';
    });
    
    keyElement.addEventListener('mouseup', () => {
        keyElement.style.transform = 'scale(1)';
        keyElement.style.boxShadow = 'none';
    });
    
    keyElement.addEventListener('mouseleave', () => {
        keyElement.style.transform = 'scale(1)';
        keyElement.style.boxShadow = 'none';
    });
    
    return keyElement;
}

// Toca uma nota individual
function playNote(note, keyElement) {
    // Destaque visual
    keyElement.style.backgroundColor = keyElement.classList.contains('black-key') 
        ? '#333' 
        : '#f0f0f0';
    
    setTimeout(() => {
        keyElement.style.backgroundColor = keyElement.classList.contains('black-key') 
            ? '#000' 
            : '#fff';
    }, 200);
    
    // Toca a nota usando Tone.js
    const synth = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 0.1
        }
    }).toDestination();
    
    const now = Tone.now();
    synth.triggerAttackRelease(note + "4", "8n", now);
}

// Toca a surpresa de aniversário
async function playBirthdaySurprise() {
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = 'Preparando...';
    
    try {
        // Inicializa o contexto de áudio
        await Tone.start();
        
        // Mostra a mensagem de aniversário
        const birthdayMessage = document.getElementById('birthdayMessage');
        birthdayMessage.style.animation = 'fadeInOut 4s forwards';
        
        // Dispara confetes
        fireConfetti();
        
        // Toca a música usando ABCJS
        const visualObj = ABCJS.renderAbc("*", happyBirthdayABC)[0];
        const synth = new ABCJS.synth.CreateSynth();
        
        await synth.init({
            audioContext: Tone.context,
            visualObj: visualObj,
        });
        
        await synth.prime();
        startButton.textContent = 'Tocando...';
        await synth.start();
        
        // Restaura o botão após tocar
        setTimeout(() => {
            startButton.disabled = false;
            startButton.textContent = 'Tocar Novamente';
        }, 1000);
        
    } catch (error) {
        console.error("Erro ao tocar música:", error);
        startButton.disabled = false;
        startButton.textContent = 'Tentar Novamente';
    }
}

// Efeito de confete
function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.6 },
        spread: 70,
        startVelocity: 30
    };
    
    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
            colors: ['#e91e63', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0']
        });
    }
    
    fire(0.25, { angle: 60 });
    fire(0.2, { angle: 120 });
    fire(0.35, { angle: 90 });
    fire(0.1, { angle: 45, spread: 100 });
    fire(0.1, { angle: 135, spread: 100 });
}

// Abre/fecha a carta
function toggleLetter() {
    const letterEnvelope = document.getElementById('letterEnvelope');
    letterEnvelope.classList.toggle('open');
    
    // Se estiver aberta, adiciona animação ao conteúdo
    if (letterEnvelope.classList.contains('open')) {
        const letterContent = document.getElementById('letterContent');
        letterContent.style.animation = 'none';
        setTimeout(() => {
            letterContent.style.animation = 'fadeIn 0.5s forwards';
        }, 10);
    }
}