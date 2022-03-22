import { pathOr, find } from 'ramda';
import { useEffect, useState } from 'react';

export const useSelectableGifts = () => {

  const [selectableGifts, setSelectableGifts] = useState([]);
  const checkout = (window as any)?.vtexjs?.checkout;

  const onRefetchOrderForm = () => {
    try {

      setTimeout( () => {
        checkout.getOrderForm()
        .done(function(orderForm: any) {
          const gift = pathOr([], ['selectableGifts'], orderForm);
          const rates = pathOr([], ['ratesAndBenefitsData', 'rateAndBenefitsIdentifiers'], orderForm);
          setSelectableGifts(gift.map(g => {
            const f = (v: any) => v.id === g.id;
            const rate = find(f)(rates);
            if (rate) {
              return {
                  ...g,
                  name: rate?.name
              }
          }
          return g;
          }))
        }); 
      },1500);

    } catch (error) {}
  }

  useEffect(onRefetchOrderForm, []);

  return {
    selectableGifts,
    onRefetchOrderForm
  }
};

export default useSelectableGifts;