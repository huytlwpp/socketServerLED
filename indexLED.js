const PORT = 3484;									//�?t d?a ch? Port du?c m? ra d? t?o ra chuong tr�nh m?ng Socket Server
 
var http = require('http') 							//#include thu vi?n http - T�m th�m v? t? kh�a http nodejs tr�n google n?u b?n mu?n t�m hi?u th�m. Nhung theo kinh nghi?m c?a m�nh, Javascript trong m�i tru?ng NodeJS c?c k? r?ng l?n, khi b?n b� th� n�n t�m hi?u kh�ng n�n ng?i d?c v� c? g?ng h?c thu?c h?t c�i reference (T�i li�u tham kh?o) c?a nodejs l�m g�. V? n�o d�!
var socketio = require('socket.io')				//#include thu vi?n socketio
 
var ip = require('ip');
var app = http.createServer();					//#Kh?i t?o m?t chuong tr�nh m?ng (app)
var io = socketio(app);								//#Ph?i kh?i t?o io sau khi t?o app!
app.listen(PORT);										// Cho socket server (chuong tr�nh m?ng) l?ng nghe ? port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 
//Khi c� m?t k?t n?i du?c t?o gi?a Socket Client v� Socket Server
io.on('connection', function(socket) {	
	//h�m console.log gi?ng nhu h�m Serial.println tr�n Arduino
    console.log("Connected"); //In ra m�n h�nh console l� d� c� m?t Socket Client k?t n?i th�nh c�ng.
	
	var led = [true, false] //d?nh nghia m?t m?ng 1 chi?u c� 2 ph?n t?: true, false. M?ng n�y s? du?c g?i di nh?m thay d?i s? s�ng t?t c?a 2 con d�n LED d? v� xanh. D?a v�o c�i d?t ? Arduino m� d�n LEd s? b? b?t ho?c t?t. H�y th? tang ho?t gi?m s? lu?ng bi?n c?a m?ng led n�y xem. V� b?n s? hi?u di?u k? di?u c?a JSON!
	
	//T?o m?t chu k? nhi?m v? s? ch?y l?i sau m?i 200ms
	var interval1 = setInterval(function() {
		//d?o tr?ng th�i c?a m?ng led, d?o cho vui d? ? Arduino n� nh?p nh�y cho vui.
		for (var i = 0; i < led.length; i++) {
			led[i] = !led[i]
		}
		
		//C�i d?t chu?i JSON, t�n bi?n JSON n�y l� json 
		var json = {
			"led": led //c� m?t ph?n t? l� "led", ph?n t? n�y ch?a gi� tr? c?a m?ng led.
		}
		socket.emit('LED', json) //G?i l?nh LED v?i c�c tham s? c?a c?a chu?i JSON
		console.log("send LED")//Ghi ra console.log l� d� g?i l?nh LED
	}, 200)//200ms
	
	//Khi socket client b? m?t k?t n?i th� ch?y h�m sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra m�n h�nh console cho vui
		clearInterval(interval1)		//x�a chu k? nhi?m v? di, ch? kh�ng x�a l� c�i task kia c? ch?y m�i th�i d�!
	})
});