var parseLogItemForm = function(data){
	// uses form data here;
	console.log(data);
}



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
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "logItems");
		var makeList = document.createElement("ul");
		makeList.setAttribute("id", "logEntry");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge("logItems").style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			makeli.setAttribute("id", "logItem");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Converting string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.treatments[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);//Create edit and delete links for each item in local storage.
		}
	}
});
/*
	//Function to create the edit and delete item links for each item in local storage.
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Log Entry";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		
		// add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Log Entry";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);


	}
	//edit single item
	function editItem() {
		//grab the data from our item in local storage
		var value = localStorage.getItem(this.key);
		var logItem = JSON.parse(value);

		//show form
		toggleControls("off");

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

		//remove initial listener from the input "save log item" button
		submitLink.removeEventListener("click", storeData);
		//Change submit button value to edit button
		ge("submit").value = "Edit Log Entry";
		var editSubmit = ge("submit");
		//Save the key value established in this vunction as a property of the editSubmit event
		//so we can use that value when we save the data
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this log entry?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Log Entry was deleted.");
		}else{
			alert("Log entry was Not deleted.");
		}
	}
	//clear local storage
	function clearData() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All log items are deleted!");
			window.location.reload();
			return false;
		}
	}*/