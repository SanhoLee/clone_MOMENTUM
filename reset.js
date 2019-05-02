const resetList = document.querySelector(".delListBtn");



// 다시!!!!
function delList(event) {
  const delButn = event.target;
  delButn.remove();
  
}

function paintResetBtn() {
  resetList.classList.add(SHOWING_ON);
  const delBtn = document.createElement("button");
  delBtn.innerText = "Reset List!!";
  resetList.appendChild(delBtn);
  delBtn.addEventListener("click", delList);
}

function handleReset(event) {
  const resetChild = resetList.querySelector("button");
  if(resetChild === null){
    paintResetBtn();
  }
  else{
    console.log("already we have button!");
  }
  
}

function chkbtn(){
  const todos = localStorage.getItem(TODOS_LS);
  console.log(todos);
  if (todos !== null ) {
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
