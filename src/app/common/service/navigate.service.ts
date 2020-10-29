import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(
    private router: Router,
    private lc: Location,
    private ac: ActivatedRoute,
  ) { }

  goPage(url) {
    this.router.navigateByUrl(url);
  }
}
