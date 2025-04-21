AFRAME.registerComponent("aro-detected", {
  schema: {
    point: { type: "number", default: 0 }
  },

  init: function () {
    this.bird = document.querySelector("#esfera");
    this.puntosUI = document.querySelector("#puntos");
    this.resetButtom = document.querySelector("#reset-container button");
    this.puntos = 0;
    this.vidas = 3;
    this.atravesados = new Set();
    this.gameActive = true;
    this.gameState = "server"
    this.resetButtom.addEventListener(`click`,()=>this.resetUI());
    this.tick = AFRAME.utils.throttleTick(this.detectarPaso, 300, this);
    this.resetButtom.addEventListener('click', this.resetUI.bind(this));
    this.resetButtom.style.display = 'none';
  },

  detectarPaso: function () {
    if (!this.gameActive) return;
    if (this.gameState!=="player") return; 
      
    const birdPos = new THREE.Vector3();
    this.bird.object3D.getWorldPosition(birdPos);

    const aros = document.querySelectorAll(".aro");

    aros.forEach((aro, index) => {
      const aroPos = new THREE.Vector3();
      aro.object3D.getWorldPosition(aroPos);

      const distanciaX = Math.abs(birdPos.x - aroPos.x);
      const distanciaYZ = Math.sqrt(
        (birdPos.y - aroPos.y) ** 2 + (birdPos.z - aroPos.z) ** 2
      );

      const pasoCentro = distanciaX < 1.5 && distanciaYZ < 1.2;
      const fallo = distanciaX < 1.5 && distanciaYZ >= 1.2 && distanciaYZ < 4;

      if (pasoCentro && !this.atravesados.has(index)) {
        this.puntos++;
        this.atravesados.add(index);
        aro.emit('punto-ganado');
        this.actualizarUI();
      }

      if (fallo && !this.atravesados.has(index)) {
        this.vidas--;
        this.atravesados.add(index);
        aro.emit('vida-perdida');
        this.actualizarUI();
      }
    });
  },

  actualizarUI: function () {
    this.puntosUI.textContent = `PUNTOS: ${this.puntos} | VIDAS: ${this.vidas}`;

    if (this.vidas <= 0) {
      this.puntosUI.textContent += " | GAME OVER";
      this.bird.setAttribute("dynamic-body", "mass", 0);
      this.gameActive = false;
      this.gameState = "player";
      this.resetButtom.style.display = 'block';
    }
  },

  resetUI: function () {
    this.puntos = 0;
    this.vidas = 3;
    this.atravesados.clear();
    this.gameActive = true;
    this.gameState = "server";
    
    this.bird.setAttribute('dynamic-body', 'mass', 1);
    this.bird.setAttribute('position', '-3 5 0');
    
    document.querySelectorAll('.aro').forEach(aro => aro.remove());
   
    this.actualizarUI();
    this.resetButtom.style.display = 'none';
  },

  startGame: function (){
    this.gameState = "player";
    this.vidas = 3;
    this.puntos = 0;
    this.bird.setAttribute('dynamic-body', 'mass', 1);
    this.bird.setAttribute('position', '-3 5 0');
    this.actualizarUI();
    this.resetButtom.style.display = 'none';
  },
  remove: function() {
    this.resetButtom.removeEventListener('click', this.resetUI);
  },

});