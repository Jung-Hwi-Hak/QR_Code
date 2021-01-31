const camera = document.getElementById("camera");
let mode = "user";

// let test = new Instascan.Camera.getCameras();
let scanner = new Instascan.Scanner({video: document.getElementById("camera")}); //scan이 출력되는 구간 .

scanner.addListener('scan',function(content){ // 스캔을 통한 값 content를 #msg2에 입력.,
$('#msg2').text(content);
console.log(content);
});

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
            console.log('start');
        });
}

function stopCamera() {
    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
    console.log('change_mode');
}

capture(mode);


document.getElementById("switch").addEventListener("click", () => { //카메라 전환
    stopCamera();
    mode = `${mode === "user" ? "environment" : "user"}`;
    capture(mode);
});


//scan
Instascan.Camera.getCameras().then(function(camera){ //카메라 키기.
if(camera.length > 0){
    scanner.start(camera[0]);
}else{
    console.error('No cameras found');
}
}).catch(function(e){
console.error(e);
});
