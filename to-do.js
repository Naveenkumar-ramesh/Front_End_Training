  const toDoTask = getElementById("to-do-add-task");
  const tasklist = getElementById("task-list");
  const taskContainer = getElementById("to-do-task");
  const toDoName = getElementById("to-do-name");
  const list = getElementById("to-do-list");
  const categoryName = getElementById("day-name");
  const categoryIcon = getElementById("day-icon");
  const navigator = getElementById("toggle-menu");
  const icon = '<i class="fa-solid fa-bars"></i>';
  const leftcontainer = getElementById("left-side");
  const middleContainer = getElementById("right-side");
  const selectedTask = document.getElementsByClassName("add-task-bar");
  const taskRight = getElementById("task-right");
  const taskTitle = getElementById("add-step-task-name");
  let taskRevert = getElementById("task-revert");
  let choosenCategory = document.getElementsByClassName("left-content");

  const category = [{ id: '1', name: 'My Day', icon: '<i class="fa-regular fa-sun"></i>' },
  { id: '2', name: 'Important', icon: '<i class="fa-regular fa-star"></i>' },
  { id: '3', name: 'Planned', icon: '<i class="fa-regular fa-calendar"></i>' },
  { id: '4', name: 'Assigned To Me', icon: '<i class="fa-regular fa-user"></i>' },
  { id: '5', name: 'Tasks', icon: '<i class="fa-solid fa-house"></i>' }];

  let selectedCategory = category[0];

  const tasks = [];

  function init() {
    getCurrentDate();
    eventListener();
    getCategory();
    addCategory();
    getTask();
    addTask();
    taskBarDefault();
    taskBar(id)
  }

  function getCurrentDate() {
    const months = ["January", "February", "March",
      "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    var month = months[currentDate.getMonth()];
    var day = days[currentDate.getDay()];
    var date = currentDate.getDate();
    document.getElementById("current-date").innerHTML = day + ", " + month + " " + date;
  }

  function getCategory() {
    tasklist.innerHTML = "";
    for (var i = 0; i < category.length; i++) {
      var listContainer = createElement("div");
      listContainer.className = 'left-content';
      listContainer.setAttribute("id", i);
      listContainer.setAttribute("onclick", "taskBar(this.id)");
      var iconContainer = createElement("div");
      iconContainer.className = 'left-icon';
      var categoryContainer = createElement("div");
      categoryContainer.className = 'left-item';
      iconContainer.innerHTML = category[i].icon;
      categoryContainer.innerHTML = category[i].name;
      listContainer.appendChild(iconContainer);
      listContainer.appendChild(categoryContainer);
      tasklist.appendChild(listContainer);
      tasklist.insertBefore(listContainer, list.children[i]);
    }
  }

  function addCategory() {
    if (event.key == "Enter") {
      const icons = '<i class="fa fa-bars"</i>';
      var texts = toDoName.value;

      if (texts == "") {
        texts = "Untitled list";
      }
      let id = category.length + 1;
      category.push({ id: id++, icon: icons, name: texts });
      getCategory();
      toDoName.value = "";
    }
  }

  function taskBarDefault() {
    categoryName.innerHTML = category[0].name;
    categoryIcon.innerHTML = category[0].icon;
    selectedCategory = category[0];
    console.log(selectedCategory);
    getTask();
  }

  function taskBar(id) {
    var index = parseInt(id);
    categoryName.innerHTML = category[index].name;
    categoryIcon.innerHTML =  category[index].icon;
    selectedCategory = category[index];
    getTask();
  }

  function eventListener() {
 
    toDoName.addEventListener("keypress", addCategory);
    toDoTask.addEventListener("keypress", addTask);
    navigator.addEventListener("click", hideMenu);
    taskRevert.addEventListener("click", revertTask);
    categoryIcon.addEventListener("click", revertLeft);

    for (let index = 0; index < tasks.length; index++) {
      selectedTask[index].addEventListener("click", showTask);
    }
  }

  function hideMenu() {
    leftcontainer.classList.remove("left-side");
    leftcontainer.classList.add("left-side-hide");
    middleContainer.classList.add("right-side-hide");
    var dayIcon = getElementById("day-icon");
    dayIcon.innerHTML = icon;
  }

  function showTask(event) {
    var rightContainer = getElementById("right-side");
    rightContainer.classList.add("right-side-show-task");
    for (let index = 0; index < tasks.length; index++) {
      console.log(tasks[index].id);
      console.log(event.currentTarget.id);
      if (event.currentTarget.id == (tasks[index].id)-1) {
        taskTitle.innerHTML = tasks[index].name;
      }
    }
    taskRight.classList.remove('task-right');
    taskRight.classList.add('task-right-show');
  }

  function revertTask() {
    var rightContainer = getElementById("right-side");
    rightContainer.classList.remove('right-side-show-task');
    taskRight.classList.add('task-right');
  }

  function revertLeft() {

    leftcontainer.classList.remove("left-side-hide");
    middleContainer.classList.remove("right-side-hide");
  }

  function getTask() {
    taskContainer.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].categoryId == selectedCategory.id) {
        const pretext = createElement("div");
        pretext.className = 'pretext';
        const posttext = createElement("div");
        posttext.className = 'posttext';
        const texts = createElement("div");
        texts.className = "new-task";
        const addTask = createElement("div");
        addTask.setAttribute("id", i);
        addTask.className = "add-task-bar";
        pretext.innerHTML = '<i class="fa-regular fa-circle"></i>';
        texts.innerHTML = tasks[i].name;
        posttext.innerHTML = '<i class="fa-regular fa-star"></i>';
        addTask.appendChild(pretext);
        addTask.appendChild(texts);
        addTask.appendChild(posttext);
        taskContainer.appendChild(addTask);
        toDoTask.value = "";
      }
    }
  }

  function addTask() {
    if (event.key == "Enter" && toDoTask.value != "") {
      let text = toDoTask.value;
      let taskId = tasks.length + 1;
      tasks.push({id: taskId++ , name: text, categoryId: selectedCategory.id});
      getTask();
      eventListener();
      text.value = "";
    }
  }

  function getElementById(id) {
    return document.getElementById(id);
  }

  function createElement(name) {
    return document.createElement(name);
  }

  init();


  
  // function taskBar(event) {
  //   if (event == null) {
  //     categoryName.innerHTML = category[0].name;
  //     categoryIcon.innerHTML = category[0].icon;
  //     selectedCategory = category[0];
  //     console.log(selectedCategory);
  //     getTask();
  //   } else {
  //     for (let i = 0; i < category.length; i++) {
  //       if (event.target.id == category[i].id) {
  //         console.log(category[i]);
  //         categoryName.innerHTML = category[i].name;
  //         categoryIcon.innerHTML =  category[i].icon;
  //         selectedCategory = category[i];
  //         getTask();
  //       }
  //     }
  //   }
  // }