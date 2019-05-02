const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
//toDos는 어레이 값으로, id와 텍스트 형태의 리스트항목을 가진다.
let toDos = [];

function delToDo(event) {
  //event로 인해서 눌러진 부분의 데이터를 btn으로 가져옴.하지만 이 정보로는 어떤 버튼이 눌렸는지 확인이 안됨.
  const btn = event.target;
  //그래서, 위의 타겟 오브젝트 하위에 있는 parentNode 오브젝트의 id 정보를 땡겨와서 li 변수에 담아줌
  const li = btn.parentNode;
  //li에 클릭 이벤트로 삭제하고자 하는 리스트의 id 정보가 전달되었으므로, 해당 데이터를 가지고, 원래 리스트의 html요소 li를 삭제함. 아직 로컬스토리지에는 리스트 정보가 있음.
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    // li의 id 가 스트링으로 출력되는 것을 확인, 즉 아래의 li.id를 숫자로 바꿔준다!! console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  // toDos가 const 변수 여서 재 할당 안됐었는데, let 형태로 바꿔져서 변경가능하게 만들어줌!!
  toDos = cleanToDos;
  saveToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //로컬 스토리지에 스트링 형태로 저장된 데이터를 객체 형태로 다시 파스 해줌, JSON사용
    const parsedToDos = JSON.parse(loadedToDos);
    // 이제 데이터를 로컬스토리지에 저장했으니 해당 데이터를 페이지에 프린트 해줌
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function saveToDos() {
  //로컬스토리지는 데이터를 스트링 형태로 저장하기 때문에 오브젝트에 들어있는 데이터를 모드 스트링화 시켜줌, JSON사용
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  

  delBtn.innerText = "DEL";
  delBtn.addEventListener("click", delToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
