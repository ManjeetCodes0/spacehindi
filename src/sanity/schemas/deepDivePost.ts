import { defineType, defineField } from "sanity";

export default defineType({
  name: "deepDivePost",
  title: "Deep Dive Post",
  type: "document",
  fields: [
    defineField({
      name: "titleHindi",
      title: "Title (Hindi)",
      type: "string",
      description: "Catchy, bold Hindi headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEnglish",
      title: "Title (English)",
      type: "string",
      description: "Professional English headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "titleEnglish",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "metaDescriptionEn",
      title: "Meta Description (English)",
      type: "string",
      description: "SEO meta description in English (max 160 chars)",
    }),
    defineField({
      name: "metaDescriptionHi",
      title: "Meta Description (Hindi)",
      type: "string",
      description: "SEO meta description in Hindi (max 160 chars)",
    }),
    defineField({
      name: "heroImagePrompt",
      title: "Hero Image Prompt",
      type: "text",
      description: "Hyper-realistic AI image generation prompt for the hero banner",
      rows: 4,
    }),
    defineField({
      name: "sections",
      title: "Article Sections",
      type: "array",
      description: "Sectioned article content with bilingual headings, content, and image prompts",
      of: [
        {
          type: "object",
          name: "articleSection",
          title: "Section",
          fields: [
            defineField({ name: "headingEn", title: "Heading (English)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "headingHi", title: "Heading (Hindi)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "contentEn", title: "Content (English)", type: "text", rows: 10, validation: (Rule) => Rule.required() }),
            defineField({ name: "contentHi", title: "Content (Hindi)", type: "text", rows: 10, validation: (Rule) => Rule.required() }),
            defineField({ name: "imagePrompt", title: "Image Prompt", type: "text", rows: 3, description: "Hyper-realistic AI image prompt for this section" }),
            defineField({ name: "sectionImage", title: "Section Image", type: "image", options: { hotspot: true }, description: "AI-generated or fallback image for this section" }),
          ],
          preview: {
            select: { title: "headingEn", subtitle: "headingHi" },
          },
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Content (Hindi) — Flat",
      type: "text",
      description: "Auto-generated flat content from sections (backward compat)",
      rows: 20,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentEnglish",
      title: "Content (English) — Flat",
      type: "text",
      description: "Auto-generated flat content from sections (backward compat)",
      rows: 20,
    }),
    defineField({
      name: "infographicFacts",
      title: "Infographic Facts (Hindi)",
      type: "array",
      description: "5-7 mind-blowing facts in Hindi",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "infographicFactsEnglish",
      title: "Infographic Facts (English)",
      type: "array",
      description: "5-7 mind-blowing facts in English",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "scienceCorner",
      title: "Science Corner",
      type: "array",
      description: "Complex scientific terms with simple definitions",
      of: [
        {
          type: "object",
          name: "scienceTerm",
          title: "Science Term",
          fields: [
            defineField({
              name: "term",
              title: "Term",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "definitionHi",
              title: "Definition (Hindi)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "definitionEn",
              title: "Definition (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "term", subtitle: "definitionEn" },
          },
        },
      ],
    }),
    defineField({
      name: "conclusion",
      title: "Conclusion (Hindi)",
      type: "text",
      description: "Visionary closing statement in Hindi",
      rows: 4,
    }),
    defineField({
      name: "conclusionEnglish",
      title: "Conclusion (English)",
      type: "text",
      description: "Visionary closing statement in English",
      rows: 4,
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      description: "Frequently asked questions for SEO rich snippets",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({ name: "questionEn", title: "Question (English)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "questionHi", title: "Question (Hindi)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "answerEn", title: "Answer (English)", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "answerHi", title: "Answer (Hindi)", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "questionEn", subtitle: "answerEn" },
          },
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "SEO tags for categorization",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Original news article URL",
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      initialValue: "Manjeet Singh",
    }),
    defineField({
      name: "sourceName",
      title: "Source Name",
      type: "string",
      description: "Name of the news source (e.g. NASA, Space.com)",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "titleEnglish",
      subtitle: "titleHindi",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, subtitle, media, date }) {
      return {
        title: title || "Untitled",
        subtitle: `${subtitle || ""} ${date ? `• ${new Date(date).toLocaleDateString()}` : ""}`,
        media,
      };
    },
  },
});
