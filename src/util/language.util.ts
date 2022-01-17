import { language as ptBr} from '../app/languages/pt-br'
import { language as enGb} from '../app/languages/en-gb'
import { language as esEs} from '../app/languages/es-es'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LanguageUtil {

 getByCode(code: string, label: string) {

    if(!code) {
      return ptBr[label]
    }

    if(code === 'pt-br' || code == 'pt') {
      return ptBr[label]
    }

    if(code === 'en-gb' || code == 'en') {
      return enGb[label]
    }

    if(code === 'es-es' || code == 'es') {
      return esEs[label]
    }

    return enGb[label]
  }

}
