// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const startButton = document.getElementById('startButton');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const letterEnvelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    
    // Configuração da música (exemplo - substitua pela sua partitura)
    const happyBirthdayABC = `
        X:1
        T:Parabéns pra Você
        M:3/4
        L:1/4
        Q:120
        K:C
        |: C2 C2 D4 | C2 F2 E4 | C2 C2 c4 | A2 F2 E2 D2 |
           b2 b2 A4 | F2 G2 F4 :|
    `;
    
    // Conteúdo da carta
    const letterText = `
        <h2>Querida Dasha,</h2>
        <p>Neste dia especial, quero celebrar você e tudo o que representa em nossas vidas.</p>
        <p>Sua paixão pela música e dedicação ao ensino transformam vidas todos os dias.</p>
        <p>Que seu aniversário seja tão belo quanto as melodias que você cria,</p>
        <p>e que este novo ano traga muitas alegrias, conquistas e momentos inesquecíveis.</p>
        <p>Que continue inspirando seus alunos e todos ao seu redor com seu talento e bondade.</p>
        <p>Com todo carinho e admiração,</p>
        <p class="signature">[Seu Nome]</p>
    `;
    
    // Inicializa a carta
    letterContent.innerHTML = letterText;
    
    // Configura o piano e a partitura
    setupPianoAndSheetMusic();
    
    // Evento do botão Iniciar
    startButton.addEventListener('click', playBirthdaySurprise);
    
    // Evento da carta
    letterEnvelope.addEventListener('click', toggleLetter);
});

// Configura o piano e exibe a partitura
function setupPianoAndSheetMusic() {
    // Renderiza a partitura
    ABCJS.renderAbc("sheetMusic", happyBirthdayABC, {
        responsive: "resize",
        staffwidth: 500,
        paddingtop: 20,
        paddingbottom: 20,
        paddingright: 20,
        paddingleft: 20
    });
    
    // Cria teclas de piano interativas (simplificado)
    const pianoContainer = document.getElementById('piano');
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];
    
    pianoContainer.innerHTML = '';
    pianoContainer.style.display = 'flex';
    pianoContainer.style.justifyContent = 'center';
    
    notes.forEach(note => {
        const key = document.createElement('div');
        key.className = 'piano-key';
        key.textContent = note;
        
        // Estilos para as teclas
        key.style.width = note.includes('2') ? '40px' : '50px';
        key.style.height = note.includes('2') ? '120px' : '200px';
        key.style.backgroundColor = note.includes('2') ? '#000' : '#fff';
        key.style.color = note.includes('2') ? '#fff' : '#000';
        key.style.border = '1px solid #000';
        key.style.marginRight = '-1px';
        key.style.borderRadius = note.includes('2') ? '0 0 5px 5px' : '0 0 8px 8px';
        key.style.display = 'flex';
        key.style.justifyContent = 'center';
        key.style.alignItems = 'flex-end';
        key.style.paddingBottom = '10px';
        key.style.cursor = 'pointer';
        key.style.transition = 'all 0.1s';
        
        // Eventos para tocar as teclas
        key.addEventListener('mousedown', () => playNote(note, key));
        key.addEventListener('mouseup', () => key.style.transform = 'scale(1)');
        key.addEventListener('mouseleave', () => key.style.transform = 'scale(1)');
        
        pianoContainer.appendChild(key);
    });
}

// Toca uma nota individual
function playNote(note, keyElement) {
    keyElement.style.transform = 'scale(0.95)';
    
    // Cria um oscilador temporário para tocar a nota
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    
    // Mapeia as notas para frequências (simplificado)
    const noteMap = {
        'C': 'C4', 'D': 'D4', 'E': 'E4', 'F': 'F4', 
        'G': 'G4', 'A': 'A4', 'B': 'B4', 'C2': 'C5'
    };
    
    synth.triggerAttackRelease(noteMap[note], "8n", now);
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
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        
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

// Abre/fecha a carta
function toggleLetter() {
    letterEnvelope.classList.toggle('open');
    
    // Se estiver aberta, adiciona animação ao conteúdo
    if (letterEnvelope.classList.contains('open')) {
        letterContent.style.animation = 'none';
        setTimeout(() => {
            letterContent.style.animation = 'fadeIn 0.5s forwards';
        }, 10);
    }
}