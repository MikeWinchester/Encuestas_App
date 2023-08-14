const SERVER = "20.81.55.219"; //Servirdor que está ejecutando las peticiones
const PORT = "5000"; //Puerto del servido

//Al momento de que se presione el botón de "Enviar Encuesta", se ejecuta este código
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const respuestas = []; //Este JSON va a contener todos los datos que el usuario ingresó
    const preguntas = [];

    respuestas.push(document.getElementById("pregunta1").value);
    respuestas.push(document.getElementById("pregunta2").value);
    respuestas.push(document.getElementById("pregunta3").value);
    respuestas.push(document.getElementById("pregunta4").value);

    preguntas.push(document.getElementById("1").innerHTML);
    preguntas.push(document.getElementById("2").innerHTML);
    preguntas.push(document.getElementById("3").innerHTML);
    preguntas.push(document.getElementById("4").innerHTML);

    //Agregamos el atributo de "encuesta" para poder identificar qué encuesta llenó el usuario
    let finalForm = {
                      "respuestas": respuestas,
                      "preguntas": preguntas
                    };
    finalForm.correo = localStorage.getItem('correo');

    //Consumimos el servicio web para poder publicar una encuesta
    fetch(`http://${SERVER}:${PORT}/publicar_encuesta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalForm) 
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    //Imprimimos en consola la data
    console.log(finalForm);

    //Reiniciamos los campos una vez enviada la encuesta
    document.getElementById("surveyForm").reset();
    alert("¡Encuesta enviada con éxito!");
    window.location.href = "../../landing.html";
  });

//Función para validar un correo electrónico
function validateEmail(){
  const email = document.getElementById('correo').value;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const result = regex.test(email);
  if(!result){
      document.getElementById('correoError').style.display = 'block';
  }else{
      document.getElementById('correoError').style.display = 'none';
  }
}