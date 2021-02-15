var camera = document.getElementById('camera'); // video
var change = document.getElementById('switch'); // Camera Change
var change_camera = 2;
var msg = document.getElementById('msg'); // QRCode Value;
var check_facing = document.getElementById('check_facing');

let scanner = new Instascan.Scanner({video: camera});
scanner.addListener('scan', (content)=>{
    var scan_text = encodeURI(content);
    var decode_text = decodeURI(scan_text);
    alert("<a hreaf='"+decode_text+"'>"+msg+"</a>");
    $('#msg').text(decode_text);
})
//scan

check_facing.innerText = "후면";
$('#switch').on('click', ()=>{
    stopCamera();
    if(change_camera != 2){
        change_camera = 2;
        check_facing.innerText = "후면";
    }else{
        check_facing.innerText = "전면";
        change_camera = 0;

    }
    console.log(change_camera);
    scan();
})
function stopCamera() { // mode를 변경하는 버튼을 누르면 정지 시키고
    camera.srcObject && camera.srcObject.getTracks().forEach((t) => t.stop());
}


scan();
function scan(){
    alert("<a hreaf='"+decode_text+"'>"+msg+"</a>");
Instascan.Camera.getCameras().then(function(cameras){ //카메라 키기.
if(cameras.length > 0){
    scanner.start(cameras[change_camera]);
}else{
    console.error('No cameras found');
}
}).catch(function(e){
console.error(e);
});
}
