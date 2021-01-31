const camera = document.getElementById("camera");
let mode = "user";

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

function stopCamera() {
    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
}

capture(mode);


document.getElementById("switch").addEventListener("click", () => { //카메라 전환
    stopCamera();
    mode = `${mode === "user" ? "environment" : "user"}`;
    capture(mode);
});


//scan
let scanner = new Instascan.Scanner({video: document.getElementById('camera')}); //scan이 출력되는 구간 .
scanner.addListener('scan',function(content){ // 스캔을 통한 값 content를 #msg2에 입력.,
$('#msg2').text(content);
});

// Instascan.Camera.getCameras().then(function(cameras){ //카메라 키기.
// if(cameras.length > 0){
//     scanner.start(cameras[0]);
// }else{
//     console.error('No cameras found');
// }
// }).catch(function(e){
// console.error(e);
// });