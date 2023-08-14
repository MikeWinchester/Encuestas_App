const SERVER = "20.81.55.219"; //Servirdor que está ejecutando las peticiones
const PORT = "5000"; //Puerto del servidor

document.getElementById('correoError').style.display = 'none';
document.getElementById('register-error').style.display = 'none';

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {}; //Este JSON va a contener todos los datos que el usuario ingresó para registrarse
  
    //Se procede a llenar el JSON
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    //Consumimos el servicio web para registrar un usuario
    fetch(`http://${SERVER}:${PORT}/registrar_usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObject) 
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.message === "Usuario existente"){
            document.getElementById("register-error").style.display = 'block';
        }else if(result.message === "Registro exitoso"){
            alert("¡Su cuenta se ha registrado exitosamente!");
            window.location.href = "index.html";
        };
    })
    .catch(error => console.log('error', error));

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