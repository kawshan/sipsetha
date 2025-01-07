//create tables

const fillDataIntoTable = (tableId,dataList,columnList,checkPrivilege, buttonVisibility=true)=>{
    const tableBody = tableId.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnList.forEach(column =>{
            const  td = document.createElement('td');
            if (column.dataType == 'text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType == 'function'){
                td.innerHTML=column.propertyName(element);
            }

            if (column.dataType=='photoarray'){
                let img=document.createElement('img');
                img.style.width="75px";
                img.style.height="75px";
                if (dataList[index][column.propertyName]==null){
                    img.src="/icons/no-photo.png";
                }else {
                    img.src=atob(dataList[index][column.propertyName])//btoa eken encrypt karanawa meken decrypt karanawa
                }
                td.appendChild(img);
            }



            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');
        tdButton.className = 'text-center'

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyButton.className ='d-block'

            checkPrivilege(element);


        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}
const fillDataIntoPaymentTable = (tableId,dataList,columnList, buttonVisibility=true)=>{
    const tableBody = tableId.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnList.forEach(column =>{
            const  td = document.createElement('td');
            if (column.dataType == 'text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType == 'function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });


        const tdButton = document.createElement('td');
        tdButton.className = 'text-center'

        const inputRadio = document.createElement('input');
        inputRadio.className = 'form-check-input mt-3';
        inputRadio.name='modify';
        inputRadio.type='radio';

        inputRadio.onchange = function (){
            window['editOb'] = element;
            window['editRow'] = index;

            divModifyButton.className ='d-block'
            divModifyButtonDelete.className='d-none';
            divModifyButtonRefill.className='d-none';




        }
        tdButton.appendChild(inputRadio);

        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);

    });
}

const fillDataIntoTableInnerTable = (tableID, dataList, columnsList, editFunction, deleteFunction, buttonVisibility = true )=>{

    const tableBody = tableID.children[1];
    tableBody.innerHTML='';

    dataList.forEach((element,index)=>{

        const tr =document.createElement('tr');

        const tdIndex =document.createElement('td');
        tdIndex.innerText=parseInt(index)+1;
        tr.appendChild(tdIndex);


        columnsList.forEach(column =>{
            const td =document.createElement('td');

            if (column.dataType=='text'){
                td.innerText=element[column.propertyName];
            }
            if (column.dataType=='function'){
                td.innerHTML=column.propertyName(element);
            }
            tr.appendChild(td);
        });



        const tdButton =document.createElement('td');


        const buttonEdit=document.createElement('button');
        buttonEdit.className='btn btn-warning fw-bold';
        buttonEdit.innerHTML='<i class="fa-solid fa-edit fa-beat"></i> edit'
        buttonEdit.onclick = function (){
            editFunction(element,index);

        }

        const buttonDelete=document.createElement('button');
        buttonDelete.className='btn btn-danger ms-2 me-2'
        buttonDelete.innerHTML='<i class="fa-solid fa-trash fa-beat"></i> delete'
        buttonDelete.onclick = function (){
            deleteFunction(element,index);
            // console.log('delte');
            // confirm('are you sure to delete following employee');
        }


        tdButton.appendChild(buttonEdit)
        tdButton.appendChild(buttonDelete)


        if (buttonVisibility){
            tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);



    });

}