import prepareMyBag from './startJsPractice.js';

document.getElementById("show-my-bag").addEventListener("click", function () {
    prepareMyBag("show-my-bag",showMyBag);
});




function showMyBag() {

    var myBag = [
        { name: "휴대폰 📱", count: 1 },
        { name: "맥북 💻", count: 2 },
        { name: "아이패드 🗒️", count: 1 }
    ]

    var result = "👜 [내 가방 속 물품 목록]\n--------------------\n";

    for (const stuff of myBag) { // 반복문 속 불러오는 변수 앞에도 명시적(ex:const)으로 선언을 해야한다
        result += `- ${stuff.name} : ${stuff.count}개\n`;
    }

    result += "--------------------\n";
    result += `총 물품 종류:${myBag.length} 가지`;

    alert(result);


}
