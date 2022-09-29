import 'reflect-metadata';
import { describe } from 'mocha';
import { expect }  from 'chai';
import { container } from "tsyringe";
import { ContractsController } from "./contracts.controller";
import Job from '../../models/job.model';
import Contract from '../../models/contract.model';

let contractsInstance: ContractsController;
describe('hooks', () => {
    
    before(() => {
        try {
            contractsInstance = container.resolve(ContractsController);
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
    
    describe('contracts module', () => {
        // Obviously requires more testing but I have very little time to do full testing.
        
        describe('#getContractById', () => {
            it('should return contract if it belongs to given profile', async () => {
                const req = {params: {id: 1}, query: {profile_id: 1}};
                const res = mockResponse();
                const next = () => next;
                const contract: Contract = await contractsInstance.getContractById(req, res, next);
                expect(contract).to.be.instanceof(Contract).and.have.property('id').to.be.equal(1);
            });
        });

        describe('#getContractsOfProfile', () => {
            it('should return all contracts of given profile', async () => {
                const req = {query: {profile_id: 4}};
                const res = mockResponse();     
                const next = () => next;
                const contracts: Contract[] = await contractsInstance.getContractsOfProfile(req, res, next);
                expect(contracts[0]).to.be.instanceof(Contract).and.have.property('id').to.be.equal(7);
                expect(contracts[1]).to.be.instanceof(Contract).and.have.property('id').to.be.equal(8);
                expect(contracts[2]).to.be.instanceof(Contract).and.have.property('id').to.be.equal(9);
            });
        });
    });
    
});


  
