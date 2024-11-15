// Array de productos almacenado en localStorage 
const productos = [
    {
        nombre: "Camisa Casual Hombre",
        imagen: "./frontend/imagenes/2.png",
        precio: 75000,
        descripcion: "Camisa casual de algodón, ideal para el uso diario.",
        categoria: "Ropa",
        marca: "Koaj"
    },
    {
        nombre: "Jeans Skinny Mujer",
        imagen: "./frontend/imagenes/jeans_mujer.jpg",
        precio: 120000,
        descripcion: "Jeans de corte skinny con alto confort y estilo.",
        categoria: "Ropa",
        marca: "Studio F"
    },
    {
        nombre: "Tenis Running Hombre",
        imagen: "./frontend/imagenes/tenis_running.jpg",
        precio: 210000,
        descripcion: "Tenis livianos y cómodos para correr largas distancias.",
        categoria: "Calzado",
        marca: "Adidas"
    },
    {
        nombre: "Chaqueta de Cuero",
        imagen: "./frontend/imagenes/chaqueta_cuero.jpg",
        precio: 180000,
        descripcion: "Chaqueta de cuero sintético, perfecta para ocasiones casuales.",
        categoria: "Ropa",
        marca: "Gef"
    },
    {
        nombre: "Reloj Deportivo",
        imagen: "./frontend/imagenes/reloj_deportivo.jpg",
        precio: 95000,
        descripcion: "Reloj resistente al agua con múltiples funciones deportivas.",
        categoria: "Accesorios",
        marca: "Casio"
    },
    {
        nombre: "Reloj Deportivo",
        imagen: "./frontend/imagenes/1.jpg",
        precio: 95000,
        descripcion: "Reloj resistente al agua con múltiples funciones deportivas.",
        categoria: "Accesorios",
        marca: "Casio"
    }
    
];
localStorage.setItem("productos", JSON.stringify(productos));

// Función para cargar los productos en la página
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    mostrarProductos(productos);
    cargarFiltros(productos); // Cargar filtros al cargar los productos
}

// Función para cargar los filtros de categoría y marca
function cargarFiltros(productos) {
    const categoriaFilter = document.getElementById("category-filter");
    const marcaFilter = document.getElementById("brand-filter");

    // Extraer categorías y marcas únicas
    const categorias = [...new Set(productos.map(producto => producto.categoria))];
    const marcas = [...new Set(productos.map(producto => producto.marca))];

    // Agregar opciones de categoría
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categoriaFilter.appendChild(option);
    });

    // Agregar opciones de marca
    marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaFilter.appendChild(option);
    });
}

// Función para aplicar los filtros seleccionados
function aplicarFiltros() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const categoriaSeleccionada = document.getElementById("category-filter").value;
    const marcaSeleccionada = document.getElementById("brand-filter").value;

    // Filtrar los productos según la categoría y la marca seleccionadas
    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true;
        const coincideMarca = marcaSeleccionada ? producto.marca === marcaSeleccionada : true;
        return coincideCategoria && coincideMarca;
    });

    mostrarProductos(productosFiltrados);
}

// Agregar eventos de cambio a los selectores de filtro
document.getElementById("category-filter").addEventListener("change", aplicarFiltros);
document.getElementById("brand-filter").addEventListener("change", aplicarFiltros);

// Función para mostrar productos en la página
function mostrarProductos(productos) {
    const productsGrid = document.getElementById("products-grid");
    productsGrid.innerHTML = "";

    productos.forEach((producto, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("bg-white", "rounded-lg", "border", "p-4", "mb-4");

        productCard.innerHTML = `
            <div class="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="h-48 w-full object-cover rounded-lg mb-4">
            <h3 class="text-lg font-semibold">${producto.nombre}</h3>
            <p class="text-gray-500">${producto.descripcion}</p>
            <p class="text-blue-600 font-bold">$${producto.precio.toFixed(2)}</p>
            <label for="color-${index}" class="block mt-2">Color:</label>
            <select id="color-${index}" class="border rounded-lg p-2 w-full">
                <option value="Azul">Azul</option>
                <option value="Rojo">Rojo</option>
                <option value="Negro">Negro</option>
            </select>
            <label for="cantidad-${index}" class="block mt-2">Cantidad:</label>
            <input type="number" id="cantidad-${index}" class="border rounded-lg p-2 w-full" min="1" value="1">
            <button onclick="añadirAlCarrito(${index})" class="bg-blue-600 text-white rounded-lg mt-3 px-4 py-2 w-full">Añadir al Carrito</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Carrito de compras
let carrito = [];

// Función para añadir productos al carrito
function añadirAlCarrito(index) {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const producto = productos[index];
    const color = document.getElementById(`color-${index}`).value;
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value, 10);

    carrito.push({ ...producto, color, cantidad });
    actualizarCarrito();
    toggleCart();
}

// Función para actualizar y mostrar el carrito
function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";

    carrito.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("border-b", "pb-2", "mb-2");

        cartItem.innerHTML = `
            <h4 class="text-lg font-semibold">${item.nombre}</h4>
            <p>Color: ${item.color}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p class="font-bold">Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
            <button onclick="eliminarDelCarrito(${index})" class="bg-red-500 text-white rounded-lg px-4 py-2 mt-2">Eliminar</button>
            <button onclick="modificarCarrito(${index})" class="bg-yellow-500 text-white rounded-lg px-4 py-2 mt-2">Modificar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = carrito.length;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para modificar un producto del carrito
function modificarCarrito(index) {
    const nuevoColor = prompt("Ingrese el nuevo color:", carrito[index].color);
    const nuevaCantidad = parseInt(prompt("Ingrese la nueva cantidad:", carrito[index].cantidad), 10);

    if (nuevoColor && nuevaCantidad > 0) {
        carrito[index].color = nuevoColor;
        carrito[index].cantidad = nuevaCantidad;
        actualizarCarrito();
    }
}

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("hidden");
}

// Cargar productos y filtros al cargar la página
window.onload = () => {
    cargarProductos();
};
