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
        // 로그인 되어있을 경우
        document.getElementById('userStatus').innerText = `현재 로그인된 사용자: ${user.email}`;
        loadExerciseRecords(user.uid);
    } else {
        // 로그인 안되어있을때
        document.getElementById('userStatus').innerText = '로그인 상태가 아닙니다.';
    }
});


// 운동정보 데이터베이스에 전송 함수
function saveExercise() {
    const exerciseDate = document.getElementById('exerciseDate').value;
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
                listItem.textContent = `일자: ${doc.id}, 종류: ${exerciseData.type}, 기간: ${exerciseData.other}분`;
                exerciseList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('운동 기록 불러오기 중 오류 발생: ', error);
        });
}
