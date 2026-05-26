import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with all fields`, async ({
  userRequests,
  createArticleWithTwoTags,
}) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);

  const response = await articlesApi.createArticle(createArticleWithTwoTags);

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
