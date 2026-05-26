import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test.use({ usersNumber: 2 });

test(`Unfollow existing user with empty auth token`,
  async ({
    registeredUsers,
    userRequests,
  }) => {
    const user1 = registeredUsers[0];
    const user2Request = userRequests[1];

    const profilesApi = new ProfilesApi(user2Request);

    const response = await profilesApi.followProfile(user1.username);
    await profilesApi.assertSuccessResponseCode(response);

    await profilesApi.assertUsernameHasCorrectValue(response, user1.username);
    await profilesApi.assertFollowingHasValueTrue(response);

    const emptyToken = await apiRequest.newContext({
      extraHTTPHeaders: {
        authorization: 'Token ',
        'content-type': 'application/json'
      }
    });

    const profilesApiEmptyToken = new ProfilesApi(emptyToken);

    const responseUnfollow = await profilesApiEmptyToken.unfollowProfile(
      user1.username
    );

    await profilesApiEmptyToken.assertUnauthorizedResponseCode(
      responseUnfollow);
  });
