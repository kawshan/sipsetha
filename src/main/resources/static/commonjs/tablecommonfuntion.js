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
