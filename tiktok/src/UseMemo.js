import { useRef, useState, useMemo } from "react";
import "./App.css";

function UseMemo() {
  const [products, setProducts] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");

  const nameRef = useRef();

  const handleSubmit = () => {
    setProducts((prev) => [
      ...prev,
      {
        name: nameProduct,
        price: +priceProduct,
      },
    ]);
    setNameProduct("");
    setPriceProduct("");

    nameRef.current.focus();
  };

  const total = useMemo(() => {
    const result = products.reduce((result, prod) => {
      console.log("tinh toan");
      return result + prod.price;
    }, 0);
    return result;
  }, [products]);

  return (
    <div className="App">
      <div>
        <input
          ref={nameRef}
          value={nameProduct}
          placeholder="Enter name product"
          onChange={(e) => setNameProduct(e.target.value)}
        />
      </div>
      <div>
        <input
          value={priceProduct}
          placeholder="Enter price product"
          onChange={(e) => setPriceProduct(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <h1>Total: {total}</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} -- {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseMemo;
