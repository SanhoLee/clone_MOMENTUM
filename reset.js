const resetList = document.querySelector(".delListBtn");


//리스트의 가장 먼저 적힌 li엘러먼트 한개를 삭제하는 기능!
function rmvList(){
  const listElm=toDoList.querySelector("li");
  listElm.remove();
}

//toDos오브젝트는 어레이 자료형을 가지므로, 그 점을 이용하여, 하나씩 엘레먼트를 가져오면서 HTML상의 li엘레먼트를 삭제하여 모든 li요소를 삭제함.
function delList(event) {
  //const delButn = event.target;
  //toDos가 어레이 이므로, 리무브 함수 하나 만들고, forEach 실행!
  toDos.forEach(rmvList);
  localStorage.removeItem(TODOS_LS);
  resetList.classList.remove(SHOWING_ON);
}

//리스트 리셋 버튼 생성하고, 클릭 이벤트로 인해, delList함수를 반환!
function paintResetBtn() {
  resetList.classList.add(SHOWING_ON);
  const delBtn = document.createElement("button");
  delBtn.innerText = "Reset List!!";
  resetList.appendChild(delBtn);
  delBtn.addEventListener("click", delList);
}

//초기 데이터 입력시 버튼을 생성하는 기능, 이벤트로 인해 버튼이 생성된 후 버튼데이터가 null이 아니기 때문에 중복 버튼 생성을 방지함
function handleReset(event) {
  const resetChild = resetList.querySelector("button");
  if(resetChild === null){
    paintResetBtn();
  }
  else{
    console.log("already we have button!");
  }
  
}


//이미 로컬스토리지에 리스트 데이터가 있는 경우, 새로고침에 의한 리셋 버튼 체크기능
function chkbtn(){
  
  if (toDos.length !== 0 ) {
    paintResetBtn();
  } 
  else {
    console.log("there is no todos");
  }
}

function init() {
  chkbtn();
  toDoForm.addEventListener("submit", handleReset);
}

init();
