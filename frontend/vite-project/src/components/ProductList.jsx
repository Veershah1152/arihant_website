import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchProducts()
      .then(list => { if (mounted) setProducts(list); })
      .catch(err => { console.error(err); if (mounted) setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16}}>
      {products.length === 0 && <div>No products yet.</div>}
      {products.map(p => (
        <div key={p._id} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
          {/* show first image if exists */}
          {p.images && p.images[0] ? (
            <img
              src={p.images[0].url}
              alt={p.name}
              style={{width:'100%', height:160, objectFit:'cover', borderRadius:6}}
            />
          ) : (
            <div style={{width:'100%', height:160, background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center'}}>No image</div>
          )}

          <h3 style={{margin:'8px 0 4px'}}>{p.name}</h3>
          <div>₹{p.price}</div>
          <div style={{fontSize:12, color:'#666'}}>{p.category}</div>
        </div>
      ))}
    </div>
  );
}
