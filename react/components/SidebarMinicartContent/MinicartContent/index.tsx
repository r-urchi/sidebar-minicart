import { OrderForm } from 'vtex.order-manager';
import MinicartContent, { MinicartProps } from './MinicartContent';
import { pathOr } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { fillDecimals } from '../utils/utils';

const { useOrderForm } = OrderForm;
import { useOrderItems } from 'vtex.order-items/OrderItems';


const SidebarMinicartContent = () => {

  const OrderFormContext = useOrderForm();
  const { updateQuantity } = useOrderItems();

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState<string>('');
  const [subtotal, setSubtotal] = useState('');
  const [discount, setDiscount] = useState('');

  const totalizers = pathOr([], ['orderForm', 'totalizers'], OrderFormContext);
  const orderformId = pathOr('', ['orderForm', 'id'], OrderFormContext);

  const items = useMemo(() => {
    const i = pathOr([], ['orderForm', 'items'], OrderFormContext);
    return i.filter(item => item?.price || item?.listPrice);
  }, [OrderFormContext]);


  useEffect(() => {
    if (totalizers.length) {
      /**Discount */
      const d = totalizers.find(a => a.id === 'Discounts');
      const dis = pathOr(0, ['value'], d);
      dis && setDiscount(fillDecimals(dis / 100, 0));

      /**  */
      const s = totalizers.find(a => a.id === 'Items');
      const sub = pathOr(0, ['value'], s);
      sub && setSubtotal(fillDecimals(sub / 100, 0));

      if (dis || sub) {
        setTotal(fillDecimals((sub / 100 + dis / 100).toFixed(2), 0));
      }
    }
    return () => setCount(0);
  }, [totalizers]);

  useEffect(() => {
    if (items.length) {
      let q = 0;
      items
        .filter(item => item?.price || item?.listPrice)
        .map((item: { quantity: number }) => {
          q += item.quantity;
        });
      setCount(q);
    }
    return () => setCount(0);
  }, [items]);

  const goToCheckout = () => (window.location.href = '/checkout');

  const remove = async (value: any) => {
    updateQuantity({ index: value, quantity: 0, seller: 1 });
  };

  const context: MinicartProps = {
    total,
    subtotal,
    discount,
    count,
    orderformId,
    items,
    goToCheckout,
    remove,
  };

  return <MinicartContent context={context} />;
};

export default SidebarMinicartContent;
