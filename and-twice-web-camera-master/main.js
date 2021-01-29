//const canvas = document.getElementById("canvas");
//const ctx = canvas.getContext("2d");
const camera = document.getElementById("camera");
let mode = "user";
//let capturing = false;

capture(mode);

function capture(mode) {
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                facingMode: mode,
            },
        })
        .then((stream) => {
            camera.srcObject = stream;
        });
}

//function stopCamera() {
//    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
//}


document.getElementById("switch").addEventListener("click", () => {
    //stopCamera();
    mode = `${mode === "user" ? "environment" : "user"}`;
    capture(mode);
});
