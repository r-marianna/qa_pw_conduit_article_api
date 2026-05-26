import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

let slug;

test.beforeEach('Create article', async ({
  userRequests, createArticleWithTwoTags }) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);

  const response = await articlesApi.createArticle(createArticleWithTwoTags);

  await articlesApi.assertSuccessResponseCode(response);
  slug = response.slug;
});

test(`Read existing article by unauthorized user`, async ({ }) => {

  const emptyToken = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: 'Token ',
      'content-type': 'application/json'
    }
  });
  const articlesApi = new ArticlesApi(emptyToken);

  const response = await articlesApi.getArticle(slug);

  await articlesApi.assertNotFoundResponseCode(response);
});
