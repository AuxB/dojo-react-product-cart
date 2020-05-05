import React from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }];

const reducer = (accumulator, currentValue) => accumulator + currentValue
class App extends React.Component {
  state = {
    products: initialProductList,
    total: []
  }

  handleChange = e => {
    const id = e.target.id - 1 // On soustrait pour être raccord avec l'id du initial Product
    const products = this.state.products
    if (parseInt(e.target.value) === 0) {
      if (window.confirm("Etes vous sûr de bien vouloir retirer ce produit de la liste ?")) {
        delete products[id]
      }
    }
    else {
      products[id].quantity = e.target.value

    }
    this.setState({ products: products })
  }

  render() {
    const totalPrice = []
    const { products } = this.state
    console.log(products)
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
          {products.map((elt, key) => {
            const price = elt.price * elt.quantity
            totalPrice.push(price)
            return (
              <tr key={key}>
                <td>{elt.name}</td>
                <td>{elt.price + '€'}</td>
                <td>
                  <input id={elt.id}
                    type="number"
                    onChange={this.handleChange}
                    value={elt.quantity} />
                </td>
                <td>{price + '€'}</td>
              </tr>
            )
          })
          }
        </table>
        <p>Montant de la commande : <strong>{totalPrice.reduce(reducer)}</strong> €</p>
        <form>
          <h2>Ajouter un produit</h2>
          <div className="field">
            <label for="name">Nom</label>
            <input type="text" name="name" />
            <label for="price">Prix</label>
            <input type="number" name="price" />
          </div>
        </form>
      </div>
    )
  };

}
export default App;

