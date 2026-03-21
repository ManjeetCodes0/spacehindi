import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Affiliate Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hindiTitle",
      title: "Title (Hindi)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hindiDescription",
      title: "Description (Hindi)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "imageURL",
      title: "Product Image URL",
      type: "url",
      description: "External image URL (e.g., Amazon product image)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
      description: "Amazon affiliate URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Astronaut Statue", value: "Astronaut Statue" },
          { title: "Keychains", value: "Keychains" },
          { title: "Books", value: "Books" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
