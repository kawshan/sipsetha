window.addEventListener('load',()=>{
    //get privileges for button events
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/classroomallocation")


    //call refresh class room allocation
    refreshClassRoomAllocationForm()

    //call refresh class room allocation table
    refreshClassRoomAllocationTable();

})
///define refresh class room allocation table
const refreshClassRoomAllocationTable = ()=>{

    classRoomAllocationsList=ajaxGetRequest("/classroomallocation/findall");

    displayProperty=[
        {dataType:'text',propertyName:'starttime'},
        {dataType:'text',propertyName:'endtime'},
        {dataType:'function',propertyName:getAllocationType},
        {dataType:'function',propertyName:getWeekday},
        {dataType:'function',propertyName:getClassHall},
        {dataType:'function',propertyName:getClassOffering},
        {dataType:'function',propertyName:getAllocationStatus}
    ];


    fillDataIntoTable(tableClassRoomAllocation,classRoomAllocationsList,displayProperty,checkPrivileges,true);
}
const checkPrivileges =(innerOB) =>{
    if (innerOB.allocationstatus_id.name!="not-available"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}

//define refresh class room allocation form
const refreshClassRoomAllocationForm = ()=>{
    classRoomAllocation = new Object();
    classroomAllocationForm.reset()

    allocationStatues=ajaxGetRequest("/allocationstatus/findall");
    fillDataIntoSelect(selectAllocationStatus,'select allocation status',allocationStatues,'name');

    allocationTypes=ajaxGetRequest("/allocationtype/findall");
    fillDataIntoSelect(selectAllocationType,"select allocation type",allocationTypes,'name');


    weekdays=ajaxGetRequest("/weekday/findall");
    fillDataIntoSelect(selectWeekDay,"select week day",weekdays,'name');

    classHalls=ajaxGetRequest("/classhall/findall");
    fillDataIntoSelect(selectClassHall,'select class hall',classHalls,'name');

    classOfferings=ajaxGetRequest("/classoffering/findall");
    fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname');


    selectStartTime.style.border="2px solid #ced4da";
    selectEndTime.style.border="2px solid #ced4da";
    textNote.style.border="2px solid #ced4da";


    if (!userPrivilege.update){
        btnClassRoomAllocationUpdate.disabled=true;
        btnClassRoomAllocationUpdate.style.cursor='not-allowed';
    }
    if (!userPrivilege.insert){
        btnClassRoomAllocationAdd.disabled=true;
        btnClassRoomAllocationAdd.style.cursor='not-allowed';
    }

}

//define function for get AllocationType
const getAllocationType = (ob)=>{
    return ob.allocationtype_id.name;
}


//define function for get Weekday
const getWeekday = (ob)=>{
return ob.weekday_id.name;

}


//define function for get ClassHall
const getClassHall = (ob)=>{
return ob.classhall_id.name;
}


//define function for get ClassOffering
const getClassOffering = (ob)=>{
return ob.classoffering_id.classname;
}

//define function for get allocation status
const getAllocationStatus = (ob)=>{
    return ob.allocationstatus_id.name;
}

// define fucntion for class hall allocation
const printClassHallAllocation = (ob,rowIndex)=>{

    console.log('print');
    console.log(ob);
    console.log(rowIndex);


    classRoomAllocationsList=new Array(ob);

    displayProperty=[
        {dataType:'text',propertyName:'starttime'},
        {dataType:'text',propertyName:'endtime'},
        {dataType:'function',propertyName:getAllocationType},
        {dataType:'function',propertyName:getWeekday},
        {dataType:'function',propertyName:getClassHall},
        {dataType:'function',propertyName:getClassOffering},
        {dataType:'function',propertyName:getAllocationStatus}
    ];


    fillDataIntoTable(printClassRoomAllocationTable,classRoomAllocationsList,displayProperty,"",false);


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printClassRoomAllocationTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)






}


//define function for class room refill
const classRoomAllocationRefill = (ob,rowOb)=>{
    $('#modalClassRoomAllocationAdd').modal('show');
    classRoomAllocation=JSON.parse(JSON.stringify(ob))
    oldClassRoomAllocation = JSON.parse(JSON.stringify(ob));

    selectStartTime.value=classRoomAllocation.starttime
    selectEndTime.value=classRoomAllocation.endtime


    fillDataIntoSelect(selectAllocationStatus,'select allocation status',allocationStatues,'name',classRoomAllocation.allocationstatus_id.name);

    fillDataIntoSelect(selectAllocationType,"select allocation type",allocationTypes,'name',classRoomAllocation.allocationtype_id.name);

    fillDataIntoSelect(selectWeekDay,"select week day",weekdays,'name',classRoomAllocation.weekday_id.name);

    fillDataIntoSelect(selectClassHall,'select class hall',classHalls,'name',classRoomAllocation.classhall_id.name);

    fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname',classRoomAllocation.classoffering_id.clssname);



    if (classRoomAllocation.note!=null){
        textNote.value=classRoomAllocation.note;
    }else {
        textNote.value="";
    }



}



//define function for check errors
const checkErrors =()=>{
    let errors="";

    if (classRoomAllocation.starttime == null){
        errors=errors+"select start time cannot be empty \n"
    }
    if (classRoomAllocation.endtime == null){
        errors=errors+"end time cannot be empty \n";
    }
    if (classRoomAllocation.allocationstatus_id == null){
        errors=errors+"allocation status cannot be empty \n";
    }
    if (classRoomAllocation.allocationtype_id == null){
        errors=errors+"allocation type cannot be empty \n"
    }
    if (classRoomAllocation.weekday_id == null){
        errors=errors+"weekday cannot be empty \n";
    }
    if (classRoomAllocation.classhall_id == null){
        errors=errors+"class hall cannot be empty \n";
    }
    if (classRoomAllocation.classoffering_id == null){
        errors=errors+"class offering cannot be empty \n";
    }

    return errors;
}

//define class room allocation submit button
const classRoomAllocationSubmit = ()=>{
    let errors = checkErrors();
    if (errors == ""){
        const userConfirm = confirm("are you sure to add following class room allocation \n"
        +'\n start time is '+classRoomAllocation.starttime
        +'\n end time is '+classRoomAllocation.endtime
        +'\n allocation status is '+classRoomAllocation.allocationstatus_id.name
        +'\n allocation type is '+classRoomAllocation.allocationtype_id.name
        +'\n weekday is '+classRoomAllocation.weekday_id.name
        +'\n class hall is '+classRoomAllocation.classhall_id.name
        +'\n class offering is '+classRoomAllocation.classoffering_id.classname

        );
        if (userConfirm){
            let postServiceResponse = ajaxPostRequest("/classroomallocation",classRoomAllocation);
            if (postServiceResponse == "ok"){
                alert("save success "+postServiceResponse);

                refreshClassRoomAllocationForm();
                $('#modalClassRoomAllocationAdd').modal('hide');
                refreshClassRoomAllocationTable();
            }else {
                alert("save not successful "+postServiceResponse);
            }
        }
    }
}

//define function for check updates
const checkUpdates = ()=>{
    let updates = "";

    if (classRoomAllocation.starttime != oldClassRoomAllocation.starttime){
        updates=updates+"start time is changed \n"
    }
    if (classRoomAllocation.endtime != oldClassRoomAllocation.endtime){
        updates=updates+"end time is changed \n";
    }
    if (classRoomAllocation.allocationstatus_id.name != oldClassRoomAllocation.allocationstatus_id.name){
        updates=updates+"allocation status is changed \n";
    }
    if (classRoomAllocation.allocationtype_id.name != oldClassRoomAllocation.allocationtype_id.name){
        updates=updates+"allocation type is changed";
    }
    if (classRoomAllocation.weekday_id.name != oldClassRoomAllocation.weekday_id.name){
        updates=updates+"weekday is changed \n";
    }
    if (classRoomAllocation.classhall_id.name != oldClassRoomAllocation.classhall_id.name){
        updates=updates+"weekday is changed \n";
    }
    if (classRoomAllocation.classoffering_id.classname != oldClassRoomAllocation.classoffering_id.classname){
        updates=updates+"class offering is changed \n";
    }
    if (classRoomAllocation.note != oldClassRoomAllocation.note){
        updates=updates+"note is changed \n";
    }

    return updates;
}

//define class room allocation update button function
const updateClassRoomAllocation = ()=>{
    let errors = checkErrors();
    if (errors == ""){
        let updates = checkUpdates();
        if (updates==""){
            alert("nothing to update")
        }else {
            let userConfirm =confirm("are you sure to apply following updates \n"+updates);
            if (userConfirm){
                let putServiceResponse = ajaxPutRequest("/classroomallocation",classRoomAllocation);
                if (putServiceResponse=="ok"){
                    alert("update successful "+putServiceResponse);
                    refreshClassRoomAllocationForm();
                    $('#modalClassRoomAllocationAdd').modal('hide');
                    refreshClassRoomAllocationTable();
                }else {
                 alert("update not successful "+putServiceResponse);
                }
            }
        }
    }
}

//define function for delete classroom allocation
const deleteClassRoomAllocation = (ob,rowIndex)=>{
    console.log("delete"+ob+rowIndex);
    tableClassRoomAllocation.children[1].children[rowIndex].style.background="pink";
    setTimeout(function (){
        const userConfirm = confirm("are you sure to delete following class room allocation \n"
        +'\n start time is'+ob.starttime
        +'\n end time is'+ob.endtime
        +'\n allocation status  is'+ob.allocationstatus_id.name
        +'\n allocation type  is'+ob.allocationtype_id.name
        +'\n weekday  is'+ob.weekday_id.name
        +'\n class hall  is'+ob.classhall_id.name
        +'\n class offering  is'+ob.classoffering_id.classname
        )
        if (userConfirm){
            let deleteServiceResponse = ajaxDeleteRequest("/classroomallocation",ob);
            if (deleteServiceResponse=="ok"){
                alert("delete successful "+deleteServiceResponse);
                refreshClassRoomAllocationTable();
            }else {
                alert("delete not successful "+deleteServiceResponse);
            }
        }
        refreshClassRoomAllocationTable();
    },500)

}




//define function for class room allocation print full table
const printClassRoomAllocationFullTable = ()=>{
    $("#printClassRoomAllocationModel").modal('show');

    classRoomAllocationsList=ajaxGetRequest("/classroomallocation/findall");

    displayProperty=[
        {dataType:'text',propertyName:'starttime'},
        {dataType:'text',propertyName:'endtime'},
        {dataType:'function',propertyName:getAllocationType},
        {dataType:'function',propertyName:getWeekday},
        {dataType:'function',propertyName:getClassHall},
        {dataType:'function',propertyName:getClassOffering},
        {dataType:'function',propertyName:getAllocationStatus}
    ];


    fillDataIntoTable(printClassRoomAllocationTable,classRoomAllocationsList,displayProperty,"",false);


}

const modalPrintButton = ()=>{
    console.log("model print working");
    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printClassRoomAllocationTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}














