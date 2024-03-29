const { createDevice } = RNBO;
let context;
let socket = io();
let el;
let videoEl;
let buttonEl;
let vFiles = ['video/vid0.mp4', 'video/vid1.mp4', 'video/vid2.mp4', 'video/vid3.mp4', 'video/vid4.mp4', 'video/vid5.mp4', 'video/vid6.mp4', 'video/vid7.mp4', 'video/vid8.mp4', 'video/vid9.mp4', 'video/vid10.mp4', 'video/vid11.mp4', 'video/vid12.mp4', 'video/vid13.mp4', 'video/vid14.mp4', 'video/vid15.mp4', 'video/vid16.mp4', 'video/vid17.mp4', 'video/vid18.mp4', 'video/vid19.mp4', 'video/vid20.mp4', 'video/vid21.mp4', 'video/vid22.mp4', 'video/vid23.mp4', 'video/vid24.mp4', 'video/vid25.mp4', 'video/vid26.mp4', 'video/vid27.mp4', 'video/vid28.mp4', 'video/vid29.mp4', 'video/vid30.mp4', 'video/vid31.mp4', 'video/vid32.mp4', 'video/vid33.mp4', 'video/vid34.mp4', 'video/vid35.mp4', 'video/vid37.mp4', 'video/vid38.mp4', 'video/vid39.mp4', 'video/vid40.mp4', 'video/vid41.mp4', 'video/vid42.mp4', 'video/vid43.mp4', 'video/vid44.mp4', 'video/vid45.mp4', 'video/vid46.mp4', 'video/vid47.mp4', 'video/vid48.mp4', 'video/vid49.mp4', 'video/vid50.mp4', 'video/vid51.mp4', 'video/vid52.mp4', 'video/vid53.mp4', 'video/vid54.mp4'];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const min = 0;
const max = window.innerWidth - 420;

// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
socket.on('response', (controller) => {
  el = document.getElementById('user-state');
  el.innerHTML = 'someone changed the video ' + new Date().toTimeString();
  farocki();
});

socket.on('disconnected', (lefty) => {
  el = document.getElementById('user-state');
  el.innerHTML = lefty;
});

socket.on('connecty', (joiny) => {
  el = document.getElementById('user-state');
  el.innerHTML = joiny + new Date().toTimeString();
});

socket.on('numUsers', (joiny) => {
  el = document.getElementById('numUsers');
  if (joiny > 1) {
    el.innerHTML = 'there are ' + joiny + ' users online';
  } else {
    el.innerHTML = 'you are the only person here, send someone the link to join the party...';
  }  
});

socket.on('time', (haha) => {
  console.log(haha);
});




function farocki() {
  videoEl = document.getElementById('lumi');
  buttonEl = document.getElementById('buttonText');
  //let rotation = Math.random() * 360 - 90;
  //videoEl.style.transform = "rotate("+ rotation+"deg)";
  //videoEl.style.left = clamp((Math.random() * window.innerWidth), min, max) +'px';
  //videoEl.style.top = (Math.random() * window.innerHeight - 300) +'px';
  videoEl.src =  vFiles[getRandomInt(vFiles.length)];
  videoEl.playbackRate = Math.random(); 
  videoEl.play();   
}

function gesture(){
  socket.emit("controller", "gesture");
  videoEl.muted = false;
  context.resume();
}

function stop(){
  videoEl = document.getElementById('lumi');
  videoEl.pause();
  videoEl.src=null;
}

async function setup() {
    const WAContext = window.AudioContext || window.webkitAudioContext;
    context = new WAContext();
    // Create gain node and connect it to audio output
    const outputNode = context.createGain();
    outputNode.connect(context.destination);
    // Fetch the exported patchers
    let response = await fetch("rnbo.filterdelay.json");
    const delayPatcher = await response.json();
    response = await fetch("rnbo.platereverb.json");
    const reverbPatcher = await response.json();
    // Create the devices
    const delayDevice = await createDevice({ context, patcher: delayPatcher });
    const reverbDevice = await createDevice({ context, patcher: reverbPatcher });
    videoEl = document.getElementById('lumi');
    const source = context.createMediaElementSource(videoEl);
    // Connect the devices in series
    source.connect(delayDevice.node);
    delayDevice.node.connect(reverbDevice.node);
    reverbDevice.node.connect(outputNode);
}
setup();