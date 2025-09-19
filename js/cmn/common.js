$(document).ready(function () {
  /* 탭 */
  $(".tab-list li").on({
    click: function () {
      $(this).addClass("active").siblings("li").removeClass("active");
      $(this)
        .closest(".tab-wrap")
        .find(".tab-cont")
        .eq($(this).index())
        .addClass("active")
        .siblings(".tab-cont")
        .removeClass("active");
    },
  });

  initSelect();
});

// 다른 영역 클릭 시 select 박스 닫기
document.addEventListener("click", function (e) {
  closeAllSelect(null);
});

function delSelect() {
  var delElmntSelected, delElmntItems;
  delElmntSelected = document.getElementsByClassName("select-selected");

  delElmntItems = document.getElementsByClassName("select-items");
  for (var j = delElmntSelected.length - 1; j > -1; j--) {
    delElmntSelected[j].remove();
  }
  for (var j = delElmntItems.length - 1; j > -1; j--) {
    delElmntItems[j].remove();
  }
}

function closeAllSelect(elmnt) {
  // 모든 select-items 요소를 가져옵니다.
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");

  for (i = 0; i < y.length; i++) {
    // 클릭된 요소와 같은 select-selected 요소가 아닌 경우
    if (elmnt === y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }

  for (i = 0; i < x.length; i++) {
    // 클릭된 요소와 같은 select-items 요소가 아닌 경우
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* 커스텀 콤보박스 */
function initSelect() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "select" or "figma-select":*/
  var selectElements = document.getElementsByClassName("select");
  var figmaSelectElements = document.getElementsByClassName("figma-select");
  x = Array.from(selectElements).concat(Array.from(figmaSelectElements));
  l = x.length;

  delSelect();
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    if (
      selElmnt &&
      selElmnt.options &&
      selElmnt.options[selElmnt.selectedIndex]
    ) {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    } else {
      a.innerHTML = "";
    }
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      /*for each option in the original select element,
          create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
                and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;

            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }

        // select 요소의 change 이벤트 트리거
        var event = new Event("change", { bubbles: true, cancelable: true });
        s.dispatchEvent(event);
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/

      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

/* 특정 콤보 박스 컨트롤 */
function setSelect(target) {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementById(target).parentNode;
  x.getElementsByClassName("select-selected")[0].remove();
  x.getElementsByClassName("select-items")[0].remove();

  selElmnt = x.getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x.appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
            and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      // select 요소의 change 이벤트 트리거
      var event = new Event("change", { bubbles: true, cancelable: true });
      s.dispatchEvent(event);

      h.click();
    });
    b.appendChild(c);
  }
  x.appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
