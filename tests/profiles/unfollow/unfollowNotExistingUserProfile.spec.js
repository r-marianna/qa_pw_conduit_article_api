import { faker } from '@faker-js/faker';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test(`Unfollow not existing user profile`, async ({
  userRequests,
}) => {
  const user = faker.internet.username();
  const user2Request = userRequests[0];

  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.followProfile(user);

  await profilesApi.assertNotFoundResponseCode(response);

  const responseUnfollow = await profilesApi.unfollowProfile(user);

  await profilesApi.assertNotFoundResponseCode(responseUnfollow);
});
