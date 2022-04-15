/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) => {

    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      // console.log("Error: ", error.message);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body); // convert into actual object
    return callback(null, data.ip);
  });
  
};

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  // request(`https://freegeoip.app/json/invalidIPHere`, (error, response, body) => {

    if (error) {
      callback(error, null);
      // console.log("Error: ", error.message);
      return;
      // if non-200 status, assume server error
        
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
        
    } else {
      const latitude = JSON.parse(body).latitude;
      const longitude = JSON.parse(body).longitude;
      // console.log("latitude:", latitude);
      // console.log("longitude:", longitude);
      return callback(null, { latitude, longitude });
    }
      
  });
    
};
  

const fetchISSFlyOverTimes = function(coords, callback) {

  const link = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
    
  request(link, (error, response, body) => {

    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      // console.log("Error: ", error.message);
      return;
    }
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const data = JSON.parse(body); // convert into actual object
    return callback(null, data);
  });
    
};


const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    } else {
      console.log('It worked! Returned IP:' , ip);
    }

    const coordinate = { latitude: '49.27670', longitude: '-123.13000' };

    fetchISSFlyOverTimes(coordinate, (error, passTimes) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      } else {
        console.log('It worked! Returned flyover times:' , passTimes);
      }

      fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        } else {
          console.log('It worked! Returned coordinates:' , coordinates);
        }

          console.log(passTimes);
          // success, print out the deets!
        });
      });
    });
  }

  
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
  
// console.log(error);
// console.log(response.statusCode);
// console.log(response.statusMessage);
// console.log(typeof data);
  
// if (data.length === 0) {
//   console.log("Sorry, can not display the breed information");
// }
    
    
// error can be set if invalid domain, user is offline, etc.
// const latitude = JSON.parse(body).latitude;
// const longitude = JSON.parse(body).longitude;
// console.log("latitude:", latitude);
// console.log("longitude:", longitude);
// return callback(null, { latitude, longitude });
    
    
    
    