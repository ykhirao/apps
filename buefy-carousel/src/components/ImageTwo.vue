<template>
  <div class="img-comp-container">
    <div class="img-comp-img">
      <img
        src="https://picsum.photos/id/1050/1230/500"
        width="300"
        height="200"
      />
    </div>
    <div class="img-comp-img img-comp-overlay">
      <img
        src="https://picsum.photos/id/1000/1230/500"
        width="300"
        height="200"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ImageTwo",
  mounted: function() {
    this.initComparisons();
  },
  methods: {
    initComparisons() {
      var x, i;
      /* Find all elements with an "overlay" class: */
      x = document.getElementsByClassName("img-comp-overlay");
      for (i = 0; i < x.length; i++) {
        /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
        compareImages(x[i]);
      }
      function compareImages(image) {
        var slider,
          img,
          clicked = 0,
          w,
          h;
        /* Get the width and height of the img element */
        w = image.offsetWidth;
        h = image.offsetHeight;
        /* Set the width of the img element to 50%: */
        image.style.width = w / 2 + "px";
        /* Create slider: */
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /* Insert slider */
        image.parentElement.insertBefore(slider, image);
        /* Position the slider in the middle: */
        slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
        slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
        /* Execute a function when the mouse button is pressed: */
        slider.addEventListener("mousedown", slideReady);
        /* And another function when the mouse button is released: */
        window.addEventListener("mouseup", slideFinish);
        /* Or touched (for touch screens: */
        slider.addEventListener("touchstart", slideReady);
        /* And released (for touch screens: */
        window.addEventListener("touchstop", slideFinish);
        function slideReady(e) {
          /* Prevent any other actions that may occur when moving over the image: */
          e.preventDefault();
          /* The slider is now clicked and ready to move: */
          clicked = 1;
          /* Execute a function when the slider is moved: */
          window.addEventListener("mousemove", slideMove);
          window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
          /* The slider is no longer clicked: */
          clicked = 0;
        }
        function slideMove(e) {
          var pos;
          /* If the slider is no longer clicked, exit this function: */
          if (clicked == 0) return false;
          /* Get the cursor's x position: */
          pos = getCursorPos(e);
          /* Prevent the slider from being positioned outside the image: */
          if (pos < 0) pos = 0;
          if (pos > w) pos = w;
          /* Execute a function that will resize the overlay image according to the cursor: */
          slide(pos);
        }
        function getCursorPos(e) {
          var a,
            x = 0;
          e = e || window.event;
          /* Get the x positions of the image: */
          a = img.getBoundingClientRect();
          /* Calculate the cursor's x coordinate, relative to the image: */
          x = e.pageX - a.left;
          /* Consider any page scrolling: */
          x = x - window.pageXOffset;
          return x;
        }
        function slide(x) {
          /* Resize the image: */
          image.style.width = x + "px";
          /* Position the slider: */
          slider.style.left = image.offsetWidth - slider.offsetWidth / 2 + "px";
        }
      }
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.img-comp-container {
  position: relative;
  height: 200px; /*should be the same height as the images*/
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
}

.img-comp-img img {
  display: block;
  vertical-align: middle;
}

.img-comp-slider {
  position: absolute;
  z-index: 9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: #2196f3;
  opacity: 0.7;
  border-radius: 50%;
}
</style>
