#!/usr/bin/env node
const fs = require('fs')
const path = require('path');
const merge = require('merge')
const { isGitRepository } = require('./utils')

const CURRENT_PATH = process.cwd()
const pkg = require(path.join(CURRENT_PATH, './package.json'))
const CURRENT_PKG = require(path.join(__dirname, '../package.json'))

if (!isGitRepository(CURRENT_PATH)) {
  throw new Error('当前目录下没有Git仓库, 请使用 Git init 初始化后重试')
}

const config = {
  // 添加script脚本
  scripts: {
    "cm": "./node_modules/.bin/git-commit"
  },

  // 添加依赖
  devDependencies: {
    husky: "~4.3.4",
    commitizen: "~4.2.2",
    "cz-customizable": "~6.3.0",
    commitlint: "~11.0.0",
    "@commitlint/config-conventional": "~11.0.0",
    [CURRENT_PKG.name]: `~${CURRENT_PKG.version}`
  },

  // 添加规则
  commitlint: {
    "extends": [
      `./node_modules/${CURRENT_PKG.name}/rules/lint-config.js`
    ]
  },

  // 添加配置
  config: {
    "cz-customizable": {
      "config": `./node_modules/${CURRENT_PKG.name}/rules/cz-config.js`
    }
  },

  // 添加 hooks
  husky: {
    hooks: {
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
    }
  },
}

const newConfig = merge.recursive(true, pkg, config)

// 保存 package.json 文件
fs.writeFile(path.join(CURRENT_PATH, './package.json'), JSON.stringify(newConfig, null, 2), err => {
  if (err) {
    console.log('xxxx 生成package.json失败 xxxx')
    throw err
  } else {
    console.log(`更新package.json成功 -> ${CURRENT_PATH}/package.json`)
    console.log(`执行 npm install 安装这些依赖`)
  }
})
