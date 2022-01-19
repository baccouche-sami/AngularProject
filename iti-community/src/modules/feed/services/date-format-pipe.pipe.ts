import { DateTime } from 'luxon';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipePipe implements PipeTransform {

  transform(value: number) {
    console.log(value); 
    let date = DateTime.fromSeconds(value)
    return date.setLocale('fr').toLocaleString({
           year: 'numeric',
           month: 'long',
           day: 'numeric',
           hour: 'numeric',
           minute: '2-digit',
           //timeZoneName: 'short'
         });
  }


}
