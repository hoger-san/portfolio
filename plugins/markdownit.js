import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
  const md = new MarkdownIt()

  const defaultRender =
    md.renderer.rules.blockquote_open ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }
  md.renderer.rules.blockquote_open = function(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    /**
     * Vuetifyのmarkdown表示対応
     * blockquoteのclass属性が未設定な場合、vuetifyのスタイル適用に必要なclass名設定
     * https://vuetifyjs.com/en/styles/content/#block-quote
     */
    if (tokens[idx].attrIndex('class') < 0) {
      tokens[idx].attrPush([
        'class',
        'blockquote font-italic text--secondary body-2'
      ])
    }
    return defaultRender(tokens, idx, options, env, self)
  }
  inject('md', md)
}
