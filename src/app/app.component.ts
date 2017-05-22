import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
  GenerateKeyPair(): void {
  }
  AcceptNew(): void {
    console.log(this.textarea);
    crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256, // can be  128, 192, or 256
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ['encrypt', 'decrypt'] // can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    ).then(function(key) { });
    const encrypted_text = this.textarea;
    const obj = new NewMessage;
    obj.Content = encrypted_text;
    const body = JSON.stringify(obj);
    console.log(body);
    // const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    // this.http.post((this.address + 'new'), body, { headers: headers });
  }
}
