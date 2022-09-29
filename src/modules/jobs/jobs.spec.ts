import 'reflect-metadata';
import { describe } from 'mocha';
import { expect }  from 'chai';
import { container } from "tsyringe";
import { JobsController } from "./jobs.controller";
import Job from '../../models/job.model';

let jobsInstance: JobsController;
describe('hooks', () => {
    
    before(() => {
        try {
            jobsInstance = container.resolve(JobsController);
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
    
    describe('jobs module', () => {
        // Obviously requires more testing but I had very little time to do full testing.

        describe('#getUnpaidJobs', () => {
            it('should return unpaid jobs', async () => {
                const req = {query: {profile_id: 2}};
                const res = mockResponse();     
                const next = () => next;
                const jobs: Job[] = await jobsInstance.getUnpaidJobs(req, res, next);
                expect(jobs[0]).to.be.instanceof(Job).and.have.property('id').to.be.equal(3);
                expect(jobs[1]).to.be.instanceof(Job).and.have.property('id').to.be.equal(4);
            });
        });

        describe('#payJobById', () => {
            it('should return a successful payment', async () => {
                const req = {params: {job_id: 2}, query: {profile_id: 1}};
                const reqJob = {query: {profile_id: 1}};
                const res = mockResponse();     
                const next = () => next;
                const transaction = await jobsInstance.payJobById(req, res, next);
                expect(transaction).to.have.property('success').to.be.true;
                const jobsAfterPayment: Job[] = await jobsInstance.getUnpaidJobs(reqJob, res, next);
                expect(jobsAfterPayment).to.have.length(0);
            });
        });
    });
    
});


  
