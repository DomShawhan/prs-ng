import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: string): string {
    let lengthOfString: number = value.length;
    let newString: string = '';

    for(let i: number = 1; i <= lengthOfString; i++) {
      newString += '*';
    }

    return newString;
  }

}
