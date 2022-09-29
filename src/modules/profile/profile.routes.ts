import { container } from "tsyringe";
import { ProfileController } from "./profile.controller";

const profileInstance = container.resolve(ProfileController);

export const profileRoute = [
    {
        url: '/profile/:profileId',
        method: 'get',
        handler: profileInstance.getProfileById.bind(profileInstance)
    }
];