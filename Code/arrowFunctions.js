function myFunc() {
  this.myVar = 0
  var that = this; // that = this trick
  setTimeout(
    function () { // A new *this* is created in this function scope
      that.myVar++;
      console.log(that.myVar) // 1
      
      console.log(this.myVar) // undefined 
    }, 0);
}

function myFunc() {
  this.myVar = 0;
  setTimeout(
    () => { // this is taken from surrounding, meaning myFunc here
      this.myVar++;
      console.log(this.myVar) // 1
    }, 0);
}
