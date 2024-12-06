window.addEventListener('load',()=>{
    //create new privilege object
    console.log('working')
    privilege = new Object();

    // call refresh privilege table function
    refreshPrivilegeTable();

    roles=[
        {id:1,name:'manger'},
        {id:2,name:'cashier'},
        {id:3,name:'receptionist'}
    ];
    fillDataIntoSelect(selectRole,'select an option',roles,'name');

    modules=[
        {id:1,name:'employee'},
        {id:2,name:'student'},
        {id:3,name:'teacher'},
        {id:4,name:'guardian'}
    ];

    fillDataIntoSelect(selectModule,'select an option',modules,'name');

});


const refreshPrivilegeTable = ()=>{
    //privilege data array for testing before spring project
    privileges=[
        {id:1,role_id:{id:1, name:'manager'},module_id:{id:1, name:'employee'},sel:true,inst:true,upd:true,del:true},
        {id:2,role_id:{id:1, name:'assistant-manager'},module_id:{id:1, name:'employee'},sel:true,inst:true,upd:true,del:true},
        {id:3,role_id:{id:1, name:'reception'},module_id:{id:1, name:'employee'},sel:true,inst:false,upd:false,del:true},
        {id:4,role_id:{id:1, name:'labour'},module_id:{id:1, name:'employee'},sel:false,inst:false,upd:false,del:false}
    ];

    // display property array list
    displayProperty=[
        {dataType:'function',propertyName:getRole},
        {dataType:'function',propertyName:getModule},
        {dataType:'function',propertyName:getSelect},
        {dataType:'function',propertyName:getInsert},
        {dataType:'function',propertyName:getUpdate},
        {dataType:'function',propertyName:getDelete},
    ];

    fillDataIntoTable(tablePrivilege,privileges,displayProperty,true)
}


// define function for get role
const getRole = (ob)=>{
    return ob.role_id.name;
}
// define function for get module
const getModule = (ob)=>{
    return ob.module_id.name;
}
// define function for get select
const getSelect = (ob)=>{
    return ob.sel;
}
// define function for get insert
const getInsert = (ob)=>{
return ob.inst;
}
// define function for get update
const getUpdate = (ob)=>{
return ob.upd;
}
// define function for get delete
const getDelete = (ob)=>{
return ob.del;
}

//define function for privilege refill
const privilegeFormRefill = (ob,rowIndex)=>{
    console.log('refill '+ ob+' '+rowIndex);
}

const deletePrivilege = (ob,rowIndex)=>{
    console.log('delete' + ob + ' ' + rowIndex);

    tablePrivilege.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following privilege \n'
        + '\n role is ' + ob.role_id.name
        + '\n module is ' + ob.module_id.name
        + '\n select privilege ' + ob.sel
        + '\n insert privilege ' + ob.inst
        + '\n update privilege ' + ob.upd
        + '\n delete privilege ' + ob.del
        );
        if (userConfirm){
            const deleteServerResponse='ok';
            if (deleteServerResponse == 'ok'){
                alert('delete successful');
                Swal.fire({ title:'delete successful', icon:'success'});
            }else {
                // alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                Swal.fire({ title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse, icon: 'error'});
            }
        }
        refreshPrivilegeTable();
    },500)
};

//create function for print privilege
const printPrivilege = (ob,rowIndex)=>{
    console.log('print ' +ob+' '+rowIndex);
}


//create function for check privilege form errors
const checkFormErrors = ()=>{
    let errors='';
    if (privilege.role_id == null){
        errors =errors+' role cannot be empty \n'
        selectRole.classList.add('is-invalid');
    }
    if (privilege.module_id == null){
        errors = errors+' module cannot be empty \n'
        selectModule.classList.add('is-invalid');
    }
    if (privilege.sel == null){
        errors = errors+' select cannot be empty \n'
        checkboxSelect.classList.add('is-invalid');
    }
    if (privilege.inst == null){
        errors = errors+' insert cannot be empty \n'
        checkboxInsert.classList.add('is-invalid');
    }
    if (privilege.upd == null){
        errors = errors+' update cannot be empty \n'
        checkboxUpdate.classList.add('is-invalid');
    }
    if (privilege.del == null){
        errors=errors+' delete cannot be empty \n'
        checkboxDelete.classList.add('is-invalid');
    }
    return errors;
};


//create function for submit privilege form
const privilegeSubmit = () => {
    console.log(privilege);

    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        //get user confirmation
    }else {
        // alert('you might have some errors \n'+errors);
        swal.fire({title:'you might have some errors \n '+errors, icon:'error'})
    }
}

























