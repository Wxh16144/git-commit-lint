// commit lint 配置
// see: https://commitlint.js.org

const czConfig = require('./cz-config')

module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ],
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
}
