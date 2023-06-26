import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/ActivityGrid/ActivityGrid';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-root')
export class AppRoot extends LitElement {

  render() {
    return html`
      <main>
        <activity-grid />
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot
  }
}
