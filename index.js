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


//ดูข้อมูลเมนูทั้งหมด
app.get('/api/menuItem', (req, res) => {
  res.json(menuItems)
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






