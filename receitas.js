var theme = {};
theme.card = '\
<% recipes.forEach(function (recipe) {\
  var custo = 0 %>\
  <div class="col s12 m6 l4 xl3">\
    <div class="card">\
      <div class="card-image waves-effect waves-block waves-light">\
        <img class="activator" src="https://static.digitalleman.com/calculadora/default.jpg">\
      </div>\
      <div class="card-content">\
        <span class="card-title activator grey-text text-darken-4"><%= recipe.name %><i class="material-icons right">room_service</i></span>\
      </div>\
      <div class="card-reveal">\
        <span class="card-title grey-text text-darken-4"><%= recipe.name %><i class="material-icons right">close</i></span>\
        <form class="recipe-calculator">\
          <div class="row">\
            <div class="input-field col">\
              <input oninput="recipeCalculator(this)" min="1" value="1" id="<%= recipe.id %>-quantity" type="number" class="quantity validate">\
              <label for="<%= recipe.id %>-quantity">Quantidade</label>\
            </div>\
            <% recipe.ingredient.forEach(function (ingredient) {\
              custo += ingredient.product.price * ingredient.quantity %>\
              <div class="col">\
                <div class="input-field inline">\
                  <input oninput="recipeCalculator(this)" id="<%= recipe.id %>-<%= ingredient.product.id %>" data-value="<%= ingredient.quantity %>" type="number" class="validate ingredient" value="<%= ingredient.quantity %>">\
                  <label for="<%= recipe.id %>-<%= ingredient.product.id %>"><%= ingredient.product.product %></label>\
                </div>\
                <%= ingredient.product.unit %>\
              </div>\
            <% }); %>\
          </div>\
        </form>\
      </div>\
      <div class="card-action">\
        <div class="chip"><%= recipe.sku %></div>\
        <div class="chip"><%= custo.toFixed(2) %> €</div>\
        <div class="chip"><%= recipe.ingredient.length %> ingrediente<% if (recipe.ingredient.length > 1) { %>s<% } %></div>\
      </div>\
    </div>\
  </div>\
<% }); %>\
';
axios.get('https://api.digitalleman.com/recipes')
  .then(function (result) {
    document.getElementById('recipes').innerHTML = ejs.render(theme.card, { recipes: result.data });
    M.updateTextFields();
  })
  .catch(err => console.log(err));

function recipeCalculator(input) {
  var quantity = input.closest('.recipe-calculator').querySelector('.quantity').value;
  input.closest('.recipe-calculator').querySelectorAll('.ingredient').forEach(ingredient => ingredient.value = ingredient.getAttribute('data-value') * quantity);;
}