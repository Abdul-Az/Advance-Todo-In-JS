

function addTask(){
  // const addButton = document.getElementsByClassName('addbutton');
  
  // addButton.addEventListener('click', () => {
      document.getElementById("title").value = "";
      document.getElementById("desc").value = "";
      document.getElementById("dateandtime").value = "";
      document.getElementById("dateandtime").style.display = "none";
      $("#myModal").modal();
  }
  
  function toggleDate(){
      $('#dateandtime').toggle();
  }
  
  function saveTask(){
      const container = document.querySelector('.myContainer');
      var titleTxt = document.getElementById('title').value;
      var descTxt = document.getElementById('desc').value;
      var dateTimeTxt = document.getElementById('dateandtime').value;
      var dateTxt = dateTimeTxt.split("T")[0];
      var TimeTxt = dateTimeTxt.split("T")[1];
      var valueKey = document.getElementById('title').value.replace(/\s/g,'');
  
        if (titleTxt === '') {
          const container = document.querySelector('.modal-body');
  const list = document.querySelector('#addForm');
      const div = document.createElement('div');
      div.classList.add('alert', 'alert-warning', 'animated', 'bounceIn');
      div.appendChild(document.createTextNode('Ooops! There is nothing to add.'));
  
      container.insertBefore(div, list);
    
      setTimeout(() => {
        div.remove();
      }, 3000);
  
        }
        else{
      // var myHtml = "<div><h4 id='" + titleTxt + "' onclick='toggleDesc(this.id)'>" + titleTxt + "</h4><br><label class='" + titleTxt + "'>" + descTxt + "</label>" + "<label>" + dateTxt + " " + TimeTxt + "</label></div>"
      // var myHtml = `<div style= "display:flex;"><input type="checkbox" ><div class="todolistEle"><h4 id="${titleTxt}" onclick="toggleDesc(this.id)">${titleTxt}</h4><br><label class="${titleTxt}" style="display:none;">${descTxt} ${dateTxt} ${TimeTxt}</label></div></div>`;
    //   var myHtml = `<div class="panel-group">
    //   <div class="panel panel-default">
    //     <div class="panel-heading" data-toggle="collapse" data-target="#${titleTxt}">
    //       <h4 class="panel-title">
    //         <a>${titleTxt}</a>
    //         <button type="button" style="float: right;">delete</button>
    //         <button type="button" style="float: right;">edit</button>
    //       </h4>
    //     </div>
    //     <div id="${titleTxt}" class="panel-collapse collapse">
    //       <div class="panel-body">${descTxt}</div>
    //       <div class="panel-footer">${dateTxt} ${TimeTxt}</div>
    //     </div>
    //   </div>
    // </div>`;
      
      var remainingDaysMsg = "", validityFlag = "safe";
      if(dateTxt === ""){
    remainingDaysMsg = "No date set for this task";
    validityFlag = "nodate";
          TimeTxt = "";
      }else{
    var taskValidity = determineTime(dateTxt);
    if(taskValidity <= 0){
      remainingDaysMsg = `${taskValidity} day(s) overdue!`;
      validityFlag = "unsafe";
        }else if(taskValidity > 5){
      remainingDaysMsg = `${taskValidity} day(s) remaining.`;
      validityFlag = "safe";
        }else{
      remainingDaysMsg = `${taskValidity} day(s) remaining complete it soon!`;
      validityFlag = "neutral";
        }
      }
      var myHtml = `<div class="tilesSeperator" id="remove_${valueKey}">
      <div id="${valueKey}" style="cursor:pointer;padding-left: 5px;" onclick="toggleDisplay(this.id)">
      <input type="checkbox"/><label class="strikethrough">${titleTxt}</label>
      <button id="toRemove_${valueKey}" class="glyphicon glyphicon-trash" style="float:right;" onclick="deleteTask(this.id)"></button>
      </div>
      <div class="${valueKey}" style="display:none;">
      <div id="panel">${descTxt} </div>
      <div id="date">${dateTxt} ${TimeTxt} ${remainingDaysMsg}</div></div></div>
      `
      $('#tasksList').append(myHtml);
      switch(validityFlag){
    case "unsafe" :  var element = document.getElementById(valueKey);
             element.classList.remove("safe");
         element.classList.remove("neutral");
         element.classList.add("unsafe");
         break;
    case "neutral" :  var element = document.getElementById(valueKey);
             element.classList.remove("safe");
         element.classList.remove("unsafe");
         element.classList.add("neutral");
         break;
    case "safe" :  var element = document.getElementById(valueKey);
             element.classList.remove("unsafe");
         element.classList.remove("neutral");
         element.classList.add("safe");
         break;
    case "nodate" :  var element = document.getElementById(valueKey);
             element.classList.remove("safe");
         element.classList.remove("neutral");
         element.classList.remove("unsafe");
         break;
      }
      
      $('#myModal').modal('hide');
     }
    }
  
    function toggleDisplay(idString){
      $(`.${idString}`).slideToggle("slow");
      //$("." + idString).slideToggle("slow");
    }
  
  function deleteTask(deleteId){
    var deleteStr = deleteId.split("_")[1];
    var deleteEle = document.getElementById(`remove_${deleteStr}`);
    var list = document.getElementById("tasksList");
      var deleteButton = deleteEle;
      list.removeChild(deleteButton);
  }
  
  function determineTime(dateString){
    var date1 = new Date(), date2 = new Date(dateString);
    var one_day=1000*60*60*24;
  
    var date1_ms = date1.getTime();
  
  
    var date2_ms = date2.getTime();
  
  
    var difference_ms = date2_ms - date1_ms;
    return Math.round(difference_ms/one_day); 
  }
  
  // function filterTasks(stringToSearch){
  //   //first hide all elements or tasks
  //   $(`*[id*=remove_]`).each(function() {
  //     this.classList.remove("show");
  //         this.classList.add("hide");
  //   });
  //   //show elements or tasks for filter item
  //   $(`*[id*=remove_${stringToSearch}]`).each(function() {
  //     this.classList.remove("hide");
  //         this.classList.add("show");
  //   });
  // }