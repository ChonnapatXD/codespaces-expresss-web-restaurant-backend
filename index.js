// โหลด ENV ก่อนทุกอย่าง
require("dotenv").config();
// โหลด OpenTelemetry (ต้องมาก่อน express)
const { initOpenTelemetry } = require("./tracing");
initOpenTelemetry();

const logger = require("./logger");

logger.info("Server started");
logger.info({ msg: "This is structured log" });
logger.error("This is an error log");


const express = require('express')
const app = express()
const port = 5000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


console.log("TEMPO_URL =", process.env.TEMPO_URL);

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  next();
});
app.use(express.json())

let menuItems = [
  { id: 1, name: 'สปาเกตตี้แฮมเห็ด', price: 110, image: 'https://inwfile.com/s-cy/8avqkv.jpg' },
  { id: 2, name: 'กะเพราะหมูกรอบ', price: 80, image: 'https://i.ytimg.com/vi/16Odh9KFPK0/maxresdefault.jpg' },
  { id: 3, name: 'ข้าวขาหมูเยอรมัน', price: 100, image: 'https://img.wongnai.com/p/400x0/2019/06/14/5f9da9d4fb2446548bb7aeed0ff688c2.jpg' },
  { id: 4, name: 'ข้าวหน้าเนื้อ', price: 120, image: 'https://api2.krua.co/wp-content/uploads/2022/07/RI1765_Gallery_-01.jpg' },
  { id: 5, name: 'สเต็กเนื้อ', price: 120, image: 'https://www.calforlife.com/image/food/Beefsteak.jpg' },
];

let menumain = [
  { id: 1, name: 'กะเพราะหมูกรอบ', price: 80, image: 'https://i.ytimg.com/vi/16Odh9KFPK0/maxresdefault.jpg' },
  { id: 2, name: 'หมี่กรอบผัดซีอิ๊ว', price: 60, image: 'https://img.wongnai.com/p/l/2017/11/27/de6df13f67284c978aca21e3a0c52218.jpg' },
  { id: 3, name: 'ก๋วยเตี๋ยวคั่วไก่', price: 70, image: 'https://s3-ap-southeast-1.amazonaws.com/photo.wongnai.com/photos/2017/03/29/a3b7af34297c416e90e9c1694ffd206c.jpg' },
  { id: 4, name: 'สุกี้แห้งไก่', price: 60, image: 'https://img.wongnai.com/p/l/2017/05/29/6988f264122945718442c9e258babdcb.jpg' },
  { id: 5, name: 'ข้าวหมูแดง', price: 60, image: 'https://img.wongnai.com/p/1920x0/2018/07/03/ed7ed753c9f5433fa1afa1a3bfb83796.jpg' },
  { id: 6, name: 'ข้าวหมูแดงหมูกรอบ', price: 75, image: 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZX9z21BD6BkebjldCkR4f9gV00c9oK5ObfveJSI516A5C0jFDXvC.webp' },
  { id: 7, name: 'ข้าวขาหมูเยอรมัน', price: 100, image: 'https://img.wongnai.com/p/400x0/2019/06/14/5f9da9d4fb2446548bb7aeed0ff688c2.jpg' },
  { id: 8, name: 'ข้าวหน้าเนื้อ', price: 120, image: 'https://api2.krua.co/wp-content/uploads/2022/07/RI1765_Gallery_-01.jpg' },
  { id: 9, name: 'สเต็กเนื้อ', price: 120, image: 'https://www.calforlife.com/image/food/Beefsteak.jpg' },
  { id: 10, name: 'ข้าวผัดอเมริกัน', price: 115, image: 'https://img.wongnai.com/p/l/2017/05/29/8516e11c77244de6a5f6ac74faa138c5.jpg' },
  { id: 11, name: 'ข้าวหน้าหมูทอด', price: 65, image: 'https://img.wongnai.com/p/1920x0/2018/05/25/bc59677defba440b9d6a4507b903df65.jpg' },
  { id: 12, name: 'ข้าวยำไก่แซ่บ', price: 65, image: 'https://img.wongnai.com/p/1920x0/2020/11/07/95ce4ec6055a4e02a650c1c58dd41849.jpg' },
  { id: 13, name: 'หอยทอด', price: 75, image: 'https://img.wongnai.com/p/l/2017/05/29/5309d0a9b15d4907b6389b6a6787fc7e.jpg' },
  { id: 14, name: 'ข้าวน้ำพริกกะปิปลาทู', price: 75, image: 'https://img.wongnai.com/p/1920x0/2018/03/01/a47f84a3a653472cb86d4874ac22e2fe.jpg' },
  { id: 15, name: 'สปาเกตตี้แฮมเห็ด', price: 110, image: 'https://inwfile.com/s-cy/8avqkv.jpg' },
];

let menusnack = [
  { id: 1, name: 'นักเก็ต', price: 50, image: 'https://cdn8.devgodigit.net/wp-content/uploads/2021/09/30191243/051052534_F.jpg' },
  { id: 2, name: 'ไก่ทอด', price: 30, image: 'https://i.ytimg.com/vi/60xSNZvr7Ck/maxresdefault.jpg' },
  { id: 3, name: 'ไส้กรอกทอด', price: 40, image: 'https://fit-d.com/uploads/food/16cca95edc9ab6185c8720bed16ae178.jpg' },
  { id: 4, name: 'ไก่จ๊อ', price: 45, image: 'https://www.sgethai.com/wp-content/uploads/2022/09/220908-Content-%E0%B9%81%E0%B8%88%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B9%84%E0%B8%81%E0%B9%88%E0%B8%88%E0%B9%8A%E0%B8%AD02.webp' },
  { id: 5, name: 'ชีสบอล', price: 40, image: 'https://i.ytimg.com/vi/2Sdsm37ID5Q/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD2gtZijNMm8apP57QFeRD_dduotQ' },
  { id: 6, name: 'เกี๊ยวซ่า', price: 30, image: 'https://www.thevschool.com/wp-content/uploads/2023/04/Gyoza-Cooking-683x1024.jpg' },
  { id: 7, name: 'เฟรนฟราย', price: 40, image: 'https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg' },
  { id: 8, name: 'หอมทอด', price: 40, image: 'https://img-global.cpcdn.com/recipes/7334986d3c4fbd44/1200x630cq70/photo.jpg' },
  { id: 9, name: 'ปอเปี๊ยะทอด', price: 35, image: 'https://s359.kapook.com/pagebuilder/14d11bd0-fcb8-4a03-80ee-05da3fc93bb0.jpg' },
  { id: 10, name: 'ปลาไข่ทอดกรอบ', price: 35, image: 'https://i.ytimg.com/vi/7CavYUXJeiY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSgerI5xAw3SKpeO-JJccwUcV8fA' },
  { id: 11, name: 'หมูแดดเดียว', price: 50, image: 'https://sou-dai.com/wp-content/uploads/2020/12/maxresdefault-1024x576.jpg' },
  { id: 12, name: 'ทอดมันกุ้ง', price: 50, image: 'https://img.kapook.com/u/2016/surauch/cook1/v5_1.jpg' },
];

let menudrink = [
  { id: 1, name: 'โค้ก', price: 20, image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/17/88/8851959632017/8851959632017_11-20240619113957-.jpg' },
  { id: 2, name: 'น้ำเปล่า', price: 10, image: 'https://www.cokeshopth.com/pub/media/catalog/product/cache/e0b9252e27a8956bf801d8ddef82be21/n/a/namthip1.5l_3.jpg' },
  { id: 3, name: 'เป๊ปซี่', price: 20, image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/77/88/8858998571277/8858998571277_2-20240610141651-.jpg' },
  { id: 4, name: 'ชามะนาว', price: 35, image: 'https://s359.kapook.com/pagebuilder/aea20974-a1b8-44d5-be43-c018b6448758.jpg' },
  { id: 5, name: 'น้ำแดงโซดา', price: 20, image: 'https://s.isanook.com/wo/0/ud/38/190409/3.jpg?ip/resize/w728/q80/jpg' },
  { id: 6, name: 'ชาเย็น', price: 35, image: 'https://www.punthaicoffee.com/stocks/article/o0x0/aw/r9/nqt4awr9b8k/article6-1-cover.jpg' },
  { id: 7, name: 'นมชมพู', price: 20, image: 'https://www.sgethai.com/wp-content/uploads/2022/06/16042024-pinkmilk-001.webp' },
  { id: 8, name: 'นมสด', price: 25, image: 'https://yalamarketplace.com/upload/1621167988585.png' },
  { id: 9, name: 'น้ำเขียวโซดา', price: 20, image: 'https://s.isanook.com/wo/0/ud/38/190829/4.jpg?ip/resize/w728/q80/jpg' },
  { id: 10, name: 'น้ำส้ม', price: 30, image: 'https://gda.thai-tba.or.th/wp-content/uploads/2019/06/packshot-mm-splash-250-ml-new-icon.jpg' },
  { id: 11, name: 'กาแฟเย็น', price: 35, image: 'https://www.nestleprofessional.co.th/sites/default/files/styles/np_recipe_detail/public/2022-04/nescafe-iced-signature-540x400.jpg?itok=5gl_au1G' },
  { id: 12, name: 'น้ำมะนาว', price: 25, image: 'https://img.kapook.com/u/2017/surauch/cooking/j1_10.jpg' },
  { id: 13, name: 'น้ำสตรอเบอรี่ปั่น', price: 40, image: 'https://s359.kapook.com/r/600/auto/pagebuilder/86801056-6e7d-4824-b75e-12496a5e83dd.jpg' },
  { id: 14, name: 'น้ำมะพร้าวปั่น', price: 40, image: 'https://img.wongnai.com/p/1920x0/2020/11/03/342d45b9405e485dadb6ac01625f7de6.jpg' },
  { id: 15, name: 'น้ำแตงโมปั่น', price: 40, image: 'https://img.kapook.com/u/2024/sireeporn/Cooking-01/watermelon-smoothie-02.jpg' },
  { id: 16, name: 'น้ำมะม่วงปั่น', price: 40, image: 'https://www.bluemochatea.com/wp-content/uploads/2020/02/df8de098561a36641f05ace8de86ea42-1024x1024.jpg' },
  { id: 17, name: 'น้ำผลไม้รวม', price: 45, image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1701182614/attached_image_th/colorfulsmoothiehealthydetoxvitamindietorveganfoodconcept.jpg' },
];

//ดูข้อมูลเมนูทั้งหมด
app.get('/api/menuItem', (req, res) => {
  res.json(menuItems)
})

app.get('/api/menumain', (req, res) => {
  res.json(menumain)
})

app.get('/api/menusnack', (req, res) => {
  res.json(menusnack)
})

app.get('/api/menudrink', (req, res) => {
  res.json(menudrink)
})


//ดูข้อมูลเมนูใช้ ID
app.get('/api/menuItem/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const item = menuItems.find(item => item.id === itemId)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.get('/api/menumain/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const item = menumain.find(item => item.id === itemId)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.get('/api/menusnack/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const item = menusnack.find(item => item.id === itemId)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.get('/api/menudrink/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const item = menudrink.find(item => item.id === itemId)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})


//create ใหม่
app.post('/api/menuItem', (req, res) => {
  const newItem = {
    id: menuItems.length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  }
  menuItems.push(newItem)
  res.status(201).json(newItem)
})

app.post('/api/menumain', (req, res) => {
  const newItem = {
    id: menumain.length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  }
  menumain.push(newItem)
  res.status(201).json(newItem)
})

app.post('/api/menusnack', (req, res) => {
  const newItem = {
    id: menusnack.length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  }
  menusnack.push(newItem)
  res.status(201).json(newItem)
})

app.post('/api/menudrink', (req, res) => {
  const newItem = {
    id: menudrink.length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  }
  menudrink.push(newItem)
  res.status(201).json(newItem)
})


//update ข้อมูล
app.put('/api/menuItem/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menuItems.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    const updatedItem = {
      id: itemId,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    }
    menuItems[itemIndex] = updatedItem
    res.json(updatedItem)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.put('/api/menumain/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menumain.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    const updatedItem = {
      id: itemId,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    }
    menumain[itemIndex] = updatedItem
    res.json(updatedItem)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.put('/api/menusnack/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menusnack.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    const updatedItem = {
      id: itemId,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    }
    menusnack[itemIndex] = updatedItem
    res.json(updatedItem)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.put('/api/menudrink/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menudrink.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    const updatedItem = {
      id: itemId,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    }
    menudrink[itemIndex] = updatedItem
    res.json(updatedItem)
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

//delete ข้อมูล
app.delete('/api/menuItem/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menuItems.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    menuItems.splice(itemIndex, 1)
    res.json({message: 'Item deleted successfully'})
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.delete('/api/menumain/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menumain.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    menumain.splice(itemIndex, 1)
    res.json({message: 'Item deleted successfully'})
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.delete('/api/menusnack/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menusnack.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    menusnack.splice(itemIndex, 1)
    res.json({message: 'Item deleted successfully'})
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})

app.delete('/api/menudrink/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = menudrink.findIndex(item => item.id === itemId)
  if (itemIndex !== -1) {
    menudrink.splice(itemIndex, 1)
    res.json({message: 'Item deleted successfully'})
  } else {
    res.status(404).json({message: 'Item not found'})
  }
})


logger.info("Logs form logger");
for (let i = 0; i < 10; i++) {
  logger.info(`Test log ${i}`);
}

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url });
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



const { trace } = require("@opentelemetry/api");
const tracer = trace.getTracer("app-tracer");

app.get("/test-span", (req, res) => {
  const span = tracer.startSpan("test-span");
  // ทำงานใดๆ
  span.end();
  res.send("Span created");
});

app.get('/api/test-trace', (req, res) => {
  const tracer = require('@opentelemetry/api').trace.getTracer('core');
  for (let i = 0; i < 50; i++) {
    const span = tracer.startSpan(`test-span-${i}`);
    span.end();
  }
  res.send('50 spans sent!');
});

