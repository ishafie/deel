import { JobsController } from "./jobs.controller";

const jobController = new JobsController();
export const jobsRoute = [
    {
        url: '/jobs/unpaid',
        method: 'get',
        handler: jobController.getUnpaidJobs
    },
    {
        url: '/jobs/:job_id/pay',
        method: 'post',
        handler: jobController.payJobById
    }
];