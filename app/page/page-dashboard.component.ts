import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Page }        from './page';
import { PageService } from './page.service';
import {PageDetailComponent} from './page-detail.component'

@Component({
  selector: 'my-page-dashboard',
  templateUrl: 'app/page/page-dashboard.component.html',
  styleUrls: ['app/page/page-dashboard.component.css'],
    directives: [PageDetailComponent],

  providers: [
    PageService,
  ]

})
export class PageDashboardComponent implements OnInit {

  pages: Page[] = [];
  selectedPage:Page;
  sub:any;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['bookId'] !== undefined) {
        let id = +params['bookId'];
        this.pageService.setBookId(id);
 
    this.pageService.getPages()
      .then(pages=> {this.pages = pages;console.info(pages);});


  }
 });
}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSelect(page: Page) {
        this.selectedPage = page;
        console.info(page);

  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/