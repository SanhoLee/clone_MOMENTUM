const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_ON = "showing";

function delName(event) {
  const delBtn = event.target;
  delBtn.remove();
  localStorage.removeItem(USER_LS);

  greeting.classList.remove(SHOWING_ON);
  greeting.innerHTML = null;

  form.classList.add(SHOWING_ON);
  input.value = null;
}

function rstAll(event) {
  delName(event);
  delList(event);
}

function paintGreeting(text) {
  // 입력형태의 폼 을 삭제함
  form.classList.remove(SHOWING_ON);
  // h4 태그에 걸어논 부분을 불러와서,적을 공간을 마련함.활성화
  greeting.classList.add(SHOWING_ON);
  // h4 엘레먼트 안에 인사말을 유저 이름에 맞게 작성해줌
  greeting.innerText = `HELLO ${text} 😎 `;

  const rstBtn = document.createElement("button");

  //이름 정보를 리셋하기 위한 작업
  rstBtn.innerText = "RESET";
  greeting.append("   ");
  greeting.append(rstBtn);

  rstBtn.addEventListener("click", rstAll);
}

function saveName(text) {
  //로컬 스토리지에 USER_LS 라는 아이디로, text 값을 저장해줌!, 여기서  USER_LS는 currentUser값을 나타냄.
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // 이벤트 동작에 따라서, 일단 입력값을 넘기지 않고 그대로 둠.
  event.preventDefault();
  // currentValue에다가 입력값을 value 항목으로 넘겨줌.
  const currentValue = input.value;
  // 입력한 값에 대하여, 화면 표시
  paintGreeting(currentValue);
  // 입력값을 로컬 스토리지에 보관 하기 위함 함수 출력!
  saveName(currentValue);
}

function askForName() {
  // 이름을 받아적는 폼을 불러옴
  form.classList.add(SHOWING_ON);
  // 서브밋 이벤트에 따라서, 엔터 키 누름, handleSubmit함수를 호출함 , 다음항목으로 이동하기 위함.
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // he or she is not
    askForName();
  } else {
    // he or she is!
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
