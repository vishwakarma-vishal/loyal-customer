import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoyalCustomers = () => {
  const [loyalCustomers, setLoyalCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoyalCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/loyal-customers');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setLoyalCustomers(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format.');
        }
      } catch (error) {
        console.error('Error fetching loyal customers:', error);
        setError('Error fetching loyal customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoyalCustomers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Loyal Customers</h1>
      {loyalCustomers.length > 0 ? (
        <ul>
          {loyalCustomers.map(customerId => (
            <li key={customerId}>{customerId}</li>
          ))}
        </ul>
      ) : (
        <p>No loyal customers found.</p>
      )}
    </div>
  );
};

export default LoyalCustomers;
