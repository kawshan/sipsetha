window.addEventListener('load',()=>{

    //call refresh table function
    refreshGuardianTable();

    //call refresh guardian form
    refreshGuardianForm();
});


//define function for refresh table function
const refreshGuardianTable = ()=>{
    guardians=ajaxGetRequest("/guardian/findall")

    const displayProperty=[
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getGuardianStatus},
        {dataType:'function',propertyName:getGuardianType},
    ];

    fillDataIntoTable(tableGuardian,guardians,displayProperty,true)


}

//define function for refresh guardian form
const refreshGuardianForm = ()=>{
    guardian = new Object();
    guardianForm.reset();

    guardianTypes=ajaxGetRequest("/guardiantype/findall")
    fillDataIntoSelect(selectGuardianType,'select guardian type',guardianTypes,'name');


    textFirstName.style.border='1px solid #ced4da';
    textLastName.style.border='1px solid #ced4da';
    textNic.style.border='1px solid #ced4da';
    textMobile.style.border='1px solid #ced4da';
    textLand.style.border='1px solid #ced4da';
    textAddress.style.border='1px solid #ced4da';
    selectGuardianType.style.border='1px solid #ced4da';
    selectGender.style.border='1px solid #ced4da';
    textWPAddress.style.border='1px solid #ced4da';
    textWPLandno.style.border='1px solid #ced4da';
    textPosition.style.border='1px solid #ced4da';
    selectStatus.style.border='1px solid #ced4da';
    textNote.style.border='1px solid #ced4da';
}

//define get guardian function
const getGuardianType = (ob)=>{
    if (ob.guardiantype_id.name=='father'){
        return '<p>father</p>';
    }else if (ob.guardiantype_id.name=='mother'){
        return '<p>mother</p>';
    }else {
        return '<p>other</p>';
    }
}

//define get guardian status
const getGuardianStatus = (ob)=>{
    if (ob.status){
        return '<p class="status-working">active</p>';
    }else {
        return '<p class="status-delete">delete</p>';
    }
}

//define function for refill
const GuardianFormRefill = (ob,rowIndex)=>{
    guardian=JSON.parse(JSON.stringify(ob));
    oldGuardian=JSON.parse(JSON.stringify(ob));

    console.log("refill");
    $('#modalGuardianAdd').modal('show');




    textFirstName.value=guardian.firstname;
    textLastName.value=guardian.lastname;
    textNic.value=guardian.nic;
    textMobile.value=guardian.mobile;
    textLand.value=guardian.landno;
    textAddress.value=guardian.address;
    selectGender.value=guardian.gender;
    textWPAddress.value=guardian.wpaddress;
    textWPLandno.value=guardian.wplandno;
    textPosition.value=guardian.position;
    selectStatus.value=guardian.status;
    textNote.value=guardian.note;

    fillDataIntoSelect(selectGuardianType,'select guardian type',guardianTypes,'name',guardian.guardiantype_id.name)


}

//define function for check guardian update form
const checkGuardianUpdateForm = ()=>{
    let updates = '';

    if (guardian.firstname != oldGuardian.firstname){
        updates=updates+"first name is changed \n";
    }
    if (guardian.lastname != oldGuardian.lastname){
        updates=updates+"last name is changed \n";
    }
    if (guardian.nic != oldGuardian.nic){
        updates=updates+"nic is changed \n";
    }
    if (guardian.mobile != oldGuardian.mobile){
        updates=updates+"mobile is changed \n";
    }
    if (guardian.landno != oldGuardian.landno){
        updates=updates+"land number is changed \n"
    }
    if (guardian.address != oldGuardian.address){
        updates=updates+"address is changed \n";
    }
    if (guardian.guardiantype_id.name != oldGuardian.guardiantype_id.name){
        updates=updates+"guardian type is changed \n";
    }
    if (guardian.gender != oldGuardian.gender){
        updates=updates+"guardian's gender is changed \n";
    }
    if (guardian.wpaddress != oldGuardian.wpaddress){
        updates=updates+"workplace address is changed \n";
    }
    if (guardian.wplandno != oldGuardian.wplandno){
        updates=updates+"workplace land number is changed \n";
    }
    if (guardian.position != oldGuardian.position){
        updates=updates+"position is changed \n"
    }
    if (guardian.status != oldGuardian.status){
        updates=updates+"status is changed \n";
    }
    if (guardian.note != oldGuardian.note){
        updates=updates+"note is changed \n"
    }

    return updates;
}

// define function for update guardian
const buttonGuardianUpdate = ()=>{
    let updates = checkGuardianUpdateForm();
    if (updates == ""){
        alert("nothing to update")
    }else {
        //get user confirmation
        const userConfirm =confirm("are you sure to update this guardian \n"+updates);
        if (userConfirm){
            //call put service
            let putServiceResponse=ajaxPutRequest("/guardian",guardian);
            if (putServiceResponse == "ok"){
                alert("updated successfully");
                guardianForm.reset();
                refreshGuardianForm();
                $('#modalGuardianAdd').modal('hide');
                refreshGuardianTable();
            }else {
                alert("error happened please retry"+putServiceResponse);
            }
        }
    }
}

//define function for delete guardian
const buttonGuardianDelete = (ob,rowIndex)=>{
    console.log('delete');

    tableGuardian.children[1].children[rowIndex].style.backgroundColor='pink';
    setTimeout(function (){
        const userConfirm=confirm('are you sure to delete this following guardian \n'
        +"\n firstname is "+ob.firstname
        +"\n lastname is "+ob.lastname
        +"\n nic is "+ob.nic
        );
        if (userConfirm){
            //call delete service
            let deleteServiceResponse=ajaxDeleteRequest("/guardian",ob);
            if (deleteServiceResponse=="ok"){
                alert("delete successful")
            }else {
                alert("delete unsuccessful error happened"+deleteServiceResponse);
            }
        }
        refreshGuardianTable();
    },500)


}

//define function for guardian check errors
const guardianCheckErrors = ()=>{
    let errors="";

    if (guardian.firstname == null){
        errors=errors+'please enter first name \n';
    }

    if (guardian.lastname == null){
        errors=errors+'please enter last name \n';
    }


    return errors;
}


//define function for guardian submit
const buttonGuardianAdd = ()=>{
    let errors = guardianCheckErrors();
    if (errors == ""){
        let userConfirm =confirm("are you sure to add this guardian"
        +'\n first name is'+guardian.firstname
        +'\n last name is'+guardian.lastname
        );
        if (userConfirm){
            let serverResponse=ajaxPostRequest("/guardian",guardian)
            if (serverResponse=="ok"){
                alert("save success "+serverResponse);
                refreshGuardianTable();
                guardianForm.reset();
                refreshGuardianForm();
                $('#modalGuardianAdd').modal('hide');

            }else {
                alert("save not success"+serverResponse);
            }
        }
    }else {
        alert("you might have following errors "+errors);
    }
}

