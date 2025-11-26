function classificaDia(dia) {
    switch (dia) {
        case 1:
            console.log("fim de semana");
            break;
        case 2:       
        case 3:          
        case 4:           
        case 5:           
        case 6:
            console.log("util");
            break;
        case 7:
            console.log("fim de semana");
            break;
        default:
            console.log("dia inválido");
            break
            ;
    }
}

classificaDia(3)