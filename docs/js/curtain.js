
var i = 0;
class WEBGL {

    constructor(set) {
      this.webGLCurtain = new Curtains(set.canvas);
      this.planeElement = set.planeElement;
      this.texture = {
        current: "",
        next: ""
      };

      this.params = {
        vertexShader: document.getElementById("vs").textContent, // our vertex shader ID
        fragmentShader: document.getElementById("fs").textContent, // our framgent shader ID
        widthSegments: 40,
        heightSegments: 40, // we now have 40*40*6 = 9600 vertices !
        uniforms: {
          time: {
            name: "uTime", // uniform name that will be passed to our shaders
            type: "1f", // this means our uniform is a float
            value: 0
          },
          brightness: {
            name: "uBrightness",
            type: "1f",
            value: 1
          }
        },
        watchScroll: false
      };
    }
  
    initPlane(time) {
      // create our plane mesh
      this.plane = this.webGLCurtain.addPlane(this.planeElement, this.params);
      // use the onRender method of our plane fired at each requestAnimationFrame call
  
      if (this.plane) {
        this.plane.onReady(() => {
          this.texture.current = this.plane.createTexture("textureActive");
          this.plane.alwaysDraw = true
          this.texture.current.setSource(this.plane.images[0]);
          this.update(time);
        });
      }
    }
  
    update(time) {
      this.plane.onRender((e) => {
        i++;
        if (i < time){
            this.plane.updatePosition()
            this.plane.uniforms.time.value += 0.01; // update our time uniform value
        }
        else {
          this.webGLCurtain.disableDrawing()
          this.plane.onLeaveView()
            
        }
      });
    }
  }
  

  