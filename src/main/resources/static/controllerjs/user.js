window.addEventListener('load',()=>{
    user = new Object();

    refreshUserTable();

    roles=[
        {id:1,name:'owner'},
        {id:2,name:'manager'},
        {id:3,name:'cashier'}
    ];
    fillDataIntoSelect(selectRole,'select role',roles,'name');

    statuses=[
        {id:1,name:'working'},
        {id:2,name:'resign'},
        {id:3,name:'delete'},
    ];

    fillDataIntoSelect(selectStatus,'select status',statuses,'name');


});

const refreshUserTable = ()=>{
    users=[
        {employee:'value1',username:'kawshan',password:'kawshan1234',repassword:'kawshan1234',email:'kawshan@gmail.com',role_id:{id:1,name:'owner'},userstatus_id:{id:1,name: 'working'}},
        {employee:'value1',username:'galapatha',password:'galapatha1234',repassword:'galapatha1234',email:'galapatha@gmail.com',role_id:{id:2,name:'manager'},userstatus_id:{id:2,name: 'resign'}},
        {employee:'value1',username:'doti',password:'doti1234',repassword:'doti1234',email:'doti@gmail.com',role_id:{id:3,name:'cashier'},userstatus_id:{id:3,name: 'delete'}}
    ];


    const displayProperty=[
        {dataType:'text',propertyName:'employee'},
        {dataType:'text',propertyName:'username'},
        {dataType:'text',propertyName:'password'},
        {dataType:'text',propertyName:'repassword'},
        {dataType:'text',propertyName:'email'},
        {dataType:'function',propertyName:getUserRole},
        {dataType:'function',propertyName:getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(tableUser,users,displayProperty,true)


}

//create function for get user status
const getUserStatus = (ob)=>{
    if (ob.userstatus_id.name == 'working'){
        return '<p class="status-working">'+ob.userstatus_id.name+'</p>';
    }
    if (ob.userstatus_id.name == 'resign'){
        return '<p class="status-resign">'+ob.userstatus_id.name+'</p>';

    }
    if (ob.userstatus_id.name == 'delete'){
        return '<p class="status-delete">'+ob.userstatus_id.name+'</p>';
    }
}


//create function for get user role
const getUserRole =(ob) =>{
    return ob.role_id.name;
}

//create function for user form refill

const userFormRefill = (ob,rowIndex) =>{
    console.log('refill');
}

// create function for delete user
const deleteUser=(ob,rowIndex)=>{
    console.log('delete');

    tableUser.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
    const userConfirm = confirm('are you sure to delete following user \n'
    + 'employee is'+ob.employee
    + 'user name is'+ob.username
    + 'role is'+ob.role_id.name
    + 'status is'+ob.userstatus_id.name
    );
    if (userConfirm){
        const deleteServerResponse = 'ok';
        if (deleteServerResponse == 'ok'){
            // alert('delete successful')
            swal.fire({title:'delete successful',icon:'success'});
        }else {
            // alert('delete was unsuccessful you might have following errors \n'+deleteServerResponse)
            swal.fire({title: 'delete was unsuccessful you might have following errors \n',icon: 'error'})
        }
    }
    refreshUserTable();
    },500)
};

//define function for print user
const printUser = ()=>{
    console.log('print');
}

//define function for user form check errors
const checkFormErrors = ()=> {
    let errors = '';
    if (user.employee == null){
        errors=errors+'employee cannot be empty \n'
        selectEmployee.classList.add('is-invalid');
    }
    if (user.username == null){
        errors=errors+'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    if (user.password == null){
        errors=errors+'password cannot be empty \n'
        textPassword.classList.add('is-invalid');
    }
    if (user.repassword == null){
        errors=errors+'re password cannot be empty \n'
        textRePassword.classList.add('is-invalid');
    }
    if (user.email == null){
        errors=errors+'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    if (user.role_id == null){
        errors=errors+'role cannot be empty \n';
        selectRole.classList.add('is-invalid');
    }
    if (user.userstatus_id == null){
        errors=errors+'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for user form submit
const userSubmit = ()=>{
    console.log(user);
    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        //get user confirmation
    }else {
        swal.fire({
            title:'you might have some errors \n' +errors,
            icon:'error'
        })
    }
}


























































