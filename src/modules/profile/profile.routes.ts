import { ProfileController } from "./profile.controller";

const profileController = new ProfileController();
export const profileRoute = [
    {
        url: '/profile/:profileId',
        method: 'get',
        handler: profileController.getProfileById
    }
];