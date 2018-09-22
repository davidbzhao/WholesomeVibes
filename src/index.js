import { Stitch } from 'mongodb-stitch-browser-sdk'
 
function initializeAndLogin() {
  const client = Stitch.initializeDefaultAppClient('remhek-zuloy');
  client.callFunction("testFunction", ["Hello world!"]).then(echoedResult => {
    document.getElementsByTagName("body")[0].innerHTML = `<p>Echoed result: ${echoedResult.arg}</p>`;
  });
}

window.onload = initializeAndLogin;