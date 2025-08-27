# German Syntax Check Testing

This project includes automated tests to check for German syntax errors in the documentation files.

## Features

The syntax checker includes three levels of checking:

### 1. Basic German Syntax Validation (Always Active)
- Checks for duplicate words (das das, der der, etc.)
- Detects potentially uncapitalized nouns after articles
- Identifies possible incorrect verb positions in subordinate clauses
- Runs locally without any external dependencies

### 2. Text Quality Checks (Always Active)
- Checks for common German typos
- Validates abbreviation punctuation
- Runs locally without any external dependencies

### 3. Advanced Grammar Check with LanguageTool API (Optional)
- Uses the free LanguageTool API for comprehensive grammar checking
- Disabled by default to avoid rate limits
- Free tier allows 20 requests per minute

## Running the Tests

### Run all tests including syntax checks:
```bash
npm test
```

### Run only the German syntax checks:
```bash
npm run test:syntax
```

### Run tests in watch mode:
```bash
npm run test:watch
```

## Understanding the Results

### Basic Syntax Checks
The test will output any potential syntax issues found in your German documentation:
- Duplicate words
- Uncapitalized nouns
- Verb position issues

These are warnings and won't fail your test suite unless there are more than 100 issues.

### Text Quality Checks
The test reports:
- Common German spelling mistakes
- Missing punctuation in abbreviations

### LanguageTool API (Advanced)
To enable the LanguageTool API checks:

1. Open `src/__tests__/german-syntax-check.test.ts`
2. Find the test `should check German grammar using LanguageTool API`
3. Remove `.skip` from `it.skip` to make it `it`
4. Run the test: `npm run test:syntax`

Note: The API has rate limits (20 requests/minute for free tier), so the test only checks a few files by default.

## Customization

### Adding More Syntax Rules
Edit `src/__tests__/german-syntax-check.test.ts` and add new patterns to the `checks` array in the `checkBasicGermanSyntax` function.

### Excluding Files
Modify the `getMarkdownFiles` function to exclude certain directories or files from checking.

### API Integration
The test is set up to use LanguageTool's free API. You can also:
- Use a self-hosted LanguageTool server
- Integrate with other grammar checking APIs
- Use local AI models with Ollama (requires local setup)

## Local AI Alternative (Ollama)

For completely offline German syntax checking with AI, you can use Ollama:

1. Install Ollama: https://ollama.ai
2. Pull a German-capable model: `ollama pull llama2`
3. Modify the test to use Ollama's API instead of LanguageTool

## Limitations

- Basic syntax checks use rule-based patterns and may have false positives
- German grammar is complex, and automated checking may not catch all errors
- The free LanguageTool API has rate limits
- Some technical terms or domain-specific language might be flagged incorrectly

## Troubleshooting

### Test Runs Too Slowly
- The syntax check processes all markdown files. If you have many files, consider limiting the check to specific directories.

### Too Many False Positives
- Adjust the validation rules in `checkBasicGermanSyntax`
- Add exceptions for technical terms or specific patterns

### API Rate Limits
- The LanguageTool test is skipped by default
- Only enable it when you specifically want to check grammar
- Consider using a paid API key for more requests

## Contributing

To improve the syntax checker:
1. Add new validation patterns for common German errors
2. Improve the text extraction to better handle markdown formatting
3. Add support for additional grammar checking APIs
4. Create exceptions for domain-specific terminology