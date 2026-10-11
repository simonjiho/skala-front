# skala-front

HTML, CSS, JavaScript 실습을 한 사이트로 묶은 저장소다. `html/index.html`이 허브이고 나머지 페이지로 가는 메뉴가 있다. 페이지 안에서는 이 사이트를 SKALA-FRONT라고 부른다.

## 구성

- `html/index.html`: 허브. 바로가기 메뉴, 공지, 사진, 도시별 실시간 날씨, 미니게임 버튼 3개
- `html/myProfile.html`, `html/myHoliday.html`: 자기소개(`ul`, `ol`, `mark`, `dl`)와 휴일 하루 일과
- `html/myClass.html`: 주간 시간표. `rowspan`, `colspan`으로 칸을 합친 표
- `html/myTrip.html`: 여행 앨범. 사진 3장, 음악(`audio`), 영상(`video`)
- `html/signUp.html`, `html/signUpResult.html`: 회원가입 폼(`fieldset`, 입력 유형, 라디오·체크박스, `datalist`, `textarea`)과 안내 화면. 폼은 GET으로 안내 화면을 열고, 입력값은 어디에도 저장하지 않는다
- `css/style.css`: 공용 스타일. 색 변수, 제목 fade-in, 앨범 격자, 폭 786px 이하 레이아웃
- `media/`: 사진 3장, 영상 1개, 음악 1개

## 스크립트 (`script/`)

- `upDown.js`: 컴퓨터가 정한 1~50 사이 숫자를 `prompt`로 맞추는 업다운 게임
- `grade.js`: HTML, CSS, JavaScript 점수를 `prompt`로 받아 평균 60 이상이면 합격을 알린다
- `bag.js`: 가방 속 물건 3종을 `alert`으로 보여 준다
- `startJsPractice.js`: 위 세 버튼이 같이 쓰는 모듈. 버튼이 흔들리는 애니메이션이 끝나면 해당 함수를 실행한다
- `weather.js`: 도시 5곳(파리, 런던, 뉴욕, 도쿄, 시드니)의 현재 기온·습도·풍속을 Open-Meteo에서 받아 온다. Windy 임베드 지도는 기온, 습도, 바람 순으로 12초마다 바뀌고, 항목 버튼을 누르면 그 항목으로 바뀐다

## 실행

빌드 단계는 없다. 스크립트를 `type="module"`로 불러서, 파일을 바로 열면 막히는 브라우저가 있다. 저장소 루트에서 정적 서버를 띄운 뒤 `html/index.html`을 연다.

```bash
python3 -m http.server 8000
# http://localhost:8000/html/index.html
```

날씨, 지도, 글꼴(Google Fonts)은 인터넷 연결이 필요하다.
