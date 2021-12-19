const loader = new PIXI.Loader();
var sprites = {};
var app;


async function loadResources() {
    app = new PIXI.Application();
    app.renderer.backgroundColor = 0x070927;
    app.view.style.width = "100%";
    app.view.style.height = "100%";
    document.getElementById("page-container").appendChild(app.view);
    app.stop();

    var background = await new PIXI.Sprite.from("snowfall.webm");
    background.width = app.renderer.width * 1.1;
    background.height = app.renderer.height;
    background.anchor.x = 0;
    background.anchor.y = 0;
    background.position.x = app.renderer.width * -0.1;
    background.position.y = 0;
    background.alpha = 0.5;
    background.texture.baseTexture.resource.source.muted = true;
    background.texture.baseTexture.resource.source.loop = true;
    sprites.background = background;

    var transition = await new PIXI.Sprite.from("transition.webm");
    transition.width = app.renderer.width * 1.1;
    transition.height = app.renderer.height * 1.1;
    transition.anchor.x = 0;
    transition.anchor.y = 0;
    transition.position.x = app.renderer.width * -0.05;
    transition.position.y = app.renderer.height * -0.05;
    transition.texture.baseTexture.resource.source.muted = true;
    background.texture.baseTexture.resource.source.loop = true;
    sprites.transition = transition;

    var footer = await new PIXI.Sprite.from("footer.webp");
    footer.width = app.renderer.width;
    footer.height = app.renderer.height * 0.25;
    footer.anchor.x = 0;
    footer.anchor.y = 1;
    footer.position.x = 0;
    footer.position.y = app.renderer.height;
    sprites.footer = footer;

    app.start();
    loadSplashScreen();
}


function loadSplashScreen() {
    document.getElementById("splash-screen").style.display = "block";
    document.getElementById("home-screen").style.display = "none";
    app.stage.addChild(sprites.background);
    app.stage.addChild(sprites.footer);
}


function doTransition() {
    sprites.transition.texture.baseTexture.resource.source.currentTime = 0;
    transition_controller = sprites.transition.texture.baseTexture.resource.source;
    transition_controller.addEventListener('timeupdate', checkVideoTime);
    transition_controller.addEventListener('ended', endTransition);
    app.stage.addChild(sprites.transition);
    transition_controller.play();
}


function checkVideoTime() {
    console.log(transition_controller.currentTime);
    transition_controller = sprites.transition.texture.baseTexture.resource.source;
    if (transition_controller.currentTime >= 0.75) {
        document.getElementById("splash-screen").style.display = "none";
        app.stage.removeChild(sprites.background);
        app.stage.removeChild(sprites.footer);
    }
}


function endTransition() {
    console.log("ended");
    transition_controller = sprites.transition.texture.baseTexture.resource.source;
    transition_controller.removeEventListener('ended', endTransition);
    app.stage.removeChild(sprites.transition);
    document.getElementById("page-container").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
}
