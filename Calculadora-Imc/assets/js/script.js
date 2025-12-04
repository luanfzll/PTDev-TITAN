//Seleção de elementos
const form = document.querySelector('#form');
const infos = document.querySelector('#infos')


//Funções

//Eventos
form.addEventListener('submit', function(e){
    e.preventDefault()

    const weight = document.querySelector('#weight').value;
    const height = document.querySelector('#height').value;

    const bmi = (weight / (height * height)).toFixed(2)

    const value = document.querySelector('#value')
    value.classList.add('attention')
    let description;

    infos.classList.remove('hidden')

    if(bmi < 18.5) {
        description = 'Cuidado! Você está abaixo do peso!'
    } else if (bmi >= 18.5 && bmi <= 25) {
        value.classList.remove('attention')
        value.classList.add('ideal')
        description = 'Você está no peso ideal!'
    } else if (bmi > 25 && bmi <= 30) {
        description = 'Cuidado! Você está acima do peso'
    } else if (bmi > 30 && bmi <= 35) {
        description = 'Cuidado! Você está com obesidade moderada!'
    } else if (bmi > 35 && bmi <= 40) {
        description = 'Cuidado! Você está com obesidade severa!'
    } else {
        description = 'Cuidado! Você está com obesidade mórbida!'
    }

    value.textContent = bmi.replace('.', ',')
    document.querySelector('#description').textContent = description
})