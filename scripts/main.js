document.addEventListener('DOMContentLoaded', async function() {
    // Carrega o piano primeiro
    const piano = await createPiano();
    
    // Elementos da UI
    const startButton = document.getElementById('startButton');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const letterEnvelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    
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
    
    // Evento do botão Iniciar
    startButton.addEventListener('click', () => playBirthdaySurprise(piano));
    
    // Evento da carta
    letterEnvelope.addEventListener('click', toggleLetter);
    
    // Toca a surpresa de aniversário
    async function playBirthdaySurprise(piano) {
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