const cp = require('child_process')


/**
 * 判断当前目录是否为git仓库
 * @param {string} cwd 查询目录
 */
const isGitRepository = (cwd = process.cwd()) => {
  const { status, stdout } = cp.spawnSync('git', ['rev-parse', '--is-inside-work-tree'], { cwd })
  if (status !== 0) {
    return false
  } else {
    return !!stdout
  }
}

module.exports = {
  isGitRepository,
}
