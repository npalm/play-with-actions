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

  const myToken = core.getInput('myToken', { required: true });
  //  const octokit = new github.GitHub(myToken);

  const testName = core.getInput('name', { required: false });

  //console.log(JSON.stringify(github.context.payload));
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  core.info(`
        Using parameters:
        name       : ${testName}
    `);
};
