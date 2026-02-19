// Ejemplo de GeoJSON complejo
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Punto A",
        info: { categoria: "sitio", id: 1 }
      },
      geometry: {
        type: "Point",
        coordinates: [-72.23, -39.27]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Línea B",
        extra: { descripcion: "tramo", activo: true }
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-72.23, -39.27],
          [-72.24, -39.28]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Polígono C",
        datos: { area: 100 }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.23, -39.27],
            [-72.24, -39.27],
            [-72.24, -39.28],
            [-72.23, -39.28],
            [-72.23, -39.27]
          ]
        ]
      }
    }
  ],
  metadata: {
    autor: "David",
    fecha: "2026-02-19"
  }
};

// Función recursiva para obtener todos los nombres de claves y buscar un valor
function findKeysAndValue(obj, targetKey, found = []) {
  if (typeof obj !== 'object' || obj === null) return found;
  for (const key in obj) {
    found.push(key);
    if (key === targetKey) {
      found.push({ [key]: obj[key] });
    }
    if (typeof obj[key] === 'object') {
      findKeysAndValue(obj[key], targetKey, found);
    }
  }
  return found;
}

// Ejemplo de uso: obtener todas las claves y buscar 'coordinates'
const allKeysAndCoords = findKeysAndValue(geojson, 'coordinates');
console.log(allKeysAndCoords);

// Esto te dará un array con todos los nombres de claves y los valores encontrados para 'coordinates'.
