console.log(document)
const inputs = document.querySelectorAll('.input-user, .input-password');

let cuentas = [
    { nombre: 'Shirley', saldo: 100, retiro: 0, deposito: 0, password: '12345'},
    { nombre: 'Alexa', saldo: 200, retiro: 0, deposito: 0, password: '12345'},
    { nombre: 'Ricardo', saldo: 300, retiro: 0, deposito: 0, password: '12345'}
];
    
function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFunc(){
    let parent = this.parentNode.parentNode;
    if(this.value == ''){
        parent.classList.remove('focus');
    }
}

inputs.forEach(inputs => {
    inputs.addEventListener('focus', focusFunc);
    inputs.addEventListener('blur', blurFunc);
})

function login() {
let username = document.getElementById('user').value;
let password = document.getElementById('password').value;
let valid = false;

if (username === '' && password === ''){
    alert('Complete los cambos vacíos.')
    return;
}
else if (username === '') {
    alert('Ingrese el usuario.');
    return;
}
else if (password === '') {
    alert('Ingrese la contraseña.');
    return;
}
for (let i = 0; i < cuentas.length; i++) {
    if (cuentas[i].nombre === username && cuentas[i].password === password) {
        valid = true;
            document.getElementById('login').style.display = 'none';
            document.getElementById('menu').style.display = 'flex';
            document.getElementById('uno').style.display = 'none';
            document.getElementById('dos').style.display = 'flex';
            document.getElementById('dos').style.flexWrap = 'wrap';
            document.getElementById('menu').style.flexWrap = 'wrap';
            document.getElementById('r1').checked = true;
            document.querySelector('.text-p-m').textContent = `Bienvenido/a ${username}`;
            /* let userAccount = cuentas.find(account => account.nombre === username); */
            updateMenu();
            break;
    }
}
    if (!valid) {
        alert('Usuario y/o contraseña incorrectos.');
    }
}

    function clearOne() {
        var result = document.getElementById('dinero');
        result.value = result.value.slice(0, -1);
        if (result.value === '$') {
        result.value = '';
        }
    }

    function cancel() {
        var result = document.getElementById('dinero');
        result.value = '';
    }
    
    function logout() {
        document.getElementById('uno').style = '';
        document.getElementById('dos').style.display = 'none';
        document.getElementById('login').style = '';
        document.getElementById('menu').style.display = 'none';
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
        document.getElementById('dinero').value = '';
        // Remover la clase "focus" de los elementos de entrada
        inputs.forEach(input => {
        let parent = input.parentNode.parentNode;
        parent.classList.remove('focus');
        });
        let radioButtons = document.querySelectorAll('input[name="opciones"]');
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
    }
    
    function checkEnter(event) {
        if (event.keyCode === 13) {
            login();
        }
    }

function clickBoton(button) {
    let dineroInput = document.getElementById('dinero');
    let currentValue = dineroInput.value;
    let newValue;
    if (currentValue === '') {
        newValue = '$' + button.textContent;
    } else {
        newValue = currentValue + button.textContent;
    }
    dineroInput.value = newValue;
}

function ok() {
    let username = document.getElementById('user').value;
    let action = document.querySelector('input[name="opciones"]:checked').value;
    let dineroInput = document.getElementById('dinero');
    let userAccount = cuentas.find(account => account.nombre === username);
    if (action === 'r1') {
        updateMenu();
    } else if (action === 'r2') {
        if(dineroInput.value === ''){
            alert('Escribe un monto válido.');
        }else{
            userAccount.deposito = parseFloat(dineroInput.value.slice(1));
            if(userAccount.saldo + userAccount.deposito <991){
                if (userAccount.saldo === 990 && dineroInput.value.includes('.')) {
                    alert('Sin decimales.');
                } else {
                    userAccount.saldo += userAccount.deposito;
                }
                dineroInput.value = '';
                document.getElementById('r1').checked = true;
                updateMenu();
            }else{
                alert('Excedes del límite actual ($990 pesos)');
                dineroInput.value = '';
                userAccount.deposito=0;
            }
        }
    } else if (action === 'r3') {
        if(dineroInput.value === ''){
            alert('Escribe un monto válido.');
        }else{
            userAccount.retiro = parseFloat(dineroInput.value.slice(1));
            if(userAccount.saldo - userAccount.retiro >9){
                if (userAccount.saldo === 10 && dineroInput.value.includes('.')) {
                    alert('Sin decimales.');
                } else {
                    userAccount.saldo -= userAccount.retiro;
                }
                dineroInput.value = '';
                document.getElementById('r1').checked = true;
                updateMenu();
            }else{
                alert('Tu cuenta no puede tener menos de $10 pesos.');
                dineroInput.value = '';
                userAccount.retiro=0;
            }
        }
    } 
}

function updateMenu() {
    const username = document.getElementById('user').value;
    const action = document.querySelector('input[name="opciones"]:checked').value;
    const dineroInput = document.getElementById('dinero');
    const imageInput = document.getElementById('imagen');
    const userAccount = cuentas.find(account => account.nombre === username);
    const buttons = document.querySelectorAll('.keyboard button');
    
    if (userAccount.saldo >= 0 && userAccount.saldo <= 9) {
      imageInput.placeholder = 'Depósite mínimo $10 pesos.';
      imageInput.style.backgroundSize = '0%, 0%, 0%, 15%';
      if (action === 'r1') {
        buttons.forEach(button => button.disabled = true);
        document.getElementById('cancel').style.backgroundColor = 'gray';
        document.getElementById('clear').style.backgroundColor = 'gray';
        document.getElementById('ok').style.backgroundColor = 'gray';
        document.getElementById('punto').style.backgroundColor = 'gray';
        dineroInput.value = ' Saldo: $' + userAccount.saldo;
      } else if (action === 'r2' || action === 'r3') {
        buttons.forEach(button => button.disabled = false);
        document.getElementById('cancel').style.backgroundColor = '';
        document.getElementById('clear').style.backgroundColor = '';
        document.getElementById('ok').style.backgroundColor = '';
        document.getElementById('punto').style.backgroundColor = '';
        dineroInput.value = '';
      }
    } else if (userAccount.saldo >= 10 && userAccount.saldo <= 990) {
      buttons.forEach(button => button.disabled = false);
      document.getElementById('cancel').style.backgroundColor = '';
      document.getElementById('clear').style.backgroundColor = '';
      document.getElementById('ok').style.backgroundColor = '';
      document.getElementById('punto').style.backgroundColor = '';
      
      if (action === 'r1') {
        buttons.forEach(button => button.disabled = true);
        document.getElementById('cancel').style.backgroundColor = 'gray';
        document.getElementById('clear').style.backgroundColor = 'gray';
        document.getElementById('ok').style.backgroundColor = 'gray';
        document.getElementById('punto').style.backgroundColor = 'gray';
        imageInput.placeholder = 'Sus movimientos actuales: ';
        imageInput.style.backgroundSize = '15%, 0%, 0%, 0%';
        if (userAccount.deposito > 0 || userAccount.retiro > 0) {
          if (userAccount.deposito > 0) {
            dineroInput.value = 'Ingresado: $' + userAccount.deposito + '   Balance:  $' + userAccount.saldo;
            userAccount.deposito = 0;
          } else if (userAccount.retiro > 0) {
            dineroInput.value = 'Retirado: $' + userAccount.retiro + '   Balance: $' + userAccount.saldo;
            userAccount.retiro = 0;
          }
        } else {
          dineroInput.value = ' Saldo: $' + userAccount.saldo;
        }
        if (userAccount.saldo === 990) {
          alert('Has ingresado el límite máximo de tu cuenta ($990 pesos)');
        } else if (userAccount.saldo === 10) {
          alert('Tú cuenta esta en el límite mínimo ($10 pesos)');
        }
      } else if (action === 'r2' || action === 'r3') {
        buttons.forEach(button => button.disabled = false);
        document.getElementById('cancel').style.backgroundColor = '';
        document.getElementById('clear').style.backgroundColor = '';
        document.getElementById('ok').style.backgroundColor = '';
        document.getElementById('punto').style.backgroundColor = '';
        if (action === 'r2'){
            imageInput.placeholder = 'Ingrese una nueva cantidad: ';
            imageInput.style.backgroundSize = '0%, 17%, 0%, 0%';
            dineroInput.value = '';
        } else if (action === 'r3') {
            imageInput.placeholder = '¿Deseas retirar?, cuanto: ';
            imageInput.style.backgroundSize = '0%, 0%, 15%, 0%';
            dineroInput.value = '';
        }
    }
  }}
