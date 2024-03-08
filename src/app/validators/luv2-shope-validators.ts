import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopeValidators {
    //white space validation
        static notOnlyWhitespace(control:FormControl):ValidationErrors{
            /*if validtion checks fails then return validation error(s)
            if validation check passes return null
            */ 
           //check if string only contain whitespace
           if ((control.value!=null) &&(control.value.trim().lenght===0)){

            // invalid return error object
            return{'notOnlyWhitespace':true};
            //validation error key the html template will check for this error key
           }else{
            //valid , return empty object
            return {};
        }
    }

}
