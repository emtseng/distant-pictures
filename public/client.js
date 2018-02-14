/*
client.js

Author: Nikolas Martelaro (nmartelaro@gmail.com)
Extended: David Goeicke (da.goedicke@gmail.com)
Purpose: This run the interactivity and communication for the web app. This file
is served to the users web browser and executes on the browser.

Usage: This file is called automatically when the webpage is served.

//--Addition. Added a button handling for the `Take a picture` button.
*/

// WebSocket connection setup
var socket = io();

// send out LedOn message over socket
function ledON() {
  socket.emit('ledON');
}

// send out ledOFF message over socket
function ledOFF() {
  socket.emit('ledOFF');
}

//-- Addition: Forward the `Take a picture` button-press to the webserver.
function takePicture() {
  socket.emit('takePicture');
}

//-- Addition: This function receives the new image name and applies it to html element.

var ERR = 'err'

socket.on('newPicture', function (msg) {
  document.getElementById('pictureContainer').src = msg.img;

  console.log(msg.palette)
  var palette = msg.palette

  if (palette !== ERR) {
    $('#paletteContainer').empty()
    Object.keys(palette).forEach(key => {
      var swatch = palette[key]
      if (swatch) {
        var square = `<div class='swatch' id='${key}'></div>`
        $('#paletteContainer').append(square)
        $(`#${key}`).css('backgroundColor', `rgb(${swatch._rgb[0]}, ${swatch._rgb[1]}, ${swatch._rgb[2]})`)
      }
    })
  }

});
// read the data from the message that the server sent and change the
// background of the webpage based on the data in the message
socket.on('server-msg', function (msg) {
  msg = msg.toString();
  console.log('msg:', msg);
  switch (msg) {
    case "light":
      $('#left').css('backgroundColor', 'white')
      console.log("white")
      takePicture()
      break;
    case "dark":
      $('#left').css('backgroundColor', 'black')
      console.log("black");
      break;
    default:
      //console.log("something else");
      break;
  }
});
