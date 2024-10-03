const derro = document.getElementById('derro');
const cactus = document.getElementById('cactus');
const jumpSound = new Audio('jump-sound.mp3'); // Pastikan file suara ada di folder yang sama

let isJumping = false;
let score = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    
    jumpSound.play(); // Memutar suara saat melompat
    derro.classList.add('jump');

    setTimeout(() => {
        derro.classList.remove('jump');
        isJumping = false;
    }, 300);
}

document.addEventListener('keydown', jump);

const checkCollision = setInterval(() => {
    const derroRect = derro.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        derroRect.left < cactusRect.left + cactusRect.width &&
        derroRect.left + derroRect.width > cactusRect.left &&
        derroRect.bottom > cactusRect.top
    ) {
        alert(`Game Over! Your score: ${score}`);
        clearInterval(checkCollision);
        location.reload(); // Muat ulang game
    }
}, 10);

function moveCactus() {
    let cactusPosition = 600;

    const move = setInterval(() => {
        if (cactusPosition < -20) {
            cactusPosition = 600;
            score++;
        }

        cactusPosition -= 10;
        cactus.style.right = cactusPosition + 'px';
    }, 100);
}

moveCactus();