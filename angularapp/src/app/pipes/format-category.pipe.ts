import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCategory'
})
export class FormatCategoryPipe implements PipeTransform {

  transform(value: string): string {
    if(value=='' || !value){
      return 'Unknown'
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
