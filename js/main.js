import $ from "jquery";

import './../scss/main.scss';

document.addEventListener("DOMContentLoaded", () => {
  const newTask = document.getElementById("newTask");
  let newTaskText = newTask.value;

  let checkboxInput;
  let buttonDel;
  let listItems = document.getElementsByTagName("li");
  const addBtn = document.getElementById("add");
  const form = document.querySelector("form");
  const mainContainer = document.getElementById("list-form-container");
  let list;
  let counter;
  let allTasksData;

  if (listItems.length == 0) {
    list = null;
    counter = 0;

    allTasksData = localStorage.getItem("allTasksData")
      ? JSON.parse(localStorage.getItem("allTasksData"))
      : [];

    for (let z = 0; z < allTasksData.length; z++) {
      counter++;
      if (list == null) {
        list = document.createElement("ul");
        mainContainer.insertBefore(list, form);
      } else {
        list = document.querySelector("ul");
      }
      //tworzenie elementów
      let listItem = document.createElement("li");
      checkboxInput = document.createElement("input");
      let labelCheck = document.createElement("label");
      let taskName = document.createElement("span");
      buttonDel = document.createElement("button");
      //dodawanie atrybutów
      checkboxInput.setAttribute("type", "checkbox");
      checkboxInput.id = "checkField-" + counter;
      checkboxInput.name = "checkField-" + counter;
      labelCheck.setAttribute("class", "check");
      labelCheck.htmlFor = "checkField-" + counter;
      buttonDel.setAttribute("class", "delete");
      taskName.id = allTasksData[z].id;
      taskName.innerHTML = allTasksData[z].taskName;
      list.appendChild(listItem); //dodawanie elementów do drzewa DOM
      listItem.appendChild(checkboxInput);
      listItem.appendChild(labelCheck);
      listItem.appendChild(taskName);
      listItem.appendChild(buttonDel);

      buttonDel.addEventListener("click", function(e) {
        if (listItems.length > 1) {
          let taskForDeletion = this.parentNode.querySelector("span");
          for (let y = 0; y < allTasksData.length; y++) {
            if (allTasksData[y].id == taskForDeletion.id) {
              allTasksData.splice(y, 1);
              break;
            }
          }
          localStorage.clear();
          localStorage.setItem("allTasksData", JSON.stringify(allTasksData));
          this.parentNode.parentNode.removeChild(this.parentNode);
          console.log(this.parentNode.parentNode);
        } else if (listItems.length === 1) {
          this.parentNode.parentNode.parentNode.removeChild(
            this.parentNode.parentNode
          );
          list = null;
          localStorage.clear();
        }
      });

      checkboxInput.addEventListener("click", function(e) {
        let taskDone = this.parentNode.querySelector("span");
        let buttonDelDone = this.parentNode.querySelector("button");
        taskDone.classList.toggle("done");
        buttonDelDone.classList.toggle("delete-done");
      });
    }
  }

  function addTask(e) {
    e.stopImmediatePropagation(e);
    if (newTask.value.length > 0) {
      counter++;
      if (list == null) {
        list = document.createElement("ul");
        mainContainer.insertBefore(list, form);
      } else {
        list = document.querySelector("ul");
      }
      //tworzenie elementów
      let listItem = document.createElement("li");
      checkboxInput = document.createElement("input");
      let labelCheck = document.createElement("label");
      let taskName = document.createElement("span");
      buttonDel = document.createElement("button");
      //dodawanie atrybutów
      checkboxInput.setAttribute("type", "checkbox");
      checkboxInput.id = "checkField-" + counter;
      checkboxInput.name = "checkField-" + counter;
      labelCheck.setAttribute("class", "check");
      labelCheck.htmlFor = "checkField-" + counter;
      buttonDel.setAttribute("class", "delete");
      taskName.id = counter;
      taskName.innerHTML = newTask.value;
      list.appendChild(listItem); //dodawanie elementów do drzewa DOM
      listItem.appendChild(checkboxInput);
      listItem.appendChild(labelCheck);
      listItem.appendChild(taskName);
      listItem.appendChild(buttonDel);

      allTasksData.push({ id: taskName.id, taskName: newTask.value });
      localStorage.clear();
      localStorage.setItem("allTasksData", JSON.stringify(allTasksData));
      //        console.log(allTasksData);

      buttonDel.addEventListener("click", function(e) {
        if (listItems.length > 1) {
          let taskForDeletion = this.parentNode.querySelector("span");
          for (let y = 0; y < allTasksData.length; y++) {
            if (allTasksData[y].id == taskForDeletion.id) {
              allTasksData.splice(y, 1);
              break;
            }
          }
          localStorage.clear();
          localStorage.setItem("allTasksData", JSON.stringify(allTasksData));
          this.parentNode.parentNode.removeChild(this.parentNode);
          //              console.log(this.parentNode.parentNode);
        } else if (listItems.length === 1) {
          this.parentNode.parentNode.parentNode.removeChild(
            this.parentNode.parentNode
          );
          list = null;
          localStorage.clear();
        }
      });
    } else if (newTask.value.length === 0) {
      alert("Wpisz nazwę zadania i kliknij znak + lub naciśnij enter");
      return null;
    }

    newTask.value = "";

    checkboxInput.addEventListener("click", function(e) {
      let taskDone = this.parentNode.querySelector("span");
      let buttonDelDone = this.parentNode.querySelector("button");
      taskDone.classList.toggle("done");
      buttonDelDone.classList.toggle("delete-done");
    });
  }

  addBtn.addEventListener("click", addTask);

  newTask.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      if (newTask.value.length == 0) {
        e.stopImmediatePropagation(e);
        alert("Wpisz nazwę zadania i kliknij znak + lub naciśnij enter");
        //return null;
      } else {
        addTask(e);
      }
    }
  });
});

//template elementów z zadaniem
//<ul>
//    <li>
//        <input type="checkbox"  name="checkField-1" id="checkField-1" />
//        <label for="checkField-1"  class="check">
//        </label>
//        <span id = "1">Przykładowy tekst</span>
//        <button class="delete" ></button>
//    </li>
//</ul>