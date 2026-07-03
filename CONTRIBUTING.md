// CONTRIBUTING.md
# Contributing to VoIPCall

We love your input! We want to make contributing to VoIPCall as easy and transparent as possible.

## Development Process

We use GitHub to host code, track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Issue that pull request!

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the CHANGELOG.md with notes on your changes
3. Increase version numbers following semver
4. Ensure all tests pass: `npm test`
5. Ensure linting passes: `npm run lint`
6. Get approval from at least one maintainer

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Write unit tests for new features

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add support for multiple languages

- Implement i18n middleware
- Add translation files for en, es, fr
- Update documentation

Closes #123
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm run test:coverage
```

## Bug Reports

When reporting bugs, please include:
- A quick summary
- Steps to reproduce
- What you expected to happen
- What actually happened
- Your environment

## Feature Requests

Include:
- A clear description of the feature
- Why it would be useful
- Any possible implementation details

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Questions?

Feel free to open an issue for any questions!
