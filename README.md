# Aplicación base arquetipo Angular Campus Dual
Esta aplicación es una **aplicación base** que se usa para generar el arquetipo que usan los alumnos de Campus Dual. Esto significa que cualquier cambio que se desee hacer al arquetipo, se debe hacer en esta aplicación, que generará el nuevo arquetipo a partir de su estructura e información.

El arquetipo se genera a través de *GitHub Actions*. Estas actions están guardadas en la carpeta <code>.github</code> por lo que **esta carpeta no debe de modificarse**.

El arquetipo se genera mediante Maven, pero esta es una aplicación Angular. ***Durante*** la GitHub Action, se crea un fichero <code>pom.xml</code> para que pueda crearse el arquetipo, con un plugin que permitirá que al **pasarle un flag en el comando de generación del proyecto** a través del arquetipo, se ***borre ese fichero***.

## Cambios que se realizan sobre el proyecto en el arquetipo
* *AUTOMÁTICO*: Se genera un fichero <code>pom.xml</code> para poder generar un arquetipo del proyecto.
* *AUTOMÁTICO*: Se elimina cualquier rastro de las *GitHub Actions*, tanto las de despliegue del arquetipo en *Maven Central* como las de escaneo del código con *SonarCloud* (incluyendo las propiedades del pom.xml relacionadas).
* *AUTOMÁTICO*: Este fichero *README.md* se elimina, y **se renombra el fichero HELP.md como el README.md del arquetipo**.

## ¿Cómo usar el arquetipo?
El arquetipo lo podemos usar ejecutando el siguiente comando de Maven en la carpeta que queramos ubicar el proyecto
```
mvn -B archetype:generate -DgroupId=_ -DartifactId=YOUR_PROJECT_FOLDER_NAME -Dversion=_ -Dpackage=_ -DarchetypeGroupId=com.campusdual -DarchetypeArtifactId=skeleton-frontend-archetype -DarchetypeVersion=1.0.0-SNAPSHOT -DinteractiveMode=false -Dgoals=clean:clean
```

## ¿Cómo probar el arquetipo?
#### Descargando el fichero que se genera en GitHub Action
Descarga y descomprime (extensión *\*.tar.gz*) el fichero **frontend-zip** que se encuentra añadido en el resumen de la ejecución de la action del despliegue del arquetipo para tener una carpeta con el proyecto creado
![image](https://i.imgur.com/7N858zX.png)
#### Ejecutando el comando Maven
Ejecutar el siguiente comando Maven, que es el mismo que ejecuta la GitHub Action del paso anterior
```
mvn -B archetype:generate -DgroupId=_ -DartifactId=frontendtest -Dversion=_ -Dpackage=_ -DarchetypeGroupId=com.campusdual -DarchetypeArtifactId=skeleton-frontend-archetype -DarchetypeVersion=1.0.0-SNAPSHOT -DinteractiveMode=false -Dgoals=clean:clean
```
