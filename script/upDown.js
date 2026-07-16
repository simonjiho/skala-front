import startUpDownGame from './startJsPractice.js';

document.getElementById("start-up-down").addEventListener("click", function () {
    startUpDownGame("start-up-down",runUpDownGame);
});


function runUpDownGame() {

    var computerNum = Math.floor(Math.random() * 50) + 1;
    var correct = false;
    var attempts = 0;

    while (!correct) {
        let input = prompt("1부터 50 사이의 숫자 중 컴퓨터가 생각한 숫자는 무엇일까요?");

        if (input == null) break;

        userNum = Number(input);



        if (userNum < computerNum) {
            alert("업! ⬆️");
        } else if (userNum > computerNum) {
            alert("다운! ⬇️");
        } else {
            alert("축하합니다! " + attempts + "번 만에 맞추셨습니다.");
            correct = true;
        }
        attempts++;

    }
}
