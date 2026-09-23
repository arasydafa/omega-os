// Local ESLint rule: emoji are forbidden in OmegaOS UI.
// Icons must come from lucide-react — never emoji.
const EMOJI = /\p{Extended_Pictographic}/u;

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: { description: 'disallow emoji, use lucide-react icons instead' },
    messages: {
      noEmoji: 'Emoji is forbidden in OmegaOS UI. Use a lucide-react icon instead.',
    },
    schema: [],
  },
  create(context) {
    const check = (node, text) => {
      if (typeof text === 'string' && EMOJI.test(text)) {
        context.report({ node, messageId: 'noEmoji' });
      }
    };
    return {
      Literal(node) {
        check(node, node.value);
      },
      TemplateElement(node) {
        check(node, node.value.cooked);
      },
      JSXText(node) {
        check(node, node.value);
      },
    };
  },
};

module.exports = rule;
