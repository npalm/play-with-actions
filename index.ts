import { action } from './src/action';
import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    await action();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
