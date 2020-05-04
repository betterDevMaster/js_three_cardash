//app.js
var app ={
	init : function(obj){
		this.currentState = initState(obj);

	},
	cut : function(){
		document.location.reload();
	}
	
};
app.init(levl1);
