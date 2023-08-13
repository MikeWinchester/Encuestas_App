from flask import Blueprint, request, jsonify
import pyodbc
from .config import DB_CONFIG

main = Blueprint('main', __name__)

#Endpoint para registrar a un usuario
@main.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():
    try:
        data = request.get_json()

        connection = pyodbc.connect(**DB_CONFIG)
        cursor = connection.cursor()

        query = """
        INSERT INTO Usuarios (Nombre, Apellido, Edad, Correo, Contraseña)
        VALUES (?, ?, ?, ?, ?)
        """
        
        values = (
            data['nombre'],
            data['apellido'],
            data['edad'],
            data['correo'],
            data['contraseña']
        )

        user_query = "SELECT * FROM Usuarios WHERE Correo = ?"
        cursor.execute(user_query, data['correo'])
        found_user = cursor.fetchone()
        if found_user:
            return jsonify({"message": "Usuario existente"}), 500

        cursor.execute(query, values)
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Registro exitoso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Endpoint para iniciar sesión
@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    connection = pyodbc.connect(**DB_CONFIG)
    cursor = connection.cursor()

    query = "SELECT * FROM Usuarios WHERE Correo = ? AND Contraseña = ?"
    cursor.execute(query, data['correo'], data['contraseña'])

    found_user = cursor.fetchone()

    if found_user:
        return jsonify({"message": "Login exitoso"}), 200
    else:
        return jsonify({"message": "Usuario no encontrado"}), 500

#Endpoint para enviar las respuestas de una encuesta
@main.route('/publicar_encuesta', methods=['POST'])
def publicar_encuesta():
    try:
        data = request.get_json()

        correo = data['correo']
        preguntas = data['preguntas']
        respuestas = data['respuestas']

        connection = pyodbc.connect(**DB_CONFIG)
        cursor = connection.cursor()

        # Obtener el ID del usuario
        query_usuario = "SELECT ID FROM Usuarios WHERE Correo = ?"
        cursor.execute(query_usuario, correo)
        usuario_id = cursor.fetchone()

        if usuario_id:
            for pregunta_nombre, respuesta in zip(preguntas, respuestas):
                
                query_pregunta = "SELECT ID FROM Preguntas WHERE Pregunta = ?"
                cursor.execute(query_pregunta, pregunta_nombre)
                pregunta_id = cursor.fetchone()

                if pregunta_id:

                    query_respuesta = """
                    INSERT INTO Respuestas (Usuario_id, Pregunta_id, Respuesta)
                    VALUES (?, ?, ?)
                    """
                    values = (usuario_id[0], pregunta_id[0], respuesta)
                    cursor.execute(query_respuesta, values)
                    connection.commit()
                else:
                    return jsonify({"error": f"Pregunta '{pregunta_nombre}' no encontrada"}), 404
            cursor.close()
            connection.close()
            return jsonify({"message": "Respuestas almacenadas exitosamente"}), 200
        else:
            return jsonify({"error": f"Usuario con correo '{correo}' no encontrado"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500