module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    `npx eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix ${filenames
      .map((filename) => `"${filename}"`)
      .join(' ')}`
  ],
  '**/*.(md|json)': (filenames) =>
    `npx prettier --write ${filenames.map((filename) => `"${filename}"`).join(' ')}`
  // 'src/translations/*.(json)': (filenames) => [
  //   `npx eslint --fix ${filenames
  //     .map((filename) => `"${filename}"`)
  //     .join(' ')}`,
  // ],
};
