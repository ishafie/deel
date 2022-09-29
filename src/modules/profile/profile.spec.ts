import 'reflect-metadata';
import { describe } from 'mocha';
import { expect }  from 'chai';
import { container } from "tsyringe";
import { ProfileController } from "./profile.controller";
import Profile from '../../models/profile.model';

let profileInstance: ProfileController;
describe('hooks', () => {
    
    before(() => {
        try {
            profileInstance = container.resolve(ProfileController);
        } catch (err: any) {
            console.error(err);
        }
    });

    const mockResponse = () => {
        const res = {
            statusCode: 200,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            }, 
            json: () => res,
            send: (jsonObject) => jsonObject,
            end: () => res
        };
        return res;
    };
    
    describe('profile module', () => {

        describe('#getProfileById', () => {
            it('should return a profile', async () => {
                const req = {params: {profileId: 4}};
                const res = mockResponse();     
                const next = () => next;
                const profile: Profile = await profileInstance.getProfileById(req, res, next);
                expect(profile).to.be.instanceof(Profile).and.have.property('id').to.be.equal(4);
            });

            it('should return a 404 if profile does not exist', async () => {
                const req = {params: {profileId: 45}};
                const res = mockResponse();     
                const next = () => next;
                const profile = await profileInstance.getProfileById(req, res, next);
                expect(profile).to.have.property('statusCode').to.be.equal(404);
            });

            it('should return a 401 if we did not input a profile',  async () => {
                const req = {params: {}};
                const res = mockResponse();     
                const next = () => next;
                const profile = await profileInstance.getProfileById(req, res, next);
                expect(profile).to.have.property('statusCode').to.be.equal(401);
            });

            it('should return a 401 if we input incorrect parameters',  async () => {
                const req = {params: {profileId: 'abcdefgh'}};
                const res = mockResponse();     
                const next = () => next;
                const profile = await profileInstance.getProfileById(req, res, next);
                expect(profile).to.have.property('statusCode').to.be.equal(401);
            });
        });
    });
    
});


  
