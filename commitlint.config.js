module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
        2,
        'always',
        [
            'feat',
            'fix',
            'docs',
            'style',
            'refactor',
            'perf',
            'test',
            'chore',
            'revert',
            'build',
            'ci',
            'security'
        ],
    ],
    'scope-enum': [
        2,
        'always',
        [
            // Frontend
            'frontend',

            // Backend
            'backend',

            // Infrastructure & Tooling
            'docker',
            'terraform',
            'ci',
            'deps',
        ],
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
};