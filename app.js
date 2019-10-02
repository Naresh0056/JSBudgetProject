let budgetController = (function() {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  /**
   * @description DataStructure
   */

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem: function(type, des, val) {
      let newItems, ID;
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItems = new Expense(ID, des, val);
      } else {
        newItems = new Income(ID, des, val);
      }
      data.allItems[type].push(newItems);
      return newItems;
    }
  };
})();

let UIController = (function() {
  let domString = {
    type: ".add__type",
    description: ".add__description",
    value: ".add__value",
    addButton: ".add__btn",
    expContainer: ".expenses__list",
    incContainer: ".income__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(domString.type).value,
        description: document.querySelector(domString.description).value,
        value: parseFloat(document.querySelector(domString.value).value)
      };
    },
    addListItem: function(obj, type) {
      let html, newHtml, element;
      if (type === "inc") {
        element = domString.incContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description" >%description%</div ><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = domString.expContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearField: function() {
      let fields, fieldsArr;
      fields = document.querySelectorAll(
        domString.description + "," + domString.value
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((element) => {
        element.value = "";
      });
      fieldsArr[0].focus();
    },
    getDomString: function() {
      return domString;
    }
  };
})();

let controller = (function(budgetCtrl, UIctrl) {
  let setupEventlistener = function() {
    let DOM = UIctrl.getDomString();
    document
      .querySelector(DOM.addButton)
      .addEventListener("click", ctrlAddButton);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddButton();
      }
    });
  };
  let updateBudget = function() {};
  let ctrlAddButton = function() {
    let input = UIctrl.getInput();

    let newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value
    );
    UIctrl.addListItem(newItem, input.type);
    UIctrl.clearField();
    updateBudget();
  };
  return {
    init: function() {
      console.log("App Started");
      setupEventlistener();
    }
  };
})(budgetController, UIController);
controller.init();

// lec 13 to continue
