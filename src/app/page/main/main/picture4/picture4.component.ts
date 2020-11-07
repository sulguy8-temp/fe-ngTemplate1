import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-picture4',
  templateUrl: './picture4.component.html',
  styleUrls: ['./picture4.component.css']
})
export class Picture4Component implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  profileForm2 = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });

  get aliases() {
    return this.profileForm2.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control('', Validators.required));
  }

  onSubmit() {
    console.warn(this.profileForm2.value);
  }

  /////////////////////////////////////////////////////////////////////

  hero = { name: '', alterEgo: '', power: '' }
  heroForm = new FormGroup({
    name: new FormControl(this.hero.name, [
      Validators.required,
      Validators.minLength(4),
      this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]),
    alterEgo: new FormControl(this.hero.alterEgo),
    power: new FormControl(this.hero.power, Validators.required)
  });

  get name2() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }

  updateProfile() {
    this.profileForm2.get('lastName').setValue('ysys');
    this.profileForm2.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
}

// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {forbiddenName: {value: control.value}} : null;
//   };
// }

