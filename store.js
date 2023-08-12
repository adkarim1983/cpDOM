
    // on commence par supprimer les articles dans notre panier.
// la premiere chose á faire est de séléctionner les bouttons de suppression, puis y ajouter un événement, pour dire
// quand on clique dessus faire quelque chose, pour se faire nous allons utiliser document objet qui va nous permettre 
//d'interoger les éléments basés sur des classes
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    // on va créer une for pour cibler les bouttons
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        //on va utilise la méthode addEventListener pour attacher l'événement de clic aux boutons.
        button.addEventListener('click', removeCartItem)
    }
    //sélectionner tous les éléments de HTML qui ont la classe CSS cart-quantity-input et de les stocker dans une variable appelée quantityInputs.
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    // on va utiliser for pour parcourir chaque élément dans  quantityInputs.
    //on initialise une variable i à 0, qui sera utilisée comme compteur pour parcourir les éléments dans  quantityInputs. La boucle continuera tant que i est inférieur à la longueur de quantityInputs. 
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
   // sélectionner tous les éléments HTML qui ont la classe CSS "shop-item-button" et les stocker dans la var addToCartButtons
   // l'objectif est de parcourir tous les boutons avec la classe CSS "shop-item-button" sur la page. Pour chaque bouton, 
   //il ajoute un écouteur d'événements pour l'événement de clic.
   //Lorsque l'utilisateur clique sur l'un de ces boutons, la fonction addToCartClicked sera exécutée pour gérer l'ajout de l'article au panier.
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    // sélectionner le premier élément  ayant la classe CSS "btn-purchase"
    //ajoute un écouteur d'événements au bouton sélectionné pour l'événement de clic ('click'). Lorsque l'utilisateur clique sur ce bouton, 
    // la fonction purchaseClicked sera appelée pour gérer cet événement.
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

 //  faire appel á la fonction purchaseClicked  lorsqu'on clique sur le bouton d'achat.
function purchaseClicked() {
    // afficher l'alerte avec un message de remerciement pour l'achat. Cela fournit un feedbak  simple  indiquer que  l'action a été bien prise en compte.
    alert('Merci pour votre achat! Nous vous sommes reconnaissants de votre confiance.')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
// appeler la function removeCartItem lorsque le boutton supprimer esr cliqué dans notre panier
function removeCartItem(event) {
    // removeCartItem  prend un paramètre event, qui représente l'événement de clic
    var buttonClicked = event.target
    // accéder à l'élément parent du parent du bouton de suppression, ce qui revient généralement à accéder 
    // à l'élément de niveau supérieur contenant l'ensemble de l'article ou du produit dans le panier.
    // remove() est appelée sur cet élément pour le supprimer complètement de la structure HTML. 
    // Cela a pour effet de supprimer le produit  du panier.
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
//  on va définir une function appelée quantityChanged, qui est destinée à être utilisée lorsqu'un changement est détecté 
// dans la quantité d'un produit dans notre panier d'achats. 
function quantityChanged(event) {
    //   on attribue à la variable input l'élément sur lequel l'événement de changement a été déclenché (entrer la Quantité)
    var input = event.target
    // Cette condition vérifie si la valeur saisie dans l'élément de saisie n'est pas un nombre (isNaN signifie "is Not a Number") ou si elle est inférieure ou égale à 0.
    if (isNaN(input.value) || input.value <= 0) {
        // Si la condition précédente est vraie (c'est-à-dire que la valeur n'est pas valide), alors la valeur de l'élément est définie à 1. 
        // Cela garantit que la quantité minimale est toujours au moins de 1.
        input.value = 1
    }
    // mettre à jour le total du panier après que la quantité  a été modifiée.
    updateCartTotal()
}
 //  gérer le processus d'ajout d'un article au panier lorsqu' on clique sur le bouton "Acheter". Elle récupère les détails de l'article à partir des éléments HTML correspondants,  et les transmet à la  function addItemToCart 
function addToCartClicked(event) {
    var button = event.target
// attribuer à la variable shopItem l'élément parent du parent du bouton. 
    var shopItem = button.parentElement.parentElement
// attribuer à la variable title le texte du titre de l'article. on obtient cet élément en recherchant une classe CSS spécifique (shop-item-title) dans l'élément shopItem, puis en récupérant le texte de cet élément.
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
// de la meme manière attribuer à la variable price le texte du prix de l'article
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//  attribuer à la variable imageSrc  la source de l'image de l'article
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
// appeller la function addItemToCart avec les valeurs du titre, du prix et de l'URL de l'image récupérées avant

    addItemToCart(title, price, imageSrc)
// mettre à jour le total du panier après l'ajout ou modification de la quantité  d'un article.
    updateCartTotal()
}

 function addItemToCart(title, price, imageSrc, ) {
// on crée une  nouvelle div  pour représenter une ligne dans le panier ou l'article ajouté sera affiché.
    var cartRow = document.createElement('div')
// ajouter la classe CSS cart-row à la div
    cartRow.classList.add('cart-row')
// récupèrer l'élément avec la classe CSS cart-items, l'index [0] est utilisé pour accéder au premier élément de la liste, car getElementsByClassName renvoie une liste d'éléments.
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
// parcourir la collection d'éléments contenant les titres des articles dans notre panier.
    for (var i = 0; i < cartItemNames.length; i++) {
// Cette condition vérifie si le titre de l'élément actuel dans la boucle est égal au titre de l'article d'ajouté.
        if (cartItemNames[i].innerText == title) {
// Si l'article est déjà présent dans notre panier (c'est-à-dire que son titre correspond à un élément existant dans le panier), on va créer une alerte  qui s'affiche pour informer le client ou bien l'utilisateur.
            alert('Cet article est déjà ajouté au panier')
            return
        }
    }   
// construire la structure HTML pour afficher un article dans le panier et lui ajoutee des événements.
//  une chaîne de modèle (string) qui contient la structure HTML de la ligne du panier. Cette chaîne contient des placeholders comme imageSrc, title, et price, qui seront remplacés par les valeurs réelles de l'article
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">SUPPRIMER DU PANIER</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// on général prend la structure HTML préparée, l'insère dans la ligne du panier, ajoute des événements pour la suppression et la modification de la quantité de l'article, puis affiche cette ligne dans le panier. 
}
//une fois l'article est supprimé  notre pannier, on remarque que le total n'est pas mis à jour (mème si le produit est supprimé le total reste toujours affiché), donc c'est pour ca que nous allons créer une nouvelle function updateCartTotal 
function updateCartTotal() {
    // on veut obtenir notre contneur d'articles de panier
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // on va créer une nouvelle variable qu'on va appeler priceElement, et on va la définir ègale à la ligne du panier, on va faire la méme choses avec la Quantité
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // pour obtenir des informations de ces éléments
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'DH' + total
}
// et finalement ajouter la fonctionnalité de clic pour aimer (le petit coeur une fois cliqué devient rouge)
// sélectionner tous les éléments de la page qui ont  la classe CSS heart à l'aide de la méthode querySelectorAll. 
    const hearts = document.querySelectorAll('.heart');
//  forEach parcourt chaque élément dans la liste hearts
    hearts.forEach(heart => {
      heart.addEventListener('click', function() {
// Cette condition vérifie si l'élément actuel a déjà la classe clicked. Si c'est le cas, cela signifie que l'élément a été "cliqué ou aimé" 
        if (heart.classList.contains('clicked')) {
          heart.classList.remove('clicked');
// Si l'élément n'a pas la classe clicked, cela signifie que l'utilisateur n'a pas encore (aimé) l'élément.
        } else {
          heart.classList.add('clicked');
        }
      });
    });
  