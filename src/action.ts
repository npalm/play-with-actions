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

  const testName = core.getInput('name', { required: false });

  //console.log(JSON.stringify(github.context.payload));
  const payload = JSON.stringify(context, undefined, 2);
  console.log(`The event payload: ${payload}`);
  core.info(`
        Using parameters:
        name       : ${testName}
    `);
};
