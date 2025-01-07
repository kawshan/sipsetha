window.addEventListener('load', () => {
    //create new privilege object
    console.log('working')


    // call refresh privilege table function
    refreshPrivilegeTable();

    //call refresh privilege form function
    refreshPrivilegeForm();


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
}

//define function for refresh privilege form
const refreshPrivilegeForm = () => {

    privilege = new Object();

    roles = ajaxGetRequest("/role/findall")
    fillDataIntoSelect(selectRole, 'select an option', roles, 'name');

    modules = ajaxGetRequest("/module/findall")

    fillDataIntoSelect(selectModule, 'select an option', modules, 'name');

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

    privilege=JSON.parse(JSON.stringify(ob));
    oldPrivilege=JSON.parse(JSON.stringify(ob));

    console.log("refill");
    $("#modalPrivilegeAdd").modal('show');


    fillDataIntoSelect(selectRole,"select role",roles,'name',privilege.role_id.name)
    fillDataIntoSelect(selectModule,"select module",modules,"name",privilege.module_id.name)


    checkboxSelect
    checkboxInsert
    checkboxUpdate
    checkboxDelete

    //refill not complete


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
                // alert('delete successful');
                Swal.fire({title: 'delete successful', icon: 'success'});
            } else {
                // alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                Swal.fire({
                    title: 'delete unsuccessful you might have following errors \n' + deleteServerResponse,
                    icon: 'error'
                });
            }
        }
        refreshPrivilegeTable();
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
    console.log(privilege);

    const errors = checkFormErrors();
    if (errors == '') {
        //if errors not available
        //get user confirmation
    } else {
        // alert('you might have some errors \n'+errors);
        swal.fire({title: 'you might have some errors \n ' + errors, icon: 'error'})
    }
}

























