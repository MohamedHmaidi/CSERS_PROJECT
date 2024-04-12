// chat.service.ts
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Stomp.Client;
  messages: any[] = [];
  username: string = 'mohamed'; 
  connectionEstablished: boolean = false;
  onConnectCallback: () => void;

  constructor() { }

  initializeWebSocketConnection(callback: () => void) {
    this.onConnectCallback = callback; 
    const socket = new SockJS('http://localhost:8089/csers/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connecté : ' + frame);
      this.connectionEstablished = true; 
      if (this.onConnectCallback) {
        this.onConnectCallback(); 
      }
      this.stompClient.subscribe('/topic/public', (message) => {
        this.handleMessage(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message: string) {
    if (message.trim() !== '') { 
      if (this.connectionEstablished) { 
        this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ type: 'CHAT', content: message, sender: this.username }));
      }
    }
  }

  addUser() {
    if (this.connectionEstablished && this.username) { 
      const joinMessage = `  ${this.username} a rejoint la salle de discussion`; 
      this.stompClient.send('/app/chat.addUser', {}, JSON.stringify({ type: 'JOIN', content: joinMessage, sender: this.username })); // Envoyer le message de connexion
    }
  }

  private handleMessage(message: any) {
    if (message.type === 'LEAVE') {
      this.messages.push({ sender: this.username, content: `${message.sender} a quitté la salle de discussion` });
    } else {
      this.messages.push(message);
    }
  }
}
