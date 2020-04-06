import * as core from '@actions/core';

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

  const testName = core.getInput('testName', { required: false });

  core.info(`
        Using parameters:
        name       : ${testName}
    `);
};
