var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;
// console.log(dataset);
// console.log(dataset.bankBalances)
let info = dataset.bankBalances;
const highAmount = info.filter(item => {
  return item.amount > 100000;
})
// console.log(highAmount);
hundredThousandairs = highAmount;

console.log("checkem", info);
console.log("*****************")
console.log("*****************")
console.log("*****************")

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;
const roundObj = info.map(item => {
  let rounder = 0;
  if (item.amount < (Math.floor(item.amount) + 0.5)) {
    rounder = Math.floor(item.amount);
  } else {
    rounder = Math.ceil(item.amount);
  }
  return {
    "amount": item.amount,
    "state": item.state,
    "rounded": rounder
  }
})
// console.log("test", roundObj);
datasetWithRoundedDollar = roundObj;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;
const roundDime = info.map(item => {
  let tenth = 0;
  if (item.amount*10 < Math.floor(item.amount*10) + 0.5) {
    tenth = Math.floor(item.amount*10)/10;
  } else {
    tenth = Math.ceil(item.amount*10)/10;
  }
  return {
    "amount": item.amount,
    "state": item.state,
    "roundedDime": tenth
  }
})
// console.log("test", roundDime);
datasetWithRoundedDime = roundDime;

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
const addEmUp = info.reduce((item, add) => {
    return Math.round((item + Number(add.amount))*100)/100;
},0);
sumOfBankBalances = addEmUp;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;
const statesInterest = info.filter(item => {
  if (item.state === "WI" || item.state === "IL" || item.state === "WY" || item.state === "OH" || item.state === "GA" || item.state === "DE") {
    return Math.round(item.amount*.189*100)/100;
  }
}).reduce((item, add) => {
  return Math.round((item + Number(add.amount*.189))*100)/100;
},0) 
// console.log("states", statesInterest);
sumOfInterests = statesInterest;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};
const addStates = info.map(item => {
  if (!stateSums.hasOwnProperty(item.state)) {
    stateSums[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    stateSums[item.state] = (Math.round((stateSums[item.state]+Number(item.amount))*100))/100;
  }
})

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */

var sumOfHighInterests = null;
const stateSum = info.filter(item => {
  if (item.state!=="WI"&&item.state!=="IL"&&item.state!=="WY"&&item.state!=="OH"&&item.state!=="GA"&&item.state!=="DE") {
    return item;
  }
})
let combinedStates = {};
const sumEmUp = stateSum.forEach(item => {
  if (!combinedStates.hasOwnProperty(item.state)) {
    combinedStates[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    combinedStates[item.state] = (Math.round((combinedStates[item.state]+Number(item.amount))*100))/100;
  }
})
let plsWork = Object.values(combinedStates);
let moreThan50k = [];
const endProduct = plsWork.forEach(item => {
  if (item*.189 > 50000) {
    moreThan50k.push(item);
  }
})
const plsplsWork = moreThan50k.reduce((item,add) => {
  return (Math.round((item + (Number(add)*.189))*100))/100;
},0)

sumOfHighInterests = plsplsWork;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = [];
let lowerAdd = {};
const lower = info.forEach(item => {
  if (!lowerAdd.hasOwnProperty(item.state)) {
    lowerAdd[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    lowerAdd[item.state] = (Math.round((lowerAdd[item.state] + Number(item.amount))*100))/100;
  }
})
const keyVal = Object.keys(lowerAdd).map(key => {
  return {
    "state": key,
    "amount": lowerAdd[key]
  };
}).filter(item => {
  if (item.amount < 1000000) {
    return item;
  }
}).map(item => {
  return item.state;
})
// console.log("keyVal", keyVal);
lowerSumStates = keyVal;


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;
var higherSumStates = [];
let higherAdd = {};
const higher = info.forEach(item => {
  if (!higherAdd.hasOwnProperty(item.state)) {
    higherAdd[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    higherAdd[item.state] = (Math.round((higherAdd[item.state] + Number(item.amount))*100))/100;
  }
})
const keyValHigh = Object.keys(higherAdd).map(key => {
  return {
    "state": key,
    "amount": higherAdd[key]
  };
}).filter(item => {
  if (item.amount > 1000000) {
    return item;
  }
}).map(item => {
  return item.amount;
}).reduce((item, add) => {
  return Math.round((item + Number(add))*100)/100;
},0)
console.log("keyValHigh", keyValHigh);
// console.log("keyVal", keyVal);
higherStateSums = keyValHigh;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;
const alwaysDese = info.filter(item => {
  if (item.state === "WI" || item.state === "IL" || item.state === "WY" || item.state === "OH" || item.state === "GA" || item.state === "DE") {
    return item;
  }
});
let highMill = {};
const addSumEmUp = alwaysDese.forEach(item => {
  if (!highMill.hasOwnProperty(item.state)) {
    highMill[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    highMill[item.state] = (Math.round((highMill[item.state] + Number(item.amount))*100))/100;
  }
})
const keyValHigher = Object.keys(highMill).map(key => {
  return {
    "state": key,
    "amount": highMill[key]
  }
})
let isIt;
const checkemAgain = keyValHigher.map(item => {
  if (isIt === false) {
    return item;
  } else {
    if (item.amount > 2550000) {
      isIt = true;
      return item;
    } else {
      isIt = false;
      return item;
    }
  }
}).reduce((item,add) => {
  return (Math.round((item + add)*100))/100;
},0)
areStatesInHigherStateSum = isIt;


/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;
const alwaysDese2 = info.filter(item => {
  if (item.state === "WI" || item.state === "IL" || item.state === "WY" || item.state === "OH" || item.state === "GA" || item.state === "DE") {
    return item;
  }
});
let highMill2 = {};
const addSumEmUp2 = alwaysDese2.forEach(item => {
  if (!highMill2.hasOwnProperty(item.state)) {
    highMill2[item.state] = (Math.round(Number(item.amount)*100))/100;
  } else {
    highMill2[item.state] = (Math.round((highMill2[item.state] + Number(item.amount))*100))/100;
  }
})
const keyValHigher2 = Object.keys(highMill2).map(key => {
  return {
    "state": key,
    "amount": highMill2[key]
  }
})
let isIt2;
const checkemAgain2 = keyValHigher2.map(item => {
  if (isIt2 === true) {
    return item;
  } else {
    if (item.amount > 2550000) {
      isIt2 = true;
      return item;
    } else {
      return item;
    }
  }
}).reduce((item,add) => {
  return (Math.round((item + add)*100))/100;
},0)
anyStatesInHigherStateSum = isIt2;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
