import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-picture4',
  templateUrl: './picture4.component.html',
  styleUrls: ['./picture4.component.css']
})
export class Picture4Component implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    radio: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {

  }

  test(){
    console.log(this.form)
    console.log(this.form.status)
  }
}
