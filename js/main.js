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




for (let i = 1; i < element.length; i++) {
  // i created div element for each select option
  selectOption = document.createElement("div");

  // customUISelect.clickSelected(selectOption)
  selectOptions.innerHTML = element.options[i].innerHTML;
  // adding an event listener to  each select option
  selectOptions.addEventListener('click', function (e) {
    e.preventDefault()
    let selectEl = this.parentNode.parentNode.getElementsByTagName("select")[0],
    UIselect = this.parentNode.previousSibling,
    sameSelected;
    // console.log("me");
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
    displayRegion(UIselect.textContent);
  })
  // adding each option to the select items div
  selectItems.appendChild(selectOptions);
}

