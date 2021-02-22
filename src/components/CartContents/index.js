import React from 'react';
import CartContext from 'context/CartContext';
import { CartItem, CartHeader, CartFooter, Footer } from './styles';
import { QuantityAdjuster } from '../QuantityAdjuster';
import { RemoveLineItem } from '../RemoveLineItem';
import { Button } from '../Button';
import { navigate } from '@reach/router';

export function CartContents() {
  const { checkout, updateLineItem } = React.useContext(CartContext);

  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId });
  };

  return (
    <section>
      <h1>Warenkorb</h1>
      {!!checkout?.lineItems && (
        <CartHeader>
          <div>Produkt</div>
          <div>Preis</div>
          <div>Menge</div>
          <div>Summe</div>
        </CartHeader>
      )}
      {checkout?.lineItems?.map(item => (
        <CartItem key={item.variant.id}>
          <div>
            <div>{item.title}</div>
            <div>
              {item.variant.title === 'Default Title' ? '' : item.variant.title}
            </div>
          </div>
          <div>€{item.variant.price}</div>
          <div>
            <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity} />
          </div>
          <div>€{(item.quantity * item.variant.price).toFixed(2)}</div>
          <div>
            <RemoveLineItem lineItemId={item.id} />
          </div>
        </CartItem>
      ))}
      {!!checkout?.lineItems && (
        <CartFooter>
          <div>
            <strong>Gesamt:</strong>
          </div>
          <div>
            <span>€{checkout?.totalPrice}</span>
          </div>
        </CartFooter>
      )}
      {!checkout?.lineItems && <h4>Warenkorb ist leer</h4>}
      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>Weiter einkaufen</Button>
        </div>
        <div>
          {!!checkout?.webUrl && (
            <Button
              onClick={() => {
                window.location.href = checkout.webUrl;
              }}
            >
              Einkaufen
            </Button>
          )}
        </div>
      </Footer>
    </section>
  );
}
