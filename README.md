# Summary reporter for Jest

Simple reporter to summarize the failing tests at the END of a test run. Without this, you may be scrolling through pages of results to figure out which files to edit.

See the [issue](https://github.com/facebook/jest/issues/3322) that inspired this.

## Configuration

Add `jest-summary-reporter` in addition to default reporters that Jest provides:
```
{
  "reporters": [
    "default",
    "jest-summary-reporter"
  ]
}
```

If you want to see passing/pending tests as well:
```
{
  "reporters": [
    "default",
    ["jest-summary-reporter", {"failuresOnly": false}]
  ]
}
```

NB: This module is not complete enough to be useful as the only reporter.

See also: [Jest docs for custom reporter configuration](
https://facebook.github.io/jest/docs/en/configuration.html#reporters-array-modulename-modulename-options
)
