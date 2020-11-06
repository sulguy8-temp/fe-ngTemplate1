import { Directive, Self } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[formControlName]'
})
export class ErrorDirective {

  constructor(
    @Self()
    private formControlName: FormControlName
  ) { }

  ngOnInit() {
    console.log("On Error Directive")
    this.formControlName
      .statusChanges
      .subscribe(status => {
        console.log(this.formControlName['viewModel'])

        if ('INVALID' === status) {
          return;
        }
      });
  }
}
