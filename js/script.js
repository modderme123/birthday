import "zenscroll";
import { regl } from "./canvas";
import * as config from "./config";
import { fullscreen, update, display, drawLogo, createSplat } from "./shaders";

regl.frame(() => {
    fullscreen(() => {
        if (window.scrollY < window.innerHeight / 2) drawLogo(1.0 - config.DENSITY_DISSIPATION);
        if (pointer.moved) {
            createSplat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color, config.SPLAT_RADIUS);
            pointer.moved = false;
        }
        update(config);
        display();
    });
});

let pointer = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    moved: false,
    color: [Math.random() + 0.05, Math.random() + 0.05, Math.random() + 0.05]
};
document.addEventListener("mousemove", e => {
    pointer.moved = true;
    pointer.dx = (e.clientX - pointer.x) * 10;
    pointer.dy = (e.clientY - pointer.y) * 10;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
});
document.addEventListener("mousedown", () => {
    pointer.color = [Math.random() + 0.05, Math.random() + 0.05, Math.random() + 0.05];
});
