import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/MonthSelect/MonthSelect';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('activity-grid')
export class ActivityGrid extends LitElement {

  @property({
    type: Number,
    attribute: false
  })
  month = (new Date).getMonth();

  render() {
    return html`
      <month-select value=${this.month} @change=${this._onMonthChange} />
    `
  }

  private _onMonthChange(e: Event) {
    // TODO: Check if there's a cleaner way to do this
    const target = e.target as HTMLInputElement;
    this.month = Number(target?.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'activity-grid': ActivityGrid
  }
}
