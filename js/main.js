const start = document.getElementById("start");
start.addEventListener("click", clickButton);

function clickButton() {
   const buttons = ["first", "second", "third", "fourth", "fifth", "sixth"];
   const colors = ["red", "yellow", "green", "blue", "pink", "orange"];
   const copyColors = [];

   for (let i = 0; i < buttons.length; i++) {
      const randColor = Math.floor(Math.random() * colors.length);

      copyColors.push(colors[randColor]);

      const delColors = colors.splice(randColor, 1);

      const getButton = document.getElementById(buttons[i]);

      getButton.classList.add(copyColors[i]);
   }

const reset = function() {
   sessionStorage.clear();
   window.location.reload();
};

function resetBtn() {
   const reload = document.getElementById("reload");
   reload.innerHTML = "RESET";
   start.addEventListener("click", function() {
      reset();
   });
}

   setTimeout(prevColor, 1000, buttons, copyColors);
}

function prevColor(buttons, copyColors) {
   const copyCol = copyColors.slice();

   const textArray = copyCol.sort(function() {
      return 0.5 - Math.random();
   });

   const selectClass = document.querySelectorAll(".square");

   for (let i = 0; i < buttons.length; i++) {
      let delClass = selectClass[i].classList.toggle("aqua");
   }

   const copyTextArray = textArray.slice();

   document.getElementById("color-btn").addEventListener("click", function(e) {
      if (e.target.nodeName === "BUTTON" && e.target.classList[1] === copyTextArray[0]) {
         e.target.classList.remove("aqua");

         copyTextArray.shift();
      }
   });

   order(textArray);

   //  console.log(copyColors); //test
   //  console.log(textArray); //test
}

function order(text) {
   const innerText = document.getElementById("info");
   const upCase = text.map(function(color) {
      return color.toUpperCase().fontcolor(color);
   });

   innerText.innerHTML = `CLICK BUTTONS IN PROPER ORDER: 
      ${upCase[0]},
      
      ${upCase[1]},
      
      ${upCase[2]}, 
      
      ${upCase[3]}, 
      
      ${upCase[4]}, 
      
      ${upCase[5]} 
      !`;
}
