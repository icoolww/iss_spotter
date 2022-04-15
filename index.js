const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');



fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    console.log('It worked! Returned IP:' , ip);
  }
});

const coordinate = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(coordinate, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  } else {
    console.log('It worked! Returned flyover times:' , passTimes);
  }
});


// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , coordinates);
// });



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});





