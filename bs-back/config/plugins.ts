export default ({ env }) => ({
    // ...
    slugify: {
      enabled: true,
      config: {
        contentTypes: {
          post: {
            field: 'slug',
            references: 'title',
          },
        },
      },
    },
    // ...
  });