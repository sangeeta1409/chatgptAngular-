import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  conversation = new Subject<Message[]>();
  messageMap: {[key: string]: string} = {
    // 'hi': 'Hello! How can I assist you today?',
    'hii':'Hello! How can I assist you today?',
    'Hi': 'Hello ! How can I assist you today?',
    'hlo':'please check your spelling',
    'hello':'Hello! How can I assist you today?',
    'how are you':"As I am AI model, I don't have feeling and emotion .But in any other problem i can assist you.",
    'who are you': 'I am AI Bot0, I am designed to understand and generate human-like language, and to provide helpful responses to a wide range of questions. Is there anything specific you would like to ask or talk about?',
    'Who are you ': 'I am AI Bot0, I am designed to understand and generate human-like language, and to provide helpful responses to a wide range of questions. Is there anything specific you would like to ask or talk about?',
    'what is angular': 'Angular is a popular open-source front-end web application development framework. It is maintained by Google and allows developers to build dynamic, robust, and scalable web applications using HTML, CSS, and TypeScript. Angular follows the Model-View-Controller (MVC) architecture and provides a range of features, including data binding, dependency injection, and routing.',
    'default': "Sorry, I can't understand. Can you please repeat the question?"
  };

  constructor() {}

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}