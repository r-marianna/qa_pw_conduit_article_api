import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Create article with empty tags array`, async ({
  userRequests,
  createArticleWithoutTags,
}) => {
  const user = userRequests[0];
  const articlesApi = new ArticlesApi(user);

  const response = await articlesApi.createArticle(createArticleWithoutTags);

  await articlesApi.assertSuccessResponseCode(response);
  await articlesApi.assertTitleHasCorrectValue(
    response, createArticleWithoutTags.title);
  await articlesApi.assertDescriptionHasCorrectValue(
    response, createArticleWithoutTags.description);
  await articlesApi.assertArticleBodyHasCorrectValue(
    response, createArticleWithoutTags.body);
  await articlesApi.assertTagsHasCorrectValue(
    response, createArticleWithoutTags.tagList);
});
