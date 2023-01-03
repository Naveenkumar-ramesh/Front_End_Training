(function () {
  function init() {
    getCurrentDate();
    addList();
    addTask();
  }

  function getCurrentDate() {
    const date = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    document.getElementById("current-date").outerHTML = date;
  }

  function addList() {
    var toDoName = document.getElementById("to-do-name");
    toDoName.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const node = document.createElement("li");
        const text = document.createTextNode(toDoName.value);
        node.innerHTML = '<i class="material-icons">list</i>';
        node.appendChild(text);
        document.getElementById("to-do-list").appendChild(node);
        toDoName.value = "";
      }
    });
  }

  function addTask() {
    var toDoTask = document.getElementById("to-do-add-task");
    toDoTask.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const node = document.createElement("li");
        const text = document.createTextNode(toDoTask.value);
        // node.innerHTML = '<i class="material-icons">list</i>';
        node.appendChild(text);
        document.getElementById("to-do-task").appendChild(node);
        toDoTask.value = "";
      }
    });
  }

  init();
})();