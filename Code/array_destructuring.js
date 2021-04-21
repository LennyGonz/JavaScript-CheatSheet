function data(){
  return [1,2,3,4,5];
}

var tmp = data();
var first = tmp[0];
var second = tmp[1] !== undefined ? tmp[1] : 10;
var third = tmp[2];
var fourth = tmp.slice(3);

function data2(){
  return [1,2,3,4,5,6]
}

var temp;

var [
  first,
  second = 10,
  third,
  ...fourth // we can use the spread operator to gather everything else up in an array called fourth
] = temp = data2(); // the square bracket is our pattern b/c it's on the left hand side of the equal sign

console.log(temp);

array = [1, [2, 3], 4]

function ajaxOptions({
  url = "http://some.base.url/api",
  method = "post",
  data,
  callback,
  headers: {
    headers0 = "Content-Type: text/plain",
    ...otherHeaders
   } = {}
} = {}) {
  return {
    url, method, data, callback,
    headers: {
      headers0,
      ...otherHeaders
    }
  }
}
