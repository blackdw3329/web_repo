const firebaseConfig = {
    apiKey: "AIzaSyAMP0vxS4Z0okn_xHuVLXnqSUMUM_1rDro",
    authDomain: "wlogin-4aa10.firebaseapp.com",
    databaseURL: "https://wlogin-4aa10-default-rtdb.firebaseio.com",
    projectId: "wlogin-4aa10",
    storageBucket: "wlogin-4aa10.appspot.com",
    messagingSenderId: "1042862838801",
    appId: "1:1042862838801:web:a3b552af9131d5b3808db0",
    measurementId: "G-0H986GY8W3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

//로그인 확인
auth.onAuthStateChanged((user) => {
    if (user) {
        
        document.getElementById('userStatus').innerText = `현재 로그인된 사용자: ${user.email}`;

        
    } else {
        // 로그인 안되어있을때
        document.getElementById('userStatus').innerText = '로그인 상태가 아닙니다.';

    }
});


// 운동정보 데이터베이스에 전송 함수
function saveExercise() {
    if(getSelectedDate()==null){
        console.log("Null값이네 ㅋㅋ");
    }
    const exerciseDate = getSelectedDate();
    const exerciseType = document.getElementById('exerciseType').value;
    const exerciseOther = document.getElementById('exerciseOther').value;

    // 사용자 uid 얻어오기
    const user = auth.currentUser;
    if (user) {
        const userUid = user.uid;

        // 사용자 별 컬렉션에 데이터 저장
        db.collection('users').doc(userUid).collection('exercise').doc(exerciseDate).set({
            type: exerciseType,
            other: exerciseOther
        })
        .then(() => {
            console.log('운동 기록 추가 성공');
            // 저장 후 필요한 작업 수행
        })
        .catch((error) => {
            console.error('운동 기록 추가 실패: ', error);
        });
    } else {
        console.log('사용자가 로그인되어 있지 않습니다.');
    }
}

// 로그인된 사용자의 운동정보 불러오는거 만들어보자(함수)
function loadExerciseRecords(userUid) {
    db.collection('users').doc(userUid).collection('exercise').get()
        .then((querySnapshot) => {
            const exerciseList = document.getElementById('exerciseList');
            exerciseList.innerHTML = '';//리스트가 추가된 상태여서 초기화시켜줌

            querySnapshot.forEach((doc) => {
                const exerciseData = doc.data();
                const listItem = document.createElement('li');
                listItem.innerHTML = `종류: ${exerciseData.type}, <br>기간: ${exerciseData.other}분<br><br>`;
                exerciseList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('운동 기록 불러오기 중 오류 발생: ', error);
        });
}
//선택한 날짜의 운동 기록 불러오는 함수

  //달력
  window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

        let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
        let today = new Date();     // 페이지를 로드한 날짜를 저장
        today.setHours(0,0,0,0);    // 비교 편의를 위해 today의 시간을 초기화

        // 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
        function buildCalendar() {

            let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
            let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

            let tbody_Calendar = document.querySelector(".Calendar > tbody");
            document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
            document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

            while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
                tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
            }

            let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

            for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
                let nowColumn = nowRow.insertCell();        // 열 추가
            }

                for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

                    let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
                    nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력

                
                    if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
                        nowColumn.style.color = "#DC143C";
                    }
                    if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
                        nowColumn.style.color = "#0000CD";
                        nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
                    }

                    else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                        nowColumn.className = "today";
                        nowColumn.onclick = function () { choiceDate(this); }
                    }
                    else {                                      // 미래인 경우
                        nowColumn.className = "futureDay";
                        nowColumn.onclick = function () { choiceDate(this); }
                    }
                }
        }

        // 날짜 선택
        function choiceDate(nowColumn) {
            if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
                document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
            }
            nowColumn.classList.add("choiceDay"); 
            var selectedDate = getSelectedDate();
            console.log(selectedDate);          // 선택된 날짜에 "choiceDay" class 추가
        }
        
        function getSelectedDate() {
            const selectedDateElement = document.querySelector('.choiceDay');
            if (selectedDateElement) {
                const year = document.getElementById("calYear").innerText;
                const month = document.getElementById("calMonth").innerText;
                const day = selectedDateElement.innerText;
                return `${year}-${leftPad(month)}-${leftPad(day,2)}`;
            } 
            else {
                return null;
                console.log("뭐가 이상해요");
            }
        }

        // 이전달 버튼 클릭
        function prevCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
            buildCalendar();    // 달력 다시 생성
        }
        // 다음달 버튼 클릭
        function nextCalendar() {
            nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
            buildCalendar();    // 달력 다시 생성
        }

        //2자리 만들어주는 함수 6 -> 06

        //vs-1 얘는 잘됨 ㅋㅋ
        function leftPad(value, length = 2) {
            return String(value).padStart(length, '0');
}       
        //vs-2 얘는 006 이런식으로 나와서 안쓸게요
        // function leftPad(value) {
        //     if (value < 10) {
        //         value = "0" + value;
        //         return value;
        //     }
        //     return value;
        // }