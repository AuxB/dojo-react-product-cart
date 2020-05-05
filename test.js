import React from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }
];


class App extends React.Component {
  state = {
    quantity : [1, 2, 5]
  }

  handleChange = e => {
    const id = e.target.id

    this.setState({quantity : e.target.value})
  }

  render() {
    return (
      <div className='App'>
        <h1>Ma commande</h1>
        <table>
          <tr>
            <td>Produit</td>
            <td>Prix unitaire</td>
            <td>Quantité</td>
            <td>Prix total</td>
          </tr>
          {initialProductList.map((product, key) => {
          return (
            <tr key={key}>
              <td>{product.name}</td>
              <td>{product.price + " €"}</td>
              <td>
                <input  type="number" value={this.state.quantity[key]} onChange={this.handleChange} />
              </td>
              <td>{product.price * this.state.quantity[key] + " €"}</td>
            </tr>
            )
          })}
        </table>
      </div>
    );
  }
}

export default App;
