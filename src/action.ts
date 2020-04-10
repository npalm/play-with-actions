import * as core from '@actions/core';
import { context } from '@actions/github';

async function runInGroup(name: string, fun: () => Promise<void>) {
  core.startGroup(name);
  try {
    await fun();
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  } finally {
    core.endGroup();
  }
}

export const action = async () => {
  core.setOutput('Running action', 'Play');

  //pull_request.number
  //pull_request.base.ref
  //pull_request.base.head.ref

  const testName = core.getInput('name', { required: false });
  const pr: any = context.payload.pull_request;

  //console.log(JSON.stringify(context.payload));
  const payload = JSON.stringify(context, undefined, 2);
  console.log(`The event payload: ${payload}`);

  if (pr) {
    console.log('----PR----');
    console.log(pr.number);
    console.log(pr.base.ref);
    console.log(pr.base.head_ref);
  }

  core.info(`
        Using parameters:
        name           : ${testName}
        pr number      : ${pr.number}
        pr base-branch : ${pr.base.ref}
    `);
};
