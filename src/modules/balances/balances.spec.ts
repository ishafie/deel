import 'reflect-metadata';
import { describe } from 'mocha';
import { expect }  from 'chai';
import { container } from "tsyringe";
import { BalancesController } from "./balances.controller";
import { ResponseManagement } from '../../models/response-management';
import Profile from '../../models/profile.model';
import { ProfileController } from '../profile/profile.controller';

let balancesInstance: BalancesController;
let profileInstance: ProfileController;
describe('hooks', () => {
    
    before(() => {
        try {
            balancesInstance = container.resolve(BalancesController);
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
    
    describe('balances module', () => {
        // Obviously requires more testing but I have very little time to do full testing.
        
        describe('#depositMoneyToUser', () => {
            it('should deposit $amount of money from $profile_id to $userId', async () => {
                const req = {params: {userId: 4}, query: {profile_id: 1, amount: 100}};
                const reqReceiver = {params: {profileId: 4}};
                const reqDepositor = {params: {profileId: 1}};
                const res = mockResponse();
                const next = () => next;
                const receiver: Profile = await profileInstance.getProfileById(reqReceiver, res, next);
                const depositor: Profile = await profileInstance.getProfileById(reqDepositor, res, next);
                const transaction: ResponseManagement = await balancesInstance.depositMoneyToUser(req, res, next);
                expect(transaction).to.have.property('success').to.be.true;
                const receiverAfterDeposit: Profile = await profileInstance.getProfileById(reqReceiver, res, next);
                const depositorAfterDeposit: Profile = await profileInstance.getProfileById(reqDepositor, res, next);
                expect(receiverAfterDeposit.balance).to.be.equal(receiver.balance + req.query.amount);
                expect(depositorAfterDeposit.balance).to.be.equal(depositor.balance - req.query.amount);
            });
        });
    });
    
});


  
