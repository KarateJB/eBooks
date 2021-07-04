const LEFT = 'L';
const RIGHT = 'R';

var isMatch = (pattern, patternToCompare) => {    
  if( pattern.length !== patternToCompare.length)
    return false;
  else {
    patternToCompare = patternToCompare.split('').map(x => {
      return x === LEFT ? RIGHT : LEFT;
    }).join('');
    return patternToCompare === pattern ? true : false;
  }
};

export { isMatch };