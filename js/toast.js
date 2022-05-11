
function addProgressBar(container, duration, callback) {
  // We select the div that we want to turn into a progressbar
  console.log("creating new progressbar");
  var progressbar = document.createElement('div');
  progressbar.className = 'progress-bar';

  // We create the div that changes width to show progress
  var progressbarinner = document.createElement('div');
  progressbarinner.className = 'inner';

  // Now we set the animation parameters
  progressbarinner.style.animationDuration = duration;

  // Eventually couple a callback
  if (typeof(callback) === 'function') {
    container.addEventListener('animationend', function(){
      // this.parentElement.style.display='none';
      callback(this.parentElement);
    });
  }
  // Append the progressbar to the main progressbardiv
  progressbar.appendChild(progressbarinner);

  // When everything is set up we start the animation
  progressbarinner.style.animationPlayState = 'running';
  container.appendChild(progressbar);
  container.classList.add("progress");
}

function createToast(text="I'm a Toast!", color="", timer=0, closeBtn=true, swipeBtn=true){
  var toast = document.createElement('div');
  toast.classList.add('alert-container');
  toast.classList.add(color === "" ? randomColorClass() : color);
  var toastInner = document.createElement('div');
  toastInner.classList.add('alert-inner');
  toastInner.textContent = text;
  if(timer > 0)
    addProgressBar(toastInner, timer+'s', swipeToast);
  if(swipeBtn)
    addSwipeBtn(toastInner);
  if(closeBtn)
    addCloseBtn(toastInner);
  toast.appendChild(toastInner);
  document.getElementById("notifications-container").appendChild(toast);
}

function addBtnsContainer(container){
  var btnsContainer = document.createElement('span');
  btnsContainer.classList.add("alert-btns")
  container.appendChild(btnsContainer);
  return container
}

function addSwipeBtn(container){
  if(container.getElementsByClassName("alert-btns").length <= 0){
    container = addBtnsContainer(container)
  }  
  var btnsContainer = container.getElementsByClassName("alert-btns")[0];
  var swipeBtn = document.createElement('span');
  swipeBtn.classList.add("swipe-btn")
  swipeBtn.textContent = ">"
  btnsContainer.appendChild(swipeBtn);
  swipeBtn.addEventListener("click", function(){
    swipeToast(container.parentElement);
  });
}

function addCloseBtn(container){
  if(container.getElementsByClassName("alert-btns").length <= 0){
    container = addBtnsContainer(container)
  }  
  var btnsContainer = container.getElementsByClassName("alert-btns")[0];
  var closeBtn = document.createElement('span');
  closeBtn.classList.add("close-btn")
  closeBtn.textContent = "×"
  btnsContainer.appendChild(closeBtn);
  closeBtn.addEventListener("click", function(){
    closeToast(container.parentElement);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function randomColorClass(){
    var colorClasses = ["default", "primary", "secondary", "info", "success", "warning", "error", "light", "dark"]
    return colorClasses[getRandomInt(0, colorClasses.length)];
  }

function addProgressBars(){
  var elements = document.getElementsByClassName("progress");
  
  for (var i = 0; i < elements.length; i++) {        
      addProgressBar(elements[i], (5+i+2)+'s', closeToast);
  }
}

function closeToast(toast){
    console.log("Closing Toast!");
    // toast.style.opacity = "0";
    setTimeout(function () {
      toast.style.display = "none";
    }, 400);
}

function swipeToast(toast){
  console.log("Swiping Toast!");
  toast.classList.add("slide");
  // toast.style.opacity = "0";
  // setTimeout(function () {
  //   toast.style.display = "none";
  // }, 500);
}

function toastOnClicks(){
  var close = document.getElementsByClassName("close-btn");
  for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function(){
        // this.parentElement.style.display='none';
        closeToast(this.parentElement.parentElement);
      });
  }

  var swipe = document.getElementsByClassName("swipe-btn");
  for (var i = 0; i < swipe.length; i++) {
    swipe[i].addEventListener("click", function(){
        var toast = this.parentElement.parentElement.parentElement;
        swipeToast(toast);
      });
  }
}