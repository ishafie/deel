import 'reflect-metadata';
import { describe } from 'mocha';
import { expect }  from 'chai';
import { container } from "tsyringe";
import { AdminController } from "./admin.controller";
import { ResponseManagement } from '../../models/response-management';
import Profile from '../../models/profile.model';

let adminInstance: AdminController;
describe('hooks', () => {
    
    before(() => {
        try {
            adminInstance = container.resolve(AdminController);
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
    
    describe('admin module', () => {
        // Obviously requires more testing but I have very little time to do full testing.
        
        describe('#getBestProfession', () => {
            it('should return Musician for the given period', async () => {
                const req = {query: {start: '08/10/2020', end: '08/10/2020'}};
                const res = mockResponse();
                const next = () => next;
                const profile = await adminInstance.getBestProfession(req, res, next);
                expect(profile).to.have.property('bestProfession').to.have.property('profession').to.be.equal('Musician');
            });
        });

        describe('#getBestClients', () => {
            it('should return Ash Ketchum and Harry Potter for the given period', async () => {
                const req = {query: {start: '10/12/2015', end: '10/11/2022', limit: 2}}; 
                const res = mockResponse();
                const next = () => next;
                const profiles: any = await adminInstance.getBestClients(req, res, next);
                console.log(profiles.bestClients);
                expect(profiles.bestClients[0].dataValues).to.have.property('profileId').to.be.equal(4);
                expect(profiles.bestClients[0].dataValues).to.have.property('paid').to.be.equal(2020);
                expect(profiles.bestClients[1].dataValues).to.have.property('profileId').to.be.equal(1);
                expect(profiles.bestClients[1].dataValues).to.have.property('paid').to.be.equal(442);

            });
        });
    });
    
});


  
