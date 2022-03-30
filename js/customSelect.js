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
  clickSelected() {
    
  }
}