   // Componente para moverse con teclado
   AFRAME.registerComponent("jetpack-controls", {
    init: function () {
      const el = this.el;

      window.addEventListener("keydown", (e) => {
        if (!el.body) return;
        const v = el.body.velocity;

        switch (e.code) {
          case "Space": el.body.velocity.set(v.x, 5, v.z); break;
          case "KeyW": el.body.velocity.set(v.x, v.y, -3); break;
          
          case "KeyA": el.body.velocity.set(-3, v.y, v.z); break;
          case "KeyD": el.body.velocity.set(3, v.y, v.z); break;
        }
      });

      window.addEventListener("keyup", (e) => {
        if (!el.body) return;
        const v = el.body.velocity;

        switch (e.code) {
          case "KeyW":
            el.body.velocity.set(v.x, v.y, 0);
            break;
          case "KeyA":
          case "KeyD":
            el.body.velocity.set(0, v.y, v.z);
            break;
        }
      });
    }
  });