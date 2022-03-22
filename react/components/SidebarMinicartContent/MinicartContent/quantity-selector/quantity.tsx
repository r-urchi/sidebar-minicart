import React from 'react';
import QuantityStyle from './quantity.css';

const QuantityWrapper = ({ quantity, upQuantity, downQuantity }: any) => {
    return <div className={QuantityStyle.quantity_Container}>
        <div className={QuantityStyle.quantity_Container_Label}>Cantidad: {quantity}</div>
        <div className={QuantityStyle.quantity_Container_Icon_Cont}>
            <div onClick={downQuantity} className={QuantityStyle.quantity_Container_Icon} style={{ pointerEvents: quantity <= 1 ? 'none' : 'initial' }}>
                -
            </div>
            <div onClick={upQuantity} className={QuantityStyle.quantity_Container_Icon} >
                +
            </div>
        </div>
    </div>
}

export default QuantityWrapper