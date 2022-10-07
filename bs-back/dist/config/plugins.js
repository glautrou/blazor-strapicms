"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
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
