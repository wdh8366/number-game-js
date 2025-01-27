document.addEventListener("DOMContentLoaded", () => {
    // 변수 초기화
    let gameNumber = 0;
    const playButton = document.getElementById("play-button");
    const chancesArea = document.getElementById("chances-area");
    const resetButton = document.getElementById("reset-button");
    const userInput = document.getElementById("user-input");
    const resultArea = document.getElementById("result-area");
    let chances = 5;
    const history = [];

    // 랜덤 숫자 생성
    const generateGameNumber = () => {
        gameNumber = Math.floor(Math.random() * 100) + 1;
    };

    // 게임 로직
    const play = () => {
        const userValue = Number(userInput.value);

        // 유효성 검사: 숫자가 1~100 사이인지 확인
        if (userValue < 1 || userValue > 100) {
            updateResult("1과 100 사이 숫자를 입력해주세요.");
            return;
        }

        // 중복 입력 검사
        if (history.includes(userValue)) {
            updateResult("이미 입력한 값입니다.");
            return;
        }

        // 기회가 없는 경우 처리
        if (chances <= 0) {
            disableGame("OVER!");
            return;
        }

        // 게임 결과 판단
        if (userValue === gameNumber) {
            disableGame("GOOD!");
        } else {
            updateResult(userValue < gameNumber ? "UP!" : "DOWN!");
        }

        // 기록 및 남은 기회 업데이트
        history.push(userValue);
        updateChances(--chances);
    };

    // 게임 초기화
    const reset = () => {
        userInput.value = "";
        history.length = 0; // 기록 초기화
        generateGameNumber();
        updateResult("다시 시작");
        playButton.disabled = false;
        chances = 5;
        updateChances(chances);
    };

    // 결과 업데이트
    const updateResult = (message) => {
        resultArea.textContent = message;
    };

    // 남은 기회 업데이트
    const updateChances = (chances) => {
        chancesArea.textContent = `남은 코인: ${chances}`;
    };

    // 게임 종료 처리
    const disableGame = (message) => {
        playButton.disabled = true;
        updateResult(message);
    };

    // 초기화
    generateGameNumber();
    playButton.addEventListener("click", play);
    resetButton.addEventListener("click", reset);
});