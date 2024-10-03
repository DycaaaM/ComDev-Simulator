document.addEventListener('DOMContentLoaded', function () {
    let progress = 0;
    let experience = 0;
    let level = 1;
    let musicPlaying = false;
    
    // Versi game
    const version = "1.1";
    document.getElementById("version").innerText = `Version: ${version}`;

    const startButton = document.getElementById("start-btn");
    const fixBugsButton = document.getElementById("fix-bugs");
    const launchGameButton = document.getElementById("launch-game");
    const toggleMusicButton = document.getElementById("toggle-music");
    const messageBox = document.getElementById("message");
    const progressText = document.getElementById("game-progress");
    const experienceText = document.getElementById("experience");
    const levelText = document.getElementById("level");
    const genreSelect = document.getElementById("genre");
    const difficultySelect = document.getElementById("difficulty");
    const gameImage = document.getElementById("game-image");
    const character = document.getElementById("character");

    // Musik latar
    const backgroundMusic = new Audio('background-music.mp3'); // Pastikan untuk menambahkan file musik
    backgroundMusic.loop = true;

    // Function to update progress text
    function updateProgress() {
        progressText.innerText = `Progress: ${progress}%`;
    }

    // Function to update experience
    function updateExperience(xp) {
        experience += xp;
        experienceText.innerText = `Experience: ${experience}`;
        if (experience >= level * 100) {
            level++;
            levelText.innerText = `Level: ${level}`;
            messageBox.innerText += `\nCongratulations! You've reached Level ${level}!`;
        }
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
        updateExperience(10); // Dapatkan 10 XP saat memulai

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
        updateExperience(20); // Dapatkan 20 XP saat memperbaiki bug
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

    // Toggle music button click
    toggleMusicButton.addEventListener("click", function () {
        if (musicPlaying) {
            backgroundMusic.pause();
            toggleMusicButton.innerText = "Play Music";
        } else {
            backgroundMusic.play();
            toggleMusicButton.innerText = "Pause Music";
        }
        musicPlaying = !musicPlaying;
    });

    // Gerakan karakter
    document.addEventListener('keydown', function (event) {
        const characterStyle = window.getComputedStyle(character);
        let left = parseInt(characterStyle.left);
        let bottom = parseInt(characterStyle.bottom);

        switch (event.key) {
            case 'ArrowLeft':
                if (left > 0) {
                    left -= 10; // Gerakkan ke kiri
                }
                break;
            case 'ArrowRight':
                if (left < (window.innerWidth - 70)) { // Pastikan tidak keluar layar
                    left += 10; // Gerakkan ke kanan
                }
                break;
            case 'ArrowUp':
                if (bottom < (window.innerHeight - 70)) { // Pastikan tidak keluar layar
                    bottom += 10; // Gerakkan ke atas
                }
                break;
            case 'ArrowDown':
                if (bottom > 0) {
                    bottom -= 10; // Gerakkan ke bawah
                }
                break;
        }

        character.style.left = `${left}px`;
        character.style.bottom = `${bottom}px`;
    });
});