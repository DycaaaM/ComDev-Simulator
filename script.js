document.addEventListener('DOMContentLoaded', function () {
    let progress = 0;

    const startButton = document.getElementById("start-btn");
    const fixBugsButton = document.getElementById("fix-bugs");
    const launchGameButton = document.getElementById("launch-game");
    const messageBox = document.getElementById("message");
    const progressText = document.getElementById("game-progress");

    // Function to update progress text
    function updateProgress() {
        progressText.innerText = `Progress: ${progress}%`;
    }

    // Start development button click
    startButton.addEventListener("click", function () {
        messageBox.innerText = "You have started coding your game!";
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
        messageBox.innerText = "Your game is ready to launch!";
        progress = 100;
        updateProgress();
        launchGameButton.disabled = true;
    });
});