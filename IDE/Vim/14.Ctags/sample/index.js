import { isMatch } from "./modules/match_reverse.js";

let reInitSearchIndex = (currentIndex, pattern_len) => {
  return {
    start: currentIndex.end + 1,
    end: currentIndex.end + pattern_len
  };
};

var reverseStringSplit = (originArr) => {
    let counters = [];
    let answer = 0;
    // let originArr = s.split();
    
    let index = 0;
    let i = 0;
    
    while( i < originArr.length){
         let counter = 0;
         let currentIndex = {
           start: i,
           end: i
         };
         let searchIndex = reInitSearchIndex(currentIndex, 1);
      
         while( currentIndex.end < originArr.length ){
           
           let pattern = originArr.substr(currentIndex.start, currentIndex.end - currentIndex.start + 1);
           let patternToCompare = originArr.substr(searchIndex.start, searchIndex.end - searchIndex.start + 1);
           
           var isMatchFlag = isMatch(pattern, patternToCompare)
           console.log('pattern','patternToCompare', pattern, patternToCompare, isMatchFlag);
           
           if( isMatchFlag ){
             counter++;
             currentIndex = {
               start: searchIndex.end + 1,
               end: searchIndex.end + 1
             };
           } else if(searchIndex.end < originArr.length){
             currentIndex.end +=1;
           } else {
             currentIndex.start ++;
             currentIndex.end = currentIndex.start;
           }
   
           searchIndex = reInitSearchIndex(currentIndex, currentIndex.end - currentIndex.start + 1);
         }
      
         console.log(`---- Match number = ${counter} ----`);
         counters.push(counter);
         i++;
    }
    
    console.log('counters',Sample counters);
    return Math.max(...counters);
};

// Test..
console.log(reverseStringSplit("LRLRLR"));
