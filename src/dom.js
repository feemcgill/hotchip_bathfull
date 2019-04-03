const uiFrames = document.getElementsByClassName('ui-frame');
 
window.openFrame = function(event, frame){
  event.preventDefault()
  closeFrames()
  const theFrame = document.getElementById(frame)
  theFrame.classList.add('show')
}


window.closeFrames = function() {
  for (let i = 0; i < uiFrames.length; i++) {
    const e = uiFrames[i];
    if (e.classList.contains('show')) {
      e.classList.remove('show')
    }
  }
}

// Add close buttons
const infoScreens = document.getElementsByTagName('article')

for (let i = 0; i < infoScreens.length; i++) {
  const screen = infoScreens[i];
  const closeLink = document.createElement('A')
  const linkText = document.createTextNode('Close')
  closeLink.appendChild(linkText)
  closeLink.classList.add('close-frame-link')
  closeLink.addEventListener('click', function (e) {
    e.preventDefault()
    closeFrames()
  });
  screen.appendChild(closeLink)
}
