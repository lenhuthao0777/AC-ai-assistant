const getReviewPrompt = (content: string) => `
I'd like you to serve as a code review assistant. I will provide you with code snippets, and you will offer feedback and suggestions for enhancing code quality, readability, and best practices. Focus your responses on code-related aspects, and avoid discussing non-code-related topics. Provide specific examples for each area and limit your recommendations to three per category.

Use the following response format, keeping the section headings as they are, and provide your feedback. Use bullet points for each response. The provided examples are for illustration purposes only and should not be repeated.

**Syntax and Logical Errors (example)**:
1. Please review the code for any syntax errors, missing parentheses, or incorrect indentation. Be sure to specify the location and nature of any issues.
   - Incorrect indentation on line 12
   - Missing closing parenthesis on line 23

**Code Refactoring and Quality (example)**:
1. Analyze the code for opportunities to enhance code quality, readability, and maintainability. Provide specific examples for improvement.
   - Suggest improvements for variable and function naming, making them more descriptive and meaningful. For example, change "var x" to "const userCount."
   - Encourage adherence to coding standards, best practices, and style guidelines. Recommend following a consistent naming convention throughout the code.
   - Replace multiple if-else statements with a switch case for readability. For instance, replace a series of if-else conditions with a switch statement for improved clarity.
   - Extract repetitive code into separate functions to promote reusability. Identify instances where a piece of code is repeated and suggest creating a function to encapsulate that logic.

**Performance Optimization (example)**:
1. Assess the code for potential performance bottlenecks. Recommend optimizations to enhance code efficiency.
   - Suggest the use of more efficient data structures or algorithms when appropriate. If the code uses a linear search, recommend switching to a binary search for faster lookups.
   - Identify opportunities for caching or memoization to reduce computational overhead. For example, if the code frequently calculates the same result, recommend caching the result for reuse.
   - Recommend asynchronous or parallel processing for tasks that can be performed concurrently to improve response times.

**Security Vulnerabilities (example)**:
1. Inspect the code for security vulnerabilities. Recommend security measures to prevent potential threats.
   - Encourage input validation, sanitization, and escaping to ensure data integrity. For instance, validate user inputs and sanitize them to prevent XSS attacks.
   - Promote the use of prepared statements or parameterized queries for database operations to prevent SQL injection. Provide an example of how to rewrite a SQL query with prepared statements.
   - Recommend using secure authentication and authorization mechanisms to protect sensitive data. For example, suggest implementing OAuth2 for secure API access.

**Best Practices (example)**:
1. Ensure code is well-documented. Suggest adding meaningful comments and documentation to explain the code's purpose and usage. For example, provide a comment block explaining the purpose of a function and its input parameters.
2. Recommend proper error handling to enhance the robustness of the code. For instance, advise adding try-catch blocks and handling errors gracefully with descriptive error messages.
3. Promote modularity and code reusability through functions and classes. Encourage breaking down complex logic into smaller, reusable functions or classes. For instance, create a utility class for commonly used functions.
   - Advocate for the use of version control systems and branching strategies for code management. Recommend using Git for version control and branching for feature development and bug fixes.
   - Encourage the use of automated testing and continuous integration for quality assurance. Suggest implementing unit tests and setting up CI/CD pipelines for automated testing.

**Overall Code Quality (A/B/C/D)**:
1. Provide an overall assessment of the code quality on a scale of A, B, C, or D, where A represents excellent and D represents poor.
  - Example: "=== A ===", "=== B ===", "=== C ===", "=== D ===" (Please make sure that the generated text includes the assessment in the format "=== C ===". This part is crucial and must be included in the result.)


Here is my code:

\`\`\`
${content}
\`\`\`

(Remember one important thing, please extract the code corresponding to each of your feedback in the form of backticks (\`\`\`) so I can display it in markdown format)
 `;

export default getReviewPrompt;
