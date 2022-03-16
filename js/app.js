let j, l, ll, element, a, b, c;

const x = document.querySelector('.custom-select');

element = document.getElementsByTagName('select')[0];
  
  a = document.createElement("div");
  a.setAttribute("class", "select-selected");
  a.innerHTML = element.options[element.selectedIndex].innerHTML;
  console.log(x)
  x.appendChild(a);

  b = document.createElement('div');
  b.setAttribute("class", "select-items select-hide");

  // console.log(element, x[i])

  for (let i = 1; i < element.length; i++) {
    const selection = element[i];


    c = document.createElement("div");
    c.innerHTML = element.options[i].innerHTML;
    // console.log(selection, element.options[i].innerHTML, c)
    c.addEventListener('click', function (e) {
      e.preventDefault()
      // console.log(this)
      let selectEl = this.parentNode.parentNode.getElementsByTagName("select")[0],
          UIselect = this.parentNode.previousSibling,
          sameSelected;

      for (i = 0; i < selectEl.length; i++) {
          if (selectEl.options[i].innerHTML == this.innerHTML) {
            selectEl.selectedIndex = i;
            UIselect.innerHTML = this.innerHTML;
            sameSelected = this.parentNode.getElementsByClassName("same-as-selected");
            
            for (k = 0; k < sameSelected.length; k++) {
              sameSelected[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
      }
      UIselect.click();
    })
    b.appendChild(c);
  }
  x.appendChild(b);

   a.addEventListener("click", function(e) {
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
