use prueba;

create table Usuarios(
	ID int identity(1,1) primary key,
	Nombre varchar(255),
	Apellido varchar(255),
	Edad varchar(255),
	Correo varchar(255),
	Contrase�a varchar(255)
);

create table Encuestas(
	ID int identity(1,1) primary key,
	Nombre varchar(255),
	Descripcion varchar(255)
);

create table Preguntas(
	ID int identity(1,1) primary key,
	Encuestas_id int,
	Pregunta varchar(255),
	foreign key(Encuestas_id) references Encuestas(id)
);

create table Respuestas(
	ID int identity(1,1) primary key,
	Usuario_id int,
	Pregunta_id int,
	Respuesta varchar(255),
	foreign key(Usuario_id) references Usuarios(id),
	foreign key(Pregunta_id) references Preguntas(id)
);

insert into Encuestas(Nombre, Descripcion) values ('Actividad F�sica', 'Encuesta sobre actividad f�sica.');
insert into Encuestas (Nombre, Descripcion) values ('Alimentaci�n Diaria', 'Encuesta sobre alimentaci�n diaria.');
insert into Encuestas (Nombre, Descripcion) values ('Sedentarismo', '�Encuesta sobre sedentarismo.');

insert into Preguntas (Encuestas_id, Pregunta) values (1, '�Cu�ntas veces a la semana haces ejercicio?');
insert into Preguntas (Encuestas_id, Pregunta) values (1, '�Qu� tipo de ejercicio prefieres?');
insert into Preguntas (Encuestas_id, Pregunta) values (1, '�Cu�l es tu deporte favorito?');
insert into Preguntas (Encuestas_id, Pregunta) values (1, '�Qu� te motiva a hacer ejercicio?');

insert into Preguntas (Encuestas_id, Pregunta) values (2, '�Con qu� frecuencia consumes frutas y verduras en tu dieta diaria?');
insert into Preguntas (Encuestas_id, Pregunta) values (2, '�Qu� tipo de alimentos sueles consumir en el desayuno?');
insert into Preguntas (Encuestas_id, Pregunta) values (2, '�Prefieres comidas caseras o alimentos procesados?');
insert into Preguntas (Encuestas_id, Pregunta) values (2, '�Eres consciente de lo que consumes y sus consecuencias?');

insert into Preguntas (Encuestas_id, Pregunta) values (3, '�Cu�ntas horas al d�a pasas sentado o inactivo?');
insert into Preguntas (Encuestas_id, Pregunta) values (3, '�Realizas alguna actividad f�sica regularmente?');
insert into Preguntas (Encuestas_id, Pregunta) values (3, '�C�mo te sientes despu�s de largos per�odos de inactividad?');
insert into Preguntas (Encuestas_id, Pregunta) values (3, '�Crees que la falta de actividad f�sica afecta la salud?');

select * from Usuarios;
select * from Encuestas;
select * from Preguntas;
select * from Respuestas;