const socket = io();

const realTimeProductsList = document.getElementById('realTimeProductsList');
const productForm = document.getElementById('productForm');

socket.on('connect', () => {
    console.log('Conexión establecida con el servidor');
    socket.send('Hola desde realTimeProducts.js');
});

socket.emit('message', (data) => {
    console.log('Mensaje recibido desde el servidor:', data);
});

socket.on('realTimeProductUpdate', products => {
    realTimeProductsList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - ${product.description} - Precio: ${product.price}`;
        realTimeProductsList.appendChild(listItem);
    });
});

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productName = document.getElementById('title').value;
    socket.emit('addProduct', { name: productName }); // Emitir un mensaje para agregar un producto
});

// Función para eliminar un producto (llamada desde el botón en el formulario)
function deleteProduct(productId) {
    socket.emit('deleteProduct', { id: productId });
}
