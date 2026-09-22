import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs';

const KB_API = 'http://localhost:3000/knowledgeBase';

const LOCAL_KB = [
  { id: 1, topic: 'Protein Intake',             content: ' For muscle building, aim for 1.6 to 2.2 grams of protein per kilogram of body weight per day, spread across 3-4 meals. Good sources include chicken, fish, eggs, dairy, and whey protein.' },
  { id: 2, topic: 'Beginner Training Frequency', content: 'Beginners should train 3-4 days per week with at least one rest day between sessions targeting the same muscle group. This allows adequate recovery while building consistency.' },
  { id: 3, topic: 'Class Booking Policy',        content: 'Members can book up to 2 weeks in advance. Pro and Elite members get priority booking. Cancellations must be made at least 2 hours before class start time to free the spot for others.' },
  { id: 4, topic: 'Weight Loss Nutrition',       content: 'A sustainable weight loss approach involves a moderate calorie deficit of 300-500 calories per day, combined with regular strength training to preserve muscle mass and cardio for extra calorie burn.' },
  { id: 5, topic: 'Recovery & Rest',             content: 'Muscles grow during rest, not during the workout itself. Aim for 7-9 hours of sleep, and consider foam rolling or light stretching on rest days to aid recovery.' },
  { id: 6, topic: 'Choosing a Workout Plan',     content: 'Beginners should start with full-body or beginner-level plans 3 times a week. Intermediate members can move to split routines like push/pull/legs. Advanced members can handle higher volume and frequency.' },
  { id: 7, topic: 'Hydration Guidelines',        content: 'Drink at least 2-3 liters of water daily, and increase intake on training days. Proper hydration supports performance, recovery, and reduces the risk of cramps.' },
  { id: 8, topic: 'Membership Plans',            content: 'FlexZone offers Starter, Pro, and Elite membership tiers. Pro and Elite include unlimited gym access, custom nutrition plans, and class booking, while Elite adds a dedicated personal trainer.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// INTENT MAP  (English + Arabic keywords → KB topics + smart intro)
// ─────────────────────────────────────────────────────────────────────────────
const INTENT_MAP: { keywords: RegExp; topics: string[]; intro: { en: string; ar: string } }[] = [
  {
    keywords: /protein|بروتين|بروتن|muscle|عضل|عضلات|build|mass|whey|واي بروتين|gains?|كتلة|بناء|آكل|اكل/,
    topics: ['Protein Intake'],
    intro: {
      en: `Great question! Here's what you need to know about protein for muscle building:`,
      ar: `سؤال ممتاز! 💪 إليك اللي محتاج تعرفه عن البروتين وبناء العضل:`,
    },
  },
  {
    keywords: /beginner|مبتدئ|start|ابدأ|new to|جديد|first time|how often|كام مرة|frequency|days per week|أيام/,
    topics: ['Beginner Training Frequency', 'Choosing a Workout Plan'],
    intro: {
      en: `Perfect for beginners! Here's the smartest way to start:`,
      ar: `ممتاز إنك بتبدأ! 🙌 إليك الطريقة الأذكى للبداية:`,
    },
  },
  {
    keywords: /workout|تمرين|plan|برنامج|routine|روتين|program|split|schedule|جدول|exercise|تمارين|training|تدريب/,
    topics: ['Choosing a Workout Plan', 'Beginner Training Frequency'],
    intro: {
      en: `Here's how to pick the right workout plan for your level:`,
      ar: `إليك إزاي تختار البرنامج المناسب لمستواك:`,
    },
  },
  {
    keywords: /weight loss|خسارة وزن|تخسيس|lose weight|انزل وزن|fat |دهون|cut |deficit|عجز سعرات|cardio|كارديو|burn |حرق/,
    topics: ['Weight Loss Nutrition', 'Recovery & Rest'],
    intro: {
      en: `Here's a sustainable approach to weight loss that actually works:`,
      ar: `إليك أفضل طريقة لخسارة الوزن بشكل صحي ومستدام:`,
    },
  },
  {
    keywords: /recover|تعافي|rest |راحة|sleep|نوم|sore|ألم|foam roll|stretch|إطالة|overtraining|إفراط/,
    topics: ['Recovery & Rest'],
    intro: {
      en: `Recovery is just as important as training. Here's what FlexZone recommends:`,
      ar: `التعافي بنفس أهمية التمرين! 😴 إليك توصيات FlexZone:`,
    },
  },
  {
    keywords: /water|مية|hydrat|ترطيب|drink|اشرب|fluid|سوائل|cramp|تشنج/,
    topics: ['Hydration Guidelines'],
    intro: {
      en: `Hydration is often overlooked but absolutely critical. Here's the guide:`,
      ar: `كتير ناس بتتجاهل الترطيب وده غلط! 💧 إليك الغايد:`,
    },
  },
  {
    keywords: /book |حجز|class|كلاس|cancel|إلغاء|spot |مكان|reserv|session|جلسة/,
    topics: ['Class Booking Policy'],
    intro: {
      en: `Here's everything about booking classes at FlexZone:`,
      ar: `إليك كل اللي محتاج تعرفه عن حجز الكلاسات في FlexZone:`,
    },
  },
  {
    keywords: /membership|اشتراك|عضوية|tier|سعر الاشتراك|starter|elite|subscription|join flexzone|انضم/,
    topics: ['Membership Plans'],
    intro: {
      en: `Here's a breakdown of FlexZone's membership options:`,
      ar: `إليك شرح لباقات الاشتراك في FlexZone:`,
    },
  },
  {
    keywords: /nutrition|تغذية|diet|دايت|meal|وجبة|calorie|سعرات|macro|carb|كارب/,
    topics: ['Weight Loss Nutrition', 'Protein Intake'],
    intro: {
      en: `Here's some nutrition guidance tailored to your goals:`,
      ar: `إليك إرشادات التغذية المناسبة لأهدافك:`,
    },
  },
  {
    keywords: /supplement|مكملات|creatine|كرياتين|bcaa|pre.?workout|بري وركاوت|vitamin|فيتامين/,
    topics: ['Protein Intake'],
    intro: {
      en: `Here's what you need to know about supplements:`,
      ar: `إليك اللي محتاج تعرفه عن المكملات الغذائية:`,
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL TALK  (social / conversational patterns — English & Arabic)
// ─────────────────────────────────────────────────────────────────────────────
interface SmallTalk { pattern: RegExp; response: (lang: 'ar' | 'en') => string }

const SMALL_TALK: SmallTalk[] = [
  {
    pattern: /^(hi|hello|hey|sup|yo|مرحبا|مرحبً|هاي|السلام|أهلا|اهلا|سلام|مرحب|هلو|هلا|صباح الخير|مساء الخير|ازيك|عامل ايه|كيف حالك|كيفك|ايه الاخبار)\b/,
    response: (lang) => lang === 'ar'
      ? `أهلاً وسهلاً! 👋 أنا **FlexBot**، مساعدك الشخصي في FlexZone.\n\nأقدر أساعدك في:\n• 🏋️ برامج التمرين ونصايح التدريب\n• 🥗 التغذية وخطط الأكل\n• 📅 حجز الكلاسات والمواعيد\n• 💊 المكملات والتعافي\n• 💳 باقات الاشتراك\n\nاسألني أي حاجة! 😊`
      : `Hey! 👋 I'm **FlexBot**, your personal FlexZone coach.\n\nI can help you with:\n• 🏋️ Workout plans & training tips\n• 🥗 Nutrition & meal planning\n• 📅 Class bookings & schedules\n• 💊 Supplements & recovery\n• 💳 Membership options\n\nWhat's on your mind? 😊`,
  },
  {
    pattern: /\b(how are you|how r u|كيف حالك|عامل ايه|ازيك|تمام؟|كيفك)\b/,
    response: (lang) => lang === 'ar'
      ? `أنا بخير، شكراً! 😄 جاهز دايماً أساعدك تحقق أهدافك الرياضية. إيه اللي تحب تعرفه؟ 💪`
      : `I'm doing great, thanks for asking! 😄 Always ready to help you hit your fitness goals. What can I do for you? 💪`,
  },
  {
    pattern: /\b(thank|thanks|شكرا|شكراً|جزاك الله|يسلموا|مشكور|تسلم|great|perfect|awesome|كويس|تمام|ممتاز|رائع)\b/,
    response: (lang) => lang === 'ar'
      ? `العفو! 🙌 أي وقت عندك سؤال تاني، أنا هنا. استمر في التدريب! 💪`
      : `Happy to help! 🙌 Anytime you have more questions, just ask. Keep pushing! 💪`,
  },
  {
    pattern: /\b(bye|goodbye|see you|مع السلامة|باي|وداعا|يلا|انت|later|سلام عليكم)\b/,
    response: (lang) => lang === 'ar'
      ? `مع السلامة! 🔥 اتذكر — **الاستمرارية هي المفتاح**. كل تمرين بيفرق! 💪`
      : `See you soon! 🔥 Remember — **consistency is the key**. Every session counts! 💪`,
  },
  {
    pattern: /\b(who are you|what are you|مين انت|انت مين|ما أنت|إيه انت)\b/,
    response: (lang) => lang === 'ar'
      ? `أنا **FlexBot** 🤖 — المساعد الذكي بتاع FlexZone!\n\nاتدربت على قاعدة معرفة FlexZone عشان أديك نصايح دقيقة في:\n• التمرين والبرمجة\n• التغذية والدايت\n• التعافي والنوم\n• حجز الكلاسات\n• باقات الاشتراك\n\nاسألني أي حاجة! 🏋️`
      : `I'm **FlexBot** 🤖 — FlexZone's built-in AI fitness assistant!\n\nI'm trained on FlexZone's knowledge base to give you accurate advice on:\n• Training & workout programming\n• Nutrition & diet\n• Recovery & sleep\n• Class booking\n• Membership plans\n\nAsk me anything fitness-related! 🏋️`,
  },
  {
    pattern: /\b(هل انت ذكاء اصطناعي|ai|artificial intelligence|ذكاء اصطناعي|روبوت|robot)\b/,
    response: (lang) => lang === 'ar'
      ? `آه! 🤖 أنا FlexBot، مساعد ذكاء اصطناعي مدمج في FlexZone. بشتغل بنظام RAG — بعني بجيب المعلومات من قاعدة بيانات FlexZone وبحولها لإجابات طبيعية وسهلة. هل عندك سؤال رياضي؟ 😊`
      : `Yes! 🤖 I'm FlexBot, an AI assistant built into FlexZone. I work with a RAG system — I fetch info from FlexZone's knowledge base and turn it into natural, helpful answers. Got a fitness question? 😊`,
  },
  {
    pattern: /\b(good morning|good evening|good night|صباح النور|صباح الخير|مساء النور|مساء الخير|تصبح على خير)\b/,
    response: (lang) => lang === 'ar'
      ? `وعليك السلام! ☀️ إزيك النهارده؟ جاهز تتكلم عن التمرين أو التغذية؟ 💪`
      : `Good day! ☀️ Hope you're having a great one. Ready to talk fitness? 💪`,
  },
  {
    pattern: /\b(مش فاهم|مش عارف|confused|لا أفهم|explain|اشرحلي|وضحلي)\b/,
    response: (lang) => lang === 'ar'
      ? `مشكلة مفيش! 😊 اسألني بالتفصيل وهشرحلك. أنا هنا عشان أساعدك تفهم أي حاجة. إيه اللي محتاج توضيح فيه؟`
      : `No worries! 😊 Ask me with more detail and I'll break it down for you. What would you like me to explain?`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class AiAssistantService {
  http = inject(HttpClient);

  ask(query: string) {
    return this.http.get<any[]>(KB_API).pipe(
      catchError(() => of(LOCAL_KB)),
      map((entries) => {
        const lang      = this.detectLanguage(query);
        const smallTalk = this.trySmallTalk(query, lang);

        if (smallTalk) {
          return { answer: smallTalk, sources: [] as string[] };
        }

        const retrieved = this.retrieveTopMatches(query, entries, 3);
        const answer    = this.generateAnswer(query, retrieved, lang);
        return { answer, sources: retrieved.map((e: any) => e.topic) };
      }),
    );
  }

  // ── Language detection ──────────────────────────────────────────────────
  private detectLanguage(text: string): 'ar' | 'en' {
    const arabicChars = (text.match(/[\u0600-\u06ff]/g) || []).length;
    return arabicChars > 0 ? 'ar' : 'en';
  }

  // ── Small talk handler ──────────────────────────────────────────────────
  private trySmallTalk(query: string, lang: 'ar' | 'en'): string | null {
    const lq = query.toLowerCase().trim();
    for (const st of SMALL_TALK) {
      if (st.pattern.test(lq)) return st.response(lang);
    }
    return null;
  }

  // ── Retrieval ───────────────────────────────────────────────────────────
  private retrieveTopMatches(query: string, entries: any[], topN: number) {
    const lq = query.toLowerCase();

    // 1. Intent map — most accurate for known topics
    for (const intent of INTENT_MAP) {
      if (intent.keywords.test(lq)) {
        const matched = entries.filter((e) => intent.topics.includes(e.topic));
        if (matched.length > 0) return matched.slice(0, topN);
      }
    }

    // 2. Keyword overlap scoring — fallback
    const queryTerms = this.tokenize(query);
    const scored = entries.map((entry) => {
      const entryTerms = this.tokenize(entry.topic + ' ' + entry.content);
      const score      = queryTerms.filter((t) => entryTerms.includes(t)).length;
      return { entry, score };
    });

    const matches = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map((s) => s.entry);

    return matches;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06ff\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }

  // ── Answer generation ───────────────────────────────────────────────────
  private generateAnswer(query: string, context: any[], lang: 'ar' | 'en'): string {
    // No results found
    if (context.length === 0) {
      return lang === 'ar'
        ? `مش لاقي معلومات محددة عن ده دلوقتي. 🤔\n\nبس أقدر أساعدك في:\n• 💪 **برامج التمرين** — أفضل البرامج لكل مستوى\n• 🥗 **التغذية** — بروتين، سعرات، وجبات\n• 😴 **التعافي** — نوم، راحة، إطالات\n• 📅 **الكلاسات** — حجز وإلغاء\n• 💳 **الاشتراكات** — Starter وPro وElite\n\nاسألني عن أي حاجة من دول! 😊`
        : `Hmm, I don't have specific info on that yet. 🤔\n\nBut I can definitely help with:\n• 💪 **Workout plans** — best programs by level\n• 🥗 **Nutrition** — protein, calories, macros\n• 😴 **Recovery** — sleep, rest days, stretching\n• 📅 **Classes** — how to book & cancel\n• 💳 **Memberships** — Starter, Pro, Elite\n\nTry asking about one of those! 😊`;
    }

    // Find matching intent intro
    const lq = query.toLowerCase();
    let intro = lang === 'ar' ? 'إليك اللي لاقيته ليك:' : `Here's what I found for you:`;

    for (const intent of INTENT_MAP) {
      if (intent.keywords.test(lq)) {
        intro = intent.intro[lang];
        break;
      }
    }

    // Single result → clean natural paragraph
    if (context.length === 1) {
      const e = context[0];
      const topicLabel = lang === 'ar' ? 'الموضوع' : 'Topic';
      return `${intro}\n\n${e.content}\n\n💡 _${topicLabel}: ${e.topic}_`;
    }

    // Multiple results → structured with emoji bullets
    const sections = context
      .map((e) => `🔹 **${e.topic}**\n${e.content}`)
      .join('\n\n');

    return `${intro}\n\n${sections}`;
  }
}
