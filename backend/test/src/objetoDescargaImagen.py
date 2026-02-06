import os

from flask import jsonify


def test_descarga_imagen(latitud, longitud, fecha_inicio, fecha_fin):
    print("Iniciando test de descarga de imagen...")
    print(f"Parámetros recibidos - Latitud: {latitud}, Longitud: {longitud}, Fecha Inicio: {fecha_inicio}, Fecha Fin: {fecha_fin}")
    print(f"Parámetros recibidos - Latitud: {latitud}, Longitud: {longitud}, Fecha Inicio: {fecha_inicio}, Fecha Fin: {fecha_fin}")

    #conexion a GEE entrega de parametros y descarga de imagen a carpeta statica, 

    return jsonify({"rutaImg": "RUTAIMAGEN"})


if __name__ == "__main__":

    test_descarga_imagen("-72.190533", "-39.270163", "2024-01-01", "2024-01-31")
