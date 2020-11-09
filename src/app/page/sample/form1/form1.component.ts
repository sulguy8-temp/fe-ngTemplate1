import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { SampleResult } from 'src/app/page/sample/common/vo/s-user-info'
@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  tmpClasses = ['국어', '영어', '수학', '과학']

  constructor(
    private fb: FormBuilder,
    private res: SampleResult
  ) { }

  ngOnInit(): void {
    this.findInvalid();
  }

  /****************************** 기본 Form Setting ******************************/
  sampleForm = this.fb.group({
    // 목적에 맞게 Validator를 추가해서 사용
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
    id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    passwordCheck: ['', [Validators.required, this.matchValues('password')]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    }),
    hobbyList: this.fb.array([
      // ['']
    ]),
    classes: ['', [Validators.required]]
  });

  get sampleFormAll() { return JSON.stringify(this.sampleForm.value) }

  // 화면에서 에러처리를 위한 get 함수 구현 // 
  get getAttr(){ return this.sampleForm.controls; }
  // get file() { return this.sampleForm.get('file'); }
  // get id() { return this.sampleForm.get('id'); }
  // get password() { return this.sampleForm.get('password'); }
  // get passwordCheck() { return this.sampleForm.get('passwordCheck'); }
  // get firstName() { return this.sampleForm.get('firstName'); }
  // get lastName() { return this.sampleForm.get('lastName'); }
  // get email() { return this.sampleForm.get('email'); }
  // get gender() { return this.sampleForm.get('gender'); }
  // get street() { return this.sampleForm.get('address').get('street'); }
  // get city() { return this.sampleForm.get('address').get('city'); }
  // get state() { return this.sampleForm.get('address').get('state'); }
  // get zip() { return this.sampleForm.get('address').get('zip'); }
  get hobbyList() { return this.sampleForm.get('hobbyList') as FormArray; }
  // get classes() { return this.sampleForm.get('classes'); }

  /**************************** 사용 가능한 Validator ****************************/
  // # min(min: number): ValidatorFn 
  // => 최소 number값

  // # max(max: number): ValidatorFn 
  // => 최대 number값

  // # required(control: AbstractControl): ValidationErrors | null
  // => 필수값

  // # requiredTrue(control: AbstractControl): ValidationErrors | null
  // => Radio, CheckBox 필수값

  // # email(control: AbstractControl): ValidationErrors | null
  // => Email 서식이 맞는지 체크

  // # minLength(minLength: number): ValidatorFn
  // => 문자열 최소길이

  // # maxLength(maxLength: number): ValidatorFn
  // => 문자열 최대길이

  // # nullValidator(control: AbstractControl): ValidationErrors | null
  // => 확인필요...

  // # compose(validators: ValidatorFn[]): ValidatorFn | null
  // => 여러가지 validator들을 하나로 합쳐서 모두 True일때 True를 리턴함

  // # composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
  // => compose와 같지만 Promise<ValidationErrors | null> | Observable<ValidationErrors | null> 반환하는 Validator에만 사용 가능.

  // # pattern(pattern: string | RegExp): ValidatorFn
  // => 정규표현식으로 반드시 포함되어야 하는 문자열

  // # nonPattern()
  // => 정규표현식으로 포함되면 안되는 문자열
  nonPattern(regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = regExp.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  // # matchValues()
  // => 두 값이 일치하는지 확인할 때 ex) 비밀번호 확인
  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value ? null : { isMatching: false };
    };
  }


  /******************************************************************************/

  invalidList = [];

  findInvalid() {
    let invalid = [];
    let controls = this.sampleForm.controls;
    for (let name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    this.invalidList = invalid;
  }

  // 백엔드 샘플 데이터
  updateSampleProfile() {
    this.res = {
      file: null,
      fileSource: null,
      id: 'testID',
      password: '1234567',
      firstName: 'ChulSu',
      lastName: 'Kim',
      email: 'testId@naver.com',
      gender: '0',
      address: {
        street: '21 finney st',
        city: 'hurstvile',
        state: 'Sydney',
        zip: '20199'
      },
      hobbyList: [1, 2, 3, 4],  // '1,2,3,4'로 받는게 아닌 JSON.stringify 이용하여 [1,2,3,4] 형태로 오가야 타입에러가 안남.
      classes: '수학'
    };

    // 리스트 초기화
    this.hobbyList.clear();

    // 리스트를 적용할 때는 해당 인덱스만큼 push해줘야 함.
    for (let list of this.res.hobbyList) {
      this.hobbyList.push(this.fb.control(list, Validators.required));
    }

    // 백엔드로 보낼 vo에 현재 Form을 붙이는 함수
    this.sampleForm.patchValue(this.res);

    this.findInvalid();
  }

  addHobby() {
    this.hobbyList.push(this.fb.control('', Validators.required));
  }

  deleteHobby(i) {
    this.hobbyList.removeAt(i);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sampleForm.patchValue({
        fileSource: file
      });
    }
    this.readImgUrl(event);
    console.log(this.sampleForm)
  }

  url;
  readImgUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.sampleForm.get('fileSource').value);
    // this.http.post('http://localhost:8001/upload.php', formData)
    // .subscribe(res => {
    //   console.log(res);
    //   alert('Uploaded Successfully.');
    // })
  }

}
