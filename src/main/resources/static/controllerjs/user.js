window.addEventListener('load', () => {

    //call refresh user form function
    refreshUserForm();

    //call refresh user table function
    refreshUserTable();

});
//define function for refresh user table
const refreshUserTable = () => {
    users = ajaxGetRequest("/user/findall");


    const displayProperty = [   //create array to display property and dataType to generate column in table
        {dataType: 'function', propertyName: getEmployee},
        {dataType: 'text', propertyName: 'username'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getUserRole},
        {dataType: 'function', propertyName: getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(tableUser, users, displayProperty, true)


}

//define function for refresh user form
const refreshUserForm = () => {

    user = new Object();    //define new object reason is for this to help with binding with front end
    user.roles = new Array(); //define empty array to store user roles
    formUser.reset();       //reset user form using reset function

    employeeWithoutUserAccount = ajaxGetRequest("/employee/withoutuseraccount")
    fillDataIntoSelect(selectEmployee, 'select employee', employeeWithoutUserAccount, 'fullname')

    // roles=ajaxGetRequest("/role/findall")
    // fillDataIntoSelect(selectRole,'select role',roles,'name');

    roleWithoutAdmin = ajaxGetRequest("/role/rolelistwithoutadmin");
    divRoles.innerHTML="";

    roleWithoutAdmin.forEach(role => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');

        div.className = 'form-check form-check-inline';
        input.type = 'checkbox';

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(role);
            } else {
                user.roles.pop(role);
            }
        }

        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);

    });


    // statuses = [
    //     {id: 1, name: 'active'},
    //     {id: 2, name: 'not-active'},
    // ];
    //
    // fillDataIntoSelect(selectStatus, 'select status', statuses, 'name');


    selectEmployee.style.border = '2px solid #ced4da';
    textUserName.style.border = '2px solid #ced4da';
    textPassword.style.border = '2px solid #ced4da';
    textRePassword.style.border = '2px solid #ced4da';
    textEmail.style.border = '2px solid #ced4da';
    // selectRole.style.border = '2px solid #ced4da';
    selectStatus.style.border = '2px solid #ced4da';
}

//create function for get user status
const getUserStatus = (ob) => {
    if (ob.status == '1') {
        return '<p class="status-working">' + 'active' + '</p>';
    } else {
        return '<p class="status-delete">' + 'not-active' + '</p>';
    }
}

//define function for get employee
const getEmployee = (ob) => {
    // return ob.employee_id.fullname;
    // return "employee";
    // return ob.employee_id.fullname;
    if (ob.employee_id != null){
        return ob.employee_id.fullname;
    }else {
        return "----";
    }
}

//create function for get user role
const getUserRole = (ob) => {
    return 'role';
}

//create function for user form refill

const userFormRefill = (ob, rowIndex) => {
    console.log('refill');
    user = JSON.parse(JSON.stringify(ob));
    oldUser = JSON.parse(JSON.stringify(ob));

    //open user model
    $('#modalUserAdd').modal('show');

    //set values into elements
    let employeeWithoutUserAccount=ajaxGetRequest("/employee/withoutuseraccount")
    employeeWithoutUserAccount.push(user.employee_id);
    fillDataIntoSelect(selectEmployee,'select employee',employeeWithoutUserAccount,'fullname',user.employee_id.fullname)
    selectEmployee.disabled=true;

    textUserName.value = user.username;

    textPassword.value=""
    textPassword.disabled=true;

    textRePassword.value="";
    textRePassword.disabled=true;

    textEmail.value=user.email;
    selectStatus.value=user.status;


    roleWithoutAdmin = ajaxGetRequest("/role/rolelistwithoutadmin");
    divRoles.innerHTML="";

    roleWithoutAdmin.forEach(role => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');

        div.className = 'form-check form-check-inline';
        input.type = 'checkbox';

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(role);
            } else {
                // user.roles.pop(role);
                let extIndex = user.roles.map(item => item.name).indexOf(role.name);
                if (extIndex != -1){
                    user.roles.splice(extIndex,1)
                }
            }
        }

        let extIndex = user.roles.map(item => item.name).indexOf(role.name);
        if (extIndex != -1){
           input.checked = true;
        }



        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);

    });




}

// create function for delete user
const deleteUser = (ob, rowIndex) => {
    console.log('delete '+" object is "+ob+" row index is"+rowIndex);

    tableUser.children[1].children[rowIndex].style.backgroundColor = 'pink';

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following user \n'
            + '\n employee is ' + ob.employee_id.fullname
            + '\n user name is ' + ob.username
            + '\n status is ' + ob.status
        );
        if (userConfirm) {
            const deleteServerResponse = ajaxDeleteRequest("/user",ob);
            if (deleteServerResponse == 'ok') {
                // alert('delete successful')
                swal.fire({title: 'delete successful', icon: 'success'});
            } else {
                // alert('delete was unsuccessful you might have following errors \n'+deleteServerResponse)
                swal.fire({title: 'delete was unsuccessful you might have following errors \n', icon: 'error'})
            }
        }
        refreshUserTable();
    }, 500)
};

//define function for print user
const printUser = () => {
    console.log('print');
}

//define function for user form check errors
const checkFormErrors = () => {
    let errors = '';
    if (user.employee_id == null) {
        errors = errors + 'employee cannot be empty \n'
        selectEmployee.classList.add('is-invalid');
    }
    if (user.username == null) {
        errors = errors + 'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    if (user.password == null) {
        errors = errors + 'password cannot be empty \n'
        textPassword.classList.add('is-invalid');
    }
    if (textRePassword.value == "") {
        errors = errors + 're password cannot be empty \n'
        textRePassword.classList.add('is-invalid');
    }
    if (user.email == null) {
        errors = errors + 'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    if (user.status == null) {
        errors = errors + 'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for check user update form  errors
const checkUserUpdateFormErrors = () => {
    let errors = '';
    // if (user.employee == null) {
    //     errors = errors + 'employee cannot be empty \n'
    //     selectEmployee.classList.add('is-invalid');
    // }
    if (user.username == null) {
        errors = errors + 'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    // if (user.password == null) {
    //     errors = errors + 'password cannot be empty \n'
    //     textPassword.classList.add('is-invalid');
    // }
    // if (user.repassword == null) {
    //     errors = errors + 're password cannot be empty \n'
    //     textRePassword.classList.add('is-invalid');
    // }
    if (user.email == null) {
        errors = errors + 'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    if (user.status == null) {
        errors = errors + 'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for user form submit
const userSubmit = () => {
    console.log(user);
    const errors = checkFormErrors();
    //if errors not available
    if (errors == '') {
        //get user confirmation
        let UserConfirm=confirm('are you sure to add this user details \n'
        +'\n user name is'+user.username
        +'\n email is '+user.email
        +'\n status is '+user.status
        );
        if (UserConfirm){
            let serverResponse= ajaxPostRequest("/user",user);
            if (serverResponse='ok'){
                alert("save successfully ");
                $('#modalUserAdd').modal('hide');
                refreshUserForm();
                formUser.reset();
                refreshUserTable();

            }else {
                alert("fail to add user. error happened \n"+serverResponse);
            }
        }


    } else {
        swal.fire({
            title: 'you might have some errors \n' + errors,
            icon: 'error'
        })
    }
}

//define function for get user form update errors
const checkUserFormUpdate = ()=>{
    let updates = ''

    if (user.employee_id.id != oldUser.employee_id.id){
        updates=updates+'employee is changed \n'
    }

    if (user.username != oldUser.username){
        updates=updates+'username is updated \n'
    }
    if (user.email != oldUser.email){
        updates=updates+'email is updated \n';
    }

    if (user.status != oldUser.status){
        updates=updates+'status is changed \n';
    }

    // if (user.roles.length != oldUser.roles.length){
    //     updates=updates+'user roles are changed \n';
    // }
    // else {
    //     let equalCount=0;
    //     for (let i=0; i<user.roles.length; i++){
    //         for (let j = 0; j < oldUser.roles.length; j++) {
    //             if (user.roles[i].name == oldUser.roles[j].name){
    //                 equalCount=equalCount+1;
    //                 break;
    //             }
    //         }
    //     }
    //     if (equalCount != user.roles.length){
    //         updates=updates+'user role is changed \n';
    //     }
    // }


    return updates;
}


//define function for user update
const userUpdate = ()=>{
    console.log('update');

    console.log(user);
    console.log(oldUser);

    //check form errors
    let errors = checkUserUpdateFormErrors();
    if (errors == ""){

        //check form updates
        let updates = checkUserFormUpdate();
        if (updates == ""){
            alert("nothing to update");
        }else {
            let userConfirm = confirm('are you sure to update this user changes \n'+updates);
            if (userConfirm){
                //call put service
                let putServiceResponse=ajaxPutRequest("/user",user);
                if (putServiceResponse=="ok"){
                    alert('update successful');
                    refreshUserTable();
                    formUser.reset();
                    $('#modalUserAdd').modal('hide');
                    refreshUserForm();
                    refreshUserTable();


                }else {
                    alert("fail to update. you might have some errors \n"+putServiceResponse)
                }
            }
        }


    }else {
        alert('user form has following errors \n'+errors);
    }


}


//define function for password retype validator
const passwordRetypeValidator = ()=>{
    // textPassword
    // textRePassword
    if (textPassword.value == textRePassword.value){
        textRePassword.style.border='2px solid green';
        user.password = textPassword.value;
    }else {
        textRePassword.style.border="2px solid red";
        user.password=null;
    }
}


























































