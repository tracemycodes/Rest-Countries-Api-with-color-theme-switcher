let element, selectDiv, selectItems, selectOptions;


// custom selected Div
const customSelect = document.querySelector('.custom-select');
// select tag [0] to access the index of the html collection
element = document.getElementsByTagName('select')[0];
// create a new div to hold the selected value
selectDiv = document.createElement("div");
selectDiv.setAttribute("class", "select-selected");
selectDiv.innerHTML = element.options[element.selectedIndex].innerHTML;
// I appended the created div with my current select value to my custom select element 
customSelect.appendChild(selectDiv);

// creating a new element for the select items / options
selectItems = document.createElement('div');
selectItems.setAttribute("class", "select-items select-hide");

// i looped through all select elements
for (let i = 1; i < element.length; i++) {
  // i created div element for each select option
  selectOptions = document.createElement("div");
  selectOptions.innerHTML = element.options[i].innerHTML;
  // adding an event listener to  each select option
  selectOptions.addEventListener('click', function (e) {
    e.preventDefault()
    let selectEl = this.parentNode.parentNode.getElementsByTagName("select")[0],
    UIselect = this.parentNode.previousSibling,
    sameSelected;
    // looped through the select tag elements to get change the value of the recently selected and remove the class of the previous value and adding unto the current value
    for (let j = 0; j < selectEl.length; j++) {
      if (selectEl.options[j].innerHTML == this.innerHTML) {
        selectEl.selectedIndex = j;
        UIselect.innerHTML = this.innerHTML;
        sameSelected = this.parentNode.getElementsByClassName("same-as-selected");
            
        for (let k = 0; k < sameSelected.length; k++) {
          sameSelected[k].removeAttribute("class");
        }
        this.setAttribute("class", "same-as-selected");
        break;
      }
    }
    UIselect.click();
  })
  // adding each option to the select items div
  selectItems.appendChild(selectOptions);
}
customSelect.appendChild(selectItems);

selectDiv.addEventListener("click", function(e) {
  /* When the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
});

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}


const countryApi = new RestApi()

countryApi.getAllCountries().then(data => data.forEach(element => console.log(element)))