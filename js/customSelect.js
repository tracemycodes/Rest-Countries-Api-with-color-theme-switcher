class CustomSelectUI {
  constructor(customDiv, selectEl) {
    this.UIselectedOption;
    this.UIselectItems;
    // this.selectOption;
    this.customDiv = customDiv;
    this.selectEl = selectEl;
  }
  appendSelectedDiv(UIselectedOption) {
    this.UIselectedOption = UIselectedOption
    this.UIselectedOption.classList.add('select-selected');
    this.UIselectedOption.innerHTML = this.selectEl.options[this.selectEl.selectedIndex].innerHTML;

    this.customDiv.appendChild(this.UIselectedOption);
  }
  appendSelectOptions(UIselectItems) {
    this.UIselectItems = UIselectItems;
    this.UIselectItems.setAttribute("class", "select-items select-hide");
  }
  clickSelected(e) {
    let sameSelected = [];
  
    let allOptions = [...this.selectEl.children]
    // console.log(allOptions);
    allOptions.forEach((option, index) => {
      // console.log(option, index, e.target);

      if (option.innerHTML == e.target.innerHTML) {
        this.selectEl.selectedIndex = index;
        this.UIselectedOption.innerHTML = e.target.innerHTML;
        sameSelected = e.target.parentNode.querySelectorAll(".same-as-selected");
      }
      // console.log(sameSelected);
      sameSelected.forEach(item => {
        item.classList.remove('same-as-selected')
      })
      e.target.classList.add('same-as-selected')



    });
    this.UIselectedOption.click()
  }
  
}