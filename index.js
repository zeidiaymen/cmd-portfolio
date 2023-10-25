document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  const formattedDate =
    currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
    " " +
    currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
  const dateTimeElement = document.getElementById("dateTime");

  if (dateTimeElement) {
    dateTimeElement.innerHTML = formattedDate;
  }

  const typingElement = document.querySelector(".typing");
  let index = 0;
  let currentText = "";
  let isDeleting = false;
  let currentMenu = "main";
  const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is ZEIDI Aymen?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span><br><span onclick="handleMenuClick('4')">[4] Achievements</span>`,
    1: `Who is ZEIDI Aymen?<br><br>I'm ZEIDI Aymen, a dedicated professional in the tech world. My journey in the technology field has been diverse and exciting. From software development to innovative projects, I've covered a wide range of domains. <br><br>Feel free to contact me through the following email address: <a href="mailto:zeidia@3il.fr">zeidia@3il.fr</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    2: `Contact:<br>- Email: <a href="mailto:zeidia@3il.fr">zeidia@3il.fr</a><br>
        - Phone: <a href="#"> +33 (0) 7 80 78 76 57</a><br>
        <br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    3: `Some of my Projects:<br><br>
    - <strong> Params Appro Aval project  </strong>:As part of RAO 2.0, participate in the design and development of a tool for managing SMP (minimum presentation threshold), VMH (weekly average sales), and the extract, load and process of different parameters related to replenishment flow.<br>
    - <strong>Image indexing </strong>: Facilitate navigation in an image database using:
    Textual query-based search with a descriptor vector and 
    Keyword-based navigation and search<br>
    - <strong>Tech-Tak </strong>: Development of a platform for buying and exchanging computer equipment.
    Tasks:
    
    Implementation of a system that detects consumer emotions for marketing purposes,
    Implementation of an e-commerce chatbot and real-time delivery tracking and
    Implementation of a system that manages auctions for the most relevant products.<br>

     - <strong>
   Contact me to hear more</strong> : ....  <br><span onclick="handleMenuClick('B')">[B] Back</span>`,

    4: `Achievements :<br> Top of the class at 3il engineering school in 2023  <br>
     Top of the class in the TWIN option in 2022  <br>
     1st ESPRIT "bal des projets" 2022  <br>
     Google Africa Developer certification  <br>
     4 stars in HackerRank   <br><span onclick="handleMenuClick('B')">[B] Back</span>`,
  };

  function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
      isDeleting = true;
      typeDeleteAnimation(() => {
        currentMenu = menuKey;
        currentText = menus[menuKey];
        index = 0;
        typeDeleteAnimation();
      });
    } else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
      isDeleting = true;
      typeDeleteAnimation(() => {
        currentMenu = "main";
        currentText = menus.main;
        index = 0;
        typeDeleteAnimation();
      });
    }
  }
  function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed

    if (currentMenu === "1" || currentMenu === "4") {
      speed = 1; // Makes the typing faster for "Who is glizzy".
      deleteSpeed = 1; // Makes the deletion faster for "Who is glizzy". Adjust as needed.
    }

    if (isDeleting && typingElement.innerHTML !== "") {
      if (currentText.charAt(index - 1) === ">") {
        const openTagIndex = currentText.lastIndexOf("<", index);
        const tagName = currentText.substring(
          openTagIndex + 1,
          currentText.indexOf(" ", openTagIndex)
        );
        const startTagIndex = currentText.lastIndexOf(`</${tagName}>`, index);
        index = startTagIndex;
      } else {
        index--;
      }
      currentText = currentText.slice(0, index);
      typingElement.innerHTML = currentText;

      setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    } else if (isDeleting) {
      isDeleting = false;
      if (callback) callback();
    } else if (!isDeleting && index < currentText.length) {
      if (currentText.charAt(index) === "<") {
        if (currentText.substr(index, 4) === "<br>") {
          const br = document.createElement("br");
          typingElement.appendChild(br);
          index += 4;
        } else {
          const closingTagIndex = currentText.indexOf(">", index);
          const tagName = currentText
            .substring(index + 1, closingTagIndex)
            .split(" ")[0];
          const endTagIndex =
            currentText.indexOf(`</${tagName}>`, index) +
            `</${tagName}>`.length;
          const outerHTML = currentText.substring(index, endTagIndex);
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = outerHTML;
          const childElement = tempDiv.firstChild;

          if (tagName === "a") {
            childElement.target = "_blank";
            speed = 1; // Faster typing for <a> tag
          } else if (tagName === "span") {
            childElement.onclick = function () {
              const menuKey = childElement
                .getAttribute("onclick")
                .replace("handleMenuClick('", "")
                .replace("')", "");
              handleMenuClick(menuKey);
            };
            speed = 1; // Faster typing for <span> tag
          }

          typingElement.appendChild(childElement);
          index = endTagIndex;
        }
      } else {
        typingElement.innerHTML += currentText.charAt(index);
        index++;
      }

      setTimeout(typeDeleteAnimation, speed);
    }
  }

  function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
      isDeleting = true;
      typeDeleteAnimation(() => {
        currentMenu = key;
        currentText = menus[key];
        index = 0;
        typeDeleteAnimation();
      });
    } else if ((key === "B" || key === "b") && currentMenu !== "main") {
      isDeleting = true;
      typeDeleteAnimation(() => {
        currentMenu = "main";
        currentText = menus.main;
        index = 0;
        typeDeleteAnimation();
      });
    }
  }

  document.addEventListener("keydown", handleUserInput);

  currentText = menus.main;
  typeDeleteAnimation();
});
