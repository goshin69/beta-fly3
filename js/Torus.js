 // Componente para generar los aros
 AFRAME.registerComponent("base", {
  schema: {
    radius: { type: "number", default: 3 },
    tube: { type: "number", default: 1 },
    rotation: { type: "vec3", default: { x: 0, y: -90, z: 0 } },
    gap: { type: "number", default: 10 }
  },

  init: function () {
    for (let i = 0; i < 20; i++) {
      const ring = document.createElement("a-entity");
      ring.setAttribute("geometry", {
        primitive: "torus",
        radius: this.data.radius,
        tube: this.data.tube
      });
      ring.setAttribute("material", { color: "#1779aa" });
      ring.setAttribute("rotation", this.data.rotation);
      ring.setAttribute("position", { x: i * this.data.gap, y: 15, z: 0 });
      ring.classList.add("aro");
      this.el.sceneEl.appendChild(ring);
    }
  }
});