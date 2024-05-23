// OrderForm.jsx

import React, { useState } from 'react';
import './OrderForm';
/*

 * קומפוננטת טופס הזמנה מבשלן.
 * @param {string} chefId המזהה של הבשלן שהמשתמש מזמין ממנו.
 * @param {function} onSubmit פונקצית קולבק שתופעל כאשר משתמש מגיש את הטופס עם נתוני ההזמנה.
 * @returns טופס הזמנה לבשלן.
 */

function OrderForm({ chefId, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  

  /*
  *
   * פונקציה המתבצעת כאשר משתמש מגיש את הטופס.
   * @param {Event} e אירוע ההגשה של הטופס.
   */
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      chefId,
      name,
      email,
      phone,
      address,
    };
    onSubmit(orderData);
  };

  return (
    <div className="order-form-popup">
    <div className="order-form-content">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>שם מלא</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-field">
          <label>כתובת דואר אלקטרוני</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-field">
          <label>מספר טלפון</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="input-field">
          <label>כתובת משלוח</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <button type="submit">שליחת הזמנה</button>
      </form>
    </div>
  </div>
  
  );
}

export default OrderForm;
