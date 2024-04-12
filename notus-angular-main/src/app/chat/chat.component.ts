import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.initializeWebSocketConnection(() => {
      this.chatService.addUser(); 
    });
  }

  sendMessage() {
    if (this.message && this.message.trim() !== '') { 
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}