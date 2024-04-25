import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {
  //  DAY!:any

  constructor(){}
  transform(value: unknown, args: unknown[]): unknown {
    // this.DAY = value.toString().substring(0,2);
    let day = value.toString().substring(3,5);
    // let day = value.toString().substring(6,10);
    return null;
  }

}
