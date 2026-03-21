/** Type matching the Sanity deepDivePost document created by auto-post.ts */

export interface ArticleSection {
  _key: string;
  headingEn: string;
  headingHi: string;
  contentEn: string;
  contentHi: string;
  imagePrompt: string;
  sectionImage?: {
    asset: {
      _id: string;
      url?: string;
    };
  };
}

export interface FAQItem {
  _key: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

export interface DeepDivePost {
  _id: string;
  titleHindi: string;
  titleEnglish: string;
  slug: { current: string };
  metaDescriptionEn?: string;
  metaDescriptionHi?: string;
  heroImagePrompt?: string;
  sections?: ArticleSection[];
  content: string; // Hindi content (flat, backward compat)
  contentEnglish?: string; // English content (flat, backward compat)
  infographicFacts: string[]; // Hindi facts
  infographicFactsEnglish?: string[]; // English facts
  scienceCorner: Array<{
    _key: string;
    term: string;
    definitionHi: string;
    definitionEn: string;
  }>;
  conclusion: string; // Hindi conclusion
  conclusionEnglish?: string; // English conclusion
  faq?: FAQItem[];
  tags?: string[];
  sourceUrl: string;
  sourceName: string;
  authorName: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      _id: string;
      url?: string;
    };
  };
}
