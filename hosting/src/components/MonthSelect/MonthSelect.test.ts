import { beforeEach, describe, expect, it } from 'vitest'
import { MonthSelect, monthNameFromNumber } from './MonthSelect';


describe('Given the monthNameFromNumber function', () => {
  describe('When recieves 0 as a parameter', () => {
    it('Then it should return January', () => {
      const monthName = monthNameFromNumber(0);
      expect( monthName ).toBe('January');
    });
  });

  describe('When recieves 11 as a parameter', () => {
    it('Then it should return December', () => {
      const monthName = monthNameFromNumber(11);
      expect( monthName ).toBe('December');
    });
  });
});

const waitForElement = async (waiter: () => boolean) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (waiter()) {
        clearInterval(interval)
        resolve()
      }
    }, 10);
  });
}

describe('Given the MonthSelect Element', () => {

  const tagName = 'month-select';

  const getElement = (): MonthSelect | null | undefined => document.body.querySelector(tagName);

  const queryShadow = (selector: string): HTMLElement | null | undefined => getElement()?.shadowRoot?.querySelector(selector);

  const getCurrentMonth = () => (new Date).getMonth();

  describe("When doesn't receive a value attribute", () => {
    beforeEach(() => {
      document.body.innerHTML = `<${tagName} />'`;
    })

    it("Then it's value should be the current month", () => {
      const selectValue = getElement()?.value;
      expect( selectValue ).toBe( getCurrentMonth() );
    });

    it("And it should print the current month's name", async () => {
      await waitForElement(() => !!queryShadow('.ms__name'));
      const nameEl = queryShadow('.ms__name');
      expect( nameEl?.textContent ).toBe( monthNameFromNumber( getCurrentMonth() ) );
    });
  });

  describe("When it receives a value attribute with a value of 0", () => {
    beforeEach(() => {
      document.body.innerHTML = `<${tagName} value="0" />'`;
    });

    it("Then it's value should be 0", () => {
      const selectValue = getElement()?.value;
      expect( selectValue ).toBe( 0 );
    });

    it("And it should print 'January'", async () => {
      await waitForElement(() => !!queryShadow('.ms__name'));
      const nameEl = queryShadow('.ms__name');
      expect( nameEl?.textContent ).toBe( monthNameFromNumber( 0 ) );
    });

    describe("And if the user clicks the previous button", async () => {
      beforeEach(async () => {
        await waitForElement(() => !!queryShadow('.ms__prev'));
        const prevBtn = queryShadow('.ms__prev');
        prevBtn?.click();
      });

      it("Then it's value should be 11", () => {
        const selectValue = getElement()?.value;
        expect( selectValue ).toBe( 11 );
      });

      it("And it should print 'December'", async () => {
        await waitForElement(() => !!queryShadow('.ms__name'));
        const nameEl = queryShadow('.ms__name');
        expect( nameEl?.textContent ).toBe( monthNameFromNumber( 11 ) );
      });
    });
  });

  describe("When it receives a value attribute with a value of 11", () => {
    beforeEach(() => {
      document.body.innerHTML = `<${tagName} value="11" />'`;
    });

    it("Then it's value should be 11", () => {
      const selectValue = getElement()?.value;
      expect( selectValue ).toBe( 11 );
    });

    it("And it should print 'December'", async () => {
      await waitForElement(() => !!queryShadow('.ms__name'));
      const nameEl = queryShadow('.ms__name');
      expect( nameEl?.textContent ).toBe( monthNameFromNumber( 11 ) );
    });

    describe("And if the user clicks the next button", async () => {
      beforeEach(async () => {
        await waitForElement(() => !!queryShadow('.ms__next'));
        const nextBtn = queryShadow('.ms__next');
        nextBtn?.click();
      });

      it("Then it's value should be 0", () => {
        const selectValue = getElement()?.value;
        expect( selectValue ).toBe( 0 );
      });

      it("And it should print 'January'", async () => {
        await waitForElement(() => !!queryShadow('.ms__name'));
        const nameEl = queryShadow('.ms__name');
        expect( nameEl?.textContent ).toBe( monthNameFromNumber( 0 ) );
      });
    });
  });

});
