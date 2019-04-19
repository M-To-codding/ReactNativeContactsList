function Click() {
  this.handlers = [];
}

Click.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn);
  },

  unsubscribe: function () {
    this.handlers = this.handlers.filter(
      function (item) {
        if(item !== fn){
          return item;
        }
      }
    )
  },

  fire: function(o, thisObj) {
    var scope = thisObj || window;
    this.handlers.forEach(function(item) {
      item.call(scope, o);
    });
  }

}