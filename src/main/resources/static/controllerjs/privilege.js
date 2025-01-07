window.addEventListener('load', () => {
    //create new privilege object
    console.log('working')


    // call refresh privilege table function
    refreshPrivilegeTable();

    //call refresh privilege form function
    refreshPrivilegeForm();

    //some of my experiment codes at the end of privilegeFormRefill function need to re change after watching privilege module in online session

});

//define function for refresh privilege table
const refreshPrivilegeTable = () => {
    //privilege data array for testing before spring project
    privileges = ajaxGetRequest("/privilege/findall")

    // display property array list
    displayProperty = [
        {dataType: 'function', propertyName: getRole},
        {dataType: 'function', propertyName: getModule},
        {dataType: 'function', propertyName: getSelect},
        {dataType: 'function', propertyName: getInsert},
        {dataType: 'function', propertyName: getUpdate},
        {dataType: 'function', propertyName: getDelete},
    ];

    fillDataIntoTable(tablePrivilege, privileges, displayProperty, true)
    $('#tablePrivilege').dataTable();
}
//define function for filter module list by given role id
const generateModuleList = ()=>{
    modulesByRole = ajaxGetRequest("/module/listbyrole?roleid="+JSON.parse(selectRole.value).id);
    fillDataIntoSelect(selectModule,'select module',modulesByRole,'name');
    selectModule.disabled=false;
}



//define function for refresh privilege form
const refreshPrivilegeForm = () => {
//create empty privilege object
    privilege = new Object();

    roles = ajaxGetRequest("/role/findall");
    fillDataIntoSelect(selectRole, 'select an option', roles, 'name');
    selectRole.disabled=false

    modules = ajaxGetRequest("/module/findall");
    fillDataIntoSelect(selectModule, 'select an option', modules, 'name');
    selectModule.disabled=true


    selectRole.style.border="1px solid #4ced4da";
    selectModule.style.border="1px solid #4ced4da";

    privilege.sel=false;
    privilege.inst=false;
    privilege.upd=false;
    privilege.del=false;

    labelSelect.innerText="not granted";
    labelInsert.innerText="not granted";
    labelUpdate.innerText="not granted";
    labelDelete.innerText="not granted";



}

// define function for get role
const getRole = (ob) => {
    return ob.role_id.name;
}
// define function for get module
const getModule = (ob) => {
    return ob.module_id.name;
}
// define function for get select
const getSelect = (ob) => {
    let priv;
    if (ob.sel) {
        priv = "granted";
    } else {
        priv = "not-granted"
    }
    return priv;

}
// define function for get insert
const getInsert = (ob) => {
    let priv;
    if (ob.inst){
        priv = "granted";
    }else {
        priv = "not-granted"
    }
    return priv;
}
// define function for get update
const getUpdate = (ob) => {
    let priv;
    if(ob.upd){
        priv="granted"
    }else {
        priv="not-granted"
    }
    return priv;
}

// define function for get delete
const getDelete = (ob) => {
    let priv;
    if (ob.del){
        priv="granted"
    }else {
        priv="not-granted"
    }
    return priv;
}

//define function for privilege refill
const privilegeFormRefill = (ob, rowIndex) => {
    console.log('refill ' + ob + ' ' + rowIndex);

    console.log("refill");
    $("#modalPrivilegeAdd").modal('show');

    privilege=JSON.parse(JSON.stringify(ob));
    oldPrivilege=JSON.parse(JSON.stringify(ob));

    roles=ajaxGetRequest("/role/findall")
    fillDataIntoSelect(selectRole,"select role",roles,'name',privilege.role_id.name);

    modules=ajaxGetRequest("/module/findall");
    fillDataIntoSelect(selectModule,"select module",modules,"name",privilege.module_id.name)

// start of my codes



    if (privilege.sel==true){
        checkboxSelect.checked=true;
        labelSelect.innerHTML='select privilege is granted'
    }else {
        checkboxSelect.checked=false;
        labelSelect.innerHTML='select privilege is not granted'
    }

    if (privilege.inst==true){
        checkboxInsert.checked=true;
        labelInsert.innerHTML='insert privilege is granted'
    }else {
        checkboxInsert.checked=false;
        labelInsert.innerHTML='insert privilege is not granted';

    }

    if (privilege.upd==true){
        checkboxUpdate.checked=true;
        labelUpdate.innerHTML='update privilege is granted';
    }else {
        checkboxUpdate.checked=false;
        labelUpdate.innerHTML='update privilege is not granted';
    }

    if (privilege.del==true){
        checkboxDelete.checked=true;
        labelDelete.innerHTML='delete privilege is granted';
    }else {
        checkboxDelete.checked=false;
        labelDelete.innerHTML='delete privilege is not granted';
    }

    // end of my codes
    //refill not complete .......maybe


}

//define function for delete privilege
const deletePrivilege = (ob, rowIndex) => {
    console.log('delete' + ob + ' ' + rowIndex);

    tablePrivilege.children[1].children[rowIndex].style.backgroundColor = 'pink';

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following privilege \n'
            + '\n role is ' + ob.role_id.name
            + '\n module is ' + ob.module_id.name
            + '\n select privilege ' + ob.sel
            + '\n insert privilege ' + ob.inst
            + '\n update privilege ' + ob.upd
            + '\n delete privilege ' + ob.del
        );
        if (userConfirm) {
            const deleteServerResponse =ajaxDeleteRequest("/privilege",ob)
            if (deleteServerResponse == 'ok') {
                alert('delete successful');
                refreshPrivilegeTable();
            } else {
                alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse);
            }
        }
    }, 500)
};

//create function for print privilege
const printPrivilege = (ob, rowIndex) => {
    console.log('print ' + ob + ' ' + rowIndex);
}


//create function for check privilege form errors
const checkFormErrors = () => {
    let errors = '';
    if (privilege.role_id == null) {
        errors = errors + ' role cannot be empty \n'
        selectRole.classList.add('is-invalid');
    }
    if (privilege.module_id == null) {
        errors = errors + ' module cannot be empty \n'
        selectModule.classList.add('is-invalid');
    }
    if (privilege.sel == null) {
        errors = errors + ' select cannot be empty \n'
        checkboxSelect.classList.add('is-invalid');
    }
    if (privilege.inst == null) {
        errors = errors + ' insert cannot be empty \n'
        checkboxInsert.classList.add('is-invalid');
    }
    if (privilege.upd == null) {
        errors = errors + ' update cannot be empty \n'
        checkboxUpdate.classList.add('is-invalid');
    }
    if (privilege.del == null) {
        errors = errors + ' delete cannot be empty \n'
        checkboxDelete.classList.add('is-invalid');
    }
    return errors;
};


//create function for submit privilege form
const privilegeSubmit = () => {
    console.log("submit");
    console.log(privilege);

    const errors = checkFormErrors();
    if (errors == '') {
        //if errors not available
        //get user confirmation
        let userConfirm = confirm('are you sure to add this privilege record \n'
        +'\n role is '+privilege.role_id.name
        +'\n module  is '+privilege.module_id.name
        +'\n select privilege is '+privilege.sel
        +'\n insert privilege is '+privilege.inst
        +'\n update privilege is '+privilege.upd
        +'\n delete privilege is '+privilege.del
        );
        if (userConfirm){
            let serverResponse = ajaxPostRequest("/privilege",privilege);
            if (serverResponse=='ok'){
                alert('save successful '+serverResponse);
                refreshPrivilegeTable();
                formPrivilege.reset();
                refreshPrivilegeForm();
                $('#modalPrivilegeAdd').modal('hide');
            }else {
                alert('save not success...\n'+serverResponse);
            }
        }
    } else {
        alert('you might have some errors \n'+errors);
    }
}

//create function for check privilege form update
const checkUpdate= ()=>{
    let updates = '';

    if (privilege.sel != oldPrivilege.sel){
        updates=updates+"select is changed \n"
    }
    if (privilege.inst != oldPrivilege.inst){
        updates=updates+"insert is changed \n";
    }
    if (privilege.upd != oldPrivilege.upd){
        updates=updates+"update is changed \n";
    }
    if (privilege.del != oldPrivilege.del){
        updates=updates+"delete is changed \n"
    }

    if (privilege.role_id.name != oldPrivilege.role_id.name){
        updates=updates+"role is changed \n";
    }

    if (privilege.module_id.name != oldPrivilege.module_id.name){
        updates=updates+"module is changed \n"
    }


    return updates;
}

//define function for privilege form update
const buttonPrivilegeUpdate = ()=>{
    console.log('update ');
    console.log(privilege);
    console.log(oldPrivilege);
    let updates = checkUpdate();
    if (updates != ''){
        const userConfirm =confirm("are you sure to update following updates\n"+updates);
        if (userConfirm){
            let serverResponse= ajaxPutRequest("/privilege",privilege);
            if (serverResponse == "ok"){
                alert("update successful"+serverResponse);
                $('#modalPrivilegeAdd').modal('hide');
                formPrivilege.reset();
                refreshPrivilegeForm();
                refreshPrivilegeTable();
            }else {
                alert("update is not successful"+serverResponse);
            }
        }
    }else {
        alert("nothing to update");
    }
}






















