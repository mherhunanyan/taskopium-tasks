const products = [
  { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
  { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
  { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
];

window.onload = function() {
  populateFilters();
  displayProducts(products);
};

function populateFilters() {
  
  const categories = [...new Set(products.map(product => product.category))];
  const categoryFilter = document.getElementById("categoryFilter");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const tagFilters = document.getElementById("tagFilters");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Tags";
  fieldset.appendChild(legend);

  const tags = [...new Set(products.flatMap((product) => product.tags))];
  tags.forEach((tag) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = tag;
    checkbox.id = `tag-${tag}`;
    label.appendChild(checkbox);
    label.htmlFor = checkbox.id;
    label.appendChild(document.createTextNode(tag));
    fieldset.appendChild(label);
  });

  tagFilters.appendChild(fieldset);

  categoryFilter.addEventListener("change", filterProducts);
  fieldset.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.addEventListener("change", filterProducts));
}

function displayProducts(filteredProducts) {
  const container = document.getElementById("productContainer");
  container.innerHTML = '';
  if (filteredProducts.length === 0) {
    container.textContent = "No products found.";
    return;
  }
  const ul = document.createElement("ul");
  filteredProducts.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - ${product.category} - $${product.price} - Tags: ${product.tags.join(", ")}`;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function filterProducts() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const selectedTags = Array.from(document.querySelectorAll("#tagFilters input:checked")).map(input => input.value);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const tagMatch = selectedTags.length > 0 ? selectedTags.every(tag => product.tags.includes(tag)) : true;
    return categoryMatch && tagMatch;
  });

  displayProducts(filteredProducts);
}