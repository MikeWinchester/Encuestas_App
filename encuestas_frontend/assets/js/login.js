const SERVER = "localhost"; //Servirdor que está ejecutando las peticiones
const PORT = "5000"; //Puerto del servidor

document.getElementById('error-login').style.display = 'none';
document.getElementById('correoError').style.display = 'none';

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {}; //Este JSON va a contener todos los datos que el usuario ingresó para logearse
  
    //Se procede a llenar el JSON
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    //Consumimos el servicio web para iniciar sesión
    fetch(`http://${SERVER}:${PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObject) 
    })
    .then(response => response.json())
    .then(result => {console.log(result)
        if (result.message === "Login exitoso"){
            localStorage.setItem('correo', document.getElementById('correo').value);
            alert("¡Sesión iniciada con éxito!");
            window.location.href = "landing.html";
        }else{
            document.getElementById("error-login").style.display = "block";
        }
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