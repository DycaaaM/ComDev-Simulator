document.addEventListener('DOMContentLoaded', function () {
    let progress = 0;

    // Versi game
    const version = "1.0";
    document.getElementById("version").innerText = `Version: ${version}`;

    const startButton = document.getElementById("start-btn");
    const fixBugsButton = document.getElementById("fix-bugs");
    const launchGameButton = document.getElementById("launch-game");
    const messageBox = document.getElementById("message");
    const progressText = document.getElementById("game-progress");
    const genreSelect = document.getElementById("genre");
    const difficultySelect = document.getElementById("difficulty");
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
        gameImage.classList.remove('hidden');
        setTimeout(() => {
            gameImage.style.display = 'block';
            gameImage.classList.remove('hidden');
        }, 100);
    }

    // Start development button click
    startButton.addEventListener("click", function () {
        const genre = genreSelect.value;
        const difficulty = difficultySelect.value;
        
        let baseProgress = 50;

        if (difficulty === "Easy") {
            baseProgress += 20; // Easy adds 20% to progress
        } else if (difficulty === "Hard") {
            baseProgress -= 20; // Hard subtracts 20% from progress
        }

        progress = baseProgress;
        messageBox.innerText = `You have started coding a ${genre} game! Difficulty: ${difficulty}`;
        setGameImage(genre);
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