/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');

  for (var i in Product.allProducts) {

    var newListItem = document.createElement('option');
    newListItem.textContent= Product.allProducts[i].name;

    selectElement.appendChild(newListItem);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
var addItemButton = document.getElementById('catalog');
addItemButton.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault(); // Prevent the page from reloading
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

//Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  // suss out the item picked from the select list
  var productPicked = document.getElementById('items').value; // why not 'options'? it knows there's something in the dropdown.
  var quantityPicked = document.getElementById('quantity').value; // get the quantity
  //using those, add one item to the Cart
  cart.addItem(productPicked,quantityPicked);
}

//Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {

  var cartCounter = document.getElementById('itemCount');
  cartCounter.textContent = cart.items.length;
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {

  // Get the item and quantity from the form

  var productPicked = document.getElementById('items').value;
  var quantityPicked = document.getElementById('quantity').value;
  
  // Add a new element to the cartContents div with that information

  var cartPreview = document.getElementById('cartContents');
  var itemInCart = document.createElement('h4');

  itemInCart.textContent= 'Item: ' + productPicked + '. Quantity Selected: ' + quantityPicked;

  cartPreview.appendChild(itemInCart);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
