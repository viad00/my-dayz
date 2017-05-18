import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as crypto from 'webcrypto';

export class NewMessage {
  public Content: string;
  public Hash: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pubkey = '-----BEGIN PUBLIC KEY-----\n' +
  'AAAAB3NzaC1yc2EAAAABJQAAAgEAoGk22+PjQH4TEwT0v8qnYxm0YKcil4GB2j03\n' +
  'Ck5RamWid+TZGFH4aW0ekYe1aBB3Qt7FCs49zR3jxPpeQsv4AjehCB6AVU3R1rfL\n' +
  '2ze+qiERUVFLcrYr1pzbABn/5YWwkPQFZlgPx82bOMCavDWCY9Z7xLmxeqcdP6P0\n' +
  '7pbOe3UnIOSxPZblXvSHiYueAzL1o2bqaT2aJtF2yxuPQq/XDkBjAQ/kcOpVYr5Y\n' +
  'm9/5WwI8bBiipY+xLlXSa78TvVdoTZHdf7EIXZD0rGxmhxOT7KjO1QXycpprX7Yz\n' +
  'eOQVgc8W+B9fCkAaVaznNNo+wfVUUc5qp5urAz/OcF9X0AfjKjI9pXh6eqeipNA1\n' +
  'hBYeGrsxSOuTcd48t2OCQzt9213oj7PZEUImAnkXP3sYKykn2w2HseEzG9q/WszV\n' +
  '3mENtPkApY7EapMfNV8wN0H7q8zZSv4AwkG3jhWKYgRfHURNMkx9jdnF2H+LbuH+\n' +
  'uyAh+SXDNuu8iEmMNrZBaUAVPJlqxX1O7i0t0XYiC509jdQvFIGI2FGVPXtudk5c\n' +
  'IXX0miZ8ZXUJHBKu/j/piWzejJTGHfdgBcA9gdnskZjgoNyBkU2adURMgkKwXA+n\n' +
  'Nb6WC+oxojn8RJGz127gwGGVgChX7h+uF2SL8m4C1AgBkV63CU9BNtRiAzZcCJhL\n' +
  'V+g5roU=\n' +
  '-----END PUBLIC KEY-----';
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
    if (this.pass === 'genmekey') {
      this.GenerateKeyPair();
    }
  }
  AddNew(): void {
    this.showDialog = true;
  }
  HideNew(): void {
    this.showDialog = false;
    this.textarea = null;
  }
  GenerateKeyPair(): void {
  }
  AcceptNew(): void {
    console.log(this.textarea);
    console.log(this.pubkey);
    const encrypted_text = crypto.publicEncrypt(this.pubkey, this.textarea);
    const obj = new NewMessage;
    obj.Content = encrypted_text;
    obj.Hash = '';
    const body = JSON.stringify(obj);
    console.log(body);
    const dejson = JSON.parse(body);
    console.log(dejson);
    // const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    // this.http.post((this.address + 'new'), body, { headers: headers });
  }
}
