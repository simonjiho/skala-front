
export default function startJsPractice(buttonId, execFunc) {

    var button = document.getElementById(buttonId);

    if (!button) {
        console.error("버튼을 찾을 수 없습니다:", buttonId);
        return;
    }

    button.disabled = true
    button.addEventListener("animationend", function () { // 애니메이션이 끝난 후 발생하는 animationend 이벤트를 콜백하는 이벤트 리스너
        button.classList.remove("start-mini-game");
        execFunc(); 
        button.disabled = false;
    }, { once: true }); // once: true -> 한 번 실행후 이벤트 리스너 제거
    button.classList.add("start-mini-game");

}