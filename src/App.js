import React, {useLayoutEffect, useRef} from 'react';
import * as pc from 'playcanvas';
import logo from './logo.svg';
import './App.css';
const App = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const app = new pc.Application(canvasRef.current, {});
    app.start();

   app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW/2);
   app.setCanvasResolution(pc.RESOLUTION_AUTO);
    
    window.addEventListener('resize', function () {
      app.resizeCanvas();
    });

    const cube = new pc.Entity('cube');
    cube.addComponent('model', {
      type: 'box',
    });

    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
    });

    const light = new pc.Entity('light');
    light.addComponent('light');

    app.root.addChild(cube);
    app.root.addChild(camera);
    app.root.addChild(light);

    camera.setPosition(0, 0, 3);
    light.setEulerAngles(45, 0, 0);

    app.on('update', (deltaTime) => {
      cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
    });

    appRef.current = app;
  }, []);

  return (
    <div>
      <canvas id="playCanvas" ref={canvasRef} />
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React UI Componenet
        </p>
      </header>
    </div>
    </div>
    
  );
};

export default App;
