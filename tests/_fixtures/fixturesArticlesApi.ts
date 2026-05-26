import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  createArticleWithoutTags;
  createArticleWithOneTag;
  createArticleWithTwoTags;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  
  createArticleWithoutTags: async ({ logger }, use) => {
    const articleWithoutTags = generateNewArticleData(logger, 0);

    await use(articleWithoutTags);
  },

  createArticleWithOneTag: async ({ logger }, use) => {
    const articleWithOneTag = generateNewArticleData(logger, 1);

    await use(articleWithOneTag);
  },

  createArticleWithTwoTags: async ({ logger }, use) => {
    const articleWithTwoTags = generateNewArticleData(logger, 2);

    await use(articleWithTwoTags);
  },
});
