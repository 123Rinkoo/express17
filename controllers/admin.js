const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({ //ye create kar dega, data bhar dega in table.
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result=>{
    // console.log(result);
    res.redirect('/');
  }).catch(err=>{
    // connsole.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product=>{
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    return product.save(); //ye automatically save karega aur ek promise return bhi krega, agar product ni hoga to ye update krega.
  })
  .then(result=>{console.log('Updated product')
  res.redirect('/admin/products');})
  .catch(err=>{console.log(err)});
  // res.redirect('/admin/products'); //yahan likha hai to update  hone se pehle hi ye aa jayega aur vahan updated ni dikhega hume vo reload karna padhega tabhi dikhega kyunki aysynchronous function hai na. so isko .then ke annder daal do.
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  })
  .catch(err=>{console.log(err)})
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.destroy({
  //   where : {}
  // }) isse bhi delete ho jayega 

  Product.findByPk(prodId)
  .then(product=>{
    return product.destroy();
  })
  .then(result=>{
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
  });
};
