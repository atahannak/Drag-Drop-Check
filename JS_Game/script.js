// Selecting draggable cells
const dgTableCells = document.querySelectorAll(
  "#draggable-table > tbody > tr > td"
);

// Selecting droppable-on cells
const dpTableCells = document.querySelectorAll(
  "#droppable-table > tbody > tr > td"
);

// Selecting check button.
const checkButton = document.querySelector("button");

// Selecting status text.
const statusText = document.querySelector("#status");
statusText.style.display = "none"; // Hiding status element to align two tables.

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let mixednums = mixNums(nums);

// Iterating each element of draggable cells by forEach func.
dgTableCells.forEach((cell, index) => {
  cell.setAttribute("id", index + 1);
  cell.setAttribute("draggable", true);
  cell.textContent = nums[index];

  cell.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("id", e.target.id);
  });
});

// Iterating each element of droppable-on cells
dpTableCells.forEach((cell, index) => {
  cell.setAttribute("id", index + 1);
  cell.addEventListener("drop", (e) => {
    e.preventDefault();
    let dgElID = e.dataTransfer.getData("id");
    let dragEl = document.getElementById(dgElID);
    dragEl.style.border = "none";
    cell.appendChild(dragEl);
  });

  //Allowing drag over.
  cell.addEventListener("dragover", (e) => {
    if (!cell.textContent) {
      // Check whether cell already has a drop. If it have not, allow dragover.
      e.preventDefault();
    }
  });
});

// The function checks whether numbers is on the right place. (E.g. 1, 2, 3, 4, 5, 6, 7, 8, 9)
function check(cells) {
  let unmatchedCells = [];
  for (const element of cells) {
    let item = element;
    let cellID = item.id;
    let cellChildText =
      item.firstElementChild != null
        ? item.firstElementChild.textContent
        : null;
    if (cellID != cellChildText) {
      unmatchedCells.push(cellID);
    }
  }

  if (unmatchedCells.length > 0) {
    return "Try Again. Unmatched cells: " + unmatchedCells.toString();
  } else {
    return true;
  }
}

checkButton.addEventListener("click", () => {
  if (checkButton.textContent == "CHECK") {
    let result = check(dpTableCells);

    if (result === true) {
      statusText.style.color = "green";
      statusText.textContent = "OK";
      statusText.style.display = "block";
      checkButton.textContent = "REFRESH";
    } else {
      statusText.style.color = "red";
      statusText.textContent = result;
      statusText.style.display = "block";
    }
  } else {
    // checkButton.textContent == "REFRESH"
    location.reload();
  }
});

// A function that mixing nums array given.
function mixNums(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // Mixing array elements
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
