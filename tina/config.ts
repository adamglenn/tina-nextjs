import { defineConfig } from "tinacms"

import { FeaturedIcons } from "../components/icons"
import { IconSelector } from "./icon-select"

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: "master",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: (props) => {
            if(props.document._sys.relativePath === 'home.md') {
              return "/"
            }
          },
        },
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "blocks",
            label: "Blocks",
            type: "object",
            list: true,
            templates: [
              {
                name: "welcomeHero",
                label: "Welcome Hero",
                fields: [
                  {
                    name: "message",
                    type: "rich-text",
                  },
                  {
                    name: "links",
                    label: "Links",
                    type: "object",
                    list: true,
                    fields: [
                      { type: "string", name: "link" },
                      { type: "string", name: "label" },
                      {
                        type: "string",
                        name: "style",
                        options: ["simple", "button"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "featureList",
                label: "Feature List",
                fields: [
                  { name: "byline", type: "string" },
                  {
                    name: "message",
                    type: "rich-text",
                  },
                  {
                    name: "features",
                    label: "Features",
                    type: "object",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item.label }
                      },
                      defaultItem: {
                        icon: Object.keys(FeaturedIcons)[0],
                        label: "Llama Feature",
                        description: "This is a feature",
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "icon",
                        options: Object.keys(FeaturedIcons),
                        ui: {
                          component: IconSelector,
                        },
                      },
                      { type: "string", name: "label" },
                      {
                        type: "string",
                        name: "description",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: "featuredReading",
                label: "Featured Reading",
                fields: [
                  {
                    name: "label",
                    label: "Label",
                    type: "string",
                  },
                  {
                    name: "featuredPost",
                    label: "Featured Post",
                    type: "reference",
                    collections: ["post"],
                  },
                ],
              },
              // {
              //   name: "backpage",
              //   label: "Backpage",
              //   fields: [
              //     {
              //       label: "Body",
              //       name: "body",
              //       type: "rich-text",
              //       isBody: true,
              //     },
              //     {
              //       type: "object",
              //       label: "Sidebar Components",
              //       name: "sidebarComponents",
              //       list: true,
              //       templates: [
              //         {
              //           name: "sidebarCallout",
              //           label: "Sidebar Callout",
              //           fields: [
              //             {
              //               name: "title",
              //               label: "Title",
              //               type: "string",
              //               isTitle: true,
              //               required: true,
              //             },
              //             {
              //               name: "header",
              //               label: "Header",
              //               type: "string",
              //             },
              //             {
              //               name: "calloutBody",
              //               label: "Body",
              //               type: "rich-text",
              //             },
              //           ],
              //         },
              //       ]
              //     },
              //   ],
              // },
              // {
              //   label: "Contacts",
              //   name: "contacts",
              //   fields: [
              //     {
              //       label: "Title",
              //       name: "title",
              //       type: "string",
              //       isTitle: true,
              //       required: true,
              //     },
              //     {
              //       label: "Contacts",
              //       name: "contacts",
              //       list: true,
              //       type: "object",
              //       fields: [
              //         {
              //           type: "reference",
              //           name: "contact",
              //           label: "Contact",
              //           collections: ['author'],
              //         },
              //       ],
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Post",
        path: "content/posts",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
          },
          {
            name: "author",
            label: "Author",
            type: "reference",
            collections: ["author"],
          },
          {
            name: "image",
            label: "Image",
            type: "image",
          },
          {
            name: "description",
            label: "Description",
            type: "string",
            ui: {
              component: "textarea",
            },
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },
      {
        name: "author",
        label: "Author",
        path: "content/authors",
        format: "md",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "string",
          },
          {
            name: "image",
            label: "Image",
            type: "image",
          },
        ],
      },
      {
        name: "nav",
        label: "Nav",
        path: "content/nav",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {
            name: "links",
            label: "Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.label }
              },
            },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "link", label: "Link" },
            ],
          },
        ],
      },
    ],
  },
})
