export interface Vehiculo {
    placa:              string;
    "tipo_vehiculo:id": TipoVehiculoID;
    created_at?:       string;
    updated_at?:       string;
}

export interface TipoVehiculoID {
    Oficial:      "1";
    Residente:    "2";
    No_Residente: "3";
}