import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';
import { request as apiRequest } from '@playwright/test';

test.use({ usersNumber: 1 });

test(`Follow profile for existing user by other user with empty token`, async ({
  registeredUsers,
  userRequests,
}) => {
  const user1 = registeredUsers[0];

  const emptyToken = await apiRequest.newContext({
    extraHTTPHeaders: {
      authorization: 'Token ',
      'content-type': 'application/json'
    }
  });

  const profilesApi = new ProfilesApi(emptyToken);

  const response = await profilesApi.followProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
