import React from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }];

const reducer = (accumulator, currentValue) => accumulator + currentValue
class App extends React.Component {
  state = {
    products: initialProductList
  }

  handleChange = (e) => {
    const newProducts = this.state.products
    const productToChange = newProducts.findIndex(elt => elt.name === e.target.name)
    console.log(e.target.value)
    if (parseInt(e.target.value) === 0) {
      if (window.confirm("Etes vous sûr de bien vouloir retirer ce produit de la liste ?")) {
        newProducts.splice(productToChange, 1)
      }
    }
    else {
      newProducts[productToChange].quantity = e.target.value

    }
    this.setState({ products: newProducts })
  }

  onAdd = (event) => {
    const name = document.getElementById('addName')
    const price = document.getElementById('addPrice')
    const newProduct = this.state.products
    const randomId =  Math.floor(Math.random() * Math.floor(999)) 
    
    newProduct.push({id: randomId, name: name.value, price: price.value, quantity: 1})
    this.setState({products: newProduct})
    console.log(newProduct)
    event.preventDefault();
  }

  render() {
    const totalPrice = []
    const { products } = this.state
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
                    name={elt.name}
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
        <p>Montant de la commande : <strong>{totalPrice.length === 0 ? "" : totalPrice.reduce(reducer)}</strong> €</p>
        <form>
          <h2>Ajouter un produit</h2>
          <div className="field">
            <div>
              <label htmlFor="name">Nom</label>
              <input type="text" id="addName" name="name" required/>
            </div>
            <div>
              <label htmlFor="price">Prix</label>
              <input type="number" id="addPrice" name="price" required/>
            </div>
            <button onClick={this.onAdd}>Ajouter</button>
          </div>
        </form>
      </div>
    )
  };

}
export default App;

