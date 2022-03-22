import React from 'react';
import QuantityStyle from './quantity.css';
// import Icon from '../../../dior.icons/Icons';

const QuantityWrapper = ({ quantity, upQuantity, downQuantity }: any) => {
    return <div className={QuantityStyle.quantity_Container}>
        <div className={QuantityStyle.quantity_Container_Label}>Cantidad: {quantity}</div>
        <div className={QuantityStyle.quantity_Container_Icon_Cont}>
            <div onClick={downQuantity} className={QuantityStyle.quantity_Container_Icon} style={{pointerEvents: quantity <= 1 ? 'none' : 'initial'}}>
                {/* <Icon base="fal" icon="fa-minus"/>  */}
            </div>
            <div onClick={upQuantity} className={QuantityStyle.quantity_Container_Icon} >
                {/* <Icon base="fal" icon="fa-plus"/>  */}
            </div>
        </div>
    </div>
}

export default QuantityWrapper