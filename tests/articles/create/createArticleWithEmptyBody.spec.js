import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty body`, async ({
  userRequests,
  createArticleWithoutTags,
}) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);
  let article = { ...createArticleWithoutTags, body: '' };

  const response = await articlesApi.createArticle(article);

  await articlesApi.assertBadRequestResponseCode(response);
});
