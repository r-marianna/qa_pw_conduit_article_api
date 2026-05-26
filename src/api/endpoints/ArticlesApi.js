import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async getArticles() {
    return await this.step(`Get articles`, async () => {
      return await this.request.get(ROUTES.articles().index, {
        headers: this._headers,
      });
    });
  }

  async createArticle(articleData) {
    return await this.step(`Create article`, async () => {
      return await this.request.post(ROUTES.articles().index, {
        data: { article: articleData },
        headers: this._headers,
      });
    });
  }


  async editArticle(slug, articleData) {
    return await this.step(`Edit article`, async () => {
      return await this.request.put(ROUTES.articles(slug).open, {
        headers: this._headers,
        data: { article: articleData }
      });
    });
  }

  async getArticle(slug) {
    return await this.step(`Get article`, async () => {
      return await this.request.get(ROUTES.articles(slug).open, {
        headers: this._headers,
      });
    });
  }

  async deleteArticle(slug) {
    return await this.step(`Delete article`, async () => {
      return await this.request.delete(ROUTES.articles(slug).open, {
        headers: this._headers,
      });
    });
  }

  async followArticle(slug) {
    return await this.step(`Follow article`, async () => {
      return await this.request.post(ROUTES.articles(slug).follow, {});
    });
  }

  async unfollowArticle(slug) {
    return await this.step(`Unfollow article`, async () => {
      return await this.request.delete(ROUTES.profiles(slug).follow, {});
    });
  }

  async assertTitleHasCorrectValue(response, name) {
    await this.step(`Assert response body has correct article title`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.title).toBe(name);
      });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(
      `Assert response body has correct description`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.description).toBe(description);
      },
    );
  }

  async assertArticleBodyHasCorrectValue(response, articleBody) {
    await this.step(
      `Assert response body has correct article body`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.body).toBe(articleBody);
      },
    );
  }

  async assertTagsHasCorrectValue(response, tagList) {
    await this.step(
      `Assert response body has correct article tags`,
      async () => {
        const body = await this.parseBody(response);
        const tags = body.article.tagList;

        if (tags.length !== tagList.length) return false;
        return tags.every((val, i) => expect(val).toBe(tagList[i]));
      },
    );
  }

  async assertAuthorUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.username).toBe(username);
    });
  }

  async assertAuthorBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.bio).toBe(bio);
    });
  }

  async assertAuthorImageHasCorrectValue(response, image) {
    await this.step(`Assert response body has correct image`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.author.image).toBe(image);
    });
  }

  async assertFollowingAuthorFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in 'following' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.author.following).toBe(value);
      },
    );
  }

  async assertFavoritedFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in 'favorited' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.favorited.favoritesCount).toBe(value);
      },
    );
  }

  async assertFollowingHasValueFalse(response) {
    this.assertFollowingFieldHasValue(response, false);
  }

  async assertFollowingHasValueTrue(response) {
    this.assertFollowingFieldHasValue(response, true);
  }

  async assertFavoritedHasValueFalse(response) {
    this.assertFollowingFieldHasValue(response, false);
  }

  async assertFavoritedHasValueTrue(response) {
    this.assertFollowingFieldHasValue(response, true);
  }
}
