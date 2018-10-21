
//連線websocket
var gateSocket;

function initWebsocket(){	

	gateSocket = new WebSocket( 'ws://' + window.location.host + '/gate' );
	
	gateSocket.onmessage = function (e) {
	    var data = JSON.parse(e.data);
	    
	    console.log(data);
	    
	    var message = data.message;
	    // id : 閘門的id  gateStatus : true or false  正常 / 異常
	    var id = message.id;
	    var gateStatus = message.gateStatus;
	    
	    //超音波數據 : ultrasonicData
	    var ultrasonicData = message.ultrasonicData;
	    
	    //判斷狀態 : true 正常  false 異常
	    if( gateStatus == true ){
	    	
	    	$('#gate_' + id + ' span,#gate_' + id + ' em').removeClass( 'warning' );
	    	$('#gate_' + id + ' span').text('水位正常');
	    	
	    }else if( gateStatus == false ){
	    	
	    	$('#gate_' + id + ' span,#gate_' + id + ' em').addClass( 'warning' );
	    	$('#gate_' + id + ' span').text('水位異常');
	    }
	    
	    //判斷超音波數據
	    if( ultrasonicData ){
	    	
	    	$('#ultra').text( '目前水位 : ' + ultrasonicData );
	    	
	    	if( ultrasonicData <= 5 ){
	    		
	    		alertify.alert( '注意! ', '水位警報，目前水位 :' + ultrasonicData, function(){ alertify.error('注意'); });
	    	}
	    	
	    }else if( ultrasonicData == 0 ){
	    	
	    	$('#ultra').text( '設備離線中' );
	    }
	    
	};
	gateSocket.onopen = function (e) {
	    console.log('open gate websocket..');
	    // socket.send("hello world");
	};
	gateSocket.onclose = function(e){
	    console.log('gate websocket is closed.');
	    // reconnect
	    setTimeout(function(){
	        initWebsocket();
	    },1500);
	    
	};
	gateSocket.onerror = function(e){
	    console.log('adhome websocket has Error.');
	    gateSocket.close();
	}; 
}


$(function(){
	
	initWebsocket();
});