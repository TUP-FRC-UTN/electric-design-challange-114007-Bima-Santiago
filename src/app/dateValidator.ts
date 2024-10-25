import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class dateValidator{
    static validarFecha(control : FormControl) : ValidationErrors | null{
      const fecha = new Date(control.value)
      const fechaHoy = new Date();

      if(fecha > fechaHoy){
        return {errorFecha : true}
      }
      return null;
    }
}
