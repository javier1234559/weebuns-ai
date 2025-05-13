import DOMPurify from "dompurify";
import { marked } from "marked";

/**
 * Sanitizes HTML content and removes potentially dangerous content
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "span", "br", "div"],
    ALLOWED_ATTR: ["class", "id", "style"],
  });
};

/**
 * Converts Markdown to HTML with sanitization
 */

export const simpleInlineMarkdownToHtml = (text: string): string => {
  let html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
  return sanitizeHtml(html);
};

/**
 * Converts HTML to plain text while preserving meaningful whitespace
 */
export const htmlToText = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = sanitizeHtml(html);
  return div.textContent || div.innerText || "";
};

/**
 * Normalizes text for comparison (removes extra whitespace, makes lowercase)
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
};

/**
 * Checks if two pieces of text match, ignoring case and extra whitespace
 */
export const textMatch = (text1: string, text2: string): boolean => {
  return normalizeText(text1) === normalizeText(text2);
};

/**
 * Splits text into words while preserving HTML structure
 * Returns an array of objects containing word and its HTML context
 */
export const splitTextPreserveHtml = (html: string) => {
  const cleanHtml = sanitizeHtml(html);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHtml;

  const result: { text: string; isWord: boolean }[] = [];

  const processTextNode = (node: Text) => {
    const words = node.textContent?.split(/(\s+|\b)/) || [];
    words.forEach((word) => {
      const isWord = Boolean(word.trim() && !/[.,!?]/.test(word));
      result.push({ text: word, isWord });
    });
  };

  const walkNodes = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      processTextNode(node as Text);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(walkNodes);
    }
  };

  walkNodes(tempDiv);
  return result;
};

/**
 * Returns React key for a word in context
 */
export const getWordKey = (word: string, index: number): string => {
  return `word-${word}-${index}`;
};

/**
 * Checks if a string is punctuation or whitespace
 */
export const isPunctuationOrWhitespace = (text: string): boolean => {
  return !text.trim() || /^[.,!?;:'\s]+$/.test(text);
};

/**
 * Get surrounding context for a word in text
 */
export const getWordContext = (
  text: string,
  word: string,
  contextSize: number = 50,
): string => {
  const normalizedText = text.toLowerCase();
  const normalizedWord = word.toLowerCase();
  const index = normalizedText.indexOf(normalizedWord);

  if (index === -1) return "";

  const start = Math.max(0, index - contextSize);
  const end = Math.min(text.length, index + word.length + contextSize);

  return text.slice(start, end);
};
