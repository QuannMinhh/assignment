var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var toys = await ToyModel.find({});
   res.render('toyAdmin/index', { toys: toys });
});

// search function
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") });
   res.render('toyAdmin/index', { toys: toys });
});

// sort function
router.get('/ascending', async (req, res) => {
   var toys = await ToyModel.find().sort({ price: 1 });
   res.render('toyAdmin/index', { toys: toys });
});

router.get('/descending', async (req, res) => {
   var toys = await ToyModel.find().sort({ price: -1 });
   res.render('toyAdmin/index', { toys: toys });
});

router.post('/add', async (req, res) => {
   try {
      // Lấy thông tin từ biểu mẫu
      const { name, brand, category, price, quantity, picture, describe } = req.body;

      // Tạo bản ghi đồ chơi mới
      const newToy = new ToyModel({
         name,
         brand,
         category,
         price,
         quantity,
         picture,
         describe
      });

      // Lưu bản ghi vào cơ sở dữ liệu
      await newToy.save();

      // Chuyển hướng người dùng đến trang index.hbs
      res.redirect('/toy');
   } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      res.render('error', { error });
   }
});


router.get('/add', (req, res) => {
   res.render('toyAdmin/add');
});


router.get('/delete/:id', async (req, res) => {
   try {
     const toyId = req.params.id;
     await ToyModel.findByIdAndRemove(toyId);
     res.redirect('/toy'); // Chuyển hướng sau khi xóa thành công 
   } catch (error) {
     console.error(error);
     res.render('error', { error });
   }
 });
 

// Sửa sản phẩm
router.get('/editToy/:id', async (req, res) => {
   try {
     const toyId = req.params.id;
     const toy = await ToyModel.findById(toyId);
     res.render('toyAdmin/editToy', { toy });
   } catch (error) {
     console.error(error);
     res.render('error', { error });
   }
 });
 

router.post('/editToy/:id', async (req, res) => {
   try {
      const { name, brand, category, price, quantity, picture, describe } = req.body;
      await ToyModel.findByIdAndUpdate(req.params.id, {
         name,
         brand,
         category,
         price,
         quantity,
         picture,
         describe
      });
      res.redirect('/toy');
   } catch (error) {
      console.error(error);
      res.render('error', { error });
   }
});

router.get('/login', async (req, res) => {
   res.render('login')
})

router.post('/login', (req, res) => {
   const { username, password } = req.body;
 
   // Kiểm tra thông tin đăng nhập
   if (username === 'admin' && password === '123') {
     // Thực hiện đăng nhập thành công
     req.session.isAuthenticated = true;
     req.session.username = username;
     res.redirect('/'); 
   } else {
     res.render('login', { error: 'Invalid username or password' });
   }
 });

 router.get('/logout', (req, res) => {
   req.session.isAuthenticated = false;
   req.session.username = null;
   res.redirect('login'); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
 });

module.exports = router;
