var xaraSwidgets_mosaicBlockBar1Templates = {


entry:			'<a href="{link}" class=" {com_id}_m_overlay mosaic-overlay">'
		+		'<img src="{image}" border="none"/></a>'
		+		'<a href="{link}" class="{com_id}_overlay mosaic-backdrop">'
		+		'<div class="{com_id}_details">'
	//	+		'<h4>{heading}</h4><p>{text}</p></div></a>' 
		+		'<img class="{com_id}_heading" src="{heading}"   b{com_id}_order="none"  />'
		+		'<img class="{com_id}_desc" src="{text}" border="none"  /></div></a>'
		+		'</div></a>',

/*myTheme:			'{theme}',
timeout:			'{pause}',
speed:				'{speed}',
panelTrans: 		'{trans}',
*/
		
		
		main:	'<div id="{component_id}OuterDiv" class="mosaic-block bar" >'
			+ 	'{entryhtml}'
			+	'</div>'
};

	
function xsw_cs_htmlbr(str) {
	if (str == undefined)
		return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}

function xaraSwidgets_mosaicBlockBar1GetConfig(value, d)
{
	var ret = parseInt(value);
	
	if(!isNaN(ret))
	{
		return ret;
	}
	else
	{
		return d;
	}
}



// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_mosaicBlockBar1Constructor(divID, data)
{
	var entryHTML = '';
//	var entryHTML2 = '';


	myTheme = (data[0].theme);
	speed = (data[0].speed);
	
	
	var useDirection = (data[0].direction);
	var effects = [
   	'top',
    'bottom'
  

	];

	var effectName = effects[useDirection];
//	console.log(effectName)
	

	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<data.length; i++)
	{
	
	entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_mosaicBlockBar1Templates.entry, data[i]);
	}
	


	var com1_id=divID;
//	entryHTML = xsw_ea_htmlbr(entryHTML);
	// now lets compile the 'main' template which acts as a wrapper for each entry

	
		// get the speed value 
		var enteredSpeed = parseFloat(speed)*1000;
		var defaultSpeed = '700';
		var speed = isNaN(enteredSpeed) ? defaultSpeed : enteredSpeed

		
	
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML,
		com_id:com1_id
	};
	
	


	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_mosaicBlockBar1Templates.main, mainData);
	
	
			// find the theme value to determine whether theme colors should be matched.
		
		var defaultTheme = 0;
		var enteredTheme = parseInt(myTheme);
		var theme = isNaN(enteredTheme) ? defaultTheme : enteredTheme
//		var theme = parseInt(myTheme);
		if(!isNaN(theme))
			{
			useTheme = theme;
			}	
		if (theme ==1){
			var $p = $("<p class='xr_c_Theme_Color_1'></p>").hide().appendTo("body");
			
			}
		else if (theme ==0){
			var $p = $("<p class='xr_c_Cyclee_Color_1'></p>").hide().appendTo("body");
			
			} 

	
		var enteredovercolor = $p.css("color");
		var defaultovercolor = '#000';
	//	var overcolor = isNaN(enteredovercolor) ? defaultovercolor : enteredovercolor
		
		if (enteredovercolor !== 'rgb(0, 0, 0)')
		{
		var overcolor= enteredovercolor
		}
		else 
		{
		var overcolor= defaultovercolor;
		}
		
			
    $p.remove();

	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	$('#' + divID).html(mainTemplate);
	
	
	// get the dimensions of the parent div  
	
	var width = $('#' + divID).parent('div').width();
	var height = $('#' + divID).parent('div').height();
	var slidePos = height/5;
	$('#' + divID + 'OuterDiv').css('width',width);
	$('#' + divID + 'OuterDiv').css('height',height);
	$('#' + divID + 'OuterDiv').css('z-index','0');
//	$('.' + divID +'_image').css('width',width);
//	$('.' + divID +'_image').css('height',height);
//	$('#' + divID).parent('div').css('overflow', 'visible');

	
// write the css values to the doc
					
 
 if (effectName == 'top')	
 {
 	$('head').append("<style>."+divID+"_details{position:absolute; top:5px;}</style>");
	 	

 }

 else
 {
	$('head').append("<style>."+divID+"_details{position:absolute; bottom:5px;}</style>");
 }
					
	// invoke the effect 
		$('#' + divID + 'OuterDiv').mosaic({
					animation	:	'slide',
					anchor_y	:	effectName,		//Vertical anchor position
					hover_y		:	slidePos+'px',		//Vertical position on hover
					speed 		: 	speed
				
				});

			
$('head').append("<style>."+divID+"_overlay { background:"+overcolor+"; z-index:1;}"
 		+   "."+divID+"_m_overlay{z-index:2;}"
		+   "."+divID+"_heading{border:none; display: block; margin-left: 5px;  margin-top: 5px;}"
	 	+	 "."+divID+"_desc{border:none; display: block; margin-left: 5px;  margin-top: 5px;}"
	   	+   "</style>" );
					

					
}
