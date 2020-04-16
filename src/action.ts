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

  const testName = core.getInput('name', { required: false });
  const pr: any = context.payload.pull_request;

  console.log(JSON.stringify(context.ref, undefined, 2));

  //const payload = JSON.stringify(context, undefined, 2);

  if (pr) {
    console.log('----PR----');
    console.log(pr.number);
    console.log(pr.base.ref);
    console.log(pr.head.ref);
  }

  // bla
  // core.info(`
  //       Using parameters:
  //       name           : ${testName}
  //       pr number      : ${pr.number}
  //       pr base-branch : ${pr.base.ref}
  //   `);
};
