export interface Estacionamiento {
    id?:               string;
    hora_entrada:     string;
    hora_salida:      string;
    importe:          string;
    total_tiempo:     string;
    vehiculo_placa:   string;
    created_at?:       string;
    updated_at?:       string;
    tipo_vehiculo_id?: string;
    nombre?:           string;
}