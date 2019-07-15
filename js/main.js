function getClass() {
  var startButton = document.getElementById("start");
  startButton.onclick = clickButton;
}

function clickButton() {
  var buttons = ["first", "second", "third", "fourth", "fifth", "sixth"];
  var colors = ["red", "yellow", "green", "blue", "pink", "orange"];
  var copyColors = [];

  for (var i = 0; i < buttons.length; i++) {

    var randColor = Math.floor(Math.random() * colors.length);

    copyColors.push(colors[randColor]);

    var delColors = colors.splice(randColor, 1);

    var getButton = document.getElementById(buttons[i]);

    getButton.classList.add(copyColors[i]);


  }
  setTimeout(prevColor, 3000, buttons, copyColors);

}

function prevColor(buttons, copyColors) {

  var copyCol = copyColors.slice();

  var textArray = copyCol.sort(function (a, b) {
    return 0.5 - Math.random()
  });

  var selectClass = document.querySelectorAll(".square");
  
  for (var i = 0; i < buttons.length; i++) {

    var delClass = selectClass[i].classList.toggle("aqua");

  }

  var copyTextArray = textArray.slice();

  document.getElementById("color-btn").addEventListener("click", function (e) {

    if (e.target.nodeName === "BUTTON" && e.target.classList[1] === copyTextArray[0]) {

      e.target.classList.remove("aqua");

      copyTextArray.shift();
    } 
    
  })

  order(textArray);

//  console.log(copyColors); //test
//  console.log(textArray); //test
}


function order(text) {
  var innerText = document.getElementById("info");
  innerText.innerHTML = "CLICK BUTTONS IN PROPER ORDER: " + text[0] + ", " + text[1] + ", " + text[2] + ", " + text[3] + ", " + text[4] + ", " + text[5] + " !";
}

window.onload = getClass;
