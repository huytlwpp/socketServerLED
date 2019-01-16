const PORT = 3484;									//Ð?t d?a ch? Port du?c m? ra d? t?o ra chuong trình m?ng Socket Server
 
var http = require('http') 							//#include thu vi?n http - Tìm thêm v? t? khóa http nodejs trên google n?u b?n mu?n tìm hi?u thêm. Nhung theo kinh nghi?m c?a mình, Javascript trong môi tru?ng NodeJS c?c k? r?ng l?n, khi b?n bí thì nên tìm hi?u không nên ng?i d?c và c? g?ng h?c thu?c h?t cái reference (Tài liêu tham kh?o) c?a nodejs làm gì. V? não dó!
var socketio = require('socket.io')				//#include thu vi?n socketio
 
var ip = require('ip');
var app = http.createServer();					//#Kh?i t?o m?t chuong trình m?ng (app)
var io = socketio(app);								//#Ph?i kh?i t?o io sau khi t?o app!
app.listen(PORT);										// Cho socket server (chuong trình m?ng) l?ng nghe ? port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 
//Khi có m?t k?t n?i du?c t?o gi?a Socket Client và Socket Server
io.on('connection', function(socket) {	
	//hàm console.log gi?ng nhu hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là dã có m?t Socket Client k?t n?i thành công.
	
	var led = [true, false] //d?nh nghia m?t m?ng 1 chi?u có 2 ph?n t?: true, false. M?ng này s? du?c g?i di nh?m thay d?i s? sáng t?t c?a 2 con dèn LED d? và xanh. D?a vào cài d?t ? Arduino mà dèn LEd s? b? b?t ho?c t?t. Hãy th? tang ho?t gi?m s? lu?ng bi?n c?a m?ng led này xem. Và b?n s? hi?u di?u k? di?u c?a JSON!
	
	//T?o m?t chu k? nhi?m v? s? ch?y l?i sau m?i 200ms
	var interval1 = setInterval(function() {
		//d?o tr?ng thái c?a m?ng led, d?o cho vui d? ? Arduino nó nh?p nháy cho vui.
		for (var i = 0; i < led.length; i++) {
			led[i] = !led[i]
		}
		
		//Cài d?t chu?i JSON, tên bi?n JSON này là json 
		var json = {
			"led": led //có m?t ph?n t? là "led", ph?n t? này ch?a giá tr? c?a m?ng led.
		}
		socket.emit('LED', json) //G?i l?nh LED v?i các tham s? c?a c?a chu?i JSON
		console.log("send LED")//Ghi ra console.log là dã g?i l?nh LED
	}, 200)//200ms
	
	//Khi socket client b? m?t k?t n?i thì ch?y hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra màn hình console cho vui
		clearInterval(interval1)		//xóa chu k? nhi?m v? di, ch? không xóa là cái task kia c? ch?y mãi thôi dó!
	})
});