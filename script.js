document.addEventListener('DOMContentLoaded', function () {
    let progress = 0;
    let experience = 0;
    let level = 1;
    let money = 0;
    let musicPlaying = false;
    
    // Versi game
    const version = "1.2";
    document.getElementById("version").innerText = `Version: ${version}`;

    const startButton = document.getElementById("start-btn");
    const fixBugsButton = document.getElementById("fix-bugs");
    const launchGameButton = document.getElementById("launch-game");
    const toggleMusicButton = document.getElementById("toggle-music");
    const messageBox = document.getElementById("message");
    const progressText = document.getElementById("game-progress");
    const experienceText = document.getElementById("experience");
    const levelText = document.getElementById("level");
    const moneyText = document.getElementById("money");
    const genreSelect = document.getElementById("genre");
    const difficultySelect = document.getElementById("difficulty");
    const characterSelect = document.getElementById("character");
    const gameImage = document.getElementById("game-image");
    const characterDisplay = document.getElementById("character-display");
    const loadingDiv = document.getElementById("loading");

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

    // Function to update money
    function updateMoney(amount) {
        money += amount;
        moneyText.innerText = `Money: $${money}`;
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
        const character = characterSelect.value;
        
        let baseProgress = 50;
        updateExperience(10); // Dapatkan 10 XP saat memulai
        updateMoney(5); // Dapatkan $5 saat memulai

        if (difficulty === "Easy") {
            baseProgress += 20; // Easy adds 20% to progress
        } else if (difficulty === "Hard") {
            baseProgress -= 20; // Hard subtracts 20% from progress
        } else if (difficulty === "Insane") {
            baseProgress -= 40; // Insane subtracts 40% from progress
        }

        progress = baseProgress;
        messageBox.innerText = `You have started coding a ${genre} game as a ${character}! Difficulty: ${difficulty}`;
        setGameImage(genre);
        updateProgress();
        fixBugsButton.disabled = false;

        // Tampilkan karakter yang dipilih
        characterDisplay.style.backgroundColor = character === "Developer" ? "blue" :
                                                 character === "Designer" ? "purple": "green";

        // Animasi loading sebelum melanjutkan ke sesi "Fix Bugs"
        loadingDiv.style.display = 'block';
        setTimeout(() => {
            loadingDiv.style.display = 'none';
            fixBugsButton.disabled = false;
            messageBox.innerText += `\nReady to fix bugs!`;
        }, 2000); // Menunggu 2 detik sebelum menampilkan sesi Fix Bugs
    });

    // Fix bugs button click
    fixBugsButton.addEventListener("click", function () {
        const bugFixes = Math.floor(Math.random() * 5) + 1; // Menghasilkan antara 1-5 bug yang diperbaiki
        updateExperience(bugFixes * 10); // Dapatkan 10 XP untuk setiap bug yang diperbaiki
        updateMoney(bugFixes * 10); // Dapatkan $10 untuk setiap bug yang diperbaiki
        progress += bugFixes * 10; // Setiap bug yang diperbaiki menambah progress
        updateProgress();
        messageBox.innerText += `\nYou have fixed ${bugFixes} bugs!`;
        
        // Jika progress >= 100, siap untuk diluncurkan
        if (progress >= 100) {
            progress = 100;
            messageBox.innerText += `\nCongratulations! Your game is ready to be launched!`;
            launchGameButton.disabled = false; // Mengaktifkan tombol Launch Game
        }
    });

    // Launch game button click
    launchGameButton.addEventListener("click", function () {
        messageBox.innerText += `\nLaunching your game...`;
        // Animasi loading saat meluncurkan game
        loadingDiv.style.display = 'block';
        setTimeout(() => {
            loadingDiv.style.display = 'none';
            messageBox.innerText += `\nYour game has been launched successfully!`;
            resetGame();
        }, 3000); // Menunggu 3 detik sebelum menyetel ulang game
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

    // Reset game function
    function resetGame() {
        progress = 0;
        experience = 0;
        level = 1;
        money = 0;
        updateProgress();
        experienceText.innerText = `Experience: 0`;
        levelText.innerText = `Level: 1`;
        moneyText.innerText = `Money: $0`;
        launchGameButton.disabled = true; // Menonaktifkan tombol setelah peluncuran
        fixBugsButton.disabled = true; // Menonaktifkan tombol Fix Bugs
        messageBox.innerText = ""; // Mengosongkan pesan
        characterDisplay.style.backgroundColor = "transparent"; // Menghapus karakter
        gameImage.style.display = 'none'; // Menyembunyikan gambar game
    }
});