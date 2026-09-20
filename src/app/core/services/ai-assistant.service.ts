import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

const KB_API = 'http://localhost:3000/knowledgeBase';

@Injectable({ providedIn: 'root' })
export class AiAssistantService {

  http = inject(HttpClient)

  // RAG pipeline: query -> retrieve matching knowledgeBase entries -> build answer from them (no real LLM call)
  ask(query: string) {
    return this.http.get<any[]>(KB_API).pipe(
      map(entries => {
        const retrieved = this.retrieveTopMatches(query, entries, 2)
        const answer = this.generateAnswer(query, retrieved)
        return { answer, retrieved }
      })
    )
  }

  retrieveTopMatches(query: string, entries: any[], topN: number) {
    const queryTerms = this.tokenize(query)

    const scored = entries.map(entry => {
      const entryTerms = this.tokenize(entry.topic + ' ' + entry.content)
      const score = queryTerms.filter(term => entryTerms.includes(term)).length
      return { entry, score }
    })

    const matches = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(s => s.entry)

    // if nothing matched, still return something so the chat always has context
    return matches.length > 0 ? matches : entries.slice(0, topN)
  }

  tokenize(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2)
  }

  generateAnswer(query: string, context: any[]) {
    const intro = `Here's what I found based on FlexZone's knowledge base for "${query}":`
    const body = context.map(entry => `• ${entry.topic} — ${entry.content}`).join('\n\n')
    return `${intro}\n\n${body}`
  }
}
