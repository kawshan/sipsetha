window.addEventListener('load',()=>{
    //get privileges to check button events
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/classhall")

    refreshClassHallForm();

    refreshClassHallTable();

});

//define function for refresh class hall table
const refreshClassHallTable = ()=>{

    classhalls=ajaxGetRequest("/classhall/findall")

    displayProperty=[
        {dataType:'text',propertyName:'name'},
        {dataType:'text',propertyName:'location'},
        {dataType:'text',propertyName:'tablecount'},
        {dataType:'text',propertyName:'benchcount'},
        {dataType:'function',propertyName:getClassHallStatus},
    ];

    fillDataIntoTable(tableClassHall,classhalls,displayProperty,checkPrivilege,true)

}

const checkPrivilege = (innerOB)=>{
    if (innerOB.classhallstatus_id.name!="inactive"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}

//define function for get class hall status
const getClassHallStatus = (rowOb)=>{
    if (rowOb.classhallstatus_id.name == 'active'){
        return 'active';
    }else if (rowOb.classhallstatus_id.name == 'under-construction'){
        return 'under construction';
    }else {
        return 'in-active'
    }
}


//define function for refresh class hall form
const refreshClassHallForm = ()=>{
    classhall = new Object();
    classHallForm.reset();
    classhall.features = [];

    classHallStatus = ajaxGetRequest("/classhallstatus/findall");
    fillDataIntoSelect(selectClassHallStatus,'select status',classHallStatus,'name');

    availbaleFeatures=ajaxGetRequest("/classhallfeatures/findall")
    fillDataIntoSelect(selectAllItem,'select features',availbaleFeatures,'name');

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');


    textName.style.border='2px solid #ced4da';
    textLocation.style.border='2px solid #ced4da';
    textMinCount.style.border='2px solid #ced4da';
    textMaxCount.style.border='2px solid #ced4da';
    textTableCount.style.border='2px solid #ced4da';
    textBenchCount.style.border='2px solid #ced4da';
    textMaxTableCount.style.border='2px solid #ced4da';
    textMaxBenchCount.style.border='2px solid #ced4da';
    textNote.style.border='2px solid #ced4da';
    selectClassHallStatus.style.border='2px solid #ced4da';

    if (!userPrivilege.update){
        btnClassHallUpdate.disabled=true;
        btnClassHallUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.insert){
        btnClassHallAdd.disabled=true;
        btnClassHallAdd.style.cursor='not-allowed';
    }


};

//define function for
const classHallFormRefill = (ob,rowIndex)=>{
    classhall=JSON.parse(JSON.stringify(ob));
    oldClasshall=JSON.parse(JSON.stringify(ob));

    console.log('refill'+rowIndex);
    $('#modalClassHallAdd').modal('show');

    textName.value = classhall.name;
    textLocation.value = classhall.location;
    textMinCount.value = classhall.mincount;
    textMaxCount.value = classhall.maxcount;
    textTableCount.value = classhall.tablecount;
    textBenchCount.value = classhall.benchcount;
    textMaxTableCount.value = classhall.maxtablecount;
    textMaxBenchCount.value = classhall.maxbenchcount;

    if (classhall.note != null){
        textNote.value = classhall.note;
    }else {
        textNote.value="";
    }


    fillDataIntoSelect(selectClassHallStatus,'select status',classHallStatus,'name',classhall.classhallstatus_id.name);

    availbaleFeatures=ajaxGetRequest("/classhallfeatures/findall")
    fillDataIntoSelect(selectAllItem,'select features',availbaleFeatures,'name');

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');


    if (!userPrivilege.update){
        btnClassHallUpdate.disabled=true;
        btnClassHallUpdate.style.cursor='not-allowed';
    }else {
        btnClassHallUpdate.disabled="";
        $("#btnClassHallUpdate").css("cursor", "pointer");

    }

}


//define function for
const deleteClassHall = (ob,rowIndex)=>{
    console.log('delete');

    tableClassHall.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function () {
        const userConfirm= confirm('are you sure to delete following class hall'
        +'\n name is'+ob.name
        +'\n location  is'+ob.location
        );
        if (userConfirm){
            const deleteServerResponse= ajaxDeleteRequest("/classhall",ob);
            if (deleteServerResponse =="ok"){
                alert('delete successful')
                refreshClassHallTable();
            }else {
                alert('delete unsuccessful '+deleteServerResponse);
            }
        }
        refreshClassHallTable()
    },500)
}
//define function for
const printClassHall = ()=>{

}
//define function for check errors
const checkClassHallErrors = ()=>{
    let errors = ""

    if (classhall.name == null){
        errors=errors+"name cannot be empty \n"
    }
    if (classhall.location==null){
        errors=errors+"location cannot be empty \n";
    }
    if (classhall.mincount == null){
        errors=errors+"mincount cannot be empty \n";
    }
    if(classhall.maxcount == null){
        errors=errors+"maxcount cannot be empty \n";
    }
    if (classhall.tablecount==null){
        errors=errors+"table count cannot be empty \n";
    }
    if (classhall.benchcount == null){
        errors=errors+"bench count cannot be empty \n";
    }
    if (classhall.maxtablecount==null){
        errors=errors+"max table count cannot be empty \n";
    }
    if (classhall.maxbenchcount == null){
        errors=errors+"max bench count cannot be empty \n"
    }
    if (classhall.classhallstatus_id == null){
        errors=errors+"status cannot be empty \n"
    }

    return errors;
}

//define function for check updates
const checkClassHallUpdates = ()=>{
    console.log('checking update is called');
    let updates = '';

    if (classhall.name != oldClasshall.name){
        updates=updates+"class hall name is changed \n";
    }
    if (classhall.location != oldClasshall.location){
        updates=updates+"location is changed \n";
    }
    if (classhall.mincount != oldClasshall.mincount){
        updates=updates+"mincount is changed \n";
    }
    if (classhall.maxcount != oldClasshall.maxcount){
        updates=updates+"maxcount is changed \n";
    }
    if (classhall.tablecount != oldClasshall.tablecount){
        updates=updates+"table count is changed \n";
    }
    if (classhall.benchcount != oldClasshall.benchcount){
        updates=updates+"bench count is changed \n";
    }
    if (classhall.maxtablecount != oldClasshall.maxtablecount){
        updates=updates+"max table count is changed \n";
    }
    if (classhall.maxbenchcount != oldClasshall.maxbenchcount){
        updates=updates+"max table count is changed \n";
    }
    if (classhall.note != oldClasshall.note){
        updates=updates+"note is changed \n";
    }
    if (classhall.classhallstatus_id.name != oldClasshall.classhallstatus_id.name){
        updates=updates+"status is changed \n"
    }
    return updates;
}


const classHallUpdate = ()=>{
    console.log('update');
    console.log(classhall)
    console.log(oldClasshall);

    let errors = checkClassHallErrors();
    if (errors == ""){
        let updates = checkClassHallUpdates();
        if (updates==''){
            alert('nothing to update');
        }else {
            const userConfirm = confirm('are you sure to update following class hall \n'+updates);
            if (userConfirm){
                const putServiceResponse=ajaxPutRequest("/classhall",classhall);
                if (putServiceResponse=="ok"){
                    alert('update successful');
                    classHallForm.reset();
                    refreshClassHallForm();
                    $('#modalClassHallAdd').modal('hide');
                    refreshClassHallTable()
                }else {
                    alert("update not successful"+putServiceResponse)
                }
            }
        }
    }else {
        alert("form has following errors"+errors);
    }


}

//define function for class hall submit
const classHallSubmit = ()=>{
    console.log(classhall);
    const errors=checkClassHallErrors();
    if (errors==""){
        const userConfirm = confirm('are you sure to add following class hall'
        +'\n name is'+classhall.name
        +'\n location is'+classhall.location
        )
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/classhall",classhall);
            if (postServerResponse=="ok"){
                alert('save success');
                classHallForm.reset();
                refreshClassHallForm();
                $('#modalClassHallAdd').modal('hide');
                refreshClassHallTable();
            }else {
                alert('save not success'+postServerResponse);
            }
        }
    }
}


//define function for button add one item
const btnAddOneItem= ()=>{
    console.log(selectAllItem.value);
    if (selectAllItem.value==""){
        alert("please select item")
    }else {
        let selectedItem=JSON.parse(selectAllItem.value);


        classhall.features.push(selectedItem);
        fillDataIntoSelect(selectedFeatures,"",classhall.features,'name');

        let extIndex = availbaleFeatures.map(item => item.name).indexOf(selectedItem.name);
        if (extIndex != -1){
            availbaleFeatures.splice(extIndex,1)
        }
    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name')

    }
}

//define function for btn add all item
const btnAddAllItem = ()=>{
    availbaleFeatures.forEach(item=>{
        classhall.features.push(item);
    });

    fillDataIntoSelect(selectedFeatures,'',classhall.features,'name');

    availbaleFeatures=[];
    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');


}
//define function doe remove one item
const btnRemoveOneItem = ()=>{
    console.log(selectAllItem.value);
    if (selectedFeatures.value==""){
        alert("please select item for remove");
    }else {
        let selectedRemoveItem = JSON.parse(selectedFeatures.value)
        availbaleFeatures.push(selectedRemoveItem);
        fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');

        let extIndex = classhall.features.map(item=>item.name).indexOf(selectedRemoveItem.name);
        if (extIndex!=-1){
            classhall.features.splice(extIndex,1)
        }
        fillDataIntoSelect(selectedFeatures,"",classhall.features,'name');
    }
}

//define function for remove all item
function btnRemoveAllItem(){
    classhall.features.forEach(item=>{
        availbaleFeatures.push(item);
    });

    fillDataIntoSelect(selectAllItem,"",availbaleFeatures,'name');

    classhall.features=[];
    fillDataIntoSelect(selectedFeatures,"",classhall.features,'name');
}










