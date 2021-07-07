const LEFT = 'L';
const RIGHT = 'R';

var isMatch = (pattern, patternToCompare) => {    
  if( pattern.length !== patternToCompare.length)
    return false;
  else {
    return patternToCompare === pattern ? true : false;
  }
};

var isNotMatch = (pattern, patternToCompare) => {    
	  if( pattern.length !== patternToCompare.length)
		    return true;
	  else {
		      return patternToCompare === pattern ? false : true;
		    }
};

export { isMatch, isNotMatch };
