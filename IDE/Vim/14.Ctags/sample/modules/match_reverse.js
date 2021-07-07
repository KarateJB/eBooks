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

var isNotMatch = (pattern, patternToCompare) => {    
  if( pattern.length !== patternToCompare.length)
    return true;
  else {
    patternToCompare = patternToCompare.split('').map(x => {
      return x === LEFT ? RIGHT : LEFT;
    }).join('');
    return patternToCompare === pattern ? false : true;
  }
};

export { isMatch, isNotMatch };
