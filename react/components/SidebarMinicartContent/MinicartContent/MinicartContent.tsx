import Style from './MinicartContent.css';
import { fillDecimals, borrarUnico } from '../utils/utils';
import Quantity from './quantity-selector';
import { Fragment } from 'react';

export interface MinicartProps {
  total: string;
  subtotal: string;
  discount: string;
  count: number;
  orderformId: string;
  items: any[];
  goToCheckout: () => void;
  remove: (id: any) => void;
}

const MinicartContent = ({ context }: { context: MinicartProps }) => {
  const {
    subtotal,
    items,
    remove,
  } = context;


  return items && items.length ? (
    <div className={Style.minicart_content}>
      <div className={Style.minicart_content_list_items}>
        {items.map((item, i) => {
          return !item.isGift ? (
            <div className={Style.minicart_content_item}>
              <div className={Style.minicart_content_image_container}>
                <img className={Style.minicart_content_image} src={item?.imageUrls?.at2x} />
              </div>
              <div className={Style.minicart_content_separator}></div>
              <div className={Style.minicart_content_description}>
                <div className={Style.minicart_content_name}>{borrarUnico(item?.skuName)}</div>
                <div className={Style.minicart_content_price}>
                  ${fillDecimals((item?.sellingPrice || 0) / 100, 0)}
                </div>
              </div>
              <div className={Style.minicart_content_quantity}>
                <div className={Style.minicart_content_quantity_container}>
                  <Quantity {...item} />
                </div>
              </div>
              <div className={Style.minicart_content_remove} onClick={() => { remove && remove(i); }}>Remover</div>
            </div>
          ) : <Fragment />
        })}
      </div>
      <div className={Style.minicart_container_footer}>
        <div className={Style.minicart_content_subtotal_container}>
          <div className={Style.minicart_content_subtotal}>
            Subtotal:	&nbsp; <b>${subtotal}</b>
          </div>
          <div>
          </div>
        </div>
        <a className={Style.minicart_content_go_to_checkout} href="/checkout#/cart">CERRAR PEDIDO</a>
      </div>
    </div>
  ) : (
    <div className={Style.minicart_content}>
      <div className={Style.minicart_content_empty_title}>No tienes ningun producto en el carrito</div>
    </div>
  );
};

export default MinicartContent;
