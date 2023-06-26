import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export const monthNameFromNumber = (num: number): string => {
  const date = new Date(1991, num, 1);
  const month = date.toLocaleString('default', { month: 'long' });
  return month;
}

@customElement('month-select')
export class MonthSelect extends LitElement {

  @property({ type: Number })
  value = (new Date).getMonth();

  render() {
    return html`
      <div>
        <button class="ms__btn ms__prev" @click=${this._prev}><</button>
        <span class="ms__name">${monthNameFromNumber(this.value)}</span>
        <button class="ms__btn ms__next" @click=${this._next}>></button>
      </div>
    `
  }

  private _prev() {
    this._updateValue( this.value > 0 ? this.value - 1 : 11 );
  }

  private _next() {
    this._updateValue( this.value < 11 ? this.value + 1 : 0 );
  }

  private _updateValue(newValue: number) {
    this.value = newValue;

    const options = {
      bubbles: true,
      composed: true
    };

    this.dispatchEvent(new Event('change', options));
  }

  static styles = css`
    .ms__name {
      display: inline-block;
      width: 100px;
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'month-select': MonthSelect
  }
}
