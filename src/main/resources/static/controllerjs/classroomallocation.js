window.addEventListener('load',()=>{
    //call refresh class room allocation
    refreshClassRoomAllocation()

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
        {dataType:'function',propertyName:getClassOffering}
    ];


    fillDataIntoTable(tableClassRoomAllocation,classRoomAllocationsList,displayProperty,true);
}


//define refresh class room allocation form
const refreshClassRoomAllocation = ()=>{
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