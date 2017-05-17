import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import * as crypto from 'crypto';
import * as ecies from 'standard-ecies';

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
  cryptopt = {
    hashName: 'sha256',
    hashLength: '32',
    macName: 'sha256',
    macLength: '32',
    curveName: 'secp256k1',
    symmetricChyperName: 'aes-256-cbc',
    iv: 6,
    keyFormat: 'uncompressed',
    s1: null,
    s2: null
  };
  ecdh = crypto.createECDH(this.cryptopt.curveName);
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
    this.ecdh.generateKeys();
    console.log(this.ecdh.getPrivateKey());
    console.log(this.ecdh.getPublicKey());
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
