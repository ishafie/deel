import { container } from "tsyringe";
import { JobsController } from "./jobs.controller";

const jobInstance = container.resolve(JobsController);

export const jobsRoute = [
    {
        url: '/jobs/unpaid',
        method: 'get',
        handler: jobInstance.getUnpaidJobs.bind(jobInstance)
    },
    {
        url: '/jobs/:job_id/pay',
        method: 'post',
        handler: jobInstance.payJobById.bind(jobInstance)
    }
];