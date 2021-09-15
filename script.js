const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 800;

let satisfactionscalar = 800;
let reductionscalar = 0.7

let Saturation = 1 * satisfactionscalar;
let Happiness = 1 * satisfactionscalar;

let blobGotFed = false; let blobGotLoved = false;
let alive = true;

let gameFramerate = 1500   // 1000 = 1 second
let score = 0; let finalScore;

ctx.font = "60px Verdana";

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------- Mouse Input Detection (not currenty used) ---------------------------------------
//-------------------------------------------------------------------------------------------------------------------
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener('mousedown', function (event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(" MouseX: ", mouse.x, " MouseY: ", mouse.y);
});

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------- Drawing visuals -----------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
window.onload = function()
{
    drawAllSprites();
    var img = document.getElementById("blob");
    ctx.drawImage(img, 600, 280);
    var img = document.getElementById("expression_happy");
    ctx.drawImage(img, 600, 280);
};
function drawAllSprites()
{
    var img = document.getElementById("background");
    ctx.drawImage(img, 0, 0);

    drawProgressMeters();
    drawScore();
};
function redrawcanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllSprites();
    var img = document.getElementById("blob");
    ctx.drawImage(img, 600, 280);
}
function drawProgressMeters()
{
    if (Saturation >= satisfactionscalar){
        Saturation = satisfactionscalar;
    }
    if (Happiness >= satisfactionscalar){
        Happiness = satisfactionscalar;
    }
    if (Saturation <= 0){
        Saturation = 0;
    }
    if (Happiness <= 0){
        Happiness = 0;
    }
    ctx.fillStyle = "#C2A15E";
    ctx.fillRect(60, 60, satisfactionscalar / 2, 60);
    ctx.fillStyle = "#BE7097";
    ctx.fillRect(60, 120, satisfactionscalar / 2, 60);

    ctx.fillStyle = "#ffcc66";
    ctx.fillRect(60, 60, Saturation / 2, 60);
    ctx.fillStyle = "#ff99cc";
    ctx.fillRect(60, 120, Happiness / 2, 60);
}
function drawScore()
{
    ctx.fillStyle = "#936bb7";
    ctx.fillText("score:", 1150, 100);
    ctx.fillText(score, 1350, 100);
    console.log(" Score: ", score);
}

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------- Button Functions ----------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
function pressedBlob()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllSprites();
    var img = document.getElementById("blob_pressed");
    ctx.drawImage(img, 584, 278);
    var img = document.getElementById("expression_booped");
    ctx.drawImage(img, 600, 295);

    Happiness -= 25;

    if (satisfaction < 10)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAllSprites();
        var img = document.getElementById("blob_pressed");
        ctx.drawImage(img, 584, 278);
        var img = document.getElementById("expression_dead");
        ctx.drawImage(img, 600, 295);
    }
    
}
function pressedLoveButton()
{
    if (alive == true)
    {
        console.log("Love Button has been pressed");
        blobGotLoved = true;
        loveTimer();
        redrawcanvas()
        var img = document.getElementById("expression_owo");
        ctx.drawImage(img, 600, 280);
        Happiness += 70; 
    }
}
function loveTimer()
{
    setTimeout(function () {
        blobGotLoved = false;
    },1000)
}
function pressedFoodButton()
{
    if (alive == true)
    {
        console.log("Food Button has been pressed");
        blobGotFed = true;
        fedTimer();
        redrawcanvas()
        var img = document.getElementById("expression_happiest");
        ctx.drawImage(img, 600, 280);
        Saturation += 80;
    }
}
function fedTimer()
{
    setTimeout(function () {
        blobGotFed = false;
    },1000)
}

//-------------------------------------------------------------------------------------------------------------------
//--------------------------------- GAMELOOP -- Called every update -------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
var intervalId = window.setInterval(function () 
{
    if (Saturation >= satisfactionscalar) {
        Saturation = satisfactionscalar;
    }
    if (Happiness >= satisfactionscalar) {
        Happiness = satisfactionscalar;
    }
    if (Saturation <= 1) {
        Saturation = 1;
    }
    if (Happiness <= 1) {
        Happiness = 1;
    }

    if (alive == true) {
        score += 1;
        finalScore = score - 1;
    }
    drawScore()
    
    Saturation -= reductionscalar * 1.02;
    Happiness -= reductionscalar * 0.90;

    console.log(" Saturation: ", Saturation, " Happiness: ", Happiness);
    console.log(" blobGotFed: ", blobGotFed, "blobGotLoved", blobGotLoved);

    satisfaction = (Saturation + Happiness) / 2

    if (satisfaction > satisfactionscalar * 0.8)
    {
        redrawcanvas()
        var img = document.getElementById("expression_happy");
        ctx.drawImage(img, 600, 280);
    }
    if (satisfaction < satisfactionscalar * 0.8)
    {
        redrawcanvas()

        var img = document.getElementById("expression_neutral");
        ctx.drawImage(img, 600, 280);
    }
    if (satisfaction < satisfactionscalar * 0.5)
    {
        redrawcanvas()

        var img = document.getElementById("expression_sad");
        ctx.drawImage(img, 600, 280);
    }
    if (satisfaction < satisfactionscalar * 0.2)
    {
        redrawcanvas()

        var img = document.getElementById("expression_worried");
        ctx.drawImage(img, 600, 280);
    }
    if (satisfaction < satisfactionscalar * 0.001)
    {
        redrawcanvas()

        var img = document.getElementById("expression_dead");
        ctx.drawImage(img, 600, 280);
        alive = false;
    }
}, gameFramerate);