function sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  if(loop){
      this.sound.loop = true
  }
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

export const musikk = new sound("../lyd/musikk.wav", true)
export const eastereggmusikk = new sound("../lyd/eastereggmusikk.wav", true)
export const lydWin = new sound("../lyd/points.mp3");
export const lydFail = new sound("../lyd/fail.mp3");
export const lydTimeOut = new sound("../lyd/wrong.mp3");