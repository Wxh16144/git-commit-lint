# git-commit-lint

自定义团队或个人的一个 git-commit 约束

## 使用

### 全局安装

```bash
npm install -g git-commit-lint@latest
```

全局安装后, 将在全局添加命令:

- **my-cm** : 可以用来代替你的 `git commit`
- **my-cm-int** : 在项目中一键初始化使用 **git-commit-lint**

### 项目中初始化

> 初始化后, 请执行 `npm install` 安装依赖即可。

```bash
my-cm-int
```

## 定制个人的规则

### 第一步

- fork 本仓库

### 自定义规则

- **[rules/cz-config.js](https://github.com/Wxh16144/git-commit-lint/blob/master/rules/cz-config.js)**, [参考文档](https://github.com/leonardoanalista/cz-customizable)

<details>
  <summary>rules/cz-config.js</summary>

```javascript
module.exports = {
  types: [
    { value: 'feat', name: 'feat:    一个新的特性' },
    { value: 'fix', name: 'fix:    修复一个Bug' },
    { value: 'docs', name: 'docs:    变更的只有文档' },
    { value: 'style', name: 'style:    空格, 分号等格式修复' },
    {
      value: 'refactor',
      name: 'refactor:    代码重构，注意和特性、修复区分开'
    },
    { value: 'perf', name: 'perf:    提升性能' },
    { value: 'test', name: 'test:    添加一个测试' },
    { value: 'revert', name: 'revert:    代码回退' },
    { value: 'chore', name: 'chore:    开发工具变动(构建、脚手架工具等)' },
    { value: 'release', name: 'release:    发布项目' }
  ],
  scopes: [],
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope:',
    customScope: '本次更改范围 scope(可选):',
    subject: '短说明:',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联的BUG，例如：【一个Bug】http://xxx.com/bug (可选):\n',
    confirmCommit: '确定提交说明?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100
};
```

</details>

- **[rules/lint-config.js](https://github.com/Wxh16144/git-commit-lint/blob/master/rules/lint-config.js)**, [参考文档](https://commitlint.js.org)

<details>
  <summary>rules/lint-config.js</summary>

```javascript
const czConfig = require('./cz-config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // rules: https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
  rules: {
    'type-enum': [2, 'always', czConfig.types.map(({ value }) => value)],
    'type-empty': [2, 'never'], // 提交不符合规范时，不提交
    'subject-empty': [2, 'never'], // 提交不符合规范时，不能提交
    'subject-full-stop': [0, 'never'], // 句号结尾.
    'subject-max-length': [1, 'never', 100], // 超过最大长度 100 war提示
    'subject-case': [0, 'never'], // 命名格式
    'scope-empty': [1, 'never'] // scope 为空时wan提示,可以提交
  }
};
```

</details>

### 编辑全局命令

编辑: _package.json_

```diff
   "bin": {
-    "my-cm": "./src/index.js",
-    "my-cm-init": "./src/init.js"
+    "test-cm": "./src/index.js",
+    "test-cm-init": "./src/init.js"
   },
```

编辑: _src/init.js_

```diff
   scripts: {
-    "cm": `my-cm`
+    "cm": `test-cm`
   },
```

**发布你的包并享受**
