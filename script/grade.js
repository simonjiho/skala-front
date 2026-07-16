import startGradeCalc from './startJsPractice.js';

document.getElementById("calculate-grade").addEventListener("click", function () {
    startGradeCalc("calculate-grade",calculateGrade);
});


function calculateGrade() {

    var subjects = ["HTML", "CSS", "JavaScript"];
    var total = 0;  
    for(let i = 0; i < subjects.length; i++) {
        var input = prompt(subjects[i] + " 점수를 입력하세요.");
        if(input == null) { return }

        total += Number(input);



    }

    var avg = total/subjects.length;

    if(avg >= 60) {
        alert("총점:" + total + ", 평균: " + avg + "\n결과: 축하합니다. 합격입니다🎉");
    } else {
        alert("총점:" + total + ", 평균: " + avg + "\n결과: 아쉽지만 불합격입니다😔");
    }

}
