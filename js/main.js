// my custom select div
const customSelectDiv = document.querySelector('.custom-select'),
      selectEl = document.querySelector('select');

// console.log(selectEl.length);
// console.log("object");
// const restUI = new restUI(customSelect, selectEl)
const customUISelect = new CustomSelectUI(customSelectDiv, selectEl)



// // create ui element for selected item 
// let UIselectDiv = document.createElement('div');
// UIselectDiv.classList.add('select-selected')

// UIselectDiv.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;

// customSelect.appendChild(selectDiv);


// created the UI for the selected options
let UIselectedOption = document.createElement('div');

customUISelect.appendSelectedDiv(UIselectedOption)


let UIselectItems = document.createElement('div');
// selectItems.setAttribute("class", "select-items select-hide");

customUISelect.appendSelectOptions(UIselectItems)




for (let i = 1; i < selectEl.length; i++) {
  // i created div element for each select option
  let selectOptions = document.createElement("div");

  // customUISelect.clickSelected(selectOption)
  selectOptions.innerHTML = selectEl.options[i].innerHTML;
  // adding an event listener to  each select option
  selectOptions.addEventListener('click', function (e) {
    e.preventDefault()
    customUISelect.clickSelected(e)
    // displayRegion(UIselect.textContent);
  })
  // adding each option to the select items div
  customUISelect.UIselectItems.appendChild(selectOptions);
}

customUISelect.customDiv.appendChild(customUISelect.UIselectItems);

UIselectedOption.addEventListener('click', function(e) {
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
})


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
