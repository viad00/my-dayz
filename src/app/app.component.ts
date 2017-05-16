import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { PrivateKey, PublicKey } from 'bitcore-lib';

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
    const keypair = new PrivateKey();
    const pubpair = new PublicKey(keypair, true);
    console.log(keypair.toString());
    console.log(pubpair.toString());
  }
  AcceptNew(): void {
    console.log(this.textarea);
    const obj = new NewMessage;
    obj.Content = this.textarea;
    obj.Sign = '';
    const body = JSON.stringify(obj);
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    this.http.post((this.address + 'new'), body, { headers: headers });
  }
}
