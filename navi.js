/* 
Do this on the page you want a custom function
Custom function array. Add your custom function like this
 XlogicCsuFuncList["function_name"] = funnction_name;
 function funnction_name(data,pagename,container,optvals,func,tabelement){
	bla bla 
 }
--------------FNCTION----------------------
 pagename 		-> Page you want to navigate to 
 container 		-> Where the page needs to be loaded
 optvals 		-> if any conditions are needed pass optional values here
 func 			-> medhod of the output / action to be taken
 tabelement 	-> which element to be posted
 cusfunreq 		-> which custom function should the data return to 
 rmedhod 		-> what medhod POST or GET
 */
var XlogicCsuFuncList = {};
var func=''; 
var optvals='';
function pagenavi(pagename,container,optvals,func,tabelement,cusfunreq,rmedhod){
	var str='';
	if(typeof cusfunreq === 'undefined' || cusfunreq==''){ cusfunreq='' }else{ cusfunreq=cusfunreq;}
	if(typeof func === 'undefined' || func==''){ func='' }else{ func=func;}
 	if(typeof optvals === 'undefined' || optvals==''){ optvals='' }else{ optvals='&opt='+optvals;}
	if(typeof tabelement === 'undefined' || tabelement==''){ tabelement='' }else{ tabelement=tabelement;}
	if(typeof rmedhod === 'undefined' || rmedhod==''){ rmedhod='POST' }else{ rmedhod=rmedhod;}

 	container=container;
	page='page='+pagename+'&container='+container+'&func='+func+'&rmedhod='+rmedhod;
	if(func=='postthis'){
		 /*Create form element and post form to function and remove form element*/
 			var pTags = $(tabelement);
 			pTags.wrap('<form method="post"></form>');
			str= $("form").serialize();
	 }
	if(str!=''){ str=str+'&';}else{str=str;}
	parms=str+page+optvals;
 	$.ajax({
		url:'main.php',
		type: rmedhod,
		data: parms+"&cache=" + new Date(),
		success: function(data){
 			 if(cusfunreq!=''){
					 if (cusfunreq in XlogicCsuFuncList) {
        				  XlogicCsuFuncList[cusfunreq](data,pagename,container,optvals,func,tabelement,cusfunreq,rmedhod);
   					 }
			}else{
				 if(container=='returndata'){
 					data = data.replace(/\s/g, '');
					return data;
				 }else{
 					$(container).html(data);
				}
			} 
 		},
		error: function(){
			alert ("Hold please... We are having problem with your request. Try again.");
		}
	});
	if(func=='postthis'){
		if ( pTags.parent().is("form")) {
				pTags.unwrap();
		} 
	} 
}