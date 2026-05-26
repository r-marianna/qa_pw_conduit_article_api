import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach('Create article', async ({
  userRequests, createArticleWithTwoTags }) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);

  const response = await articlesApi.createArticle(createArticleWithTwoTags);

  await articlesApi.assertSuccessResponseCode(response);

  const body = await articlesApi.parseBody(response);
  slug = body.article.slug;
});

test(`Read article created by user1 as authorized user2`,
  async ({ userRequests, createArticleWithTwoTags }) => {
    const user2 = userRequests[1];
    const articlesApi = new ArticlesApi(user2);

    const response = await articlesApi.getArticle(slug);

    await articlesApi.assertSuccessResponseCode(response);
    await articlesApi.assertTitleHasCorrectValue(
      response, createArticleWithTwoTags.title);
    await articlesApi.assertDescriptionHasCorrectValue(
      response, createArticleWithTwoTags.description);
    await articlesApi.assertArticleBodyHasCorrectValue(
      response, createArticleWithTwoTags.body);
    await articlesApi.assertTagsHasCorrectValue(
      response, createArticleWithTwoTags.tagList);
  });
