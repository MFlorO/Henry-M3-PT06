

function sumArray(array,num){
    if(!Array.isArray(array)) throw new TypeError("array")
    if(typeof num !== "number") throw new TypeError("num")
    for(var i = 0; i<array.lenght; i++){
      for(var j = i + 1; j<array.lenght; j++){
        if(array[i] + array[j] === num ) return true;
      }
    }
    return false
  }

  module.exports = sumArray