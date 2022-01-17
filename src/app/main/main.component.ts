import { Component, OnInit } from '@angular/core';
import { LanguageUtil } from 'src/util/language.util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(public languageUtil: LanguageUtil) { }

  language: string;

  ngOnInit() {
    this.language = navigator.language.split('-')[0];
  }



}
