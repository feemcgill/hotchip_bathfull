
const shuffleArray = function(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getWindowSize(){
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const data = {
        width: wWidth,
        height: wHeight
    };
    return data;
}

const debounce = function(func){
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func,100,event);
    };
}


const map = function (the_numb, in_min, in_max, out_min, out_max) {
    return (the_numb - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const boxRatio = function(w,h) {
    return w / h;
}



const backgroundSize = function(containerW, containerH, imgW, imgH) {
    let newDims = {
        w: null,
        h: null,
        scale: null
    };
    const imgRatio = imgW / imgH;
    if (containerW / imgRatio < containerH) {
        // Image is 100% wide and shorter than container
        // new dims must be contaier heigh
        newDims.h = containerH;
        newDims.w = containerH * imgRatio;
        console.log('Image is 100% wide and shorter than container')
    } else {
        // Image is 100% wide and taller than container
        newDims.w = containerW;
        newDims.h = containerW / imgRatio;
        console.log('Image is 100% wide and taller than container')
    }
    console.log(containerW, containerH, imgW, imgH)
    newDims.scale = newDims.w / imgW;
    return newDims;    
}

const backgroundContain = function(containerW, containerH, imgW, imgH) {
    let newDims = {
        w: null,
        h: null,
        scale: null
    };
    const imgRatio = imgW / imgH;
    if (containerW / imgRatio < containerH) {
        // Image is 100% wide and shorter than container
        // new dims must be contaier heigh
        // newDims.h = containerH;
        // newDims.w = containerH * imgRatio;
        
        newDims.w = containerW;
        newDims.h = containerW * imgRatio;
    } else {
        // Image is 100% wide and taller than container
        // newDims.w = containerW;
        // newDims.h = containerW / imgRatio;

        newDims.h = containerH
        newDims.w = containerH * imgRatio
    }
    newDims.scale = newDims.w / imgW;
    return newDims;    
}



export {shuffleArray, getWindowSize, debounce, map, boxRatio, backgroundSize, backgroundContain};