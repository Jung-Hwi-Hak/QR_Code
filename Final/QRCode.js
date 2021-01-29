const camera = document.getElementById("preview");
let scanner = new Instascan.Scanner({video: camera});
let mode = "user";
var qrcode = new QRCode('qrcode');


$('#data').keydown(function(e){ // qrcode값 입력 부분에서 엔터를 치면 현재 text부분을 값으로 qrcode생성하는 makeCode함수 동작.
    if(e.keyCode == 13){
        makeCode();
    }
})

function makeCode(){ //qrcode 생성.
    var input = document.getElementById('data');
    qrcode.makeCode(input.value); // text에 적은 값 data를 가져와 input에 넣고 그 값을 qrcode value로 넣음.
}



// 동작 페이지 이동 버튼.
$('#btn1').click(function(){ 
    $('#main').animate({'left':'0%'});
    $('#btn1').addClass('active');
    $('#btn2').removeClass('active');
})
$('#btn2').click(function(){
    $('#main').animate({'left':'-100%'});
    $('#btn2').addClass('active');
    $('#btn1').removeClass('active');
}) // end

//scanner 동작
scanner.scan(function(content){
    $('#msg2').text(content);
})


//$('#startbtn').on('click',function(){
    capture(mode); // capture함수 동작.
//})

function capture(mode) {

//     navigator.mediaDevices
//         .getUserMedia({
//             audio: false,
//             video: {
//                 facingMode: mode, // mode 값에 따라 video 촬영 위치 변경.
//             },
//         })
//         .then((stream) => { // stream 시작.
//             camera.srcObject = stream;
//         });
     Instascan.Camera.getCameras().then(function(cameras){ //카메라 켜기.
        if(cameras.length > 0){ // 카메라가 있으면.
            scanner.start(cameras[0]); // 첫번째 카메라 켜기.
            navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: mode, // mode 값에 따라 video 촬영 위치 변경.
            },
        })
        .then((stream) => { // stream 시작.
            camera.srcObject = stream;
        });
        }else{
            console.error('No cameras found'); // 카메라가 없으'면 error 
        }
    }).catch(function(e){
        console.error(e);
    });
}

function stopCamera() { // mode를 변경하는 버튼을 누르면 정지 시키고
    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
}

document.getElementById("switch").addEventListener("click", () => {
    stopCamera();
    mode = `${mode === "user" ? "environment" : "user"}`;
    console.log(mode);
    capture(mode);
});
