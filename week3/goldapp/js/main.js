var parseLogItemForm = function(data){
	// uses form data here;
	console.log(data);
};



$(document).bind('pageinit', function(){

	var logitemform = $("#addLogItem");

	logitemform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = logitemform.serializeArray();
			parseLogItemForm(data);
		}
	});

	//getElementByID Function
	var ge = function (x) {
		var theElement = document.getElementById(x);
		return theElement;
	};

		

	//Display the data from local storage to screen
	var getData = function(){
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Data from Local Storage to the browser
		$("#logitemList").empty();
		//Making list items
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $("<li id='listItem"+i+"'></li>");
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Converting string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			//create log item list
			var optSubText = $( "<img src='images/"+obj.treatments[1]+".jpg'/>"+
				"<h3>"+obj.date[1]+"</h3>"+
				"<h3>"+obj.currentTime[1]+"</h3>"+
				"<p>"+obj.fname[0]+" "+obj.fname[1]+"</p>"+
				"<p>"+obj.lname[0]+" "+obj.lname[1]+"</p>"+
				"<p>"+obj.bsreading[0]+" "+obj.bsreading[1]+"</p>"+
				"<p>"+obj.sex[0]+" "+obj.sex[1]+"</p>"+
				"<p>"+obj.condition[0]+" "+obj.condition[1]+"</p>"+
				"<p>"+obj.treatments[0]+" "+obj.treatments[1]+"</p>"+
				"<p>"+obj.comments[0]+" "+obj.comments[1]+"</p>");
			//Creating Edit Link in Item
			var editLink = $("<a href='#add' id='edit"+key+"'> Edit Log Item</a>");
				editLink.bind('click', function(){
					editItem(this.id);
				});
			//Creating Delete Link in Item
			var deleteLink = $("<a href='#list' id='delete"+key+"'>Delete Item</a>");
				deleteLink.bind('click', function(){
					deleteItem(this.id);
				});
			//Make item data the edit link
			editLink.html(optSubText);
			//Adding edit and delete links to the list
			makeli.append(editLink, deleteLink).appendTo("#logitemList");
			}
	$("#logitemList").listview('refresh');			
	};

	//edit single item
	var editItem =function() {
		//grab the data from our item in local storage
		var value = localStorage.getItem(this.key);
		var logItem = JSON.parse(value);
		//Populate the form with current local storage values.
		ge("fname").value = logItem.fname[1];
		ge("lname").value = logItem.lname[1];
		ge("date").value = logItem.date[1];
		ge("currentTime").value = logItem.currentTime[1];
		ge("bsreading").value = logItem.bsreading[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value == "Male" && logItem.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && logItem.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		ge("condition").value = logItem.condition[1];
		ge("treatments").value = logItem.treatments[1];
		ge("comments").value = logItem.comments[1];
		//Change submit button value to edit button
		$("span.ui-controlgroup-last").html("Edit Log Item");
		//Save the key value established in this vunction as a property of #addLogItem
		$("#addLogItem").attr("key", key);
		//Refresh the menu
		$("select#treatment").selectmenu("refresh");
	};
	
	var deleteItem = function(){
		var ask = confirm("Are you sure you want to delete this log entry?");
		var key = localStorage.key();
		if(ask){
			localStorage.removeItem(key);
			alert("Log Entry was deleted.");
			getData();
		}else{
			alert("Log entry was Not deleted.");
		};
	};

	//Auto Populate Default data to local storage
	var autoFillData = function(){
		//Store the JSON Object into local storage
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	
	};

	//clear local storage
	var clearData = function() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			var ask = confirm("Deleting ALL log items? This can NOT be undone.");
			if(ask){
				localStorage.clear();
				alert("All log items are deleted!");
				return false;
			}else{
				alert("Log items not deleted.");
			};
		};
		$("#logitemList").listview('refresh');
	};


	//Set Link and Submint Click Events
	var displayLink = ge("displayLog");
	displayLink.addEventListener("click", getData);

	var clearLink = ge("clear");
	clearLink.addEventListener("click", clearData);
	
/*	var submitLink = ge("submit");
	submitLink.addEventListener("click", validate);*/

});
/*
	
	
	
	*/