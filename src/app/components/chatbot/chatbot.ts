import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../core/services/ai-assistant.service';
import { ChatMessage } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  aiService = inject(AiAssistantService);
  auth = inject(AuthService);

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = signal('');
  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      text: `👋 Hey! I'm **FlexBot**, your FlexZone AI assistant.\n\nAsk me anything about workouts, nutrition, classes, or memberships! 💪`,
    },
  ]);

  hasUnread = signal(false);
  private shouldScrollToBottom = false;

  userName = computed(() => this.auth.currentUserSignal()?.name?.split(' ')[0] ?? 'there');

  suggestions = [
    '💪 Best workout for beginners',
    '🥗 How much protein do I need?',
    '📅 How to book a class?',
    '💳 Tell me about memberships',
    '😴 How important is recovery?',
    '💧 Hydration tips',
  ];

  toggleChat() {
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.hasUnread.set(false);
      this.shouldScrollToBottom = true;
    }
  }

  sendMessage(text?: string) {
    const query = (text ?? this.userInput()).trim();
    if (!query || this.isTyping()) return;

    // Add user message
    this.messages.update((msgs) => [...msgs, { role: 'user', text: query }]);
    this.userInput.set('');
    this.isTyping.set(true);
    this.shouldScrollToBottom = true;

    // Simulate network delay for realism
    const delay = 600 + Math.random() * 600;

    setTimeout(() => {
      this.aiService.ask(query).subscribe({
        next: ({ answer, sources }) => {
          this.messages.update((msgs) => [
            ...msgs,
            { role: 'assistant', text: answer, sources },
          ]);
          this.isTyping.set(false);
          this.shouldScrollToBottom = true;
          if (!this.isOpen()) this.hasUnread.set(true);
        },
        error: () => {
          this.messages.update((msgs) => [
            ...msgs,
            {
              role: 'assistant',
              text: `⚠️ Sorry, I couldn't connect right now. Please make sure the API server is running and try again.`,
            },
          ]);
          this.isTyping.set(false);
          this.shouldScrollToBottom = true;
        },
      });
    }, delay);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.messages.set([
      {
        role: 'assistant',
        text: `👋 Chat cleared! How can I help you today, ${this.userName()}? 💪`,
      },
    ]);
  }

  /** Render **bold** and newlines to safe HTML */
  formatMessage(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }
}
