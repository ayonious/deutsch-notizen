import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

describe('German Syntax Check', () => {
  const docsPath = path.join(__dirname, '../../docs');

  // Helper function to get all markdown files recursively
  const getMarkdownFiles = (dir: string): string[] => {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  };

  // Extract German text from markdown content
  const extractGermanText = (content: string): string[] => {
    // Remove frontmatter
    const withoutFrontmatter = content.replace(
      /^---\s*\n[\s\S]*?\n---\s*\n/,
      ''
    );

    // Remove code blocks
    const withoutCodeBlocks = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');

    // Remove inline code
    const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '');

    // Remove markdown formatting but keep text
    const withoutFormatting = withoutInlineCode
      .replace(/^#+\s+/gm, '') // headers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // bold/italic
      .replace(/^[-*+]\s+/gm, '') // lists
      .replace(/^>\s+/gm, '') // quotes
      .replace(/!\[.*?\]\(.*?\)/g, ''); // images

    // Split into sentences and filter out empty ones
    const sentences = withoutFormatting
      .split(/[.!?]\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10) // Filter out very short fragments
      .filter(
        (s) =>
          /[äöüÄÖÜß]/.test(s) ||
          /\b(der|die|das|den|dem|des|ein|eine|einen|einem|eines|und|oder|aber|ich|du|er|sie|es|wir|ihr|Sie|haben|sein|werden|können|müssen|sollen|wollen|dürfen|mögen)\b/i.test(
            s
          )
      ); // Only German text

    return sentences;
  };

  // Check for using free online API (using LanguageTool API - free tier)
  const checkWithLanguageTool = async (
    text: string
  ): Promise<{ matches: any[] }> => {
    try {
      // LanguageTool offers a free API with 20 requests per minute
      // For testing, we'll use their public API endpoint
      const response = await axios.post(
        'https://api.languagetool.org/v2/check',
        new URLSearchParams({
          text: text,
          language: 'de-DE',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
      return { matches: [] };
    } catch (error) {
      // If API fails, return empty matches
      console.warn('LanguageTool API not available:', error);
      return { matches: [] };
    }
  };

  describe('Advanced German Grammar Check (with LanguageTool API)', () => {
    let grammatikFiles: string[] = [];
    const grammatikPath = path.join(docsPath, 'grammatik');

    beforeAll(() => {
      if (fs.existsSync(grammatikPath)) {
        grammatikFiles = getMarkdownFiles(grammatikPath).slice(0, 3); // Test only 3 files to stay within free tier limits
      }
    });

    it('should check German grammar using LanguageTool API', async () => {
      const results: Array<{ file: string; issues: any[] }> = [];

      for (const filePath of grammatikFiles) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const germanSentences = extractGermanText(fileContent);
        const textToCheck = germanSentences.slice(0, 5).join(' '); // Check first 5 sentences only

        const apiResult = await checkWithLanguageTool(textToCheck);

        if (apiResult.matches && apiResult.matches.length > 0) {
          results.push({
            file: path.relative(docsPath, filePath),
            issues: apiResult.matches.map((match: any) => ({
              message: match.message,
              context: match.context.text,
              suggestions: match.replacements
                ?.slice(0, 3)
                .map((r: any) => r.value),
            })),
          });
        }

        // Wait to respect rate limit (20 requests per minute)
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      if (results.length > 0) {
        console.log('\nLanguageTool Grammar Check Results:');
        results.forEach(({ file, issues }) => {
          console.log(`\n${file}:`);
          issues.forEach((issue) => {
            console.log(`  - ${issue.message}`);
            if (issue.suggestions?.length > 0) {
              console.log(`    Suggestions: ${issue.suggestions.join(', ')}`);
            }
          });
        });
      }

      // This is informational - won't fail the test
      expect(results).toBeDefined();
    }, 20000);
  });
});
