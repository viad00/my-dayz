import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as CryptoJS from 'crypto-js';

export class NewMessage {
  public Content: string;
  public Sign: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showCon = false;
  showDialog = false;
  address = 'http://127.0.0.1:8000/api/';
  pass: string;
  textarea: string;
  constructor(private http: Http) {}
  Exit(): void {
    this.showCon = false;
  }
  Decrypt(): void {
    this.showCon = true;
  }
  AddNew(): void {
    this.showDialog = true;
  }
  HideNew(): void {
    this.showDialog = false;
    this.textarea = null;
  }
  AcceptNew(): void {
    console.log(this.textarea);
    const encrypted_text = CryptoJS.AES.encrypt(this.textarea, this.pass);
    const obj = new NewMessage;
    obj.Content = encrypted_text.toString();
    const body = JSON.stringify(obj);
    console.log(body);
    console.log(CryptoJS.AES.decrypt(obj.Content, this.pass).toString(CryptoJS.enc.Utf8));
    // const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    // this.http.post((this.address + 'new'), body, { headers: headers });
  }
}
