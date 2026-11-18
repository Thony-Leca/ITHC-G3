document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        if (nombre && email) {
            alert(`Gracias por contactarnos, ${nombre}!`);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById("miBoton");
    const parrafo = document.getElementById("parrafo");

    boton.addEventListener("click", () => {
        parrafo.textContent = "El texto ha sido cambiado!";
    });
});

//Diferencia entre var, let y const

var a = 1;  // Variable con var
let b = 2;  // Variable con let
const c = 3;  // Variable con const

if (true) {
    var a = 4;  // Reasignación en var, afecta fuera del bloque
    let b = 5;  // Nueva variable en bloque, no afecta fuera del bloque
    const c = 6;  // Nueva variable en bloque, no afecta fuera del bloque
    console.log(a);  // 4
    console.log(b);  // 5
    console.log(c);  // 6
}

console.log(a);  // 4 (afectado por el var dentro del bloque)
console.log(b);  // 2 (no afectado por el let dentro del bloque)
console.log(c);  // 3 (no afectado por el const dentro del bloque)



