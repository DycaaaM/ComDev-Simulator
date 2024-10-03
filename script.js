document.addEventListener('DOMContentLoaded', function () {
    let progress = 0;

    const startButton = document.getElementById("start-btn");
    const fixBugsButton = document.getElementById("fix-bugs");
    const launchGameButton = document.getElementById("launch-game");
    const messageBox = document.getElementById("message");
    const progressText = document.getElementById("game-progress");
    const genreSelect = document.getElementById("genre");
    const gameImage = document.getElementById("game-image");

    // Function to update progress text
    function updateProgress() {
        progressText.innerText = `Progress: ${progress}%`;
    }

    // Function to set game image based on genre
    function setGameImage(genre) {
        const imageMap = {
            Platformer: 'https://via.placeholder.com/200x150.png?text=Platformer',
            Puzzle: 'https://via.placeholder.com/200x150.png?text=Puzzle',
            RPG: 'https://via.placeholder.com/200x150.png?text=RPG',
            Shooter: 'https://via.placeholder.com/200x150.png?text=Shooter',
        };
        gameImage.src = imageMap[genre];
        gameImage.style.display = 'block';
    }

    // Start development button click
    startButton.addEventListener("click", function () {
        const genre = genreSelect.value;
        messageBox.innerText = `You have started coding a ${genre} game!`;
        setGameImage(genre);
        progress = 50;
        updateProgress();
        fixBugsButton.disabled = false;
    });

    // Fix bugs button click
    fixBugsButton.addEventListener("click", function () {
        messageBox.innerText = "Fixing bugs...";
        progress = 80;
        updateProgress();
        launchGameButton.disabled = false;
    });

    // Launch game button click
    launchGameButton.addEventListener("click", function () {
        messageBox.innerText = `Your ${genreSelect.value} game is ready to launch!`;
        progress = 100;
        updateProgress();
        launchGameButton.disabled = true;
        // Display game statistics
        setTimeout(() => {
            alert(`Congratulations! You developed a ${genreSelect.value} game with 100% progress!`);
        }, 500);
    });
});