var camera = document.getElementById('camera'); // video
var change = document.getElementById('switch'); // Camera Change
var change_count = 0;
var msg = document.getElementById('msg2'); // QRCode Value;

let scanner = new Instascan.Scanner({video: camera});
scanner.addListener('scan', (content)=>{
    $('#msg2').text(content);
    console.log('nice');
})
//scan

$('#switch').on('click', ()=>{
    stopCamera();
    if(change_count != 2){
        change_count = 2;
    }else{
        change_count = 0;
    }
    // `${mode === "user" ? "environment" : "user"}`;
    console.log(change_count);
    alert('hiih');
    test();
})
function stopCamera() { // mode를 변경하는 버튼을 누르면 정지 시키고
    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
}


test();
function test(){
Instascan.Camera.getCameras().then(function(cameras){ //카메라 키기.
if(cameras.length > 0){
    scanner.start(cameras[change_count]);
    console.log('aa');
}else{
    console.error('No cameras found');
}
}).catch(function(e){
console.error(e);
});
}
