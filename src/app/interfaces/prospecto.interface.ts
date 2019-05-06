export interface Prospecto {
  id?: number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  edad?: number;
  email?: string;
  password?: string;
  generoId?: number;
  estadoCivilId?: number;
  nivelId?: number;
  programaId?: number;
  etiquetaGenero?: string;
  etiquetaEdoCivil?: string;
  etiquetaNivelInt?: string;
  etiquetaPrograma?: string;
  licenciaturaId?: number;
  postgraduateId?: number;
  confirmarPassword?: string;
}
