const start = document.getElementById("start");
start.addEventListener("click", clickButton);

function clickButton() {
   const buttons = ["first", "second", "third", "fourth", "fifth", "sixth"];
   const colors = ["red", "yellow", "green", "blue", "pink", "orange"];
   const copyColors = [];

   for (let i = 0; i < buttons.length; i++) {
      const randColor = Math.floor(Math.random() * colors.length);

      copyColors.push(colors[randColor]);

      colors.splice(randColor, 1);

      const getButton = document.getElementById(buttons[i]);

      getButton.classList.add(copyColors[i]);
   }

   resetBtn();

   timer(buttons, copyColors);
}

function timer(buttons, copyColors) {
   const minutes = [7000, 6000, 5000, 4000, 3000];

   const getLvl = document.getElementById("level").innerHTML;

   setTimeout(prevColor, minutes[getLvl - 1], buttons, copyColors);
}

const reset = function() {
   sessionStorage.clear();
   window.location.reload();
};

function resetBtn() {
   const reload = document.getElementById("reload");
   const anchor = document.querySelector(".anchor");
   reload.innerHTML = "RESET";
   start.addEventListener("click", function() {
      anchor.setAttribute("href", "#reload");
      reset();
   });
}

function prevColor(buttons, copyColors) {
   const copyCol = copyColors.slice();

   const textArray = copyCol.sort(function() {
      return 0.5 - Math.random();
   });

   const selectClass = document.querySelectorAll(".square");

   const heartArr = ["three", "two", "one"];
   const copyHeartArr = [];

   for (let i = 0; i < buttons.length; i++) {
      selectClass[i].classList.toggle("aqua");
   }

   const copyTextArray = textArray.slice();

   document.getElementById("color-btn").addEventListener("click", function(e) {
      if (e.target.nodeName === "BUTTON" && e.target.classList[1] === copyTextArray[0]) {
         e.target.classList.remove("aqua");

         copyTextArray.shift();
      } else if (e.target.nodeName === "BUTTON" && e.target.classList[1] !== copyTextArray[0]) {
         copyHeartArr.push(heartArr[0]);

         const delHeart = heartArr.splice(0, 1);
         for (let i = 0; i < copyHeartArr.length; i++) {
            const heart = document.getElementById(copyHeartArr[i]);
            heart.classList.replace("ion-md-heart", "ion-md-heart-dislike");
         }
      }
   });

   order(textArray);
   board();
}

function order(text) {
   const innerText = document.getElementById("info");
   const upCase = text.map(function(color) {
      return color.toUpperCase().fontcolor(color);
   });

   innerText.innerHTML = `CLICK BUTTONS IN PROPER ORDER: 
      ${upCase[0]}, ${upCase[1]}, ${upCase[2]}, ${upCase[3]}, ${upCase[4]}, ${upCase[5]}!`;
}

function onBoard() {
   const original = [1, 2, 3, 4, 5, "WIN!"];
   const score = document.getElementById("score");
   const endMessage = document.getElementById("end-message");
   const listArr = sessionStorage.listArr ? JSON.parse(sessionStorage.listArr) : original;
   const resultSet = listArr.shift();

   sessionStorage.listArr = JSON.stringify(listArr.length ? listArr : original);
   document.getElementById("level").innerHTML = resultSet;

   score.innerHTML = resultSet - 1;
   if (isNaN(score.innerHTML)) {
      score.innerHTML = "WIN!";
      endMessage.innerHTML = "CONGRATULATIONS! YOU WIN!";
      popup();
   }
}
onBoard();

function board() {
   let counter1 = 0;
   let counter2 = 0;

   const colorBtn = document.getElementById("color-btn");

   colorBtn.addEventListener("click", function(e) {
      if (e.target.classList[2] !== "aqua" && e.target.nodeName === "BUTTON") {
         counter1++;
         e.target.disabled = true;
      } else if (e.target.classList[2] === "aqua" && e.target.nodeName === "BUTTON") {
         counter2++;
      }
      if (counter1 === 6) {
         counter1 = 0;
         counter2 = 0;
         window.location.reload();
      } else if (counter2 === 3) {
         popup();
      }
   });
}

function popup() {
   const modal = document.querySelector(".modal");
   const closeButton = document.querySelector(".close-button");
   function toggleModal() {
      modal.classList.toggle("show-modal");
   }

   function windowOnClick(event) {
      if (event.target === modal) {
         reset();
      }
   }

   toggleModal();
   closeButton.addEventListener("click", reset);
   window.addEventListener("click", windowOnClick);
}

window.addEventListener("load", function(e) {
   const loading = document.getElementById("loading");
   if (e) {
      loading.remove("loading");
   }
});
