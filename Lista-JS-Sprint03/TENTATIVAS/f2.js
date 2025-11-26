const classTriangle = (lado1,lado2,lado3) => {
    if (lado1 === lado2 && lado1 === lado3){
        return "Equilátero"
    } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3){
        return "Isóceles"
    } else {
        return "Escaleno"
    }
};

console.log(classTriangle(3, 2, 1));
