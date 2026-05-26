import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test(`Create article by unauthorized user`, async ({
  createArticleWithoutTags,
}) => {

  const emptyToken = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: 'Token ',
      'content-type': 'application/json'
    }
  });
  const articlesApi = new ArticlesApi(emptyToken);

  const response = await articlesApi.createArticle(createArticleWithoutTags);

  await articlesApi.assertUnauthorizedResponseCode(response);
});
