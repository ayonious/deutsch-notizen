import * as fs from 'fs';
import * as path from 'path';

describe('Documentation Frontmatter Validation', () => {
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

  // Helper function to parse frontmatter from markdown content
  const parseFrontmatter = (content: string) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return null;
    }

    const frontmatterContent = match[1];
    const frontmatter: Record<string, any> = {};

    // Simple YAML parsing for our specific needs
    const lines = frontmatterContent.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex > 0) {
          const key = trimmedLine.substring(0, colonIndex).trim();
          let value: any = trimmedLine.substring(colonIndex + 1).trim();

          // Handle arrays (tags)
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value
              .slice(1, -1)
              .split(',')
              .map((v: string) => v.trim().replace(/['"]/g, ''));
          } else {
            // Remove quotes
            value = value.replace(/^['"]|['"]$/g, '');
          }

          frontmatter[key] = value;
        }
      }
    }

    return frontmatter;
  };

  const requiredFields = [
    'id',
    'title',
    'sidebar_label',
    'sidebar_position',
    'tags',
  ];

  it('should find markdown files in docs directory', () => {
    const markdownFiles = getMarkdownFiles(docsPath);
    expect(markdownFiles.length).toBeGreaterThan(0);
  });

  describe('Grammatik files frontmatter validation', () => {
    const grammatikPath = path.join(docsPath, 'grammatik');
    let grammatikFiles: string[] = [];

    beforeAll(() => {
      if (fs.existsSync(grammatikPath)) {
        grammatikFiles = getMarkdownFiles(grammatikPath);
      }
    });

    it('should have grammatik files', () => {
      expect(grammatikFiles.length).toBeGreaterThan(0);
    });

    grammatikFiles.forEach((filePath) => {
      const fileName = path.basename(filePath);

      describe(`${fileName}`, () => {
        let fileContent: string;
        let frontmatter: Record<string, any> | null;

        beforeAll(() => {
          fileContent = fs.readFileSync(filePath, 'utf-8');
          frontmatter = parseFrontmatter(fileContent);
        });

        it('should have frontmatter', () => {
          expect(frontmatter).not.toBeNull();
          expect(frontmatter).toBeDefined();
        });

        if (frontmatter) {
          requiredFields.forEach((field) => {
            it(`should have required field: ${field}`, () => {
              expect(frontmatter).toHaveProperty(field);
              expect(frontmatter![field]).toBeDefined();
              expect(frontmatter![field]).not.toBe('');
            });
          });

          it('should have valid id field', () => {
            expect(typeof frontmatter!.id).toBe('string');
            expect(frontmatter!.id.length).toBeGreaterThan(0);
          });

          it('should have valid title field', () => {
            expect(typeof frontmatter!.title).toBe('string');
            expect(frontmatter!.title.length).toBeGreaterThan(0);
          });

          it('should have valid sidebar_label field', () => {
            expect(typeof frontmatter!.sidebar_label).toBe('string');
            expect(frontmatter!.sidebar_label.length).toBeGreaterThan(0);
          });

          it('should have valid sidebar_position field', () => {
            const position = frontmatter!.sidebar_position;
            expect(
              typeof position === 'number' || typeof position === 'string'
            ).toBe(true);
            if (typeof position === 'string') {
              expect(parseInt(position, 10)).toBeGreaterThan(0);
            } else {
              expect(position).toBeGreaterThan(0);
            }
          });

          it('should have valid tags field', () => {
            const tags = frontmatter!.tags;
            expect(Array.isArray(tags)).toBe(true);
            expect(tags.length).toBeGreaterThan(0);

            // Check that all tags are valid strings
            tags.forEach((tag: any) => {
              expect(typeof tag).toBe('string');
              expect(tag.length).toBeGreaterThan(0);
            });

            // Check that tags are from allowed set
            const allowedTags = [
              'basics',
              'mittelstufe',
              'fortgeschritten',
              'medien',
              'prufung',
              'B2',
              'C1',
            ];
            tags.forEach((tag: string) => {
              expect(allowedTags).toContain(tag);
            });
          });
        }
      });
    });
  });

  describe('All documentation files frontmatter validation', () => {
    let allMarkdownFiles: string[] = [];

    beforeAll(() => {
      allMarkdownFiles = getMarkdownFiles(docsPath);
    });

    it('should validate that all documentation files have frontmatter', () => {
      const filesWithoutFrontmatter: string[] = [];

      allMarkdownFiles.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(fileContent);

        if (!frontmatter) {
          filesWithoutFrontmatter.push(path.relative(docsPath, filePath));
        }
      });

      if (filesWithoutFrontmatter.length > 0) {
        console.log('Files without frontmatter:', filesWithoutFrontmatter);
      }

      expect(filesWithoutFrontmatter).toHaveLength(0);
    });

    it('should validate that all documentation files have required fields', () => {
      const filesWithMissingFields: Array<{
        file: string;
        missingFields: string[];
      }> = [];

      allMarkdownFiles.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(fileContent);

        if (frontmatter) {
          const missingFields = requiredFields.filter(
            (field) =>
              !frontmatter.hasOwnProperty(field) ||
              frontmatter[field] === undefined ||
              frontmatter[field] === ''
          );

          if (missingFields.length > 0) {
            filesWithMissingFields.push({
              file: path.relative(docsPath, filePath),
              missingFields,
            });
          }
        }
      });

      if (filesWithMissingFields.length > 0) {
        console.log('Files with missing fields:', filesWithMissingFields);
      }

      expect(filesWithMissingFields).toHaveLength(0);
    });
  });
});
