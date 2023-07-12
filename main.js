var add = document.querySelector('.btn_add');
var inputs = document.querySelectorAll('.input_text');
var listPlayer = document.querySelector('.list_player');
inputs.forEach(function(input){
    input.addEventListener('blur',function(){
        checkValue(input,'form_group')   
    })
    input.oninput = function(){
        if(input.value != ''){
            var messageError = getParent(input,'form_group').querySelector('.error');
            messageError.innerText = '';
            input.style.border = '1px solid pink'
        }
    }
})

add.onclick = function(){
    var date = new Date;
    var month = date.toString().split(' ')[1].toUpperCase();
    var day = date.toString().split(' ')[2];
    var year = date.toString().split(' ')[3];
    var hour = date.toString().split(' ')[4].slice(0,2);
    var minute = date.toString().split(' ')[4].slice(3,5);
    var invalid = true;
    var inputValue = [];
    inputs.forEach(function(input){
        checkValue(input,'form_group');
        if(getParent(input,'form_group').querySelector('.error').innerText != ''){
            invalid = false;
            return invalid;
        }else{
            inputValue.push(input.value);
        }
    })
    if(invalid){
        listPlayer.insertAdjacentHTML('beforeend',`
        <li class="item_player">
            <div class="name_date">
                <div class="name">${inputValue[0].toUpperCase()} ${inputValue[1].toUpperCase()}</div>
                <div class="date">${month} ${day},${year} ${hour}:${minute}</div>
            </div>
            <div class="country_box">
                <div class="country">
                    ${inputValue[2].toUpperCase()}
                </div>
            </div>
            <div class="score">
                ${inputValue[3]}
            </div>
            <div class="btn">
                <div class="btn_delete">
                    <i class="fa-solid fa-trash delete_icon"></i>
                </div>
                <div class="btn_add-score">
                    +5
                </div>
                <div class="btn_delete-score">
                    -5
                </div>
            </div>
        </li>
    `);
    inputs.forEach(function(input){
        input.value = '';
    })
    }
    var dels = document.querySelectorAll('.btn_delete');
    var btnAddScores = document.querySelectorAll('.btn_add-score');
    var btnDelScores = document.querySelectorAll('.btn_delete-score');
    if(dels)
    {
        Array.from(dels).forEach(function(del){
            del.onclick = function(e){
                var li = getParent(e.target,'item_player');
                listPlayer.removeChild(li);
            }
        })

        Array.from(btnAddScores).forEach(function(btnAddScore){
            btnAddScore.onclick = function(e){
                var numStart = getParent(e.target,'item_player').querySelector('.score').innerText;
                var score = getParent(e.target,'item_player').querySelector('.score');
                score.innerText = Number(numStart) + 5;
            }
        })

        Array.from(btnDelScores).forEach(function(btnDelScore){
            btnDelScore.onclick = function(e){
                var numStart = getParent(e.target,'item_player').querySelector('.score').innerText;
                var score = getParent(e.target,'item_player').querySelector('.score');
                if((Number(numStart) - 5) <= 0){
                    score.innerText = '0';
                }else{
                    score.innerText = Number(numStart) - 5;
                }
            }
        })

    }
}




function getParent(element,classed) {
    while (element.parentElement) {
        if(element.parentElement.classList.contains(classed)){
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function checkValue(element,classEle) {
    if(element.value == '' || element.value == ' '){
        var messageError = getParent(element,classEle).querySelector('.error');
        element.style.border = '1px solid red'
        switch(element.getAttribute('placeholder')){
            case 'First Name':
                messageError.innerText = 'Vui lòng nhập First Name*';
                break;
            case 'Last Name':
                messageError.innerText = 'Vui lòng nhập Last Name*';
                break;
            case 'Country':
                messageError.innerText = 'Vui lòng nhập Country*';
                break;
            case 'Player Score':
                    messageError.innerText = 'Vui lòng nhập Player Score*';
                    break;
        };
    }
}