var parseLogItemForm = function(data){
	// uses form data here;
	consol.log(data);
};



$(document).bind('pageinit', function(){

	var logitemform = $("#addLogItem");

	logitemform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			
			storedata(this.key);
		}
	});

	//getElementByID Function
	var ge = function (x) {
		var theElement = document.getElementById(x);
		return theElement;
	};

	var getSelectedRadio = function(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	};

	var storeData = function(key){
		//if there is no key , this is a new item and needs a key
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here.
			id = key;
		}
		//Get Form Data and store in object
		//Object properties contain array with form label and input value.
		getSelectedRadio();
		var logItem = {};
			logItem.fname = ["First Name:", ge("fname").value];
			logItem.lname = ["Last Name:", ge("lname").value];
			logItem.date = ["Today's Date:", ge("date").value];
			logItem.currentTime = ["Current Time:", ge("currentTime").value];
			logItem.bsreading = ["Blood Sugar Reading:", ge("bsreading").value];
			logItem.sex = ["Male or Female:", sexValue];
			logItem.condition = ["Condition:", ge("condition").value];
			logItem.treatments = ["Current Treatment:", ge("treatments").value];
			logItem.comments = ["Comments:", ge("comments").value];
		//Saving data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(logItem));
		alert("Log Saved!");
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
	var editItem =function(id) {
		//grab the data from our item in local storage
		var key = parseInt(id.match(/\d+/g));
		var logItem = JSON.parse(localStorage.getItem(key));
		//Populate the form with current local storage values.
		ge("fname").value = logItem.fname[1];
		ge("lname").value = logItem.lname[1];
		ge("date").value = logItem.date[1];
		ge("currentTime").value = logItem.currentTime[1];
		ge("bsreading").value = logItem.bsreading[1];
		/*ge("sex").value = logItem.sex[1];*/
		ge("condition").value = logItem.condition[1];
		ge("treatments").value = logItem.treatments[1];
		/*ge("comments").value = logItem.comments[1];*/
		//Change submit button value to edit button
		$("span.ui-controlgroup-last").html("Edit Log Item");
		//Save the key value established in this vunction as a property of #addLogItem
	/*	$("#submit").attr("key", key);*/
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
	
	};
/*("#displayLog").bind("click", getData);
("clear").bind("click", clearData);
("submit").bind("click", storeData);*/


});


	
	
	
