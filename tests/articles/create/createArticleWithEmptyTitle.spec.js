import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty title`, async ({
  userRequests,
  createArticleWithoutTags,
}) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);
  let article = { ...createArticleWithoutTags, title: '' }

  const response = await articlesApi.createArticle(article);

  await articlesApi.assertBadRequestResponseCode(response);
});
