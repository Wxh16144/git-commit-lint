#!/usr/bin/env node
"use strict";

const path = require('path');
const { isGitRepository } = require('./utils')

if (!isGitRepository(process.cwd())) {
  throw new Error('当前目录下没有Git仓库, 请使用 Git init 初始化后重试')
}

const { bootstrap } = require('commitizen/dist/cli/git-cz')
const cliPath = require.resolve('commitizen')
bootstrap({
  cliPath: path.resolve(cliPath, '../../'),
  config: {
    "path": require.resolve('cz-customizable')
  }
});