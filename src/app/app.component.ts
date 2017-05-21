import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
  GenerateKeyPair(): void {
    window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4096, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: 'SHA-512'}, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ['encrypt', 'decrypt'] // must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
    )
    .then(function(key){
      // returns a keypair object
      console.log(key);
      console.log(key.publicKey);
      console.log(key.privateKey);
      window.crypto.subtle.exportKey(
        'jwk', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        key.publicKey // can be a publicKey or privateKey, as long as extractable was true
      )
      .then(function(keydata){
        // returns the exported key data
        console.log(keydata);
      });
      window.crypto.subtle.exportKey(
        'pkcs8', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        key.privateKey // can be a publicKey or privateKey, as long as extractable was true
      )
      .then(function(keydata){
        // returns the exported key data
        console.log(new Uint8Array(keydata));
      });
    });
  }
  AcceptNew(): void {
    console.log(this.textarea);
    const encrypted_text = this.textarea;
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
