// Array de productos almacenado en localStorage 
const productos = [
    
{
        nombre: "Camisa Casual Hombre",
        imagen: "./frontend/imagenes/camihombre.jpg",
        precio: 75000,
        descripcion: ""Eleva tu estilo con esta camisa casual para hombre. 
        Su diseño moderno y cómodo es perfecto para cualquier ocasión, 
        desde una reunión informal hasta una salida nocturna. Fabricada con materiales de alta calidad,
        es fresca, resistente y fácil de combinar. ¡Luce relajado y con clase en cada momento!"",
        categoria: "Ropa",
        marca: "Koaj"
    },
    {
        nombre: "Jeans Skinny Mujer",
        imagen: "./frontend/imagenes/jeanmujer.jpg",
        precio: 120000,
        descripcion: "Resalta tu figura con estos jeans skinny para mujer. Con un ajuste perfecto que se adapta a tus curvas, estos jeans combinan estilo 
        y confort en una sola prenda.
        Ideales para un look casual o una salida especial, están diseñados para brindar comodidad y versatilidad sin renunciar a la moda.",
        categoria: "Ropa",
        marca: "Studio F"
    },
    {
        nombre: "Tenis Running Hombre",
        imagen: "./frontend/imagenes/tenishombre.jpg",
        precio: 210000,
        descripcion: "Optimiza tu rendimiento con nuestros tenis de running para hombre. Ligeros, transpirables y con tecnología de amortiguación avanzada, 
        están hechos para acompañarte en cada kilómetro.
        Ya sea para un entrenamiento intenso o una carrera de larga distancia, estos tenis te ofrecerán el soporte y la comodidad que necesitas.",
        categoria: "Calzado",
        marca: "Adidas"
    },
    {
        nombre: "Chaqueta de Cuero",
        imagen: "./frontend/imagenes/chaque.jpg",
        precio: 180000,
        descripcion: "Esta chaqueta de cuero es la prenda esencial para un look audaz y sofisticado. Fabricada con materiales de primera calidad, combina estilo y durabilidad.
        Ideal para el día o la noche, aporta un toque de elegancia y rebeldía a tu atuendo. ¡Haz una declaración de estilo con esta pieza clásica!",
        categoria: "Ropa",
        marca: "Gef"
    },
    {
        nombre: "Reloj Deportivo",
        imagen: "./frontend/imagenes/reloj.jpg",
        precio: 95000,
        descripcion: "Mantén el control de tu tiempo y tus actividades con este reloj deportivo. Resistente al agua y con funciones avanzadas, 
        es el compañero ideal para tus entrenamientos y aventuras.
        Su diseño moderno y robusto se adapta a cualquier estilo y ocasión. ¡Lleva tu rendimiento al siguiente nivel!",
        categoria: "Accesorios",
        marca: "Casio"
    },
    {
        nombre: "Camiseta Seleccion Colombia",
        imagen: "./frontend/imagenes/sele.jpg",
        precio: 300000,
        descripcion: "Demuestra tu pasión por el fútbol y por la Selección Colombia con esta camiseta oficial. Diseñada con materiales de alta calidad,
        te garantiza comodidad y frescura en todo momento. Ideal para apoyar a tu equipo en el estadio o desde casa, ¡llévala con orgullo y estilo!",
        categoria: "Ropa",
        marca: "adidas"
    },
    {
        nombre: "Gorra",
        imagen: "./frontend/imagenes/gorra.jpg",
        precio: 80000,
        descripcion: "Completa tu look urbano con la clásica gorra Vans. Con un diseño fresco y emblemático, esta gorra es perfecta para cualquier outfit casual.
        Ajustable y hecha con materiales duraderos, es el accesorio ideal para darle un toque relajado y a la moda a tu estilo diario",
        categoria: "Ropa",
        marca: "Vans"
    },
    {
        nombre: "Mocasines mujer",
        imagen: "./frontend/imagenes/moca.jpg",
        precio: 300000,
        descripcion: "Estos mocasines elegantes para dama combinan comodidad y sofisticación. Perfectos para el trabajo o una salida especial, 
        están hechos con materiales suaves y duraderos que te aseguran comodidad en cada paso.
        Añade un toque de clase a tu vestimenta con estos mocasines versátiles y de gran estilo.",
        categoria: "Ropa",
        marca: "Fiori"
    },
    {
        nombre: "Pantaloneta hombre",
        imagen: "./frontend/imagenes/pant.jpg",
        precio: 72000,
        descripcion: "Prepárate para la aventura con esta pantaloneta de hombre. Ligera y resistente, es ideal para actividades al aire libre,
        deportes o simplemente para relajarte. Con un ajuste cómodo y materiales transpirables, te mantendrá fresco y con estilo en cualquier momento.",
        categoria: "Ropa",
        marca: "totto"
    },
    {
        nombre: "Gafas de sol",
        imagen: "./frontend/imagenes/gaf.jpg",
        precio: 210000,
        descripcion: "Protege tus ojos y eleva tu estilo con estas gafas de sol. Con un diseño moderno y elegante, ofrecen la máxima protección UV para cuidar tu vista.
        Ideales para cualquier ocasión, desde la playa hasta la ciudad, son el accesorio perfecto para un look sofisticado y cool.",
        categoria: "Accesorios",
        marca: "ray ban"
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
